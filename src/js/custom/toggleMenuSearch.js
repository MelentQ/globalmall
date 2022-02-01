export default function toggleMenuSearch() {
  const container = document.querySelector('.js-search-wrapper');
  const searchContainer = container.querySelector('.search-block');
  const serachMenuBtn = container.querySelector('.js-toggle-search');
  if (searchContainer && serachMenuBtn) {
    serachMenuBtn.addEventListener('click', () => {
      container.classList.toggle('active');
    })

    window.addEventListener('click', e => {
      const target = e.target
      if (!target.closest('.js-toggle-search') && !target.closest('.js-search-wrapper')) {
        container.classList.remove('active');
      }
    })
  }
}