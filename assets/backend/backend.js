document.addEventListener('DOMContentLoaded', () => {
  // Поиск в хедере
  headerSearch();

  // 3 функции только потому что разная разметка у карточек
  searchFormSubmitHandler('.js-newslist-search-form-wrapper', createNewsListElement);
  searchFormSubmitHandler('.js-cards-search-form-wrapper', createCardsListElement);
  searchFormSubmitHandler('.js-search-form-wrapper', createSearchResultElement);

  // Универсальная "Показать ещё"
  showMore();
  
  // Отправка формы
  formSubmitHandler();
});

function headerSearch() {
  const searchForm = document.querySelector('.js-header-search-form');
  if (searchForm) {
    const searchInput = searchForm.querySelector('.js-header-search-input');

    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();

      console.log('БЕЗ БУЛДЫРАБЫЗ!');
      // Тут какая-то логика поиска,
      // переход на страницу с результатом поиска
    });

    searchInput.addEventListener('change', (e) => {
      // Нажатие на Enter
      console.log(`АЛГА! ${searchInput.value}`);
    })
  }
}

/**
 * Сабмит формы поиска на страницах списка элементов
 * Универсальная функция
 * @param {String} containerSelector
 * @param {Function} createElementFunction - Функция, возвращающая готовый элемент карточки. На вход всегда получает объект с данными.
 */
