// Sidebar navlink expansions
// ---

import { $tabbable } from './events';

export function init() {
  document
    .querySelectorAll<HTMLButtonElement>('.DocsSidebar--nav-expand-collapse-button')
    .forEach(btn => {
      let item = btn.parentNode; // .DocsSidebar--nav-item
      if (item) btn.addEventListener('click', toggle);

      let div = item.querySelector('div'); // .DocsSidebar--nav-item-collapse-container
      if (div && div.hasAttribute('is-expanded')) div.style.height = 'auto';
    });
}

type ListItem = HTMLLIElement & {
  timer?: NodeJS.Timeout | void;
};

function toggle(ev: Event) {
  let attr = 'is-expanded';

  let item: ListItem = (ev.target as HTMLLIElement).closest('li')!;
  if (item.timer) item.timer = clearTimeout(item.timer);

  let isExpanded = item.hasAttribute(attr);
  let aria = item.querySelector('span[is-visually-hidden]');
  aria!.textContent = isExpanded ? 'Expand' : 'Collapse';

  let container = item.querySelector('div')!; // .DocsSidebar--nav-item-collapse-container
  container.className = 'DocsSidebar--nav-item-collapse-container';
  container.style.cssText = 'min-height:0px;transition-duration:400ms;';

  // .DocsSidebar--nav-item-collapse-wrapper
  let sizes = [0, container.firstElementChild!.clientHeight];

  let initial = +isExpanded;
  // expanded:: height -> 0 || minimize:: 0 -> height
  container.style.height = sizes[initial] + 'px';

  // only adjust immediate <ul> child
  let subnav = container.querySelector('ul');
  let items = subnav && subnav.querySelectorAll('li>a,li>button');
  if (items) $tabbable(items, !isExpanded);
  item.toggleAttribute(attr, !isExpanded);

  setTimeout(() => {
    container.style.height = sizes[1 - initial] + 'px';
  }, 1);

  if (isExpanded) {
    // minimizing
  } else {
    // expanding
    item.timer = setTimeout(() => {
      container.style.height = 'auto';
      container.classList.add('DocsSidebar--nav-item-collapse-entered');
    }, 400);
  }
}
