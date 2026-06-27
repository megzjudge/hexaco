# HEXACO Personality Inventory — Results Site

A single-page site that visualises a full set of **HEXACO Personality Inventory** results — six domains, 24 facets, and the interstitial Altruism scale — as animated population bell curves, alongside the official scale descriptions and some personal commentary.

---

## About

The [HEXACO model](https://hexaco.org/) extends the Big Five by adding an **Honesty-Humility** factor, reframing Neuroticism as **Emotionality**, and splitting Agreeableness into cooperation-versus-anger. Each of the six factors has four facet-level scales (24 in total), plus a 25th interstitial facet, **Altruism (versus Antagonism)**.

This site takes one person's scores and renders each domain and facet against a population normal distribution, so you can see where a raw score sits relative to the <10th / 10–50th / 50–90th / >90th percentile bands. It pairs the numbers with the University of Calgary scale descriptions, referenced studies, and written reflections.

## Features

- **Animated bell curves** — each score is plotted against a normal distribution (Plotly.js), with the curve growing outward from the mean and a dotted line marking the raw score. Charts render lazily as they scroll into view.
- **Domain + facet breakdown** — an at-a-glance score overview, then a dedicated section per factor with its overall curve, four facet curves, and the official descriptions.
- **Scale library** — collapsible descriptions for every domain and facet.
- **Referenced studies** — linked papers with screenshot figures.
- **Image lightbox** — click any study figure or the results sheet to view it full-screen.
- **Audio reflection** and per-trait written notes.
- **Responsive**, fully static, no build step, and accessible-minded (keyboard-dismissable lightbox, reduced reliance on hover).

## Tech stack

- Plain **HTML / CSS / JavaScript** — no framework, no bundler.
- **[Plotly.js](https://plotly.com/javascript/)** (via CDN) for the bell curves.

## Project structure

```
index.html          Markup, meta tags, script/style includes
styles.css          All styling (theme tokens, layout, components)
script.js           Plotly bell-curve rendering, animation, lazy render queue
layout.js           Builds the DOM: score overview, scale library, trait zones,
                    language grid, and the HEX_TRAITS config (audio/studies/notes)
data.js             graphsData — the scores driving every bell curve
scale-content.js    HEXACO_DOMAINS / facet descriptions / supported languages
lightbox.js         Click-to-zoom image lightbox
images/             Icons, result sheets, study figures
audio/              Audio reflection
```

## Customising

- **Scores** live in `data.js` — each entry sets a `value` for a domain or facet bell curve.
- **Scale text** (domain and facet descriptions, language list) lives in `scale-content.js`.
- **Per-trait extras** — audio clips, referenced studies (with images), and personal notes are configured in the `HEX_TRAITS` array at the top of `layout.js`. Add an `audio`, `study`, or `note` field to any trait to render that block.
- **Bell-curve behaviour** (population mean, standard deviation, resolution, animation) is set in `script.js`.

## Credits & attribution

- The **HEXACO Personality Inventory** was developed by **Kibeom Lee** and **Michael C. Ashton**. Scale descriptions are reproduced from the official materials at [hexaco.org](https://hexaco.org/) (University of Calgary).
- Bell curves rendered with **Plotly.js**.

## License

This is a personal project. The HEXACO scale text and any referenced study material remain the property of their respective authors and are included here for personal, non-commercial reference.
