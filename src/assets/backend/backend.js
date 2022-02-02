document.addEventListener('DOMContentLoaded', () => {
  searchFormSubmitHandler()
});

/**
 * Сабмит формы поиска на страницах списка элементов
 */
function searchFormSubmitHandler() {
  const form = document.querySelector('.js-backend-submit-handler');
  if (form) {
    const resetBtn = form.querySelector('.js-reset');
    resetBtn.addEventListener('click', () => {
      form.reset();
      submitForm();
    })

    function submitForm() {
      // ОНО НЕ РАБОТАЕТ
      // НАДО У АРТЁМА УЗНАТЬ ЧТО ДЕЛАТЬ В ЭТОЙ СИТУАЦИИ
      form.submit();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('submit');
    })
  }
}