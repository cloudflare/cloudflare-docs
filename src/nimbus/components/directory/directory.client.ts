/**
 * Directory controller — progressive enhancement for <Directory>. Vanilla DOM
 * (no framework); re-inits on Astro view transitions via `mount`, which also
 * tears down listeners on swap.
 *
 * Layout is the "blueprint console": a centered command search in the hero, an
 * always-present category checklist, and ONE flat corner-mark grid of every
 * product (geometry from ./grid.ts — the single source of truth shared with
 * the build-time render in Directory.astro). No per-group sections, so each
 * product appears once even when it belongs to several groups.
 *
 * Owns:
 *   - category filter: checked checkboxes show only products in those
 *     categories (none checked = all); a product matches if any of its
 *     `data-groups` is checked.
 *   - search: filters products by name. Combined with the category filter, the
 *     single grid is re-flowed (columns + corner marks) using the shared
 *     geometry in ./grid.ts. Cells close their own edges, so no fillers.
 *     ⌘K / "/" focus the search, Esc clears it.
 *   - the empty state, a "Clear filters" affordance, and URL sync
 *     (`?search=…&group=…&group=…`).
 */
import { mount } from "nimbus-docs/client";
import { setSearchParams } from "~/util/url";
import {
  LG_GRID_CLASS,
  resolveCols,
  cornersFor,
  cellClass,
  cornerSpansHTML,
} from "./grid";

function initDirectory(root: HTMLElement): () => void {
  const search = root.querySelector<HTMLInputElement>(
    "[data-directory-search]",
  );
  const categories = Array.from(
    root.querySelectorAll<HTMLInputElement>('input[name="category"]'),
  );
  const grid = root.querySelector<HTMLElement>("[data-directory-grid]");
  const empty = root.querySelector<HTMLElement>("[data-directory-empty]");
  const clearBtn = root.querySelector<HTMLButtonElement>(
    "[data-directory-clear]",
  );
  const searchClear = root.querySelector<HTMLButtonElement>(
    "[data-directory-search-clear]",
  );

  const cells = grid
    ? Array.from(grid.querySelectorAll<HTMLElement>("[data-directory-cell]"))
    : [];

  // Below `lg` the grid collapses to a single column (grid-cols-1), so the
  // corner-marks must be computed for 1 column there to stay aligned.
  const lgQuery = window.matchMedia("(min-width: 1024px)");
  const isLg = (): boolean => lgQuery.matches;

  const selectedGroups = (): string[] =>
    categories.filter((c) => c.checked).map((c) => c.value);

  // Re-flow the grid to the products matching `query` and `groups`. Returns
  // the number of visible products.
  function relayout(query: string, groups: string[]): number {
    if (!grid) return 0;

    const matches = cells.filter((cell) => {
      const nameOk = !query || (cell.dataset.name ?? "").includes(query);
      const cellGroups = (cell.dataset.groups ?? "").split("|");
      const groupOk =
        groups.length === 0 || groups.some((g) => cellGroups.includes(g));
      return nameOk && groupOk;
    });

    const lgCols = resolveCols(matches.length);
    grid.className = LG_GRID_CLASS[lgCols] ?? LG_GRID_CLASS[1];

    // Corner-marks track the actually-rendered column count (1 below `lg`).
    const cols = isLg() ? lgCols : 1;

    for (const cell of cells) cell.style.display = "none";
    matches.forEach((cell, i) => {
      cell.style.display = "";
      cell.className = cellClass;
      const marks = cell.querySelector<HTMLElement>("[data-corner-marks]");
      if (marks) marks.innerHTML = cornerSpansHTML(cornersFor(i, cols));
    });

    return matches.length;
  }

  function update(syncUrl = true): void {
    const raw = search?.value ?? "";
    const query = raw.trim().toLowerCase();
    const groups = selectedGroups();

    const count = relayout(query, groups);

    if (empty) empty.hidden = count > 0;
    if (clearBtn) clearBtn.hidden = groups.length === 0 && query === "";
    if (searchClear) searchClear.hidden = query === "";

    if (syncUrl) {
      const params = new URLSearchParams();
      if (raw.trim()) params.set("search", raw);
      groups.forEach((group) => params.append("group", group));
      setSearchParams(params);
    }
  }

  // Seed state from the URL (deep links / back-forward), then render once
  // without writing the URL back.
  function applyFromUrl(): void {
    const params = new URLSearchParams(window.location.search);
    if (search) search.value = params.get("search") ?? "";
    const selected = params
      .getAll("group")
      .flatMap((value) => value.split(","));
    for (const cb of categories) cb.checked = selected.includes(cb.value);
  }

  function onSearch(): void {
    update();
  }
  function onCategory(): void {
    update();
  }
  function onClear(): void {
    if (search) search.value = "";
    for (const cb of categories) cb.checked = false;
    update();
    search?.focus();
  }
  function onSearchClear(): void {
    if (search) search.value = "";
    update();
    search?.focus();
  }
  function onKeydown(event: KeyboardEvent): void {
    const slash = event.key === "/" && document.activeElement !== search;
    const cmdK =
      event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
    if (slash || cmdK) {
      event.preventDefault();
      search?.focus();
      search?.select();
    } else if (
      event.key === "Escape" &&
      document.activeElement === search &&
      search?.value
    ) {
      search.value = "";
      update();
    }
  }

  // Re-flow corner-marks when crossing the lg breakpoint (cols 1 ↔ N).
  const onBreakpoint = (): void => update(false);

  search?.addEventListener("input", onSearch);
  for (const cb of categories) cb.addEventListener("change", onCategory);
  clearBtn?.addEventListener("click", onClear);
  searchClear?.addEventListener("click", onSearchClear);
  document.addEventListener("keydown", onKeydown);
  lgQuery.addEventListener("change", onBreakpoint);

  applyFromUrl();
  update(false);

  return () => {
    search?.removeEventListener("input", onSearch);
    for (const cb of categories) cb.removeEventListener("change", onCategory);
    clearBtn?.removeEventListener("click", onClear);
    searchClear?.removeEventListener("click", onSearchClear);
    document.removeEventListener("keydown", onKeydown);
    lgQuery.removeEventListener("change", onBreakpoint);
  };
}

mount("[data-directory]", initDirectory);
