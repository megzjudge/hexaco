document.addEventListener('DOMContentLoaded', () => {
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

function getOrdinalSuffix(n) {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}