function searchFormSubmitHandler(containerSelector, createElementFunction) {
  const textInputDelay = 1200;

  const containers = Array.from(document.querySelectorAll(containerSelector));

  containers.forEach(container => {
    const forms = Array.from(container.querySelectorAll('.js-search-form'));

    const errorMessageElement = container.querySelector('.js-error-message');
    const elementsContainer = container.querySelector('.js-search-form-elements-container');
    const elementTemplate = elementsContainer.querySelector('.js-search-form-element');
    
    forms.forEach((form, i) => {
      const getSettings = {
        forms,
        i,
        errorMessageElement,
        elementsContainer,
        elementTemplate,
        createElementFunction
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        get(getSettings);
      })

      const resetBtn = form.querySelector('.js-reset');
      if(resetBtn) {
        resetBtn.addEventListener('click', () => {
          form.reset();
          get(getSettings);
        })
      }

      const radioButtons = Array.from(form.querySelectorAll('.js-radio'))
      const checkboxes = Array.from(form.querySelectorAll('.js-checkbox'))
      const formInputs = [...radioButtons, ...checkboxes];
      formInputs.forEach(input => {
        input.addEventListener('change', () => {
          get(getSettings);
        })
      })

      const textInputs = Array.from(form.querySelectorAll('.js-text-input'));
      textInputs.forEach(input => {
        let timer;
        input.addEventListener('input', e => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            get(getSettings);
          }, textInputDelay);
        })
      })
    })
  })

  /**
   * Основная логика получения новых данных по сабмиту форму
   */
  function get({forms, i, errorMessageElement, elementsContainer, createElementFunction}) {
    const form = forms[i];
    // Добавляем в скрытый инпут количество уже показанных элементов
    if (form.offset) {
      form.offset.value = elementsContainer.childElementCount;
    }

    // Синхронизируем формы
    syncForms(forms, i);

    const url = form.action;
    const formData = new FormData(form);

    // todo: удалить
    console.log(_debugFormData(formData));

    // Добавляем класс контейнеру во время загрузки
    elementsContainer.classList.add('loading');

    fetch(url, {
      body: formData,
      method: "POST"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Ответ сети был не ok.");
        }
          return response.json();
      })
      .then(data => {
        // Очищаем контейнер
        elementsContainer.innerHTML = "";

        if(!data.length){
          // Выводим сообщение "Элементы не найдены"
          errorMessageElement.classList.add('visible')
        } else {
          errorMessageElement.classList.remove('visible')
          // Выводим новые элементы
          data.forEach(itemData => {
            const element = createElementFunction(itemData);
            elementsContainer.append(element);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // Удаляем класс загрузки
        elementsContainer.classList.remove('loading');
      })
  }

  /**
   * Обновляет все устаревшие формы
   * @param {Array} forms - массив всех форм
   * @param {Number} i - индекс актуальной формы
   */
  function syncForms(forms, i) {
    forms.forEach((form, j) => {
      if (i != j) {
        const updatedInputs = Array.from(forms[i].querySelectorAll('input'));
        const outdatedInputs = Array.from(forms[j].querySelectorAll('input'));

        for(let k = 0; k < outdatedInputs.length; k++) {
          for(let x = 0; x < updatedInputs.length; x++) {
            if (updatedInputs[x].type != "hidden" && outdatedInputs[k].name == updatedInputs[x].name) {
              if (updatedInputs[x].type == "radio" && updatedInputs[x].checked) {
                outdatedInputs[k].value = updatedInputs[x].value;
              } else if (updatedInputs[x].type != "radio") {
                outdatedInputs[k].checked = updatedInputs[x].checked;
                outdatedInputs[k].value = updatedInputs[x].value;
              }
            }
          }
        }
      }
    })
  }
}

/**
 * Функция для формы поиска
 * Для страниц "Магазины, рестораны и кафе" (news-list.html)
 * Формат ответа сервера (data):
 * [
 *    {
 *       "link": "/cards/card-1",
 *       "image": "image.png",
 *       "name": "Триал-спорт",
 *       "floor": "1 ЭТАЖ",
 *       "time": "ПН-ПТ: 08:30–21:00, СБ-ВС: 09:45–21:00",
 *       "mapLink": "/contacts#map",
 *       "hashtags": [
 *          {
 *             "name": "СПОРТ",
 *             "link": "/catalog?sport=1"
 *          },
 *          {
 *             "name": "СПОРТИВНЫЕ ТОВАРЫ",
 *             "link": "/catalog?sport=1"
 *          }
 *       ],
 *    }
 * ]
 */
function createNewsListElement(itemData) {
  const element = _getTemplateBySelector('#newsListItemTemplate');

  const link = element.querySelector('.newslist__card');
  link.href = itemData.link;

  const image = element.querySelector('.newslist__card-image');
  image.src = itemData.image;
  image.alt = itemData.name;

  const name = element.querySelector('.newslist__card-name');
  name.textContent = itemData.name;

  const floor = element.querySelector('.newslist__card-floor');
  floor.textContent = itemData.floor;

  const time = element.querySelector('.newslist__card-time');
  time.textContent = itemData.time;

  const btn = element.querySelector('.newslist__card-btn');
  btn.href = itemData.mapLink;

  const hashtagsContainer = element.querySelector('.hashtags');
  if(itemData.hashtags && itemData.hashtags.length) {
    itemData.hashtags.forEach(hashtag => {
      const hashtagElement = _getTemplateBySelector('#hashtagItemTemplate');
      const hashtagLink = hashtagElement.querySelector('.hashtags__link');
      hashtagLink.href = hashtag.link;
      hashtagLink.textContent = hashtag.name;
  
      hashtagsContainer.append(hashtagElement);
    })
  }

  return element;
}

/**
 * Функция для формы поиска
 * Для страниц "Новости, акции" (cards.html)
 * Формат ответа сервера (data):
 * [
 *    {
 *       "link": "/cards/card-1",
 *       "image": "image.png",
 *       "name": "Триал-спорт",
 *       "text": "Какой-то текст",
 *       "hashtags": ["СПОРТ","СПОРТИВНЫЕ ТОВАРЫ"],
 *    }
 * ]
 */
 function createCardsListElement(itemData) {
  const element = _getTemplateBySelector('#cardsListItemTemplate');

  const link = element.querySelector('.card');
  link.href = itemData.link;

  if (itemData.hasOverlay) link.classList.add('card--overlay');
  if (itemData.isLight) link.classList.add('card--light');

  const image = element.querySelector('img');
  image.src = itemData.image;
  image.alt = itemData.name;

  const name = element.querySelector('.card__title');
  name.textContent = itemData.name;

  const description = element.querySelector('.card__description');
  description.textContent = itemData.text;

  const tagsContainer = element.querySelector('.card__tags');
  itemData.tags.forEach(tag => {
    const tagElement = document.createElement('li');
    tagElement.textContent = tag;

    tagsContainer.append(tagElement);
  })

  return element;
}

/**
 * Функция для страницы с поисковой выдачей
 * "Результаты поиска" (search.html)
 * Формат ответа сервера (data):
 * [
 *    {
 *       "link": "/cards/card-1",
 *       "name": "Adidas kids",
 *       "text": "Какой-то текст",
 *       "date": "3 Февраля 2022 – 31 Марта 2022"
 *    }
 * ]
 */
 function createSearchResultElement(itemData) {
  const element = _getTemplateBySelector('#searchItemTemplate');

  const link = element.querySelector('.search-result__item');
  link.href = itemData.link;

  const name = element.querySelector('.search-result__title');
  name.textContent = itemData.name;

  const text = element.querySelector('.search-result__description');
  text.innerHTML = itemData.text;

  const date = element.querySelector('.search-result__date');
  date.innerHTML = itemData.date;

  return element;
}

/**
 * Кнопка "Показать ещё"
 * Универсальная функция
 * URL для запроса вставлять в href кнопки
 */
function showMore() {
  const ajaxContainers = Array.from(document.querySelectorAll('.js-ajax-show-more-container'));
  ajaxContainers.forEach((container, i) => {
    const elementsContainer = container.querySelector('.js-ajax-elements-container');
    const showMoreBtnContainer = container.querySelector('.js-ajax-show-more-btn-container');
    const showMoreBtn = container.querySelector('.js-ajax-show-more-btn');

    if (!elementsContainer || !showMoreBtnContainer || !showMoreBtn) return;

    showMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Блокируем кнопку
      showMoreBtn.setAttribute('disabled', 'true');
      showMoreBtn.classList.add('disabled');

      // Добавляем класс контейнеру во время загрузки данных
      elementsContainer.classList.add('loading');

      const url = showMoreBtn.href || window.location.href;

      fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/html'
        }
      })
        .then(res => res.text())
        .then(data => {
          const parser = new DOMParser();
          const page = parser.parseFromString(data, "text/html");

          // Ищем все ajax контейнеры,
          // из них понадобится только один с текущим индексом i
          const newAjaxContainers = page.querySelectorAll('.js-ajax-show-more-container');

          // Находим элементы, вставляем в текущую разметку
          const newElementsContainer = newAjaxContainers[i].querySelector('.js-ajax-elements-container');
          const newElements = newElementsContainer.querySelectorAll('.js-ajax-element');

          newElements.forEach(element => {
            elementsContainer.append(element);
          });

          // Находим новую кнопку "Показать ещё", обновляем ее href
          // Либо удаляем
          const newShowMoreBtn = newAjaxContainers[i].querySelector('.js-ajax-show-more-btn');
          if (newShowMoreBtn) {
            showMoreBtn.href = newShowMoreBtn.href;
          } else {
            showMoreBtnContainer.remove();
          }
        })
        .catch(function (err) {
          console.warn('Ошибка при загрузке новых карточек.', err);
        })
        .finally(() => {
          // Разблокируем кнопку
          showMoreBtn.removeAttribute("disabled");
          showMoreBtn.classList.remove('disabled');

          // Удаляем класс для загрузки
          elementsContainer.classList.remove('loading');
        })
    })
  })
}

