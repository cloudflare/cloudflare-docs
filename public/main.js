// ns-hugo:/Users/yevgensafronov/cf-repos/cloudflare-docs/assets/events.ts
var SEARCH_ID = /^(Docs|Site)Search/;
var SEARCH_INPUT;
function $clickaway(ev) {
  if (SEARCH_INPUT && ev.target !== SEARCH_INPUT) {
    $focus(SEARCH_INPUT, false);
  }
}
function $focus(elem, bool) {
  elem.toggleAttribute("is-focus-visible", bool);
  if (bool) elem.focus();
  if (SEARCH_ID && SEARCH_ID.test(elem.id)) {
    SEARCH_INPUT = elem;
    if (!elem.parentElement || !elem.parentElement.parentElement) return;
    elem.parentElement.parentElement.toggleAttribute("is-focused", bool);
    elem.setAttribute("aria-expanded", "" + bool);
    if (bool) addEventListener("click", $clickaway);
    else removeEventListener("click", $clickaway);
  }
}
function $tabbable(links, bool) {
  for (let i = 0; i < links.length; i++) {
    bool ? links[i].removeAttribute("tabindex") : links[i].setAttribute("tabindex", "-1");
  }
}
function load() {
  let hash = location.hash.substring(1);
  if (!hash) return;
  const headerID = CSS.escape(hash.toLowerCase());
  let item = document.querySelector(`#${headerID}`);
  let timer = item && setInterval(() => {
    if (document.readyState !== "complete") return;
    if (timer) {
      clearInterval(timer);
    }
    setTimeout(() => {
      item.scrollIntoView({ behavior: "smooth" });
    }, 250);
  }, 10);
}
function mobile() {
  let root = document.documentElement;
  let btn = document.querySelector(
    ".DocsMobileTitleHeader--sidebar-toggle-button"
  );
  if (btn)
    btn.addEventListener("click", () => {
      root.toggleAttribute("is-mobile-sidebar-open");
    });
  let input = document.querySelector("#DocsSearch--input") || document.querySelector("#SiteSearch--input");
  if (input)
    input.addEventListener("click", () => {
      $focus(input, true);
    });
}
function focus() {
  let isTAB = false;
  addEventListener("keydown", (ev) => {
    isTAB = ev.which === 9;
  });
  addEventListener("focusin", (ev) => {
    if (isTAB) $focus(ev.target, true);
  });
  addEventListener("focusout", (ev) => {
    $focus(ev.target, false);
  });
}
function $tab(ev) {
  var _a, _b;
  ev.preventDefault();
  const tabBlockId = (_a = ev.target.closest("[data-id]")) == null ? void 0 : _a.getAttribute("data-id");
  let tabs2 = document.querySelectorAll(
    `div[tab-wrapper-id="${tabBlockId}"] > .tab`
  );
  for (let i = 0; i < tabs2.length; i++) {
    tabs2[i].style.display = "none";
  }
  let link = (_b = ev.target.closest("[data-link]")) == null ? void 0 : _b.getAttribute("data-link");
  const tabID = CSS.escape(`${link}-${tabBlockId}`);
  const linkElement = document.querySelector(`#${tabID}`);
  if (linkElement) {
    linkElement.style.display = "block";
  }
  zaraz.track("tab click", {
    selected_option: ev.target.innerText
  });
}
function tabs() {
  let wrappers = document.querySelectorAll(".tabs-wrapper");
  addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < wrappers.length; i++) {
      const labels = wrappers[i].querySelectorAll(".tab-label");
      const tabs2 = wrappers[i].querySelectorAll(".tab");
      const defaultTab = wrappers[i].querySelector(".tab.tab-default");
      if (tabs2.length > 0) {
        if (defaultTab) {
          const parts = defaultTab.id.split("-");
          const tabId = parts.slice(0, parts.length - 1).join("-");
          const defaultTabLabel = wrappers[i].querySelector(
            `a[data-link="${tabId}"]`
          );
          defaultTab.style.display = "block";
          if (defaultTabLabel) {
            defaultTabLabel.classList.add("active");
          }
        } else {
          tabs2[0].style.display = "block";
          labels[0].classList.add("active");
        }
        for (let i2 = 0; i2 < labels.length; i2++)
          labels[i2].addEventListener("click", $tab);
      }
    }
  });
}
function activeTab() {
  const blocks = document.querySelectorAll(".tab-active");
  if (blocks) {
    for (const block of blocks) {
      const blockId = block.getAttribute("block-id");
      var tabs2 = block.querySelectorAll(`.tab-label`);
      for (var i = 0; i < tabs2.length; i++) {
        tabs2[i].addEventListener("click", function name() {
          let current = block.querySelector(`.active`);
          if (current) {
            current.classList.remove("active");
          }
          this.classList.add("active");
        });
      }
    }
  }
}
function dropdowns() {
  let attr = "data-expanded";
  document.querySelectorAll(".Dropdown").forEach((div) => {
    let btn = div.querySelector("button");
    let links = div.querySelectorAll("li>a");
    let focused = 0;
    if (btn && links.length > 0) {
      let arrows = (rawEv) => {
        const ev = rawEv;
        let key = ev.which;
        let isTAB = key === 9;
        if (key === 27) return close(ev);
        if (isTAB || key === 40) focused++;
        else if (key === 38 || isTAB && ev.shiftKey) focused--;
        if (focused < 0) focused = links.length;
        else focused %= links.length;
        if (isTAB) ev.preventDefault();
        $focus(links[focused], true);
      };
      let close = (ev) => {
        ev.stopPropagation();
        removeEventListener("click", close);
        $tabbable(links, false);
        div.setAttribute(attr, "false");
        btn.setAttribute(attr, "false");
        div.removeEventListener("keydown", arrows);
      };
      let open = (ev) => {
        ev.stopPropagation();
        addEventListener("click", close);
        $tabbable(links, true);
        div.setAttribute(attr, "true");
        btn.setAttribute(attr, "true");
        $focus(links[focused = 0], true);
        div.addEventListener("keydown", arrows);
      };
      btn.addEventListener("click", (ev) => {
        if (div.getAttribute(attr) === "true") {
          close(ev);
        } else {
          open(ev);
        }
      });
    }
  });
}
function zarazTrackDocEvents() {
  const links = document.querySelectorAll(
    ".DocsMarkdown--link"
  );
  const dropdowns2 = document.querySelectorAll("details");
  const glossaryTooltips = document.querySelectorAll(".glossary-tooltip");
  const playgroundLinks = document.querySelectorAll(".playground-link");
  addEventListener("DOMContentLoaded", () => {
    if (links.length > 0) {
      for (const link of links) {
        const linkURL = new URL(link.href);
        const cfSubdomainRegex = new RegExp(`^[^.]+?.cloudflare.com`);
        if (linkURL.hostname !== "developers.cloudflare.com") {
          if (linkURL.hostname === "workers.cloudflare.com" && linkURL.pathname.startsWith("/playground#")) {
            link.addEventListener("click", () => {
              $zarazLinkEvent("playground link click", link);
            });
          } else if (cfSubdomainRegex.test(linkURL.hostname)) {
            link.addEventListener("click", () => {
              $zarazLinkEvent("Cross Domain Click", link);
            });
          } else {
            link.addEventListener("click", () => {
              $zarazLinkEvent("external link click", link);
            });
          }
        }
      }
    }
    if (dropdowns2.length > 0) {
      for (const dropdown of dropdowns2) {
        dropdown.addEventListener("click", () => {
          $zarazDropdownEvent(dropdown.querySelectorAll("summary")[0]);
        });
      }
    }
    if (glossaryTooltips.length > 0) {
      for (const tooltip of glossaryTooltips) {
        tooltip.addEventListener("pointerleave", () => {
          $zarazGlossaryTooltipEvent(tooltip.getAttribute("aria-label"));
        });
        tooltip.addEventListener("blur", () => {
          $zarazGlossaryTooltipEvent(tooltip.getAttribute("aria-label"));
        });
      }
    }
    if (playgroundLinks.length > 0) {
      for (const playgroundLink of playgroundLinks) {
        playgroundLink.addEventListener("click", () => {
          $zarazLinkEvent("playground link click", playgroundLink);
        });
      }
    }
  });
}
function $zarazLinkEvent(type, link) {
  zaraz.track(type, { href: link.href, hostname: link.hostname });
}
function $zarazDropdownEvent(summary) {
  zaraz.track("dropdown click", { text: summary.innerText });
}
function $zarazGlossaryTooltipEvent(term) {
  zaraz.track("glossary tooltip view", { term });
}

