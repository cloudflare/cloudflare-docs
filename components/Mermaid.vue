<script setup lang="ts">
import { onMounted, ref } from "vue";
import Mermaid from "mermaid";
Mermaid.mermaidAPI.initialize({ theme: "neutral", startOnLoad: false });

const props = defineProps({
  mermaid: String,
});

const svg = ref("");
onMounted(() => {
  Mermaid.mermaidAPI.render(
    `mermaid-${crypto.randomUUID()}`,
    decodeURIComponent(props.mermaid?.replaceAll("+", "%20") ?? ""),
    (g: string) => (svg.value = g)
  );
});
</script>

<template>
  <div class="mermaid" v-html="svg"></div>
</template>
