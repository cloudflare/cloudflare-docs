<script setup lang="ts">
import { onMounted, ref } from "vue";
import mermaid from "mermaid";

const props = defineProps({
  mermaid: String,
});

const element = ref("");
const render = () => {
  const theme = document.documentElement.getAttribute("theme");
  const mermaidTheme = theme === "dark" ? "dark" : "neutral";
  mermaid.initialize({ theme: mermaidTheme, startOnLoad: false });

  mermaid
    .render(
      `mermaid-${crypto.randomUUID()}`,
      decodeURIComponent(props.mermaid?.replaceAll("+", "%20") ?? "")
    )
    .then(({ svg }) => {
      element.value = svg;
    });
};

onMounted(() => {
  render();
  const observer = new MutationObserver((mutations) => render());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["theme"],
  });
});
</script>

<template>
  <div class="mermaid" v-html="element"></div>
</template>
