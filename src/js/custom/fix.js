export function fixSchemeTabs() {
  const tabsWrappers = Array.from(document.querySelectorAll('.js-toggle-scheme-btns-container'));
  tabsWrappers.forEach(wrapper => {
    const tabs = Array.from(wrapper.querySelectorAll('.js-toggle-scheme-btn'));

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t, j) => {
          if (j === i) {
            t.classList.add('active');
          } else {
            t.classList.remove('active');
          }
        })
      })
    })
  })
}