/** Wires Collapsible via the disclosure module. */

import { mount, makeDisclosure } from "nimbus-docs/client";

declare global {
  interface HTMLElement {
    __nbDisclosure?: ReturnType<typeof makeDisclosure>;
  }
}

function initCollapsible(root: HTMLElement): () => void {
  const trigger = root.querySelector<HTMLElement>("[data-nb-collapsible-trigger]");
  const content = root.querySelector<HTMLElement>("[data-nb-collapsible-content]");

  if (!trigger || !content) return () => {};

  const defaultOpen = root.dataset.nbDefaultOpen === "true";

  const disclosure = makeDisclosure({
    trigger,
    content,
    defaultOpen,
  });
  root.__nbDisclosure = disclosure;

  return () => {
    delete root.__nbDisclosure;
    disclosure.destroy();
  };
}

mount("[data-nb-collapsible]", initCollapsible);
