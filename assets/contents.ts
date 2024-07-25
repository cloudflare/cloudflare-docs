type ListItem = HTMLLIElement & {
  h: string;
};

const ACTIVE_CLASS = 'DocsTableOfContents-link-active';
export function toc() {
  let target = document.querySelector('ul.DocsTableOfContents');
  let article = target && document.querySelector('article.DocsMarkdown');

  if (article && target) {
    let headers = article.querySelectorAll('h2,h3,h4');

    let i = 0;
    let tmp;
    let last;
    let container = target;
    if (!headers.length) return; // exit & leave hidden

    for (; i < headers.length; i++) {
      tmp = headers[i];
      if (tmp.nodeName === 'H2') {
        container = target;
      } else if (last && tmp.nodeName > last.h) {
        // eg; "H4" > "H2" ==> true
        container = last.appendChild(document.createElement('ul'));
      } else if (last && tmp.nodeName < last.h) {
        container = container?.parentElement || target;
      }

      last = document.createElement('li') as ListItem;
      let a = document.createElement('a');
      a.classList.add('DocsTableOfContents-link');
      a.href = '#' + tmp.id;
      a.textContent = tmp?.lastElementChild?.textContent?.trim() ?? '';
      last.append(a);
      container?.appendChild(last);
      last.h = tmp.nodeName;
    }

    // setup observers to track what elements in TOC are visible
    const visibleElements = new Map();
    const tocLinks = target.querySelectorAll('a.DocsTableOfContents-link');
    const highlightVisibleTocLinks = () => {
      let topVisibleIndex = null;
      let h1Visible = false;
      let footerVisible = false;
      for (const [element, isVisible] of visibleElements.entries()) {
        if (!isVisible) {
          continue;
        }
        if (element.tagName === 'H1') {
          h1Visible = true;
          break;
        }
        if (element.tagName === 'FOOTER') {
          footerVisible = true;
          break;
        }
        const headingIndex = [...tocLinks].findIndex(
          link => link.getAttribute('href') === `#${element.id}`
        );
        if (topVisibleIndex === null || headingIndex < topVisibleIndex) {
          topVisibleIndex = headingIndex;
        }
      }
      if (h1Visible) {
        // we're at the top of the article, remove all highlights
        for (const link of tocLinks) {
          link.classList.remove(ACTIVE_CLASS);
        }
        return;
      }
      if (footerVisible) {
        // we're at the bottom of the article, highlight last thing
        for (const [index, link] of tocLinks.entries()) {
          if (index === tocLinks.length - 1) {
            link.classList.add(ACTIVE_CLASS);
          } else {
            link.classList.remove(ACTIVE_CLASS);
          }
        }
        return;
      }
      const topMostVisibleLink = [...tocLinks][topVisibleIndex ?? 0];

      // find a new link to highlight
      const highlightLink = [...tocLinks].find(
        link => link.getAttribute('href') === topMostVisibleLink?.getAttribute?.('href')
      ) as HTMLAnchorElement;
      // if we've got a new link to highlight, do it, and unhighlight the old ones
      if (highlightLink) {
        for (const contentItem of tocLinks) {
          if (contentItem.getAttribute('href') === topMostVisibleLink?.getAttribute?.('href')) {
            contentItem.classList.add(ACTIVE_CLASS);
          } else {
            contentItem.classList.remove(ACTIVE_CLASS);
          }
        }
      }
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        visibleElements.set(entry.target, entry.isIntersecting);
      }
      highlightVisibleTocLinks();
    });

    // observe headers in article, as well as footer/header for when we're at the top/bottom of the article
    const observeElements = article.querySelectorAll('h1,h2,h3,h4');
    const observePagePageElements = document.querySelectorAll('footer,header');
    for (let i = 0; i < observeElements.length; i++) {
      observer.observe(observeElements[i]);
    }
    for (let i = 0; i < observePagePageElements.length; i++) {
      observer.observe(observePagePageElements[i]);
    }

    target.removeAttribute('hidden');
  }
}
