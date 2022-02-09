export default function toggleDesktopBurger() {
  const container = document.querySelector('.js-toggle-desktop-burger');
  if (container) {
      const btn = container.querySelector('.header__burger');
      const content = container.querySelector('.header__burger-menu');

      if (document.documentElement.clientWidth > 1024) {
        btn.addEventListener('click', () => {
          content.classList.toggle('active');
        })

        window.addEventListener('click', e => {
          const target = e.target
          if (!target.closest('.header__burger-menu') && !target.closest('.header__burger')) {
            content.classList.remove('active');
          }
        })

      } else {
        btn.addEventListener('click', () => {
          window.modalApi.open('#menu-modal');
        })
      }
    }
}