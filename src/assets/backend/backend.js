document.addEventListener('DOMContentLoaded', () => {
  searchFormSubmitHandler()
  showMore()
});

/**
 * Сабмит формы поиска на страницах списка элементов
 * Универсальная функция
 */
function searchFormSubmitHandler() {
  const forms = Array.from(document.querySelectorAll('.js-backend-submit-handler'));

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      get(form);
    })

    const resetBtn = form.querySelector('.js-reset');
    if(resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        get(form);
      })
    }

    const radioButtons = Array.from(form.querySelectorAll('.js-radio'))
    const checkboxes = Array.from(form.querySelectorAll('.js-checkbox'))
    const formInputs = [...radioButtons, ...checkboxes];
    formInputs.forEach(input => {
      input.addEventListener('change', () => {
        get(form);
      })
    })
  })

  // Основная логика
  function get(form) {
    // const url = form.action;
    console.log('backend.js')
  }
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
          const newShowMoreBtn = newAjaxContainers[i].querySelector('.js-ajax-show-more-btn');
          showMoreBtn.href = newShowMoreBtn.href;
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