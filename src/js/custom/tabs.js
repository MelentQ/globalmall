import {Swiper, EffectFade} from "swiper";

Swiper.use([EffectFade]);

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
        autoHeight: true
      })
      swipers.push(swiper);
    })

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        swipers.forEach(swiper => {
            swiper.slideTo(i);
        })
        tabs.forEach((t, j) => {
          if (j == i) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        })
      })
    })

  })
}