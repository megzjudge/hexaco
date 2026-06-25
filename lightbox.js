// Lightweight, dependency-free image lightbox.
// Opens any image inside a `.trait-study__shot` or `.results-figure__frame`
// in a full-screen overlay. Close via the × button, the backdrop, or Esc.
(function () {
  let overlay, imgEl, captionEl, linkEl, lastFocus;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <div class="lightbox__backdrop" data-close></div>
      <button class="lightbox__close" type="button" aria-label="Close" data-close>&times;</button>
      <figure class="lightbox__content">
        <img class="lightbox__img" alt="">
        <figcaption class="lightbox__caption"></figcaption>
        <a class="lightbox__open" target="_blank" rel="noopener">Open original &#8599;</a>
      </figure>
    `;
    document.body.appendChild(overlay);

    imgEl = overlay.querySelector('.lightbox__img');
    captionEl = overlay.querySelector('.lightbox__caption');
    linkEl = overlay.querySelector('.lightbox__open');

    overlay.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) close();
    });
  }

  function open(src, alt, caption) {
    if (!overlay) build();
    lastFocus = document.activeElement;

    imgEl.src = src;
    imgEl.alt = alt || '';

    const text = (caption || alt || '').trim();
    captionEl.textContent = text;
    captionEl.style.display = text ? '' : 'none';

    linkEl.href = src;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    overlay.querySelector('.lightbox__close').focus();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    imgEl.src = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  // Open on click of any zoomable image container (event delegation,
  // so dynamically-built study shots work without extra wiring).
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.trait-study__shot, .results-figure__frame');
    if (!trigger) return;
    const img = trigger.querySelector('img');
    if (!img) return;
    e.preventDefault();
    const caption = trigger.getAttribute('data-caption') || img.getAttribute('alt') || '';
    open(img.currentSrc || img.src, img.getAttribute('alt'), caption);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
