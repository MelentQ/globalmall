document.addEventListener('DOMContentLoaded', () => {
  searchFormSubmitHandler('.js-newslist-search-form-wrapper', createNewsListElement);
  showMore()
});

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
    
    forms.forEach(form => {
      const getSettings = {
        form,
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
  function get({form, errorMessageElement, elementsContainer, createElementFunction}) {
    // Добавляем в скрытый инпут количество уже показанных элементов
    if (form.offset) {
      form.offset.value = elementsContainer.childElementCount;
    }

    const url = form.action;
    const formData = new FormData(form);

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
        console.log(data);
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
}

/**
 * Функция для формы поиска
 * Для страниц "Магазины, новости" (news-list.html)
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
  btn.href = itemData.cardLink;

  const hashtagsContainer = element.querySelector('.hashtags');
  itemData.hashtags.forEach(hashtag => {
    const hashtagElement = _getTemplateBySelector('#hashtagItemTemplate');
    const hashtagLink = hashtagElement.querySelector('.hashtags__link');
    hashtagLink.href = hashtag.link;
    hashtagLink.textContent = hashtag.name;

    hashtagsContainer.append(hashtagElement);
  })

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
    const showMoreBtn = showMoreBtnContainer.querySelector('.js-ajax-show-more-btn');

    if (!elementsContainer && !showMoreBtnContainer && !showMoreBtn) return;

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