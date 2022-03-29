export default function initSafinTabs() {
  const tabsContainers = Array.from(document.querySelectorAll('.js-init-safin-tabs'));
  tabsContainers.forEach((tabsElem) => {
    const tabsContainer = tabsElem.querySelector('.js-tabs');
    const tabs = Array.from(tabsContainer.querySelectorAll('.js-tab'));
    const bodies = Array.from(tabsElem.querySelectorAll('.js-body'));

    // Логика хешей
    const hash = window.location.hash.split('#')[1];
    bodies.forEach((body, i) => {
      if (body.dataset.hash == hash) {
        toggle(tabs, i);
        toggle(bodies, i);
      }
    })

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        toggle(tabs, i);
        toggle(bodies, i);
      })
    })

  })

  function toggle(elements, index) {
    elements.forEach((el, j) => {
      if (j == index) {
        el.classList.add('active');
        if (el.dataset.hash) {
          window.location.hash = el.dataset.hash;
        }
      } else {
        el.classList.remove('active');
      }
    })
  }
}