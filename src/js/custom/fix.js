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

export function fixSelects() {
  const allCheckboxes = Array.from(
    document.querySelectorAll(".js-all-checkbox")
  );
  const simpleCheckboxes = Array.from(
    document.querySelectorAll(".js-checkbox:not(.js-all-checkbox)")
  );

  allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        simpleCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      }
    });
  });

  simpleCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        allCheckboxes.forEach(
          (checkbox) => {
            checkbox.checked = false;
          }
        );
      }
    });
  });
}

export function fixTextAreas() {
  const elements = Array.from(document.querySelectorAll('.js-textarea'));
  elements.forEach(textarea => {
    textarea.addEventListener('keyup', function(){
      if(this.scrollTop > 0){
        this.style.height = this.scrollHeight + "px";
      }
    });
  })
}