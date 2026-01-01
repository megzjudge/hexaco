document.addEventListener('DOMContentLoaded', () => {
  const bellDiv = document.getElementById('bellCurve');
  if (!bellDiv) return;

  const bellObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // --- Parameters ---
      const mean = 5.0;
      const stdDev = 1.5;
      const minX = 0;
      const maxX = 10;
      const userValue = 3.39;

      // --- Generate bell curve data ---
      const steps = 1000;
      const x = [];
      const y = [];
      for (let i = 0; i <= steps; i++) {
        const xi = minX + (maxX - minX) * i / steps;
        x.push(xi);
        y.push((1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((xi - mean)/stdDev, 2)));
      }

      // --- Color Palette Points ---
      const colorStops = [
        {x: 0, color: [0,0,139]},       // dark blue
        {x: 2, color: [0,0,205]},       // medium blue
        {x: 4, color: [0,255,255]},     // cyan
        {x: 6, color: [0,255,255]},     // cyan plateau
        {x: 8, color: [0,0,205]},       // medium blue
        {x: 10, color: [0,0,139]}       // dark blue
      ];

      // --- Interpolate color function ---
      function getColorForX(xVal) {
        for (let i = 0; i < colorStops.length - 1; i++) {
          const a = colorStops[i];
          const b = colorStops[i+1];
          if (xVal >= a.x && xVal <= b.x) {
            const t = (xVal - a.x)/(b.x - a.x);
            const r = Math.round(a.color[0] + t*(b.color[0]-a.color[0]));
            const g = Math.round(a.color[1] + t*(b.color[1]-a.color[1]));
            const bC = Math.round(a.color[2] + t*(b.color[2]-a.color[2]));
            return `rgb(${r},${g},${bC})`;
          }
        }
        // default
        return `rgb(0,0,139)`;
      }

      // --- Create thin traces for gradient ---
      const traces = [];
      const segmentSize = 5; // smaller = smoother
      for (let i = 0; i < x.length; i += segmentSize) {
        const segX = x.slice(i, i+segmentSize+1);
        const segY = y.slice(i, i+segmentSize+1);
        if (segX.length < 2) continue;
        const color = getColorForX((segX[0]+segX[segX.length-1])/2);
        traces.push({
          x: segX,
          y: segY.map(()=>0), // start empty
          fill: 'tozeroy',
          type: 'scatter',
          mode: 'lines',
          line: {color: color, width: 3}
        });
      }

      // --- Animation frames ---
      const frames = [];
      const meanIdx = x.findIndex(v => v >= mean);
      const maxStep = Math.max(meanIdx, x.length - meanIdx);
      const stepIncrement = 5;

      for (let step = 0; step <= maxStep; step += stepIncrement) {
        const frameData = traces.map(trace => {
          const newY = trace.y.slice();
          trace.x.forEach((xi, idx) => {
            const xiIdx = x.findIndex(v => v === xi);
            if (xiIdx >= meanIdx - step && xiIdx <= meanIdx + step) {
              newY[idx] = y[xiIdx];
            }
          });
          return {y: newY};
        });
        frames.push({data: frameData});
      }

      // --- Layout with red line for user value ---
      const layout = {
        title: 'Animated Bell Curve',
        xaxis: {title: 'Score'},
        yaxis: {title: 'Probability Density'},
        shapes: [
          {
            type: 'line',
            x0: userValue,
            x1: userValue,
            y0: 0,
            y1: Math.max(...y),
            line: {color: 'red', width: 3, dash: 'dot'}
          }
        ]
      };

      // --- Render and animate ---
      Plotly.newPlot('bellCurve', traces, layout).then(() => {
        Plotly.animate('bellCurve', frames, {
          frame: {duration: 30, redraw: true},
          transition: {duration: 0}
        });
      });

      bellObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  bellObserver.observe(bellDiv);
});
