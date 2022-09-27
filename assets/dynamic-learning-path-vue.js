import { learning_paths as paths } from "json-collector";


let current_path;

for (const item in paths) {
    if (paths[item].path == location.pathname) {
        current_path = paths[item];
    }
}

let filteredElements = current_path.elements.filter(element => { return element.visible_by_default !== false})

Vue.createApp({
    methods: {
        onRadioButtonChange(event) {
            this.elements = current_path.elements.filter (element => {
                if (element.type === "question") {
                    return element
                } else if (element.variables !== undefined) {
                    for (const i in element.variables) {
                        if (event.target.name === element.variables[i].name) {
                            return event.target.value === element.variables[i].value.toString()
                        }
                    }
                } else {
                    return element
                }
                
            })
        }
    },
    template: `
    <div class="background">
    <div v-for="element in elements" class="learningPathModule" v-on:change="onRadioButtonChange">
        <div v-if="element.type === 'module'">
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
            <p v-if="element.estimated_time" class="durationEstimate">[[ element.estimated_time ]]</p>
        </div>
        <div v-if="element.description" v-html="element.description"></div>
        <details>
            <summary>Contains [[ element.pages.length ]] units</summary>
            <div>
                <ul>
                    <li v-for="page in element.pages"><a :href="page.url_path" target="_blank">[[ page.link_title ]]</a></li>
                </ul>
            </div>
        </details>
        </div>
        <div v-else-if="element.type === 'question'" class="questionChoices" :id="element.id">
            <fieldset :id="element.id">
            <legend v-html="element.description"></legend>
                <div v-for="choice in element.choices">
                    <input type="radio" :name="element.id" :id="choice.value" 
                    :value=choice.value @change="onRadioButtonChange($event)">
                    <label :for="choice.name">[[ choice.name ]]</label>
                </div>
            </fieldset>
        </div>
    </div>
    </div>`,
    data() {return {
        elements: filteredElements
    }},
    delimiters: ['[[', ']]'],
  }).mount('#dynamicPath');