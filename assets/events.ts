let SEARCH_ID = /^(Docs|Site)Search/;
let SEARCH_INPUT: HTMLElement;

function $clickaway(ev: MouseEvent) {
  if (SEARCH_INPUT && ev.target !== SEARCH_INPUT) {
    $focus(SEARCH_INPUT, false);
  }
}

export function $focus(elem: HTMLElement, bool: boolean) {
  elem.toggleAttribute("is-focus-visible", bool);
  if (bool) elem.focus();

  // if is topbar search input
  if (SEARCH_ID && SEARCH_ID.test(elem.id)) {
    SEARCH_INPUT = elem;

    elem.parentElement.parentElement.toggleAttribute("is-focused", bool);
    elem.setAttribute("aria-expanded", "" + bool);

    if (bool) addEventListener("click", $clickaway);
    else removeEventListener("click", $clickaway);
  }
}

export function $tabbable(links: NodeListOf<Element>, bool: boolean) {
  for (let i = 0; i < links.length; i++) {
    bool
      ? links[i].removeAttribute("tabindex")
      : links[i].setAttribute("tabindex", "-1");
  }
}

// scroll to section header
// but only on load if `#hash` in URL
export function load() {
  let hash = location.hash.substring(1);
  let item = hash && document.getElementById(hash);
  let timer =
    item &&
    setInterval(() => {
      if (document.readyState !== "complete") return;
      clearInterval(timer);
      setTimeout(() => {
        item.scrollIntoView({ behavior: "smooth" });
      }, 250);
    }, 10);
}

// mobile sidebar toggle
export function mobile() {
  let root = document.documentElement;
  let btn = document.querySelector(
    ".DocsMobileTitleHeader--sidebar-toggle-button"
  );
  if (btn)
    btn.addEventListener("click", () => {
      root.toggleAttribute("is-mobile-sidebar-open");
    });

  // clicking on mobile search icon
  let input: HTMLInputElement =
    document.querySelector("#DocsSearch--input") ||
    document.querySelector("#SiteSearch--input");

  // register init handler
  if (input)
    input.addEventListener("click", () => {
      $focus(input, true);
    });
}

function $copy(ev: MouseEvent) {
  let btn = (ev.target as HTMLElement).closest("button");
  let txt = btn.getAttribute("data-clipboard");
  if (txt) {
    try {
      navigator.clipboard.writeText(txt);
    } catch (err) {
      /* no support */
    }
  }
}

export function copy() {
  let btns = document.querySelectorAll("button[data-clipboard]");
  for (let i = 0; i < btns.length; i++)
    btns[i].addEventListener("click", $copy);
}

function $clicktoClipboard(ev: MouseEvent) {
  const button = ev.target as HTMLElement;
  const pre = button.parentElement;
  if (pre) {
    const code = pre.getElementsByTagName("code")[0];
    const text = code.innerText;
    if (text) {
      try {
        //copy to clipboard
        navigator.clipboard.writeText(text);
        //show tooltip
        // button.setAttribute("data-tooltip", "Copied");
        button.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"  style= "width:1rem; pointer-events: none;"  aria-label="Copied to clipboard button" focusable="true"><title>Copied Button</title><path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"></path></svg>`;
        setTimeout(() => { 
            // button.setAttribute("data-tooltip", "Copy"); 
            button.innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style= "width:1rem; pointer-events: none;" aria-label="Copy to clipboard button" focusable="true"><title>Copy Button</title><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-.2L232 746.2v-.2h150v150z"></path></svg>`;
        }, 1500);
      } catch (err) {
        /* no support */
      }
    }
  }
}

export function clipboardButton() {
  const copyButtonLabel = "Copy";
  let blocks = document.getElementsByClassName("CodeBlock");
  for (let i = 0; i < blocks.length; i++) {
    if (navigator.clipboard) {
      // Create a button to copy the code
      let button = document.createElement("button");
      button.className = "copyCode-button";
      // button.setAttribute("data-tooltip", copyButtonLabel);
      // Add SVG icon
      button.innerHTML += `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style= "width:1rem; pointer-events: none;" aria-label="Copy to clipboard button" focusable="true"><title>Copy Button</title><path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM382 896h-.2L232 746.2v-.2h150v150z"></path></svg>`;
      button.addEventListener("click", $clicktoClipboard);
      blocks[i].appendChild(button);
    }
  }
}

