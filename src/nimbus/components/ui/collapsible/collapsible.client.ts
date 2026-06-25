/** Wires Collapsible via the disclosure module. */

import { mount, makeDisclosure } from "nimbus-docs/client";

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

  return () => disclosure.destroy();
}

mount("[data-nb-collapsible]", initCollapsible);
