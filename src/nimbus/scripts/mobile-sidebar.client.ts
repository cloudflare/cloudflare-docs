import { lockScroll, unlockScroll } from "nimbus-docs/client";

const CLOSE_DURATION_MS = 250;

let cleanupCurrent: (() => void) | undefined;

function initMobileSidebar(): () => void {
  const dialog = document.querySelector<HTMLDialogElement>("[data-mobile-sidebar]");
  const menuBtn = document.querySelector<HTMLElement>("[data-menu-btn]");
  if (!dialog || !menuBtn) return () => {};

  const sidebarHome = document.querySelector<HTMLElement>("[data-sidebar-home]");
  const mobileSidebarSlot = dialog.querySelector<HTMLElement>("[data-mobile-sidebar-slot]");
  const sharedSidebarNav =
    sidebarHome?.querySelector<HTMLElement>("[data-shared-sidebar-nav]") ?? null;
  const desktopMq = window.matchMedia("(min-width: 1024px)");

  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  let desktopOpenState: boolean[] | null = null;
  let mobileOpenState: boolean[] | null = null;
  let sidebarLocked = false;
  let suppressNextFocus = false;

  menuBtn.setAttribute("aria-expanded", "false");

  function readOpenState() {
    if (!sharedSidebarNav) return [];
    return [...sharedSidebarNav.querySelectorAll<HTMLElement>("[data-nb-sidebar-group]")]
      .map((group) => group.querySelector<HTMLElement>("[data-nb-collapsible-trigger]")?.getAttribute("data-nb-state") === "open");
  }

  function setGroupOpen(group: HTMLElement, open: boolean) {
    const disclosure = (group as HTMLElement & {
      __nbDisclosure?: { open(): void; close(): void; isOpen(): boolean };
    }).__nbDisclosure;
    if (disclosure) {
      if (disclosure.isOpen() !== open) {
        open ? disclosure.open() : disclosure.close();
      }
      return;
    }
    group.setAttribute("data-nb-default-open", open ? "true" : "false");
    const trigger = group.querySelector<HTMLElement>("[data-nb-collapsible-trigger]");
    const panel = group.querySelector<HTMLElement>("[data-nb-collapsible-content]");
    const state = open ? "open" : "closed";
    if (trigger) {
      trigger.setAttribute("data-nb-state", state);
      trigger.setAttribute("aria-expanded", String(open));
    }
    if (panel) panel.setAttribute("data-nb-state", state);
  }

  function applyOpenState(state: boolean[] | null) {
    if (!sharedSidebarNav || !state) return;
    [...sharedSidebarNav.querySelectorAll<HTMLElement>("[data-nb-sidebar-group]")]
      .forEach((group, index) => {
        if (typeof state[index] === "boolean") setGroupOpen(group, state[index]);
      });
  }

  function moveSidebarToMobile() {
    if (!sharedSidebarNav || !mobileSidebarSlot) return;
    desktopOpenState = readOpenState();
    mobileSidebarSlot.appendChild(sharedSidebarNav);
    applyOpenState(mobileOpenState);
  }

  function restoreSidebarToDesktop() {
    if (!sharedSidebarNav || !sidebarHome) return;
    if (sharedSidebarNav.parentElement === mobileSidebarSlot) {
      const filter = sharedSidebarNav.querySelector<HTMLInputElement>("[data-nb-sidebar-filter-input]");
      if (filter) filter.value = "";
      sharedSidebarNav
        .querySelectorAll<HTMLElement>("[data-nb-opened-by-filter]")
        .forEach((group) => {
          setGroupOpen(group, false);
          group.removeAttribute("data-nb-opened-by-filter");
        });
      sharedSidebarNav
        .querySelectorAll<HTMLElement>("[data-nb-sidebar-hidden]")
        .forEach((el) => {
          el.removeAttribute("data-nb-sidebar-hidden");
        });
      mobileOpenState = readOpenState();
      sidebarHome.appendChild(sharedSidebarNav);
      applyOpenState(desktopOpenState);
      desktopOpenState = null;
    }
  }

  function finishClose(restoreFocus = true) {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }

    dialog.dataset.state = "closed";
    menuBtn.setAttribute("aria-expanded", "false");
    restoreSidebarToDesktop();
    if (sidebarLocked) {
      unlockScroll();
      sidebarLocked = false;
    }
    if (restoreFocus && !desktopMq.matches) menuBtn.focus();
  }

  function openSidebar() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
    if (dialog.open) return;

    moveSidebarToMobile();
    dialog.showModal();
    dialog.dataset.state = "closed";
    menuBtn.setAttribute("aria-expanded", "true");
    lockScroll();
    sidebarLocked = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        dialog.dataset.state = "open";
      });
    });

    dialog.querySelector<HTMLElement>("[data-close-sidebar]")?.focus();
  }

  function closeSidebar() {
    if (!dialog.open || dialog.dataset.state === "closing") return;

    dialog.dataset.state = "closing";
    closeTimer = setTimeout(() => {
      dialog.close();
    }, CLOSE_DURATION_MS);
  }

  function handleCancel(event: Event) {
    event.preventDefault();
    closeSidebar();
  }

  function handleClose() {
    finishClose(!suppressNextFocus);
    suppressNextFocus = false;
  }

  function handleDialogClick(event: MouseEvent) {
    if (event.target === dialog) closeSidebar();
  }

  function handleDesktopChange(event: MediaQueryListEvent) {
    if (event.matches && dialog.open) dialog.close();
  }

  const closeButton = dialog.querySelector<HTMLElement>("[data-close-sidebar]");
  menuBtn.addEventListener("click", openSidebar);
  closeButton?.addEventListener("click", closeSidebar);
  dialog.addEventListener("cancel", handleCancel);
  dialog.addEventListener("close", handleClose);
  dialog.addEventListener("click", handleDialogClick);
  desktopMq.addEventListener("change", handleDesktopChange);

  return () => {
    suppressNextFocus = true;
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }
    menuBtn.removeEventListener("click", openSidebar);
    closeButton?.removeEventListener("click", closeSidebar);
    dialog.removeEventListener("cancel", handleCancel);
    dialog.removeEventListener("close", handleClose);
    dialog.removeEventListener("click", handleDialogClick);
    desktopMq.removeEventListener("change", handleDesktopChange);
    if (dialog.open) dialog.close();
    finishClose(false);
  };
}

function setupMobileSidebar() {
  cleanupCurrent?.();
  cleanupCurrent = initMobileSidebar();
}

document.addEventListener("astro:before-swap", () => {
  cleanupCurrent?.();
  cleanupCurrent = undefined;
});
document.addEventListener("astro:page-load", setupMobileSidebar);
setupMobileSidebar();
