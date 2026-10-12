/* hmsgrdns26 review gallery + zoom (used by FUN/templates/hmsgrdns26_review_template.py). Safe to load in <head>. */
(() => {
  function hmsgrdns26_init() {
  document.querySelectorAll('.hmsgrdns26product-review').forEach((review) => {
    const gallery = review.querySelector('.hmsgrdns26gallery');
    if (!gallery || gallery.dataset.initialized) return;
    gallery.dataset.initialized = 'true';
    const slides = Array.from(gallery.querySelectorAll('.hmsgrdns26gallery-image'));
    const count = gallery.querySelector('.hmsgrdns26gallery-count');
    const previous = gallery.querySelector('.hmsgrdns26gallery-prev');
    const next = gallery.querySelector('.hmsgrdns26gallery-next');
    const dialog = review.querySelector('.hmsgrdns26zoom-dialog');
    const enlarged = dialog.querySelector('.hmsgrdns26zoom-image');
    let index = 0;
    const show = (position) => {
      index = (position + slides.length) % slides.length;
      slides.forEach((slide, number) => { slide.hidden = number !== index; });
      count.textContent = `Image ${index + 1} of ${slides.length}`;
      previous.hidden = index === 0;
      next.hidden = slides.length < 2;
    };
    previous.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    let touchStart;
    gallery.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
    gallery.addEventListener('touchend', (event) => {
      if (touchStart === undefined) return;
      const distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1));
      touchStart = undefined;
    }, { passive: true });
    gallery.querySelector('.hmsgrdns26gallery-zoom').addEventListener('click', () => {
      enlarged.src = slides[index].currentSrc || slides[index].src;
      enlarged.alt = slides[index].alt;
      dialog.showModal();
      dialog.scrollTop = 0;
      dialog.scrollLeft = 0;
    });
    dialog.querySelector('.hmsgrdns26zoom-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    show(0);
  });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hmsgrdns26_init); else hmsgrdns26_init();
})();
