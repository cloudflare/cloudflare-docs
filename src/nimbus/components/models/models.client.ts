/**
 * Model catalog controller — progressive enhancement for <ModelCatalog>.
 * Vanilla DOM (no framework island); re-inits on Astro view transitions via
 * `mount`. Shares the Directory grid geometry (grid.ts) so the corner-mark +
 * border bookkeeping has a single source of truth.
 *
 * Filters by N multi-select facets (Tasks / Capabilities / Providers / Authors)
 * + name search, sorts pinned-first then newest/oldest, then re-flows the single
 * grid: it resolves the column count from the visible cell count, reorders the
 * DOM for sort, and recomputes each visible cell's corner marks for its new
 * position (so the lined grid + rounded corner squares stay correct under any
 * filter). Facet state reflects to the URL with plural repeated keys
 * (`?tasks=a&tasks=b`); search persists too; sort is ephemeral. Each facet
 * dropdown also has a within-facet search box.
 */
import { mount } from "nimbus-docs/client";
import { setSearchParams } from "~/util/url";
import {
  LG_GRID_CLASS,
  resolveCols,
  cornersFor,
  cellClass,
  cornerSpansHTML,
} from "~/components/directory/grid";

function initModels(root: HTMLElement): () => void {
  const search = root.querySelector<HTMLInputElement>("[data-models-search]");
  const sortSel = root.querySelector<HTMLSelectElement>("[data-models-sort]");
  const clearBtn = root.querySelector<HTMLButtonElement>("[data-models-clear]");
  const grid = root.querySelector<HTMLElement>("[data-models-grid]");
  const empty = root.querySelector<HTMLElement>("[data-models-empty]");
  const countEl = root.querySelector<HTMLElement>("[data-models-count]");
  const dropdowns = Array.from(
    root.querySelectorAll<HTMLDetailsElement>("[data-facet-dropdown]"),
  );

  const checkboxes = Array.from(
    root.querySelectorAll<HTMLInputElement>("input[data-facet]"),
  );
  const cells = grid
    ? Array.from(grid.querySelectorAll<HTMLElement>("[data-models-cell]"))
    : [];

  const facetKeys = [
    ...new Set(checkboxes.map((c) => c.dataset.facet ?? "")),
  ].filter(Boolean);

  // Below `lg` the grid collapses to a single column, so corner marks must be
  // computed for 1 column there to stay aligned.
  const lgQuery = window.matchMedia("(min-width: 1024px)");
  const isLg = (): boolean => lgQuery.matches;

  // For the URL: the checkbox `value` (author id / slug / label).
  const selectedValues = (key: string): string[] =>
    checkboxes
      .filter((c) => c.dataset.facet === key && c.checked)
      .map((c) => c.value);

  // For filtering: the `data-match` value compared against a cell's stamp.
  // Equals the value for every facet except Authors (value = id, match = name).
  const selectedMatch = (key: string): string[] =>
    checkboxes
      .filter((c) => c.dataset.facet === key && c.checked)
      .map((c) => c.dataset.match ?? c.value);

  const cellValues = (cell: HTMLElement, key: string): string[] =>
    (cell.dataset[`facet${key.charAt(0).toUpperCase()}${key.slice(1)}`] ?? "")
      .split("|")
      .filter(Boolean);

  // Filter → sort → re-flow grid (columns + corner marks). Returns visible count.
  function relayout(): number {
    if (!grid) return 0;

    const raw = search?.value ?? "";
    const query = raw.trim().toLowerCase();
    const sel: Record<string, string[]> = {};
    for (const key of facetKeys) sel[key] = selectedMatch(key);

    const matches = cells.filter((cell) => {
      const nameOk = !query || (cell.dataset.name ?? "").includes(query);
      return (
        nameOk &&
        facetKeys.every((key) => {
          const chosen = sel[key];
          if (chosen.length === 0) return true;
          const vals = cellValues(cell, key);
          return chosen.some((c) => vals.includes(c));
        })
      );
    });

    // Pinned-first tier: pinned models sort to the top in BOTH directions,
    // ordered by their pin index; the rest sort by date.
    const dir = sortSel?.value === "oldest" ? 1 : -1;
    matches.sort((a, b) => {
      const pa = Number(a.dataset.pinnedIndex ?? -1);
      const pb = Number(b.dataset.pinnedIndex ?? -1);
      const aPinned = pa >= 0;
      const bPinned = pb >= 0;
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      if (aPinned && bPinned) return pa - pb;
      const da = Number(a.dataset.date ?? 0);
      const db = Number(b.dataset.date ?? 0);
      return da === db ? 0 : (da < db ? -1 : 1) * dir;
    });

    const lgCols = resolveCols(matches.length);
    grid.className = LG_GRID_CLASS[lgCols] ?? LG_GRID_CLASS[1];
    const cols = isLg() ? lgCols : 1;

    for (const cell of cells) cell.style.display = "none";
    matches.forEach((cell, i) => {
      cell.style.display = "";
      cell.className = cellClass;
      grid.appendChild(cell); // reorder DOM so visual order = sorted order
      const marks = cell.querySelector<HTMLElement>("[data-corner-marks]");
      if (marks) marks.innerHTML = cornerSpansHTML(cornersFor(i, cols));
    });

    return matches.length;
  }

  function update(syncUrl = true): void {
    const visible = relayout();
    const raw = search?.value ?? "";
    // Selection counts (summary badges + clear/empty state) by checked count.
    const counts: Record<string, number> = {};
    for (const key of facetKeys)
      counts[key] = checkboxes.filter(
        (c) => c.dataset.facet === key && c.checked,
      ).length;

    for (const key of facetKeys) {
      const badge = root.querySelector<HTMLElement>(`[data-facet-badge="${key}"]`);
      if (badge) {
        const n = counts[key];
        badge.hidden = n === 0;
        badge.textContent = String(n);
      }
    }

    const anyFacet = facetKeys.some((k) => counts[k] > 0);
    if (empty) empty.hidden = visible > 0;
    if (clearBtn) clearBtn.hidden = !anyFacet;
    if (countEl)
      countEl.innerHTML = `We found <span class="font-semibold text-foreground">${visible}</span> ${
        visible === 1 ? "model" : "models"
      }`;

    if (syncUrl) {
      // URL shape: search + plural repeated facet keys (`?tasks=a&tasks=b`).
      // Sort is ephemeral — never written.
      const params = new URLSearchParams();
      if (raw.trim()) params.set("search", raw);
      for (const key of facetKeys)
        for (const v of selectedValues(key)) params.append(key, v);
      setSearchParams(params);
    }
  }

  function applyFromUrl(): void {
    const params = new URLSearchParams(window.location.search);
    if (search) search.value = params.get("search") ?? "";
    for (const key of facetKeys) {
      // Repeated keys via getAll. Unknown values (e.g. stale provider slugs)
      // are dropped naturally: no matching checkbox exists for them.
      const chosen = params.getAll(key);
      for (const cb of checkboxes)
        if (cb.dataset.facet === key) cb.checked = chosen.includes(cb.value);
    }
  }

  // Within-facet search: filter each dropdown's option labels + empty state.
  function initFacetSearch(): void {
    for (const d of dropdowns) {
      const filter = d.querySelector<HTMLInputElement>("[data-facet-filter]");
      if (!filter) continue;
      const options = Array.from(
        d.querySelectorAll<HTMLElement>("[data-facet-option]"),
      );
      const emptyEl = d.querySelector<HTMLElement>("[data-facet-empty]");
      filter.addEventListener("input", () => {
        const q = filter.value.trim().toLowerCase();
        let any = false;
        for (const o of options) {
          const show = !q || (o.dataset.label ?? "").toLowerCase().includes(q);
          o.style.display = show ? "" : "none";
          if (show) any = true;
        }
        if (emptyEl) emptyEl.hidden = any;
      });
    }
  }

  function onClear(): void {
    for (const cb of checkboxes) cb.checked = false;
    update();
  }
  function onDocClick(event: MouseEvent): void {
    for (const d of dropdowns)
      if (d.open && !d.contains(event.target as Node)) d.open = false;
  }

  const onInput = (): void => update();
  const onBreakpoint = (): void => update(false);
  search?.addEventListener("input", onInput);
  for (const cb of checkboxes) cb.addEventListener("change", onInput);
  sortSel?.addEventListener("change", onInput);
  clearBtn?.addEventListener("click", onClear);
  document.addEventListener("click", onDocClick);
  lgQuery.addEventListener("change", onBreakpoint);

  initFacetSearch();
  applyFromUrl();
  update(false);

  return () => {
    search?.removeEventListener("input", onInput);
    for (const cb of checkboxes) cb.removeEventListener("change", onInput);
    sortSel?.removeEventListener("change", onInput);
    clearBtn?.removeEventListener("click", onClear);
    document.removeEventListener("click", onDocClick);
    lgQuery.removeEventListener("change", onBreakpoint);
  };
}

mount("[data-models]", initModels);
