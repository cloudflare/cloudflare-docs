<script setup lang="ts">
import { onMounted, ref } from "vue";
import Mermaid from "mermaid";

const props = defineProps({
  mermaid: String,
});

const svg = ref("");
const render = () => {
  const theme = document.documentElement.getAttribute("theme");
  const mermaidTheme = theme === "dark" ? "dark" : "neutral";
  Mermaid.mermaidAPI.initialize({ theme: mermaidTheme, startOnLoad: false });

  Mermaid.mermaidAPI.render(
    `mermaid-${crypto.randomUUID()}`,
    decodeURIComponent(props.mermaid?.replaceAll("+", "%20") ?? ""),
    (g: string) => (svg.value = g)
  );
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
  <div class="mermaid" v-html="svg"></div>
</template>
