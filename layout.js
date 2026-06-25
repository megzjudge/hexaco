const HEX_TRAITS = [
  {
    id: 'honesty',
    label: 'Honesty-Humility',
    short: 'H',
    audio: 'audio/Record_03.03.2023__043029.mp3',
    study: [
      {
        url: 'https://sci-hub.red/10.1080/00221309.2016.1214099',
        title:
          'Exploring the Relationship between Psychopathy and Helping Behaviors in Naturalistic Settings: Preliminary Findings',
        images: [
          'images/Exploring_the_Relationship_between_Psychopathy_and_Helping_Behaviors_in_Naturalistic_Settings_Preliminary_Findings.png',
          'images/Exploring_the_Relationship_between_Psychopathy_and_Helping_Behaviors_in_Naturalistic_Settings_Preliminary_Findings_2.png',
        ],
      },
      {
        url: 'https://journals.sagepub.com/doi/pdf/10.1177/27000710251408730',
        title:
          'Honesty-Humility is to Politeness as Agreeableness is to Agreeableness: A Reanalysis of Blötner (2025)',
        images: [
          'images/Honesty-Humility_is_to_Politeness_as_Agreeableness_is_to_Agreeableness_A_Reanalysis_of_Blotner.png',
        ],
      },
      {
        url: 'https://armlab.org/pdfs/papers/2021%20-%20Kay%20-%20Negative%20traits,%20positive%20assortment%20Revisiting%20the%20Dark%20Triad%20and%20a%20preference%20for%20similar%20others.pdf,
        title:
          'Negative traits, positive assortment: Revisiting the Dark Triad and a preference for similar others',
        images: [
          'images/Negative_traits_positive_assortment_Revisiting_the_Dark_Triad_and_a_preference_for_similar_others.png',
          'images/Negative_traits_positive_assortment_Revisiting_the_Dark_Triad_and_a_preference_for_similar_others_2.png',
        ],
      },
    ],
    note: `
      <p>Whilst I probably agree that Honesty-Humility is just, as studies suggest, data already picked up by Politeness in the Big Five (10) model - the fact that I diverge on one out of four of the Honesty-Humility subtraits implies to me that possibly it is a unique form of information.</p>
      <p>I obviously knew I would score low on Honesty-Humility, but I did not predict that there would be a wing of it that I would score high on - I knew this fact about myself but didn't realise it was a core facet of the Dark Triad but its obvious of course when reading what it is.</p>
      <p>This gave me a visual representation possibly as to what my brain is deciding to obviscate from, in difference to other low in Politeness (people who prioritise themselves over the Other) humans - the people I feel closest too (dark triad being highly assortitative). This gave me a good mental image which helped me map together what was causing me to not be 100% absorbed into those social circles I felt most calm in - I do not obviously feel safe and warm around high emotionality/high conscientious people.</p>
      <p>I find other disagreeable people complimentary to my base mental state - and feel agreeable people are going to burn me at the stake for saying a disagreeable thing at any moment because of their lack of emotional regulation which puts me on edge constantly. Ie, their adherance to a magical-fantasy status quo that is often illogical and disconnected to physical reality kills me. I do not blame them, its just, uncomplimentary and makes me hate people so I try and avoid the interaction because it creates a distrust of humanity which is uncomplimentary to me wanting to invent logical things FOR humanity. I lose my prosocial inventive "oomph" the more I hang around with people uncomplimentary to me - who require me to mask my disagreeableness - as a female obviously this is more of my daily norm as women tend to be higher in emotionality and agreeableness.</p>
    `,
  },
  { id: 'emotionality', label: 'Emotionality', short: 'E' },
  { id: 'extraversion', label: 'eXtraversion', short: 'X' },
  { id: 'agreeableness', label: 'Agreeableness', short: 'A' },
  { id: 'conscientiousness', label: 'Conscientiousness', short: 'C' },
  { id: 'openness', label: 'Openness', short: 'O' },
];

const DOMAIN_CHART_IDS = {
  honesty: 'bellCurve1',
  emotionality: 'bellCurve2',
  extraversion: 'bellCurve5',
  agreeableness: 'bellCurve3',
  conscientiousness: 'bellCurve4',
  openness: 'bellCurve6',
};

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundGlows();
  buildLanguageGrid();
  buildScaleLibrary();
  buildTraitResultZones();
  buildScoreOverview();
  initReveal();
});

