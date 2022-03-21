export default function cookie() {
  if (localStorage.getItem('cookieMessageShown')) {
    return;
  }
  
  const cookieElement = document.querySelector('.js-cookie');
  if (cookieElement) {
    const btn = cookieElement.querySelector('.cookie__close');
    btn.addEventListener('click', () => {
      cookieElement.classList.remove('visible');
      localStorage.setItem('cookieMessageShown', 'true');
    })
    const timer = setTimeout(() => {
      cookieElement.classList.add('visible');
    }, 5000)
  }
}