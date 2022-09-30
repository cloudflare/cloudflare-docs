import { learning_paths as paths } from "json-collector";

// Since we're keying off the actual hostname of the page matching the hostname specified in the json file,
// need to make sure the page exactly matches via ending slash (if not already there).

let currentPath;

for (const item in paths) {
    let amendedPath = location.pathname;
    if (!location.pathname.endsWith('/')) {
        amendedPath += '/';
    }
    if (paths[item].path === amendedPath) {
        currentPath = paths[item];
    }
}

let filteredElements = currentPath.elements.filter(element => element.visible_by_default !== false);

Vue.createApp({
    methods: {
        onRadioButtonChange() {
            const selectedOptions = document.querySelectorAll('input[type=radio]:checked');
            this.elements = currentPath.elements.filter (element => {
                let keepItem = true;
                if (element.variables) {
                    for (const i in element.variables) {
                        let variableActive = false;
                        selectedOptions.forEach((item) => {
                            if(item.name === element.variables[i].name) {
                                variableActive = true;
                               if (item.value !== element.variables[i].value.toString()) {
                                keepItem = false;
                               }
                            }
                        })
                        if (!variableActive) {
                           return false; 
                        } 
                    }
                    return keepItem;
                } else {
                    return keepItem;
                }
                })
            },
        calculateModuleNumber(module) {
            let filteredModules = this.elements.filter(item => item.type === "module");
            let foundIdx = filteredModules.findIndex((elem, idx) => module.title === filteredModules[idx].title);
            return (foundIdx + 1).toString();
        },
        slugify(stringInput) {
            return stringInput.toLowerCase().replaceAll(' ', '-');
        }
        },
    template: `
    <div>
        <p class="estimate">This learning path contains <span>[[ onlyModules.length ]] modules</span> and should take you around <span>[[ overallTimeEstimate ]]</span>.</p>
    </div>
    <div class="background">
    <div v-for="(element, index) in elements" v-on:change="onRadioButtonChange">
        <div class="learningPathModule" v-if="element.type === 'module'">
        <div class="moduleHeader">
            <h2 :id="slugify(element.title)"><span class="DocsMarkdown--header-anchor-positioner">
                <a
                class="DocsMarkdown--header-anchor Link Link-without-underline"
                :href="'#' + slugify(element.title)"
                >&#8203;​</a
                >
            </span>
            <span>Step [[ calculateModuleNumber(element) ]] - [[ element.title ]]</span>
            </h2>
            <p v-if="element.estimated_time" class="durationEstimate">~[[ element.estimated_time ]] mins</p>
        </div>
        <div v-if="element.description" v-html="element.description"></div>
        <details>
            <summary>Contains [[ element.pages.length ]] units</summary>
            <div>
                <ul>
                    <li v-for="page in element.pages"><a :href="page.url_path" target="_blank">[[ page.link_title ]]
                        <span v-if="page.external_link" class="DocsMarkdown--link-external-icon" aria-hidden="true">
                        <svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 16 16" role="img" aria-labelledby="title-4744738674102027" xmlns="http://www.w3.org/2000/svg">
                            <title id="title-4744738674102027">External link icon</title>
                            <path d="M6.75,1.75h-5v12.5h12.5v-5m0,-4v-3.5h-3.5M8,8l5.5-5.5"></path>
                        </svg>
                        <span is-visually-hidden>Open external link</span>
                        </span>
                    </a>
                    <div v-if="page.additional_description" class="learningPathNote" v-html="page.additional_description"></div>
                    </li>
                </ul>
            </div>
        </details>
        </div>
        <div v-else-if="element.type === 'question'">
        <hr class="questionBreak">
        <div class="question" :id="element.id">
            <fieldset :id="element.id">
            <legend v-html="element.description"></legend>
                <div v-for="choice in element.choices">
                    <input type="radio" :name="element.id" :id="choice.value" 
                    :value=choice.value @change="onRadioButtonChange()">
                    <label :for="choice.name">[[ choice.name ]]</label>
                </div>
            </fieldset>
        </div>
        <hr class="questionBreak">
        </div>
    </div>
    </div>`,
    data() {return {
        elements: filteredElements
    }},
    computed: {
        onlyModules() {
            return this.elements.filter(item => item.type === "module");
        },
        overallTimeEstimate() {
            let onlyTimeEstimates = this.elements.filter(item => item.estimated_time).map(item => item.estimated_time);
            let totalMin = onlyTimeEstimates.reduce((previousValue, currentValue) => previousValue + currentValue,
            0);
            const hours = Math.floor(totalMin / 60)
            const minutes = totalMin % 60;
            return `${hours} hours and ${minutes} minutes`
        }
    },
    delimiters: ['[[', ']]'],
  }).mount('#dynamicPath');