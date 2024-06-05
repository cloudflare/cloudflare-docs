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
    const unselectableTokens: HTMLCollectionOf<Element> =
      code.getElementsByClassName("CodeBlock--token-unselectable");

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
    let text = textLines.join("\n");
    if (text) {
      // Remove extraneous newlines at the end of shell
      // codeblocks, that persist after removing comment/output
      // lines.
      text = text.replaceAll(/\n{1,}$/g, "");
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
      class="icon-ok"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
    >
      <title>Copied</title>
      <path
        fill-rule="evenodd"
        d="M14.485 4.347l-8.324 8.625-4.648-4.877.724-.69 3.929 4.123 7.6-7.875.72.694z"
      ></path>
    </svg>

    <svg
      v-else
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      class="icon-copy"
    >
      <title>Copy Button</title>
      <path d="M14 1.5H6l-.5.5v2.5h1v-2h7v7h-2v1H14l.5-.5V2l-.5-.5z"></path>
      <path d="M2 5.5l-.5.5v8l.5.5h8l.5-.5V6l-.5-.5H2zm7.5 8h-7v-7h7v7z"></path>
    </svg>
  </button>
</template>

<style scoped>
.copyCode-button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  height: 2rem;
  width: 2rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  box-sizing: border-box;
  background: #d9d9d9;
  color: #1e1e1e;
  border: none;
  /* box-shadow: 0 0 0 1px var(--gray-6); */
  border-radius: 3px;
  /* text-shadow: #c4c4c4 0 0 2px; */
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
  background: #313131;

  color: var(--gray-7);
  border: none;
  /* box-shadow: 0 0 0 1px var(--gray-3); */
  border-radius: 3px;
  /* text-shadow: #c4c4c4 0 0 2px; */
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
  background-color: #b6b6b6;
  --focus-shadow: 0 0 0 var(--focus-size) var(--focus-color);
}

[theme="dark"] .copyCode-button:hover,
[theme="dark"] .copyCode-button:focus {
  cursor: pointer;
  background-color: #3d3d3d;
  --focus-shadow: 0 0 0 var(--focus-size) var(--focus-color);
}

.copyCode-button::after::-webkit-scrollbar {
  display: none;
}

.icon-copy,
.icon-ok {
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.icon-ok {
  color: #2db35e;
}
</style>