// ns-hugo:/Users/yevgensafronov/cf-repos/cloudflare-docs/assets/contents.ts
var ACTIVE_CLASS = "DocsTableOfContents-link-active";
function toc() {
  var _a, _b, _c;
  let target = document.querySelector("ul.DocsTableOfContents");
  let article = target && document.querySelector("article.DocsMarkdown");
  if (article && target) {
    let headers = article.querySelectorAll("h2,h3,h4");
    let i = 0;
    let tmp;
    let last;
    let container = target;
    if (!headers.length) return;
    for (; i < headers.length; i++) {
      tmp = headers[i];
      if (tmp.nodeName === "H2") {
        container = target;
      } else if (last && tmp.nodeName > last.h) {
        container = last.appendChild(document.createElement("ul"));
      } else if (last && tmp.nodeName < last.h) {
        container = (container == null ? void 0 : container.parentElement) || target;
      }
      last = document.createElement("li");
      let a = document.createElement("a");
      a.classList.add("DocsTableOfContents-link");
      a.href = "#" + tmp.id;
      a.textContent = (_c = (_b = (_a = tmp == null ? void 0 : tmp.lastElementChild) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) != null ? _c : "";
      last.append(a);
      container == null ? void 0 : container.appendChild(last);
      last.h = tmp.nodeName;
    }
    const visibleElements = /* @__PURE__ */ new Map();
    const tocLinks = target.querySelectorAll("a.DocsTableOfContents-link");
    const highlightVisibleTocLinks = () => {
      var _a2;
      let topVisibleIndex = null;
      let h1Visible = false;
      let footerVisible = false;
      for (const [element, isVisible] of visibleElements.entries()) {
        if (!isVisible) {
          continue;
        }
        if (element.tagName === "H1") {
          h1Visible = true;
          break;
        }
        if (element.tagName === "FOOTER") {
          footerVisible = true;
          break;
        }
        const headingIndex = [...tocLinks].findIndex(
          (link) => link.getAttribute("href") === `#${element.id}`
        );
        if (topVisibleIndex === null || headingIndex < topVisibleIndex) {
          topVisibleIndex = headingIndex;
        }
      }
      if (h1Visible) {
        for (const link of tocLinks) {
          link.classList.remove(ACTIVE_CLASS);
        }
        return;
      }
      if (footerVisible) {
        for (const [index, link] of tocLinks.entries()) {
          if (index === tocLinks.length - 1) {
            link.classList.add(ACTIVE_CLASS);
          } else {
            link.classList.remove(ACTIVE_CLASS);
          }
        }
        return;
      }
      const topMostVisibleLink = [...tocLinks][topVisibleIndex != null ? topVisibleIndex : 0];
      const highlightLink = [...tocLinks].find(
        (link) => {
          var _a3;
          return link.getAttribute("href") === ((_a3 = topMostVisibleLink == null ? void 0 : topMostVisibleLink.getAttribute) == null ? void 0 : _a3.call(topMostVisibleLink, "href"));
        }
      );
      if (highlightLink) {
        for (const contentItem of tocLinks) {
          if (contentItem.getAttribute("href") === ((_a2 = topMostVisibleLink == null ? void 0 : topMostVisibleLink.getAttribute) == null ? void 0 : _a2.call(topMostVisibleLink, "href"))) {
            contentItem.classList.add(ACTIVE_CLASS);
          } else {
            contentItem.classList.remove(ACTIVE_CLASS);
          }
        }
      }
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        visibleElements.set(entry.target, entry.isIntersecting);
      }
      highlightVisibleTocLinks();
    });
    const observeElements = article.querySelectorAll("h1,h2,h3,h4");
    const observePagePageElements = document.querySelectorAll("footer,header");
    for (let i2 = 0; i2 < observeElements.length; i2++) {
      observer.observe(observeElements[i2]);
    }
    for (let i2 = 0; i2 < observePagePageElements.length; i2++) {
      observer.observe(observePagePageElements[i2]);
    }
    target.removeAttribute("hidden");
  }
}

