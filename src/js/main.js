import './build-in/lazyload';
import detectTouch from './build-in/detectTouch';
import setScrollbarWidth from './build-in/setScrollbarWidth';
import anchorLinks from './build-in/anchorLinks';
import customSelects from './build-in/customSelects';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import editableTextContainer from './custom/editableTextContainer';
import initSliders from './custom/sliders';
import initTabs from './custom/tabs';
import toggleHeader from './custom/toggleHeader';
import toggleMenuSearch from './custom/toggleMenuSearch';
import toggleDesktopBurger from './custom/toggleDesktopBurger';
import initModals from './custom/initModals';
import hideSortButtons from './custom/hideSortButtons';
import initValidation from './custom/initValidation';
import initMaps from './custom/initMaps';
import initPhoneMask from './custom/initPhoneMask';
import imageToTitle from './custom/imageToTitle';
import fileUpload from './build-in/fileUpload';
import cookie from './custom/cookie';
import { fixSchemeTabs, fixSelects } from './custom/fix';
import initSafinTabs from './custom/tabsSafin';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {
    detectTouch();
    setScrollbarWidth();
    anchorLinks();
    customSelects();
    fileUpload();

    // custom

    initSliders();
    imageToTitle();
    initModals();
    editableTextContainer();
    initTabs();
    toggleHeader();
    toggleMenuSearch();
    toggleDesktopBurger();
    hideSortButtons();
    initValidation();
    initMaps();
    initPhoneMask();
    cookie();
    fixSchemeTabs();
    initSafinTabs();
    fixSelects();
});

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
