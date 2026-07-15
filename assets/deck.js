(() => {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  let current = Math.max(0, Number(location.hash.replace('#s','')) - 1 || 0);
  const counter = document.querySelector('[data-counter]');
  const render = () => {
    current = Math.max(0, Math.min(slides.length - 1, current));
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
    history.replaceState(null, '', `#s${current + 1}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.querySelector('[data-prev]')?.addEventListener('click', () => { current--; render(); });
  document.querySelector('[data-next]')?.addEventListener('click', () => { current++; render(); });
  document.addEventListener('keydown', (e) => {
    if (['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); current++; render(); }
    if (['ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); current--; render(); }
    if (e.key === 'Home') { e.preventDefault(); current = 0; render(); }
    if (e.key === 'End') { e.preventDefault(); current = slides.length - 1; render(); }
  });
  render();
})();