// add focus attribute to activeElement if keyboard trigger
export function focus() {
  let isTAB = false;
  addEventListener("keydown", (ev) => {
    isTAB = ev.which === 9;
  });

  addEventListener("focusin", (ev) => {
    if (isTAB) $focus(ev.target as HTMLElement, true);
  });

  addEventListener("focusout", (ev) => {
    $focus(ev.target as HTMLElement, false);
  });
}

function $tab(ev: MouseEvent) {
  ev.preventDefault();

  // Get the tabs for this tab block
  const tabBlockId = (ev.target as HTMLElement).getAttribute("data-id");

  let tabs = document.querySelectorAll(
    `div[tab-wrapper-id="${tabBlockId}"] > .tab`
  );

  for (let i = 0; i < tabs.length; i++) {
    (tabs[i] as HTMLElement).style.display = "none";
  }

  let target = ev.target;
  let link = (target as HTMLElement).getAttribute("data-link");

  document.getElementById(`${link}-${tabBlockId}`).style.display = "block";
}

export function tabs() {
  // Find all tab wrappers
  let wrappers = document.querySelectorAll(".tabs-wrapper");

  addEventListener("load", () => {
    for (let i = 0; i < wrappers.length; i++) {
      const labels = wrappers[i].querySelectorAll(".tab-label");
      const tabs = wrappers[i].querySelectorAll(".tab");

      if (tabs.length > 0) {
        // Set the first tab in a group to display
        (tabs[0] as HTMLElement).style.display = "block";
        for (let i = 0; i < labels.length; i++)
          labels[i].addEventListener("click", $tab);
      }
    }
  });
}

export function activeTab() {
  const blocks = document.getElementsByClassName("tab-active");
  if (blocks) {
    for (const block of blocks) {
      const blockId = block.getAttribute("block-id");

      var tabs = block.querySelectorAll(`.tab-label`);
      for (var i = 0; i < tabs.length; i++) {
        (tabs[i] as HTMLElement).addEventListener("click", function name() {
          let current = block.querySelector(`.active`);

          current.classList.remove("active");
          this.classList.add("active");
        });
      }
    }
  }
}

export function dropdowns() {
  let attr = "data-expanded";

  document.querySelectorAll(".Dropdown").forEach((div) => {
    let btn = div.querySelector("button");
    let links = div.querySelectorAll<HTMLAnchorElement>("li>a");
    let focused = 0; // index

    if (btn && links.length > 0) {
      let arrows: EventListener = (ev: KeyboardEvent) => {
        let key = ev.which;
        let isTAB = key === 9;

        // ESCAPE ~> close
        if (key === 27) return close(ev);

        // DOWN / TAB ~> next
        if (isTAB || key === 40) focused++;
        // UP / SHIFT+TAB ~> prev
        else if (key === 38 || (isTAB && ev.shiftKey)) focused--;

        // loop focus around menu
        if (focused < 0) focused = links.length;
        else focused %= links.length;

        if (isTAB) ev.preventDefault();
        $focus(links[focused], true);
      };

      let close: EventListener = (ev) => {
        ev.stopPropagation();
        removeEventListener("click", close);

        // tab-inactive sublinks
        $tabbable(links, false);

        div.setAttribute(attr, "false");
        btn.setAttribute(attr, "false");

        div.removeEventListener("keydown", arrows);
      };

      let open: EventListener = (ev) => {
        ev.stopPropagation();
        addEventListener("click", close);

        // tab-friendly sublinks
        $tabbable(links, true);

        div.setAttribute(attr, "true");
        btn.setAttribute(attr, "true");

        // focus the first link
        $focus(links[(focused = 0)], true);

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
