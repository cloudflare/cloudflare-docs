// Wrap tables that the build-time `cf-table-scroll` Sätteri plugin can't reach
// in the same scroll container it gives markdown tables. Under this Sätteri MDX
// pipeline, tables authored as JSX in .mdx (e.g. a changelog entry's `<table>`
// with components inside) are emitted as literal HTML — they never pass through
// the hast plugin or the components mapping. This is the runtime catch-all for
// those (and any other component-rendered tables) inside `.docs-content`.
//
// Idempotent: skips tables already inside `.table-scroll`, and only touches
// unclassed tables (the `table:not([class])` prose convention). Re-runs on
// `astro:page-load` for the view-transitions ClientRouter.

function wrapDocsTables() {
  const tables = document.querySelectorAll<HTMLTableElement>(
    ".docs-content table:not([class])",
  );
  for (const table of tables) {
    const parent = table.parentElement;
    if (!parent || parent.classList.contains("table-scroll")) continue;

    const wrapper = document.createElement("div");
    wrapper.className = "table-scroll";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("aria-label", "Table");

    parent.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  }
}

wrapDocsTables();
document.addEventListener("astro:page-load", wrapDocsTables);
