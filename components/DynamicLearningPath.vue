<script setup lang="ts">
import { ref, computed } from "vue";
import { learning_paths as paths } from "../assets/json-collector";

interface LearningPath {
  path: string;
  title: string;
  priority: number;
  description: string;
  products: string[];
  product_group: string[];
  elements: Element[];
  detailed_description?: string;
}

interface Element {
  type: string;
  title?: string;
  description?: string;
  pages?: Page[];
  estimated_time?: number;
  id?: string;
  choices?: Choice[];
  visible_by_default?: boolean;
  variables?: Variable[];
}

interface Page {
  url_path: string;
  link_title: string;
  additional_description?: string;
  external_link?: boolean;
}

interface Choice {
  name: string;
  value: boolean;
}

interface Variable {
  name: string;
  value: boolean;
  postpone_evaluation?: boolean;
}
// Since we're keying off the actual hostname of the page matching the hostname specified in the json file,
// need to make sure the page exactly matches via ending slash (if not already there).
const currentPath = paths.find(
  (path) =>
    path.path === location.pathname || path.path === `${location.pathname}/`
) as LearningPath;

let filteredElements = currentPath.elements.filter(
  (element) => element.visible_by_default !== false
);

const elements = ref(filteredElements);

const onlyModules = computed(() => {
  return elements.value.filter((item) => item.type === "module");
});
const overallTimeEstimate = computed(() => {
  let onlyTimeEstimates = elements.value
    .filter((item) => item.estimated_time)
    .map((item) => item.estimated_time) as number[];
  let totalMin = onlyTimeEstimates.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  return `${hours} hours and ${minutes} minutes`;
});

function onRadioButtonChange() {
  const selectedOptions = document.querySelectorAll(
    "input[type=radio]:checked"
  ) as NodeListOf<HTMLInputElement>;
  elements.value = currentPath.elements.filter((element) => {
    let keepItem = true;
    if (element.variables) {
      for (const i in element.variables) {
        let variableActive = false;

        for (let index = 0; index < selectedOptions.length; index++) {
          const item = selectedOptions[index];
          if (item.name === element.variables[i].name) {
            variableActive = true;
            if (item.value !== element.variables[i].value.toString()) {
              keepItem = false;
            }
          }
        }

        if (!variableActive && !element.variables[i].postpone_evaluation) {
          return false;
        }
      }
      return keepItem;
    } else {
      return keepItem;
    }
  });
}
function calculateModuleNumber(module: Element) {
  let filteredModules = elements.value.filter((item) => item.type === "module");
  let foundIdx = filteredModules.findIndex(
    (elem, idx) => module.title === filteredModules[idx].title
  );
  return (foundIdx + 1).toString();
}
function slugify(stringInput: string | undefined): string {
  return stringInput?.toLowerCase().replaceAll(" ", "-") ?? "";
}
</script>

<template>
  <div>
    <p class="estimate">
      This learning path contains
      <span>{{ onlyModules.length }} modules</span> and should take you around
      <span>{{ overallTimeEstimate }}</span
      >.
    </p>
  </div>
  <div class="background">
    <div v-for="(element, index) in elements" v-on:change="onRadioButtonChange">
      <div
        class="learningPathModule"
        v-if="element.type === 'module' || element.type === 'note'"
      >
        <div class="moduleHeader">
          <h2 :id="slugify(element.title)">
            <span class="DocsMarkdown--header-anchor-positioner">
              <a
                class="DocsMarkdown--header-anchor Link Link-without-underline"
                :href="'#' + slugify(element.title)"
                >&#8203;​</a
              >
            </span>
            <span v-if="element.type === 'module'"
              >Step {{ calculateModuleNumber(element) }} -
              {{ element.title }}</span
            >
            <span v-if="element.type === 'note'">{{ element.title }}</span>
          </h2>
          <p v-if="element.estimated_time" class="durationEstimate">
            ~{{ element.estimated_time }} mins
          </p>
        </div>
        <div v-if="element.description" v-html="element.description"></div>
        <details v-if="element.pages" class="pathDetails">
          <summary v-if="element.type === 'module'">
            Contains {{ element.pages.length }} units
          </summary>
          <summary v-if="element.type === 'note'">
            Contains {{ element.pages.length }} related resources
          </summary>
          <div>
            <ul>
              <li v-for="page in element.pages">
                <a :href="page.url_path" target="_blank"
                  >{{ page.link_title }}
                  <span
                    v-if="page.external_link"
                    class="DocsMarkdown--link-external-icon"
                    aria-hidden="true"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 16 16"
                      role="img"
                      aria-labelledby="title-4744738674102027"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title id="title-4744738674102027">
                        External link icon
                      </title>
                      <path
                        d="M6.75,1.75h-5v12.5h12.5v-5m0,-4v-3.5h-3.5M8,8l5.5-5.5"
                      ></path>
                    </svg>
                    <span is-visually-hidden>Open external link</span>
                  </span>
                </a>
                <div
                  v-if="page.additional_description"
                  class="learningPathNote"
                  v-html="page.additional_description"
                ></div>
              </li>
            </ul>
          </div>
        </details>
      </div>
      <div v-else-if="element.type === 'question'">
        <hr class="questionBreak" />
        <div class="question" :id="element.id">
          <fieldset :id="element.id">
            <legend v-html="element.description"></legend>
            <div v-for="choice in element.choices">
              <input
                class="questionChoice"
                type="radio"
                :name="element.id"
                :id="choice.name"
                :value="choice.value"
                @change="onRadioButtonChange()"
              />
              <label :for="choice.name">{{ choice.name }}</label>
            </div>
          </fieldset>
        </div>
        <hr class="questionBreak" />
      </div>
    </div>
  </div>
</template>

<style></style>
