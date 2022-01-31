import './build-in/lazyload';
import detectTouch from './build-in/detectTouch';
import setScrollbarWidth from './build-in/setScrollbarWidth';
import anchorLinks from './build-in/anchorLinks';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import editableTextContainer from './custom/editableTextContainer';
import initSliders from './custom/sliders';
import initTabs from './custom/tabs';
import toggleHeader from './custom/toggleHeader';
import toggleMenuSearch from './custom/toggleMenuSearch';
import toggleDesktopBurger from './custom/toggleDesktopBurger';
import initModals from './custom/initModals';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    detectTouch();
    setScrollbarWidth();
    anchorLinks();

    // custom

    initModals();
    editableTextContainer();
    initSliders();
    initTabs();
    toggleHeader();
    toggleMenuSearch();
    toggleDesktopBurger();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
