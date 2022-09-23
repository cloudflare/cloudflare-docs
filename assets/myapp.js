import { learning_paths as paths } from "json-collector";

let current_path;

for (const item in paths) {
    if (paths[item].path == location.pathname) {
        current_path = paths[item];
    }
}

console.log(current_path)

Vue.createApp({
    template: `<div class='header'>
    <h1>[[ title ]]</h1>
    <p><em>Learning path</em></p>
    <p>[[ description ]]</p>
    </div>
    <div class="background">
    <div v-for="element in elements" class="learningPathModule">
        <div class="moduleHeader">
            <h2 :id="element.title.toLowerCase().replaceAll(' ', '-')"><span class="DocsMarkdown--header-anchor-positioner">
                <a
                class="DocsMarkdown--header-anchor Link Link-without-underline"
                :href="'#' + element.title.toLowerCase().replaceAll(' ', '-')"
                >&#8203;​</a
                >
            </span>
            <span>[[ element.title ]]</span>
            </h2>
        </div>
    </div>
    </div>`,
    props: ['title','name'],
    data() {return {
        title: current_path.title,
        description: current_path.description,
        elements: current_path.elements
    }},
    delimiters: ['[[', ']]'],
  }).mount('#vapp');