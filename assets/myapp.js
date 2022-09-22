import { learning_paths as paths } from "json-collector";

let current_path;

for (const item in paths) {
    if (paths[item].path == location.pathname) {
        current_path = paths[item];
    }
}

console.log(current_path)

var vueApp = Vue.createApp({
    data() {return {display: `This is ${current_path.title}`}},
    delimiters: ['[[', ']]'],
  }).mount('#vapp');