// node_modules/fromnow/dist/fromnow.mjs
var MIN = 6e4;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var YEAR = DAY * 365;
var MONTH = DAY * 30;
function fromnow_default(date, opts) {
  opts = opts || {};
  var del = new Date(date).getTime() - Date.now();
  var abs = Math.abs(del);
  if (abs < MIN) return "just now";
  var periods = {
    year: abs / YEAR,
    month: abs % YEAR / MONTH,
    day: abs % MONTH / DAY,
    hour: abs % DAY / HOUR,
    minute: abs % HOUR / MIN
  };
  var k, val, keep = [], max = opts.max || MIN;
  for (k in periods) {
    if (keep.length < max) {
      val = Math.floor(periods[k]);
      if (val || opts.zero) {
        keep.push(val + " " + (val == 1 ? k : k + "s"));
      }
    }
  }
  k = keep.length;
  max = ", ";
  if (k > 1 && opts.and) {
    if (k == 2) max = " ";
    keep[--k] = "and " + keep[k];
  }
  val = keep.join(max);
  if (opts.suffix) {
    val += del < 0 ? " ago" : " from now";
  }
  return val;
}

// ns-hugo:/Users/yevgensafronov/cf-repos/cloudflare-docs/assets/timeago.ts
function init() {
  let i = 0;
  let tmp;
  let arr = document.querySelectorAll("time.relative");
  for (; i < arr.length; i++) {
    tmp = arr[i].getAttribute("datetime");
    if (tmp) arr[i].textContent = fromnow_default(tmp, { max: 1, suffix: true });
  }
}

