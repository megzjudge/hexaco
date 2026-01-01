document.addEventListener('DOMContentLoaded', () => {
  // ----------------------
  // Progress Bars Animation
  // ----------------------
  const bars = document.querySelectorAll('.progress-bar, .progress-bar-men, .progress-bar-women');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const bar = entry.target;
      let fill = bar.querySelector('[class^="progress-fill"]');
      
      if (!fill) {
        fill = bar.querySelector('div[class*="progress-fill"]');
      }
      
      const rightLabel = bar.querySelector('.progress-label');
      const progress = parseInt(bar.dataset.progress, 10);

      console.log('Bar class:', bar.className);
      console.log('Detected fill:', fill);
      console.log('Progress value:', progress);

      if (!isNaN(progress)) {
        if (fill) {
          fill.style.width = `${progress}%`;
        } else {
          console.warn('Fill not found for this bar!');
        }

        if (rightLabel) {
          rightLabel.textContent = `${progress}${getOrdinalSuffix(progress)}`;
        }
      }

      observer.unobserve(bar);
    });
  }, { threshold: 0.1 });

  bars.forEach(bar => observer.observe(bar));

  // ----------------------
  // Zoom Detection (optional)
  // ----------------------
  (function () {
    const scroller =
      document.querySelector('.snap-wrap') ||
      document.querySelector('.scroll-sections') ||
      document.scrollingElement ||
      document.documentElement;

    const EPS = 0.01;

    function isZoomed() {
      return window.visualViewport
        ? Math.abs(window.visualViewport.scale - 1) > EPS
        : false;
    }

    function syncZoomState() {
      scroller.classList.toggle('zoomed', isZoomed());
    }

    syncZoomState();

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', syncZoomState);
      window.visualViewport.addEventListener('scroll', syncZoomState);
    }

    window.addEventListener('resize', syncZoomState);
  })();
});

// ----------------------
// Utility Function
// ----------------------
function getOrdinalSuffix(n) {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

// ----------------------
// Bell Curve Animation
// ----------------------
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
      const userValue = 3.39;  // Can also read from data attribute

      // --- Generate Bell Curve Data ---
      const steps = 1000;
      const x = [];
      const y = [];
      for (let i = 0; i <= steps; i++) {
          const xi = minX + (maxX - minX) * i / steps;
          x.push(xi);
          y.push((1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((xi - mean)/stdDev, 2)));
      }

      // --- Create Animation Frames ---
      const fillY = new Array(y.length).fill(0);
      const frames = [];
      const meanIdx = x.findIndex(v => v >= mean);
      const maxStep = Math.max(meanIdx, y.length - meanIdx);
      const stepSize = 5;

      for (let step = 0; step <= maxStep; step += stepSize) {
          const newY = fillY.slice();
          for (let i = meanIdx - step; i <= meanIdx; i++) {
              if (i >= 0) newY[i] = y[i];
          }
          for (let i = meanIdx; i <= meanIdx + step; i++) {
              if (i < y.length) newY[i] = y[i];
          }
          frames.push({data: [{y: newY}]});
      }

      // --- Gradient Colors along the Curve ---
      // We'll approximate by setting line color to cyan and fill will remain dynamic
      const trace = {
          x: x,
          y: fillY,
          mode: 'lines',
          line: {color: 'cyan', width: 3},
          fill: 'tozeroy',
          type: 'scatter'
      };

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

      // --- Render and Animate ---
      Plotly.newPlot('bellCurve', [trace], layout).then(() => {
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
