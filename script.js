// --- Render queue helpers ---
const renderQueue = [];
let isRendering = false;

function enqueueRender(fn) {
  renderQueue.push(fn);
  pumpQueue();
}

function pumpQueue() {
  if (isRendering) return;
  const next = renderQueue.shift();
  if (!next) return;

  isRendering = true;

  const run = () => {
    Promise.resolve()
      .then(next)
      .catch(err => console.error('Graph render error:', err))
      .finally(() => {
        isRendering = false;
        if (!renderQueue.length) return;
        if ('requestIdleCallback' in window) {
          requestIdleCallback(pumpQueue, { timeout: 200 });
        } else {
          setTimeout(pumpQueue, 0);
        }
      });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 200 });
  } else {
    setTimeout(run, 0);
  }
}

// Sets up a lazy observer; the heavy Plotly draw is queued (one at a time)
// only once the chart scrolls near the viewport.
function renderBellCurve(containerId, title, userValue) {
  const bellDiv = document.getElementById(containerId);
  if (!bellDiv) return;

  const bellObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      bellObserver.unobserve(entry.target);
      enqueueRender(() => drawBellCurve(bellDiv, title, userValue));
    });
  }, { threshold: 0.1, rootMargin: '300px 0px' });

  bellObserver.observe(bellDiv);
}

