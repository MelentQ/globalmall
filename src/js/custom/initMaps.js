import loadApi from "./loadAPI";
import initMapOverlay from "./initMapOverlay";

export default function initMaps() {
  const url = 'https://api-maps.yandex.ru/2.1/?apikey=99155e03-fba1-47e8-8e51-62786c760fbc&lang=ru_RU';

  const maps = Array.from(document.querySelectorAll('.js-init-map'));
  if (maps) {
    loadApi('yandex', url,() => { ymaps.ready(init); });
  }

  initMapOverlay('.js-init-overlay', 'js-init-overlay-map-container');

  function init() {
    maps.forEach(mapElement => {
      const map = new ymaps.Map(mapElement, {
        center: [mapElement.dataset.initialLongitude, mapElement.dataset.initialLatitude],
        zoom: mapElement.dataset.initialZoom,
        controls: ['zoomControl']
      });
      
      addPlace(map, {
        coords: [mapElement.dataset.initialLongitude, mapElement.dataset.initialLatitude],
        image: "../img/icons/location.svg"
      })
    })
  }
}

function addPlace(map, {coords, image}) {
  const placemarkProperties = {};

  const placemarkOptions = {
      iconLayout: 'default#image',
      iconImageHref: image,
      iconImageSize: [36, 36],
      iconImageOffset: [-18, -18]
  };

  const placemark = new ymaps.Placemark(coords, placemarkProperties, placemarkOptions);

  map.geoObjects.add(placemark);
}