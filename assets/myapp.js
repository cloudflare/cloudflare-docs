import { learning_paths as paths } from "json-collector";

let current_path;

for (const item in paths) {
    if (paths[item].path == location.pathname) {
        current_path = paths[item];
    }
}

Vue.createApp({
    data() {return {
        this: current_path
    }},
    delimiters: ['[[', ']]'],
  }).mount('#vapp');