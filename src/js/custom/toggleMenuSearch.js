export default function toggleMenuSearch() {
  const container = document.querySelector('.js-search-wrapper');
  const searchContainer = container.querySelector('.search-block');
  const serachMenuBtn = container.querySelector('.js-toggle-search');
  if (searchContainer && serachMenuBtn) {
    serachMenuBtn.addEventListener('click', () => {
      container.classList.toggle('active');
    })
  }
}