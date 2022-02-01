export default function hideSortButtons() {
  const container = document.querySelector('.js-hide-sort-buttons');
  if (container) {
    const btnsContainer = container.querySelector('.js-hidden-container');
    const hideBtn = container.querySelector('.js-hide-btn');

    let isOpened = true;

    hideBtn.addEventListener('click', () => {
      isOpened = !isOpened;

      if (isOpened) {
        btnsContainer.classList.remove('hidden');
        hideBtn.textContent = "Скрыть";
      } else {
        btnsContainer.classList.add('hidden');
        hideBtn.textContent = "Показать ещё";
      }
    })
  }
}