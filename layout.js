const HEX_TRAITS = [
  { id: 'honesty', label: 'Honesty-Humility', short: 'H' },
  { id: 'emotionality', label: 'Emotionality', short: 'E' },
  { id: 'extraversion', label: 'eXtraversion', short: 'X' },
  { id: 'agreeableness', label: 'Agreeableness', short: 'A' },
  { id: 'conscientiousness', label: 'Conscientiousness', short: 'C' },
  { id: 'openness', label: 'Openness', short: 'O' },
];

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundGlows();
  buildLanguageGrid();
  buildScaleLibrary();
  buildResultsSections();
  buildScoreOverview();
  initReveal();
});

function buildScoreOverview() {
  const mount = document.getElementById('score-overview');
  if (!mount || typeof graphsData === 'undefined') return;

  const domainIdMap = {
    honesty: 'bellCurve1',
    emotionality: 'bellCurve2',
    extraversion: 'bellCurve5',
    agreeableness: 'bellCurve3',
    conscientiousness: 'bellCurve4',
    openness: 'bellCurve6',
  };

  HEX_TRAITS.forEach((trait) => {
    const graph = graphsData.find((g) => g.id === domainIdMap[trait.id]);
    if (!graph) return;

    const card = document.createElement('a');
    card.href = `#domain-${trait.id}`;
    card.className = `score-pill score-pill--${trait.id} reveal`;
    card.innerHTML = `
      <span class="score-pill__letter">${trait.short}</span>
      <span class="score-pill__name">${trait.label}</span>
      <span class="score-pill__value">${graph.value}</span>
    `;
    mount.appendChild(card);
  });
}

function initBackgroundGlows() {
  const mount = document.querySelector('.bg-glow');
  if (!mount) return;

  const palette = [
    { rgb: '78, 110, 57', alpha: 0.18 },
    { rgb: '41, 140, 34', alpha: 0.14 },
    { rgb: '140, 84, 165', alpha: 0.08 },
    { rgb: '10, 90, 60', alpha: 0.12 },
    { rgb: '100, 130, 70', alpha: 0.1 },
  ];

  const blobs = [];
  const count = 12 + Math.floor(Math.random() * 6);

  for (let i = 0; i < count; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    const alpha = color.alpha * (0.65 + Math.random() * 0.7);
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const w = 28 + Math.random() * 55;
    const h = 22 + Math.random() * 48;
    blobs.push(
      `radial-gradient(ellipse ${w.toFixed(1)}% ${h.toFixed(1)}% at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(${color.rgb}, ${alpha.toFixed(3)}), transparent 52%)`
    );
  }

  mount.style.background = [
    ...blobs,
    'linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-mid) 100%)',
  ].join(', ');
}

function initReveal() {
  const els = document.querySelectorAll('.reveal, .card, .flow-zone, .about-panel, .scale-fold, .chart-card');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => io.observe(el));
}

function buildLanguageGrid() {
  const mount = document.getElementById('language-grid');
  if (!mount || typeof HEXACO_LANGUAGES === 'undefined') return;

  HEXACO_LANGUAGES.forEach((lang) => {
    const chip = document.createElement('span');
    chip.className = 'lang-chip';
    chip.textContent = lang;
    mount.appendChild(chip);
  });
}

