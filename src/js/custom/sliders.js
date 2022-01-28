import {Swiper, Navigation, EffectFade, 
  Autoplay} from "swiper";

Swiper.use([Navigation, EffectFade, 
  Autoplay]);

export default function initSliders() {
  const sliders = Array.from(document.querySelectorAll('.js-init-slider'));
  sliders.forEach((slider) => {
    const fadeEffect = slider.dataset.fade ? {effect: 'fade', fadeEffect: {crossFade: true}} : {};
    const autoplay = slider.dataset.delay ? {delay: Number(slider.dataset.delay), disableOnInteraction: true} : {};
    const slidesPerView = slider.dataset.slides ? Number(slider.dataset.slides) : 1;
    const spaceBetween = slider.dataset.space ? Number(slider.dataset.space) : 0;
    const loop = !!slider.dataset.loop;

    let navigation = slider.querySelector('.js-slider-navigation');
    if (navigation) {
      navigation = {
        nextEl: navigation.querySelector('.js-next-slide'),
        prevEl: navigation.querySelector('.js-prev-slide'),
      }
    }

    const swiper = new Swiper(slider, {
      slidesPerView,
      spaceBetween,
      navigation,
      autoplay,
      loop,
      ...fadeEffect
    })
  })
}