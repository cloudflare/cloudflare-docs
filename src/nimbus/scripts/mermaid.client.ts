// Renders `pre.mermaid` blocks: lazy-loads mermaid only on pages that have a
// diagram, applies brand theme variables, and adds an expand-to-dialog modal
// and annotation footer. Adapted from cloudflare-docs (src/scripts/mermaid.ts);
// dark mode keys off `[data-mode="dark"]` and re-runs on `astro:page-load` for
// the view-transitions ClientRouter.

let dialog: HTMLDialogElement | null = null;
let themeObserver: MutationObserver | null = null;
// Per-<pre> guard: capture source text once, before mermaid replaces innerHTML.
const captured = new WeakSet<HTMLPreElement>();

function getDialog(): HTMLDialogElement {
  if (dialog) return dialog;

  dialog = document.createElement("dialog");
  dialog.className = "mermaid-dialog";
  dialog.innerHTML = `
    <div class="mermaid-dialog-body"></div>
    <button class="mermaid-dialog-close" aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;
  document.body.appendChild(dialog);

  function closeWithAnimation() {
    if (!dialog || !dialog.open) return;
    dialog.classList.add("closing");
    dialog.addEventListener(
      "animationend",
      () => {
        dialog!.classList.remove("closing");
        dialog!.close();
        document.documentElement.style.overflow = "";
      },
      { once: true },
    );
  }

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeWithAnimation();
  });
  dialog
    .querySelector(".mermaid-dialog-close")
    ?.addEventListener("click", () => {
      closeWithAnimation();
    });
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeWithAnimation();
  });

  return dialog;
}

function openDiagram(container: HTMLElement) {
  const d = getDialog();
  const clone = container.cloneNode(true) as HTMLElement;

  clone.querySelector(".mermaid-expand")?.remove();

  const svg = clone.querySelector("svg");
  if (svg) {
    svg.removeAttribute("style");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "auto");
  }

  const body = d.querySelector(".mermaid-dialog-body");
  if (!body) return;
  body.replaceChildren(clone);

  clone.addEventListener("click", (e) => {
    const target = e.target as Element;
    const anchor = target.closest("a");
    const clickable = target.closest(".clickable");
    if (anchor || clickable) {
      d.close();
      document.documentElement.style.overflow = "";
    }
  });

  document.documentElement.style.overflow = "hidden";
  d.showModal();
}

function getFontFamily(): string {
  const computedStyle = getComputedStyle(document.documentElement);
  const font = computedStyle.getPropertyValue("--nb-font-sans").trim();
  return font || "system-ui, -apple-system, sans-serif";
}

function isLightTheme(): boolean {
  return document.documentElement.getAttribute("data-mode") !== "dark";
}

function getPageBackground(): string {
  const style = getComputedStyle(document.documentElement);
  const bg = style.getPropertyValue("--nb-background").trim();
  return bg || (isLightTheme() ? "#ffffff" : "#1d1d1d");
}

function wrapDiagram(diagram: HTMLPreElement, title: string | null) {
  if (diagram.parentElement?.classList.contains("mermaid-container")) {
    return;
  }

  const container = document.createElement("div");
  container.className = "mermaid-container";

  diagram.parentNode?.insertBefore(container, diagram);
  container.appendChild(diagram);

  const expandBtn = document.createElement("button");
  expandBtn.className = "mermaid-expand";
  expandBtn.setAttribute("aria-label", "Expand diagram");
  expandBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="15 3 21 3 21 9"></polyline>
    <polyline points="9 21 3 21 3 15"></polyline>
    <line x1="21" y1="3" x2="14" y2="10"></line>
    <line x1="3" y1="21" x2="10" y2="14"></line>
  </svg>`;
  expandBtn.addEventListener("click", () => openDiagram(container));
  container.appendChild(expandBtn);

  if (title) {
    const footer = document.createElement("div");
    footer.className = "mermaid-annotation";

    const titleSpan = document.createElement("span");
    titleSpan.className = "mermaid-annotation-title";
    titleSpan.textContent = title;

    const logo = document.createElement("img");
    logo.src = "/logo.svg";
    logo.alt = "Cloudflare";
    logo.className = "mermaid-annotation-logo";

    footer.appendChild(titleSpan);
    footer.appendChild(logo);
    container.appendChild(footer);
  }
}

async function render() {
  const diagrams =
    document.querySelectorAll<HTMLPreElement>("pre.mermaid");
  if (diagrams.length === 0) return;

  const { default: mermaid } = await import("mermaid");

  const isLight = isLightTheme();
  const fontFamily = getFontFamily();
  const pageBg = getPageBackground();

  const lightThemeVars = {
    fontFamily,
    primaryColor: "#fef1e6",
    primaryBorderColor: "#f6821f",
    primaryTextColor: "#1d1d1d",
    secondaryColor: "#f2f2f2",
    secondaryBorderColor: "#999999",
    secondaryTextColor: "#1d1d1d",
    tertiaryColor: "#f2f2f2",
    tertiaryBorderColor: "#999999",
    tertiaryTextColor: "#1d1d1d",
    lineColor: "#f6821f",
    textColor: "#1d1d1d",
    mainBkg: "#fef1e6",
    errorBkgColor: "#ffefee",
    errorTextColor: "#3c0501",
    edgeLabelBackground: pageBg,
    labelBackground: pageBg,
  };

  const darkThemeVars = {
    fontFamily,
    primaryColor: "#482303",
    primaryBorderColor: "#f6821f",
    primaryTextColor: "#f2f2f2",
    secondaryColor: "#313131",
    secondaryBorderColor: "#797979",
    secondaryTextColor: "#f2f2f2",
    tertiaryColor: "#313131",
    tertiaryBorderColor: "#797979",
    tertiaryTextColor: "#f2f2f2",
    lineColor: "#f6821f",
    textColor: "#f2f2f2",
    mainBkg: "#482303",
    background: "#1d1d1d",
    errorBkgColor: "#3c0501",
    errorTextColor: "#ffefee",
    edgeLabelBackground: pageBg,
    labelBackground: pageBg,
  };

  const themeVariables = isLight ? lightThemeVars : darkThemeVars;

  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables,
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      curve: "linear",
    },
  });

  for (const diagram of diagrams) {
    try {
      if (!captured.has(diagram)) {
        diagram.setAttribute("data-diagram", diagram.textContent as string);
        captured.add(diagram);
      }

      const def = diagram.getAttribute("data-diagram") as string;

      const { svg } = await mermaid.render(
        `mermaid-${crypto.randomUUID()}`,
        def,
      );
      diagram.innerHTML = svg;

      const svgElement = diagram.querySelector("svg");
      const titleElement = svgElement?.querySelector("title");
      const title = titleElement?.textContent?.trim() || null;

      wrapDiagram(diagram, title);
    } catch (e) {
      console.error("Mermaid render failed:", e);
    }

    diagram.setAttribute("data-processed", "true");
  }
}

function setup() {
  const diagrams =
    document.querySelectorAll<HTMLPreElement>("pre.mermaid");
  if (diagrams.length === 0) return;

  if (!themeObserver) {
    themeObserver = new MutationObserver(() => render());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });
  }

  render();
}

setup();
// Re-run after SPA navigations (view-transitions ClientRouter).
document.addEventListener("astro:page-load", setup);