function buildScaleLibrary() {
  const mount = document.getElementById('scale-library');
  if (!mount || typeof HEXACO_DOMAINS === 'undefined') return;

  HEXACO_DOMAINS.forEach((domain) => {
    const article = document.createElement('article');
    article.className = `scale-domain scale-domain--${domain.id} reveal`;
    article.id = `scale-${domain.id}`;

    const facetsHtml = domain.facets
      .map(
        (facet) => `
        <details class="scale-fold scale-fold--facet">
          <summary class="scale-fold__summary">${facet.name}</summary>
          <p class="scale-fold__body">${facet.text}</p>
        </details>`
      )
      .join('');

    article.innerHTML = `
      <details class="scale-fold scale-fold--domain" open>
        <summary class="scale-fold__summary">
          <span class="scale-fold__letter" aria-hidden="true">${domain.letter}</span>
          <span class="scale-fold__title">${domain.name}</span>
        </summary>
        <div class="scale-fold__content">
          <p class="scale-fold__lead">${domain.description}</p>
          <div class="scale-fold__facets">${facetsHtml}</div>
        </div>
      </details>
    `;

    mount.appendChild(article);
  });

  if (typeof HEXACO_ALTRUISM !== 'undefined') {
    const altruism = document.createElement('article');
    altruism.className = 'scale-domain scale-domain--altruism reveal';
    altruism.id = 'scale-altruism';
    altruism.innerHTML = `
      <details class="scale-fold scale-fold--domain scale-fold--interstitial">
        <summary class="scale-fold__summary">
          <span class="scale-fold__letter" aria-hidden="true">+</span>
          <span class="scale-fold__title">${HEXACO_ALTRUISM.name}</span>
        </summary>
        <div class="scale-fold__content">
          <p class="scale-fold__lead">${HEXACO_ALTRUISM.text}</p>
        </div>
      </details>
    `;
    mount.appendChild(altruism);
  }
}

function buildChartCard(graph, anchorId) {
  const card = document.createElement('article');
  card.className = 'chart-card card reveal';
  if (anchorId) card.id = anchorId;
  card.innerHTML = `<div class="bellCurve" id="${graph.id}" data-title="${graph.title}" data-value="${graph.value}"></div>`;
  return card;
}

function buildResultsSections() {
  if (typeof graphsData === 'undefined') return;

  const domainMount = document.getElementById('domain-charts');
  const facetMount = document.getElementById('facet-charts');
  const interstitialMount = document.getElementById('interstitial-charts');
  if (!domainMount) return;

  const domainOrder = ['honesty', 'emotionality', 'extraversion', 'agreeableness', 'conscientiousness', 'openness'];
  const domainIdMap = {
    honesty: 'bellCurve1',
    emotionality: 'bellCurve2',
    extraversion: 'bellCurve5',
    agreeableness: 'bellCurve3',
    conscientiousness: 'bellCurve4',
    openness: 'bellCurve6',
  };

  domainOrder.forEach((domainId) => {
    const graph = graphsData.find((g) => g.id === domainIdMap[domainId]);
    if (graph) domainMount.appendChild(buildChartCard(graph, `domain-${domainId}`));
  });

  if (facetMount) {
    domainOrder.forEach((domainId) => {
      const section = document.createElement('div');
      section.className = `facet-group facet-group--${domainId}`;
      const label = HEXACO_DOMAINS?.find((d) => d.id === domainId);
      if (label) {
        const head = document.createElement('h3');
        head.className = 'facet-group__title';
        head.textContent = label.name;
        section.appendChild(head);
      }

      const grid = document.createElement('div');
      grid.className = 'chart-grid';
      graphsData
        .filter((g) => g.domain === domainId)
        .forEach((g) => grid.appendChild(buildChartCard(g)));
      section.appendChild(grid);
      facetMount.appendChild(section);
    });
  }

  if (interstitialMount) {
    const altruism = graphsData.find((g) => g.group === 'interstitial');
    if (altruism) interstitialMount.appendChild(buildChartCard(altruism));
  }
}

function buildOceanMark(letter, before, after) {
  return `<p class="hex-mark hex-mark--${letter.toLowerCase()}" aria-hidden="true"><span class="hex-mark__lo">${before}</span><span class="hex-mark__hi">${letter}</span><span class="hex-mark__lo">${after}</span></p>`;
}

const HEX_MARKS = {
  honesty: { before: '', letter: 'H', after: 'EXACO' },
  emotionality: { before: 'h', letter: 'E', after: 'XACO' },
  extraversion: { before: 'he', letter: 'X', after: 'ACO' },
  agreeableness: { before: 'hex', letter: 'A', after: 'CO' },
  conscientiousness: { before: 'hexa', letter: 'C', after: 'O' },
  openness: { before: 'hexac', letter: 'O', after: '' },
};

window.buildOceanMark = buildOceanMark;
window.HEX_MARKS = HEX_MARKS;
