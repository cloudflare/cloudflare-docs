type ListItem = HTMLLIElement & {
  h: string;
};

export function toc() {
  let target = document.querySelector('ul.DocsTableOfContents');
  let article = target && document.querySelector('article.DocsMarkdown');

  if (article) {
    let headers = article.querySelectorAll('h2,h3,h4');
    let i = 0,
      tmp: Element,
      last: ListItem,
      container = target;
    if (!headers.length) return; // exit & leave hidden

    for (; i < headers.length; i++) {
      tmp = headers[i];

      if (tmp.nodeName === 'H2') {
        container = target;
      } else if (last && tmp.nodeName > last.h) {
        // eg; "H4" > "H2" ==> true
        container = last.appendChild(document.createElement('ul'));
      } else if (last && tmp.nodeName < last.h) {
        container = container.parentElement || target;
      }

      last = document.createElement('li') as ListItem;
      let text = tmp.lastElementChild.textContent.trim();
      last.innerHTML = `<a class="DocsTableOfContents-link" href="#${tmp.id}">${text}</a>`;
      container.appendChild(last);
      last.h = tmp.nodeName;
    }

    target.removeAttribute('hidden');
  }
}
