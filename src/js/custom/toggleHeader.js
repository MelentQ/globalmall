export default function toggleHeader() {
  const header = document.querySelector('.header');
  if(header) {
    if (document.documentElement.clientWidth > 1024) {
      const secondaryBlock = header.querySelector('.header__secondary-block');
      document.documentElement.style.setProperty('--js-secondary-header-height', secondaryBlock.clientHeight / 10 + 'rem');

      const mainBlock = header.querySelector('.header__main-block');
      document.documentElement.style.setProperty('--js-main-header-height', mainBlock.clientHeight / 10 + 'rem');

      const toggleY = header.dataset.toggle || 300;
      let opened = false;

      window.addEventListener('scroll', () => {
        if(!opened && window.scrollY >= toggleY) {
          opened = true;
          header.classList.add('opened');
        } else if(window.scrollY < toggleY) {
          opened = false;
          header.classList.remove('opened');
        }
      }, false)
    } else {
      document.documentElement.style.setProperty('--js-secondary-header-height', '0');
    }
    
  }
}