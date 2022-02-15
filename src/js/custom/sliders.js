import {Swiper, Navigation, EffectFade, Autoplay, Pagination, HashNavigation} from "swiper";

Swiper.use([Navigation, EffectFade, Autoplay, Pagination, HashNavigation]);

export default function initSliders() {
  const sliders = Array.from(document.querySelectorAll('.js-init-slider'));

  let controlledSwiper;
  let controlledSwiperId;

  let controlledSwipers = [];
  let controlSwipers = [];

  sliders.forEach((slider, i) => {
    const fadeEffect = slider.dataset.fade ? {effect: 'fade', fadeEffect: {crossFade: true}} : {};
    const autoplay = slider.dataset.delay ? {autoplay:{delay: Number(slider.dataset.delay), disableOnInteraction: true}} : {};
    const slidesPerView = slider.dataset.slides ? Number(slider.dataset.slides) : 1;
    const spaceBetween = slider.dataset.space ? Number(slider.dataset.space) : 0;
    const loop = !!slider.dataset.loop;
    const hashNavigation = !!slider.dataset.hash;
    const allowTouchMove = !slider.dataset.noTouch;

    let navigation = slider.querySelector('.js-slider-navigation');
    if (navigation) {
      navigation = {navigation: {
        nextEl: navigation.querySelector('.js-next-slide'),
        prevEl: navigation.querySelector('.js-prev-slide'),
      }}
    }

    let breakpoints = {
      320: {
        slidesPerView: 1,
        spaceBetween: 14
      },
      576: {
        slidesPerView: slidesPerView < 2 ? slidesPerView : 2
      },
      1024: {
        slidesPerView,
        spaceBetween
      }
    }

    const swiper = new Swiper(slider, {
      slidesPerView,
      spaceBetween,
      ...navigation,
      hashNavigation,
      allowTouchMove,
      autoHeight: true,
      disableOnInteraction: true,
      ...autoplay,
      loop,
      ...fadeEffect,
      pagination: {
        el: slider.querySelector('.swiper-pagination'),
        type: 'bullets',
        clickable: true,
        bulletElement: 'button'
      },
      breakpoints
    })

    if (i == controlledSwiperId + 1) {
      controlSwipers.push(swiper);
      controlledSwiperId = null;
    }

    if (slider.dataset.controlled) {
      controlledSwipers.push(swiper);
      controlledSwiperId = i;
    }
  })

  controlSwipers.forEach((controlSwiper, i) => {
    controlSwiper.slides.forEach((slide, j) => {
      slide.addEventListener('click', () => {
        controlledSwipers[i].slideToLoop(j, 0);
      })
    })
  })
}