/**
 * Combobox controller — progressive enhancement for the <Combobox> typeahead.
 * Vanilla DOM (no framework); re-inits on Astro view transitions via `mount`.
 *
 * Owns: type-to-filter (case-insensitive substring on the option label),
 * open/close, keyboard nav (↑/↓/Home/End/Enter/Esc), clear button, empty
 * state, group hide-when-empty, above/below flip, value sync (input text +
 * aria-selected + hidden input + `data-value`), and a bubbling
 * `combobox:change` CustomEvent (`detail: { value, label }`).
 */
import { mount } from "nimbus-docs/client";

let uid = 0;

function initCombobox(root: HTMLElement): () => void {
  const input = root.querySelector<HTMLInputElement>("[data-nb-combobox-input]");
  const popup = root.querySelector<HTMLElement>("[data-nb-combobox-popup]");
  const list = root.querySelector<HTMLElement>("[data-nb-combobox-list]");
  const emptyEl = root.querySelector<HTMLElement>("[data-nb-combobox-empty]");
  const clearBtn = root.querySelector<HTMLButtonElement>(
    "[data-nb-combobox-clear]",
  );
  const triggerBtn = root.querySelector<HTMLButtonElement>(
    "[data-nb-combobox-trigger]",
  );
  const valueInput = root.querySelector<HTMLInputElement>(
    "[data-nb-combobox-value-input]",
  );
  if (!input || !popup || !list || !emptyEl) return () => {};

  const scope = `nb-combobox-${uid++}`;
  const allOptions = () =>
    Array.from(list.querySelectorAll<HTMLElement>("[data-nb-combobox-option]"));
  const groups = () =>
    Array.from(list.querySelectorAll<HTMLElement>("[data-nb-combobox-group]"));
  const visibleEnabled = () =>
    allOptions().filter((o) => !o.hidden && !o.hasAttribute("data-disabled"));

  allOptions().forEach((o, i) => {
    if (!o.id) o.id = `${scope}-opt-${i}`;
  });

  let open = false;
  let activeEl: HTMLElement | null = null;

  const labelOf = (o: HTMLElement): string =>
    (
      o.querySelector("[data-nb-combobox-option-label]")?.textContent ??
      o.textContent ??
      ""
    ).trim();

  const selectedOption = (): HTMLElement | null => {
    const v = root.dataset.value || "";
    if (!v) return null;
    return allOptions().find((o) => o.dataset.value === v) ?? null;
  };

  function syncClearVisibility(): void {
    if (clearBtn) clearBtn.hidden = !(input!.value.length > 0);
  }

  function setActive(o: HTMLElement | null): void {
    if (activeEl) activeEl.removeAttribute("data-highlighted");
    activeEl = o;
    if (o) {
      o.setAttribute("data-highlighted", "");
      input!.setAttribute("aria-activedescendant", o.id);
      o.scrollIntoView({ block: "nearest" });
    } else {
      input!.removeAttribute("aria-activedescendant");
    }
  }

  /** Show/hide options by substring match; hide empty groups; toggle empty. */
  function applyFilter(query: string): void {
    const q = query.trim().toLowerCase();
    let anyVisible = false;
    for (const o of allOptions()) {
      const match = q === "" || labelOf(o).toLowerCase().includes(q);
      o.hidden = !match;
      if (match) anyVisible = true;
    }
    for (const g of groups()) {
      const hasVisible = g.querySelector(
        '[data-nb-combobox-option]:not([hidden])',
      );
      g.hidden = !hasVisible;
    }
    emptyEl!.hidden = anyVisible;
    // Keep the active row valid.
    if (!activeEl || activeEl.hidden) {
      const selected = selectedOption();
      setActive(
        selected && !selected.hidden ? selected : (visibleEnabled()[0] ?? null),
      );
    }
  }

  function placePopup(): void {
    popup!.removeAttribute("data-placement");
    const rect = input!.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const needed = Math.min(popup!.scrollHeight, 288) + 8;
    if (spaceBelow < needed && rect.top > spaceBelow) {
      popup!.setAttribute("data-placement", "top");
    }
  }

  function openPopup(showAll = true): void {
    if (open || input!.disabled) return;
    open = true;
    popup!.hidden = false;
    input!.setAttribute("aria-expanded", "true");
    if (showAll) applyFilter("");
    else applyFilter(input!.value);
    placePopup();
    const selected = selectedOption();
    setActive(
      selected && !selected.hidden ? selected : (visibleEnabled()[0] ?? null),
    );
    document.addEventListener("pointerdown", onDocPointer, true);
  }

  function closePopup(): void {
    if (!open) return;
    open = false;
    popup!.hidden = true;
    input!.setAttribute("aria-expanded", "false");
    setActive(null);
    document.removeEventListener("pointerdown", onDocPointer, true);
    // Reconcile the input text with the committed selection (the typeahead is
    // select-from-list, not free text).
    const selected = selectedOption();
    input!.value = selected ? labelOf(selected) : "";
    syncClearVisibility();
  }

  function commit(value: string | null, emit = true): void {
    let selected: HTMLElement | null = null;
    for (const o of allOptions()) {
      const isSel = value != null && o.dataset.value === value;
      o.setAttribute("aria-selected", isSel ? "true" : "false");
      if (isSel) selected = o;
    }
    root.dataset.value = selected ? (value ?? "") : "";
    if (valueInput) valueInput.value = selected ? (value ?? "") : "";
    if (selected) input!.value = labelOf(selected);
    syncClearVisibility();
    if (emit) {
      root.dispatchEvent(
        new CustomEvent("combobox:change", {
          bubbles: true,
          detail: {
            value: selected ? value : null,
            label: selected ? labelOf(selected) : null,
          },
        }),
      );
    }
  }

  function choose(o: HTMLElement): void {
    if (o.hasAttribute("data-disabled")) return;
    commit(o.dataset.value ?? null);
    closePopup();
    input!.focus();
  }

  function clear(): void {
    commit(null);
    input!.value = "";
    syncClearVisibility();
    applyFilter("");
    input!.focus();
    openPopup();
  }

  function move(dir: 1 | -1): void {
    const list = visibleEnabled();
    if (list.length === 0) return;
    const idx = activeEl ? list.indexOf(activeEl) : -1;
    let next = idx + dir;
    if (next < 0) next = list.length - 1;
    if (next >= list.length) next = 0;
    setActive(list[next]);
  }

  function onDocPointer(e: PointerEvent): void {
    if (!root.contains(e.target as Node)) closePopup();
  }

  function onInput(): void {
    if (!open) openPopup(false);
    applyFilter(input!.value);
    setActive(visibleEnabled()[0] ?? null);
    syncClearVisibility();
  }

  function onInputFocus(): void {
    if (!open) {
      openPopup(true);
      input!.select();
    }
  }

  function onInputKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        open ? move(1) : openPopup(true);
        break;
      case "ArrowUp":
        e.preventDefault();
        open ? move(-1) : openPopup(true);
        break;
      case "Enter":
        if (open && activeEl) {
          e.preventDefault();
          choose(activeEl);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          closePopup();
        } else if (input!.value) {
          e.preventDefault();
          clear();
        }
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(visibleEnabled()[0] ?? null);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          const l = visibleEnabled();
          setActive(l[l.length - 1] ?? null);
        }
        break;
      case "Tab":
        if (open) closePopup();
        break;
    }
  }

  function onTriggerClick(): void {
    if (open) {
      closePopup();
    } else {
      input!.focus();
      openPopup(true);
      input!.select();
    }
  }

  function onClearClick(): void {
    clear();
  }

  function onListClick(e: MouseEvent): void {
    const o = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-nb-combobox-option]",
    );
    if (o && list!.contains(o)) choose(o);
  }

  function onListMousemove(e: MouseEvent): void {
    const o = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-nb-combobox-option]",
    );
    if (o && !o.hidden && !o.hasAttribute("data-disabled")) setActive(o);
  }

  input.addEventListener("input", onInput);
  input.addEventListener("focus", onInputFocus);
  input.addEventListener("keydown", onInputKeydown);
  triggerBtn?.addEventListener("click", onTriggerClick);
  clearBtn?.addEventListener("click", onClearClick);
  list.addEventListener("click", onListClick);
  list.addEventListener("mousemove", onListMousemove);

  // Reflect the initial selection (set by the Astro component) without
  // emitting a change. Seeds aria-selected, the hidden input, and the
  // displayed label.
  commit(root.dataset.value || null, false);
  syncClearVisibility();

  return () => {
    input.removeEventListener("input", onInput);
    input.removeEventListener("focus", onInputFocus);
    input.removeEventListener("keydown", onInputKeydown);
    triggerBtn?.removeEventListener("click", onTriggerClick);
    clearBtn?.removeEventListener("click", onClearClick);
    list.removeEventListener("click", onListClick);
    list.removeEventListener("mousemove", onListMousemove);
    document.removeEventListener("pointerdown", onDocPointer, true);
  };
}

mount("[data-nb-combobox]", initCombobox);
