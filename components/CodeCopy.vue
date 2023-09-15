<script setup lang="ts">
import { ref } from "vue";
const isCopying = ref(false);
function copyCode(e: MouseEvent) {
  // This relies on the DOM structure of layouts/_default/_markup/render-codeblock.html
  const highlightedCode = (
    e.target as HTMLElement
  )?.parentElement?.parentElement?.querySelector("pre code");
  
  if (highlightedCode) {
    // the markdown's code blocks adds a class "CodeBlock--token-unselectable", if it is not supposed to be copied.
    // clone the code node, we do not want to modify the DOM.
    const code = highlightedCode.cloneNode(true) as HTMLElement;
    const unselectableTokens: HTMLCollectionOf<Element> = code.getElementsByClassName("CodeBlock--token-unselectable");

    // Convert the HTMLCollection to an array for easier manipulation
    const elementsToRemove: Element[] = Array.from(unselectableTokens);

    // Loop through the array and remove each element
    elementsToRemove.forEach((element: Element) => {
      element.parentNode?.removeChild(element);
    });
    const lines = code.querySelectorAll(".CodeBlock--row");
    let textLines: string[] = [];
    lines.forEach((line) =>
      textLines.push((line as HTMLElement).innerText.trimEnd())
    );
    const text = textLines.join("\n");
    if (text) {
      try {
        //copy to clipboard
        navigator.clipboard.writeText(text);
        //change SVG
        isCopying.value = true;
        setTimeout(() => {
          isCopying.value = false;
        }, 1500);
      } catch (err) {
        /* no support */
      }
    }
  }
}
</script>

<template>
  <button
    class="copyCode-button"
    aria-label="Copy to clipboard"
    title="Copy to clipboard"
    @click="copyCode"
  >
    <svg
      v-if="isCopying"
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style="width: 1rem; pointer-events: none"
      aria-label="Copied to clipboard button"
      focusable="true"
    >
      <title>Copied Button</title>
      <path
        d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
      ></path>
    </svg>
    <svg
      v-else
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      style="width: 1rem; pointer-events: none"
      aria-label="Copy to clipboard button"
      focusable="true"
    >
      <title>Copy Button</title>
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      ></path>
    </svg>
  </button>
</template>

<style scoped>
.copyCode-button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  height: calc(var(--code-font-size) * var(--line-height));
  font-size: 0.9rem;
  padding: 0.15rem;
  background: transparent;
  color: #1e1e1e;
  border: none;
  box-shadow: 0 0 0 1px var(--gray-6);
  border-radius: 3px;
  text-shadow: #c4c4c4 0 0 2px;
  --focus-shadow: 0 0 0 var(--focus-size) var(--focus-color);
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.copyCode-button::-webkit-scrollbar {
  display: none;
}

[theme="dark"] .copyCode-button {
  background: transparent;
  color: var(--gray-7);
  border: none;
  box-shadow: 0 0 0 1px var(--gray-3);
  border-radius: 3px;
  text-shadow: #c4c4c4 0 0 2px;
  --focus-shadow: 0 0 0 var(--focus-size) var(--focus-color);
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

[theme="dark"] .copyCode-button::-webkit-scrollbar {
  display: none;
}

.copyCode-button:hover,
.copyCode-button:focus {
  cursor: pointer;
  background-color: #828282;
  --focus-shadow: 0 0 0 var(--focus-size) var(--focus-color);
}

[theme="dark"] .copyCode-button:hover,
.copyCode-button:focus {
  cursor: pointer;
  background-color: var(--code-block-background-color);
  --focus-shadow: 0 0 0 var(--focus-size) var(--focus-color);
}

.copyCode-button::after::-webkit-scrollbar {
  display: none;
}
</style>
