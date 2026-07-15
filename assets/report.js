(() => {
  const links = [...document.querySelectorAll('.local-toc a')];
  const sections = [...document.querySelectorAll('.report-section[id]')];
  if ('IntersectionObserver' in window && links.length && sections.length) {
    const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(a => a.classList.remove('current'));
      byId.get(visible.target.id)?.classList.add('current');
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, .2, .6] });
    sections.forEach(section => observer.observe(section));
  }
  const top = document.querySelector('[data-top]');
  if (top) {
    addEventListener('scroll', () => top.classList.toggle('show', scrollY > 700), { passive: true });
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  }
})();
