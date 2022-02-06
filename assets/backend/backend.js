document.addEventListener('DOMContentLoaded', () => {
  searchFormSubmitHandler()
});

/**
 * Сабмит формы поиска на страницах списка элементов
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