export default function toggleDesktopBurger() {
  const container = document.querySelector('.js-toggle-desktop-burger');
  if (container) {
    const btn = container.querySelector('.header__burger');
    const content = container.querySelector('.header__burger-menu');

    btn.addEventListener('click', () => {
      content.classList.toggle('active');
    })
  }
}