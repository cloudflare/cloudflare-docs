<script setup lang="ts">
import * as recommendations from "../assets/dashboard-landing.json";

const data = recommendations.resources;
type ResourceItem = typeof data[0];

const defaultItem: ResourceItem = data.find(
  (element) => element.id === "Default"
) as ResourceItem;

const search = new URLSearchParams(window.location.search);

const dashArea = search.get("dash_area");

const visibleData = dashArea
  ? data
      .filter((item) => dashArea.includes(item.dashPath))
      .reduce((a, b) => {
        return a.dashPath.length > b.dashPath.length ? a : b;
      }, defaultItem)
  : defaultItem;
</script>

<template>
  <div class="recommendations">
    <ul class="recommendationList" v-if="visibleData">
      <li
        class="recommendationLink"
        v-for="element in visibleData.recommendations"
      >
        <a :href="element.url_path" target="_blank">{{ element.title }}</a>
      </li>
    </ul>
    <br />
    <div>
      Not finding what you need? <a href="/search/">Search the docs</a>,
      <a href="https://support.cloudflare.com/hc/requests">view tickets</a>, or
      <a href="/products/">browse products</a>.
    </div>
  </div>
</template>

<style scoped>
.recommendations {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recommendationList li {
  list-style-type: none;
  padding-bottom: 0.25em;
}

.recommendationLink {
  font-size: 1.2em;
}

.recommendations a {
  color: #0055dc;
}

[theme="dark"] .recommendations a {
  color: #ff9e40;
}
</style>