function drawBellCurve(bellDiv, title, userValue) {
  const mean = 5.0;
  const stdDev = 0.78;
  const isMobile = window.innerWidth <= 768;
  const minX = 0, maxX = 10;
  // Lower resolution: still a smooth curve, far fewer points to process.
  const steps = isMobile ? 200 : 400;

  const x = [], y = [];
  for (let i = 0; i <= steps; i++) {
    const xi = minX + (maxX - minX) * i / steps;
    x.push(xi);
    y.push((1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((xi - mean) / stdDev) ** 2));
  }

  const colorStops = [
    { x: 3.2, color: [217, 148, 0] },
    { x: 5, color: [41, 140, 34] },
    { x: 6.8, color: [217, 148, 0] }
  ];

  function getColorForX(xVal) {
    for (let i = 0; i < colorStops.length - 1; i++) {
      const a = colorStops[i], b = colorStops[i + 1];
      if (xVal >= a.x && xVal <= b.x) {
        const t = (xVal - a.x) / (b.x - a.x);
        const r = Math.round(a.color[0] + t * (b.color[0] - a.color[0]));
        const g = Math.round(a.color[1] + t * (b.color[1] - a.color[1]));
        const bC = Math.round(a.color[2] + t * (b.color[2] - a.color[2]));
        return `rgb(${r},${g},${bC})`;
      }
    }
    if (xVal < colorStops[0].x) return `rgb(${colorStops[0].color.join(',')})`;
    return `rgb(${colorStops[colorStops.length - 1].color.join(',')})`;
  }

  const traces = [];
  const traceStarts = []; // index of x/y where this trace begins

  // Wider segments: ~50 (desktop) / ~25 (mobile) traces instead of ~200,
  // which is the single biggest Plotly cost. Gradient stays smooth.
  const segmentSize = 8;
  for (let i = 0; i < x.length; i += segmentSize) {
    const segX = x.slice(i, i + segmentSize + 1);
    if (segX.length < 2) continue;

    const color = getColorForX((segX[0] + segX[segX.length - 1]) / 2);

    traceStarts.push(i);
    traces.push({
      x: segX,
      y: new Array(segX.length).fill(0),
      fill: 'tozeroy',
      type: 'scatter',
      mode: 'lines',
      line: { color, width: 3 }
    });
  }

  function rgb(arr) { return `rgb(${arr[0]},${arr[1]},${arr[2]})`; }

  let annotations;
  if (isMobile) {
    annotations = [
      { x: 4, text: "10-50th", color: rgb(colorStops[1].color), yOffset: -35 },
      { x: 6, text: "50-90th", color: rgb(colorStops[1].color), yOffset: -35 },
      { x: 3.7, text: "<10th", color: rgb(colorStops[2].color), yOffset: -50 },
      { x: 6.3, text: ">90th", color: rgb(colorStops[2].color), yOffset: -50 }
    ].map(a => ({
      x: a.x, y: 0, xref: 'x', yref: 'paper',
      text: a.text, showarrow: false,
      yshift: a.yOffset,
      font: { color: a.color, size: 12 },
      align: 'center'
    }));
  } else {
    annotations = [
      { x: 3.7, text: "<10th", color: rgb(colorStops[2].color) },
      { x: 4.5, text: "10-50th", color: rgb(colorStops[1].color) },
      { x: 5.5, text: "50-90th", color: rgb(colorStops[1].color) },
      { x: 6.3, text: ">90th", color: rgb(colorStops[2].color) }
    ].map(a => ({
      x: a.x, y: -0.14, xref: 'x', yref: 'paper',
      text: a.text, showarrow: false,
      font: { color: a.color, size: 12 },
      align: 'center'
    }));
  }

  const secondaryAnnotation = {
    x: userValue, y: 1.04, xref: 'x', yref: 'paper',
    text: `${userValue}`, showarrow: false,
    font: { color: 'rgba(255,0,0,0)', size: 14 },
    align: 'center'
  };

  const meanIdx = x.findIndex(v => v >= mean);
  const maxStep = Math.max(meanIdx, x.length - meanIdx);

  // Aim for ~14 animation frames regardless of resolution.
  const stepIncrement = Math.max(1, Math.round(maxStep / 14));
  const frames = [];

  // Cache yMax once (avoid Math.max(...y) inside loops)
  let yMax = 0;
  for (let i = 0; i < y.length; i++) if (y[i] > yMax) yMax = y[i];

  for (let step = 0; step <= maxStep; step += stepIncrement) {
    const progress = step / maxStep;
    const opacity = progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) / 0.1);

    const frameData = traces.map((trace, tIdx) => {
      const newY = trace.y.slice();
      const start = traceStarts[tIdx];

      for (let idx = 0; idx < trace.x.length; idx++) {
        const xiIdx = start + idx; // O(1) index lookup
        if (xiIdx >= meanIdx - step && xiIdx <= meanIdx + step) {
          newY[idx] = y[xiIdx];
        }
      }
      return { y: newY };
    });

    frames.push({
      data: frameData,
      layout: {
        shapes: [{
          type: 'line',
          x0: userValue, x1: userValue,
          y0: 0, y1: yMax,
          line: { color: `rgba(255,0,0,${opacity})`, width: 3, dash: 'dot' }
        }],
        annotations: [
          ...annotations,
          { ...secondaryAnnotation, font: { ...secondaryAnnotation.font, color: `rgba(255,0,0,${opacity})` } }
        ]
      }
    });
  }

  const layout = {
    title: title,
    xaxis: {
      title: { text: 'Percentile Score (th)', standoff: 50 },
      zeroline: false,
      showgrid: false,
      tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    yaxis: {
      title: 'Population Likelihood',
      showticklabels: false,
      showgrid: false
    },
    showlegend: false,
    annotations: [...annotations, secondaryAnnotation],
    shapes: [{
      type: 'line',
      x0: userValue, x1: userValue,
      y0: 0, y1: yMax,
      line: { color: 'rgba(255,0,0,0)', width: 3, dash: 'dot' }
    }],
    margin: {
      l: isMobile ? 15 : 80,
      r: isMobile ? 15 : 80,
      t: isMobile ? 80 : 100,
      b: isMobile ? 100 : 110
    },
    autosize: true
  };

  return Plotly.newPlot(bellDiv, traces, layout, {
    displayModeBar: false,
    responsive: true
  }).then(() => {
    Plotly.animate(bellDiv, frames, {
      frame: { duration: 12, redraw: true },
      transition: { duration: 0 }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof graphsData === 'undefined') return;
  graphsData.forEach((g) => {
    renderBellCurve(g.id, g.title, g.value);
  });
});
