import * as learningPath from "./json/learning_paths.json"

let paths = learningPath["default"];
var filteredPaths = JSON.parse(JSON.stringify(paths))

function buildHtml(destination, array) {
    destination.innerHTML = '';
    if (array.length === 0) {
        destination.insertAdjacentHTML("beforeend", "<p>Your search returned no results. Try using a different combination of filters.</p>")
    } else {
    for (let key in array) {
        destination.insertAdjacentHTML("beforeend", 
        `<div class="individualPath">
         <p class="pathHeading">Learning path</p>
         <a href="${ array[key]["path"] }"><h2>${ array[key]["title"] }</h2></a>
         <p>${ array[key]["description"] }</p>
         </div>`
         )
    }
}
}

function getSelectValues(array) {
    let ui_components = array;
    let selected_values = [];
    for (const component of ui_components) {
        let select = document.getElementById(component);
        let selected_value = select.options[select.selectedIndex].value;
        selected_values.push([component, selected_value]);
}
    return selected_values;
}

(function () {
    if (window.location.pathname === "/learning-paths/" || window.location.pathname === "/learning-paths") {
        const pathGrid = document.getElementById("pathGrid"); 
      
        window.onload = (event) => {
            buildHtml(pathGrid, paths)
      }
        const selectorDropdowns =  document.getElementsByClassName("selectorFilter");
        let passed = []
        for (const dropdown of selectorDropdowns) {
            dropdown.addEventListener("change", () => {
                filteredPaths = JSON.parse(JSON.stringify(paths))
                let selectedOptions = getSelectValues(["products", "roles", "difficulty"]);
                if (selectedOptions[0][1] === 'all' && selectedOptions[1][1] === 'all' && selectedOptions[2][1] === 'all') {
                    passed = filteredPaths
                } else {
                for (const option of selectedOptions) {
                    if(option[1] === 'all') {
                        continue
                    } 
                    
                    passed = filteredPaths.filter(element => element[option[0]].includes(option[1]));    

                    /* for (const i in filteredPaths) {
                        console.log(`${filteredPaths[i].path} contains ${filteredPaths[i][option[0]]}`)
                        if (!filteredPaths[i][option[0]].includes(option[1])) {
                            console.log(`${filteredPaths[i].path}`)
                            filteredPaths.splice(i, 1)
                        }
                        } */
                    }
                }
                buildHtml(pathGrid, passed)
            }
        )}
        
  }
})();