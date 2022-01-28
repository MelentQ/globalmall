export default function initTabs() {
  const tabsContainers = Array.from(document.querySelectorAll('.js-init-tabs'));
  tabsContainers.forEach((tabsElem) => {
    const tabsContainer = document.querySelector('.js-tabs');
    const tabs = Array.from(tabsContainer.querySelectorAll('.js-tab'));
    const bodiesContainers = Array.from(document.querySelectorAll('.js-bodies'));
    const arBodies = [];
    bodiesContainers.forEach((bodiesElement) => {
      arBodies.push(Array.from(bodiesElement.querySelectorAll('.js-body')))
    })

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        setActive(tabs, i);
        arBodies.forEach(bodies => {
          setActive(bodies, i);
        })
      })
    })

    function setActive(elements, index) {
      elements.forEach((element, i) => {
        if (i == index) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      })
    }
  })
}