function formSubmitHandler() {
  const forms = Array.from(document.querySelectorAll('.js-handle-feedback-form'));
  forms.forEach(form => {
    const url = form.action;
    const submitBtn = form.querySelector('.js-disable-on-send');

    const validator = new Pristine(form, pristineConfig, true);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = validator.validate();
      if(!isValid) return;

      submitBtn.classList.add('disabled');

      const formData = new FormData(form);
      
      console.log("АЛГА! МАТУР ФОРМ ДАТАСЫ:", _debugFormData(formData));

      fetch(url, {
        body: formData,
        method: "POST"
      })
        .then(response => {
          if (response.ok) {
            form.reset();
            window.modalApi.open('#success-modal');
          } else {
            window.modalApi.open('#error-modal');
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          submitBtn.classList.remove('disabled');
        })
    })
  })
}

function _getTemplateBySelector(templateSelector) {
  return document
  .querySelector(templateSelector)
  .content
  .children[0]
  .cloneNode(true);
}

function _debugFormData(formData) {
  let object = {};
  formData.forEach(function(value, key){
      object[key] = value;
  });
  return json = JSON.stringify(object);
}

const pristineConfig = {
  // class of the parent element where the error/success class is added
  classTo: 'js-validator-wrapper',
  errorClass: 'invalid',
  successClass: 'valid',
  // class of the parent element where error text element is appended
  errorTextParent: 'js-validator-wrapper',
  // type of element to create for the error text
  errorTextTag: 'span',
  // class of the error text element
  errorTextClass: 'form__input-error' 
}