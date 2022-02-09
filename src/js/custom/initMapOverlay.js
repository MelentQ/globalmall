/**
 * Включает оверлей на карту на мобилках
 * Чтоб можно было нормально пользоваться
 */
export default function initMapOverlay(overlaySelector, mapContainerClass) {
  const overlayElement = document.querySelector(overlaySelector);
  if (!overlayElement) return;

  function hide() {
    overlayElement.classList.add('hidden');
  }
  function show() {
    overlayElement.classList.remove('hidden');
  }

  window.addEventListener('scroll', () => {
    show();
  })

  window.addEventListener('click', (e) => {
    if (!e) e = window.event;

    const clickOnMap = findparentClass(e.target.parentNode, mapContainerClass);
    
    clickOnMap ? hide() : show();
  })

  function findparentClass(node, clsName) {
    if (!node) return false;
    if(node.classList && node.classList.contains(clsName)){
      return true;
    }else {
      return findparentClass(node.parentNode, clsName);
    }
  }
}