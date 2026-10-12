/* Scoped tabs: independent instances; keyboard arrows, Home and End supported. */
(() => {
  function yrs27_init() {
    document.querySelectorAll('.yrs27_tabs').forEach((yrs27_group) => {
      if (yrs27_group.dataset.yrs27Ready) return;
      yrs27_group.dataset.yrs27Ready = 'true';
      const yrs27_buttons = [...yrs27_group.querySelectorAll('.yrs27_tab')];
      function yrs27_select(yrs27_button) {
        yrs27_buttons.forEach((yrs27_item) => {
          const yrs27_active = yrs27_item === yrs27_button;
          yrs27_item.setAttribute('aria-selected', String(yrs27_active));
          yrs27_item.tabIndex = yrs27_active ? 0 : -1;
          const yrs27_panel = yrs27_group.querySelector('#' + yrs27_item.getAttribute('aria-controls'));
          if (yrs27_panel) yrs27_panel.hidden = !yrs27_active;
        });
      }
      yrs27_buttons.forEach((yrs27_button, yrs27_index) => {
        yrs27_button.addEventListener('click', () => yrs27_select(yrs27_button));
        yrs27_button.addEventListener('keydown', (yrs27_event) => {
          let yrs27_next;
          if (yrs27_event.key === 'ArrowRight') yrs27_next = (yrs27_index + 1) % yrs27_buttons.length;
          if (yrs27_event.key === 'ArrowLeft') yrs27_next = (yrs27_index - 1 + yrs27_buttons.length) % yrs27_buttons.length;
          if (yrs27_event.key === 'Home') yrs27_next = 0;
          if (yrs27_event.key === 'End') yrs27_next = yrs27_buttons.length - 1;
          if (yrs27_next === undefined) return;
          yrs27_event.preventDefault();
          yrs27_select(yrs27_buttons[yrs27_next]);
          yrs27_buttons[yrs27_next].focus();
        });
      });
      yrs27_select(yrs27_buttons.find((yrs27_button) => yrs27_button.getAttribute('aria-selected') === 'true') || yrs27_buttons[0]);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', yrs27_init);
  else yrs27_init();
})();
