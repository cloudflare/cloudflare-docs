import { learning_paths as paths } from "json-collector";


let current_path;
const regex = '\/$'

for (const item in paths) {
    let amended_path = location.pathname
    if (!location.pathname.match(regex)) {
        amended_path += '/'
    }
    if (paths[item].path === amended_path) {
        current_path = paths[item];
    }
}

let filteredElements = current_path.elements.filter(element => { return element.visible_by_default !== false})

Vue.createApp({
    methods: {
        onRadioButtonChange() {
            const selectedOptions = document.querySelectorAll('input[type=radio]:checked');
            this.elements = current_path.elements.filter (element => {
                let keepItem = true;
                if (element.variables !== undefined) {
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
            filteredModules = this.elements.filter(item => item.type === "module");
            for (let element in filteredModules) {
                if (module.title === filteredModules[element].title) {
                    return (parseFloat(element) + 1).toString();
                }
            }
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
            <h2 :id="element.title.toLowerCase().replaceAll(' ', '-')"><span class="DocsMarkdown--header-anchor-positioner">
                <a
                class="DocsMarkdown--header-anchor Link Link-without-underline"
                :href="'#' + element.title.toLowerCase().replaceAll(' ', '-')"
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
            onlyTimeEstimates = this.elements.filter(item => item.estimated_time).map(item => item.estimated_time);
            let total_min = onlyTimeEstimates.reduce((previousValue, currentValue) => previousValue + currentValue,
            0);
            const hours = Math.floor(total_min / 60)
            const minutes = total_min % 60;
            return `${hours} hours and ${minutes} minutes`
        },
        individualTimeEstimate() {
            
        }
    },
    delimiters: ['[[', ']]'],
  }).mount('#dynamicPath');