function buildScoreOverview() {
  const mount = document.getElementById('score-overview');
  if (!mount || typeof graphsData === 'undefined') return;

  HEX_TRAITS.forEach((trait) => {
    const graph = graphsData.find((g) => g.id === DOMAIN_CHART_IDS[trait.id]);
    if (!graph) return;

    const card = document.createElement('a');
    card.href = `#${trait.id}`;
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
  const els = document.querySelectorAll('.reveal, .card, .flow-zone, .about-panel, .scale-fold, .chart-card, .trait-panel, .trait-zone');
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

function buildChartCard(graph, captionText) {
  const card = document.createElement('article');
  card.className = 'chart-card card reveal';
  if (graph.group === 'domain') card.classList.add('chart-card--domain');

  const caption = captionText
    ? `<p class="chart-card__caption">${captionText}</p>`
    : '';

  card.innerHTML = `
    <div class="bellCurve" id="${graph.id}" data-title="${graph.title}" data-value="${graph.value}"></div>
    ${caption}
  `;
  return card;
}

function buildHexMark(traitId) {
  const mark = HEX_MARKS[traitId];
  if (!mark) return '';
  return `<p class="hex-mark hex-mark--${traitId}" aria-hidden="true"><span class="hex-mark__lo">${mark.before}</span><span class="hex-mark__hi">${mark.letter}</span><span class="hex-mark__lo">${mark.after}</span></p>`;
}

function buildNoteBlock(noteHtml) {
  const block = document.createElement('div');
  block.className = 'trait-panel__note card';
  block.innerHTML = `
    <p class="trait-note__label">Note</p>
    <div class="trait-note__body">${noteHtml}</div>
  `;
  return block;
}

function buildStudyBlock(studies) {
  const list = Array.isArray(studies) ? studies : [studies];

  const block = document.createElement('div');
  block.className = 'trait-panel__study card';

  const entriesHtml = list
    .map((study) => {
      const imagesHtml = (study.images || [])
        .map(
          (src, i) => `
          <a class="trait-study__shot" href="${src}" target="_blank" rel="noopener">
            <img src="${src}" alt="${study.title} — figure ${i + 1}" loading="lazy">
          </a>`
        )
        .join('');

      return `
        <div class="trait-study__entry">
          <p class="trait-study__title">
            <a href="${study.url}" target="_blank" rel="noopener">${study.title} ↗</a>
          </p>
          ${imagesHtml ? `<div class="trait-study__shots">${imagesHtml}</div>` : ''}
        </div>`;
    })
    .join('');

  block.innerHTML = `
    <p class="trait-study__label">${list.length > 1 ? 'Referenced studies' : 'Referenced study'}</p>
    ${entriesHtml}
  `;
  return block;
}

function buildTraitResultZones() {
  if (typeof graphsData === 'undefined' || typeof HEXACO_DOMAINS === 'undefined') return;

  const mount = document.getElementById('trait-results');
  if (!mount) return;

  HEX_TRAITS.forEach((trait) => {
    const domain = HEXACO_DOMAINS.find((d) => d.id === trait.id);
    const domainGraph = graphsData.find((g) => g.id === DOMAIN_CHART_IDS[trait.id]);
    if (!domain || !domainGraph) return;

    const zone = document.createElement('section');
    zone.className = `flow-zone flow-zone--trait trait-zone trait-zone--${trait.id}`;
    zone.id = trait.id;

    const container = document.createElement('div');
    container.className = 'container';

    const intro = document.createElement('header');
    intro.className = 'trait-zone__intro reveal';
    intro.innerHTML = buildHexMark(trait.id);

    const panel = document.createElement('article');
    panel.className = `trait-panel trait-panel--${trait.id} reveal`;

    const head = document.createElement('header');
    head.className = 'trait-panel__head';
    head.innerHTML = `
      <span class="trait-panel__letter" aria-hidden="true">${trait.short}</span>
      <div class="trait-panel__titles">
        <h2 class="trait-panel__title">${domain.name}</h2>
      </div>
      <span class="trait-panel__score">${domainGraph.value}</span>
    `;

    const description = document.createElement('div');
    description.className = 'trait-panel__description card';
    description.innerHTML = `<p>${domain.description}</p>`;

    // 1. title  →  2. overall bell curve  →  3. overall explanation
    const overviewCharts = document.createElement('div');
    overviewCharts.className = 'trait-panel__charts trait-panel__charts--overview';
    overviewCharts.appendChild(buildChartCard(domainGraph));

    panel.append(head, overviewCharts, description);

    // 4. audio
    if (trait.audio) {
      const audioBlock = document.createElement('div');
      audioBlock.className = 'trait-panel__audio card';
      audioBlock.innerHTML = `
        <p class="trait-audio__label">Listen — reflection on ${domain.name}</p>
        <audio controls preload="metadata" src="${trait.audio}">
          Your browser does not support audio playback.
        </audio>
        <ul class="trait-audio__links">
          <li>Source: <a href="https://amazon.com/Sorted-Good-Psychopaths-Guide-Bossing-ebook/dp/B00W0P9SI8/" target="_blank" rel="noopener">The Good Psychopath&rsquo;s Guide to Bossing Life ↗</a></li>
          <li>Also recommended: <a href="https://amazon.com/Wisdom-Psychopaths-Saints-Killers-Success/dp/0374533989/" target="_blank" rel="noopener">The Wisdom of Psychopaths ↗</a></li>
        </ul>
      `;
      panel.appendChild(audioBlock);
    }

    // 5. link to study + screenshots
    if (trait.study) {
      panel.appendChild(buildStudyBlock(trait.study));
    }

    // 6. subtrait bell curves + explanations
    const facetCharts = document.createElement('div');
    facetCharts.className = 'trait-panel__charts trait-panel__charts--facets';
    const facetGrid = document.createElement('div');
    facetGrid.className = 'trait-panel__facet-charts chart-grid';
    domain.facets.forEach((facet) => {
      const facetGraph = graphsData.find(
        (g) => g.group === 'facet' && g.domain === domain.id && g.title.endsWith(facet.name)
      );
      if (facetGraph) facetGrid.appendChild(buildChartCard(facetGraph, facet.text));
    });
    facetCharts.appendChild(facetGrid);
    panel.appendChild(facetCharts);

    // optional personal note, under the last facet
    if (trait.note) {
      panel.appendChild(buildNoteBlock(trait.note));
    }

    container.append(intro, panel);
    zone.appendChild(container);
    mount.appendChild(zone);
  });

  const altruismGraph = graphsData.find((g) => g.group === 'interstitial');
  if (altruismGraph && typeof HEXACO_ALTRUISM !== 'undefined') {
    const zone = document.createElement('section');
    zone.className = 'flow-zone flow-zone--trait trait-zone trait-zone--altruism';
    zone.id = 'altruism';

    const container = document.createElement('div');
    container.className = 'container';

    const panel = document.createElement('article');
    panel.className = 'trait-panel trait-panel--altruism reveal';
    panel.innerHTML = `
      <header class="trait-panel__head">
        <span class="trait-panel__letter" aria-hidden="true">+</span>
        <div class="trait-panel__titles">
          <h2 class="trait-panel__title">${HEXACO_ALTRUISM.name}</h2>
        </div>
        <span class="trait-panel__score">${altruismGraph.value}</span>
      </header>
    `;

    const charts = document.createElement('div');
    charts.className = 'trait-panel__charts trait-panel__charts--overview';
    charts.appendChild(buildChartCard(altruismGraph));

    const description = document.createElement('div');
    description.className = 'trait-panel__description card';
    description.innerHTML = `<p>${HEXACO_ALTRUISM.text}</p>`;

    panel.append(charts, description);

    container.appendChild(panel);
    zone.appendChild(container);
    mount.appendChild(zone);
  }
}

const HEX_MARKS = {
  honesty: { before: '', letter: 'H', after: 'EXACO' },
  emotionality: { before: 'h', letter: 'E', after: 'XACO' },
  extraversion: { before: 'he', letter: 'X', after: 'ACO' },
  agreeableness: { before: 'hex', letter: 'A', after: 'CO' },
  conscientiousness: { before: 'hexa', letter: 'C', after: 'O' },
  openness: { before: 'hexac', letter: 'O', after: '' },
};

window.buildHexMark = buildHexMark;
window.HEX_MARKS = HEX_MARKS;
