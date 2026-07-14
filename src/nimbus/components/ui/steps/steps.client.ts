/**
 * steps.client.ts — Safari list-role restoration.
 *
 * Safari strips list semantics when `list-style: none` is applied
 * (which we do for the numbered counter styling). Restoring `role="list"`
 * on the inner `<ol>` makes VoiceOver announce the item count again.
 */

import { mount } from "nimbus-docs/client";

function initSteps(root: HTMLElement): () => void {
  const lists = root.querySelectorAll<HTMLOListElement>("ol");
  lists.forEach((ol) => ol.setAttribute("role", "list"));

  return () => {
    lists.forEach((ol) => ol.removeAttribute("role"));
  };
}

mount("[data-nb-steps]", initSteps);
