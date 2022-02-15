import {Swiper, EffectFade, HashNavigation} from "swiper";

Swiper.use([EffectFade, HashNavigation]);

export default function initTabs() {
  const tabsContainers = Array.from(document.querySelectorAll('.js-init-tabs'));
  tabsContainers.forEach((tabsElem) => {
    const tabsContainer = tabsElem.querySelector('.js-tabs');
    const tabs = Array.from(tabsContainer.querySelectorAll('.js-tab'));
    const bodiesContainers = Array.from(tabsElem.querySelectorAll('.js-bodies'));

    let swipers = [];
    
    bodiesContainers.forEach(container => {
      const swiper = new Swiper(container, {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        allowTouchMove: false,
        autoHeight: true,
        hashNavigation: !!container.dataset.hash,
        on: {
          init: function (swiper) {
            toggleTab(tabs, swiper.activeIndex);
          },
        }
      })
      swipers.push(swiper);
    })

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        swipers.forEach(swiper => {
            swiper.slideTo(i);
        })
        toggleTab(tabs, i);
      })
    })

  })

  function toggleTab(tabs, index) {
    tabs.forEach((t, j) => {
      if (j == index) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    })
  }
}