// ns-hugo:/Users/yevgensafronov/cf-repos/cloudflare-docs/assets/navlinks.ts
function init2() {
  document.querySelectorAll(".DocsSidebar--nav-expand-collapse-button").forEach((btn) => {
    let item = btn.parentNode;
    if (!item) return;
    btn.addEventListener("click", toggle);
    let div = item.querySelector("div");
    if (div && div.hasAttribute("is-expanded")) div.style.height = "auto";
  });
}
function toggle(ev) {
  let attr = "is-expanded";
  let item = ev.target.closest("li");
  if (item.timer) clearTimeout(item.timer);
  let isExpanded = item.hasAttribute(attr);
  let aria = item.querySelector("span[is-visually-hidden]");
  aria.textContent = isExpanded ? "Expand" : "Collapse";
  let container = item.querySelector("div");
  container.className = "DocsSidebar--nav-item-collapse-container";
  container.style.cssText = "min-height:0px;transition-duration:400ms;";
  let sizes = [0, container.firstElementChild.clientHeight];
  let initial = +isExpanded;
  container.style.height = sizes[initial] + "px";
  let subnav = container.querySelector("ul");
  let items = subnav && subnav.querySelectorAll("li>a,li>button");
  if (items) $tabbable(items, !isExpanded);
  item.toggleAttribute(attr, !isExpanded);
  setTimeout(() => {
    container.style.height = sizes[1 - initial] + "px";
  }, 1);
  if (isExpanded) {
  } else {
    item.timer = setTimeout(() => {
      container.style.height = "auto";
      container.classList.add("DocsSidebar--nav-item-collapse-entered");
    }, 400);
  }
}

// <stdin>
(function() {
  init2();
  init();
  load();
  focus();
  mobile();
  dropdowns();
  toc();
  activeTab();
  tabs();
  zarazTrackDocEvents();
})();
