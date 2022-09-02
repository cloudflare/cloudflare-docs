import * as learningPath from "./json/learning_paths.json";

let paths = learningPath["default"];
var filteredPaths = JSON.parse(JSON.stringify(paths));

function buildHtml(destination, array) {
  const numTrails = document.getElementById("numTrails");
  destination.innerHTML = "";
  if (array.length === 0) {
    numTrails.innerText = "0 results";
    destination.insertAdjacentHTML(
      "beforeend",
      "<p>Your search returned no results. Try using a different combination of filters.</p>"
    );
  } else {
    for (let key in array) {
      destination.insertAdjacentHTML(
        "beforeend",
        `<div class="individualPath">
         <p class="pathHeading">Learning path</p>
         <a href="${array[key]["path"]}"><h2>${array[key]["title"]}</h2></a>
         <p>${array[key]["description"]}</p>
         </div>`
      );
    }
    numTrails.innerText = `${array.length} results`;
  }
}

function getSelectValues() {
  let ui_components = ["products", "category"];
  let selected_values = [];
  for (const component of ui_components) {
    let select = document.getElementById(component);
    let selected_value = select.options[select.selectedIndex].value;
    selected_values.push([component, selected_value]);
  }
  return selected_values;
}

export function filterResults() {
  const pathGrid = document.getElementById("pathGrid");
  if (pathGrid) {
    const selectorDropdowns = document.getElementsByClassName("selectorFilter");
    let passed = [];
    let array_length = 0;
    for (const dropdown of selectorDropdowns) {
      dropdown.addEventListener("change", () => {
        filteredPaths = JSON.parse(JSON.stringify(paths));
        let selectedOptions = getSelectValues();
        if (
          selectedOptions[0][1] === "all" &&
          selectedOptions[1][1] === "all"
        ) {
          passed = filteredPaths;
        } else {
          passed = filteredPaths.filter(function (element) {
            let failed = false;
            for (const option of selectedOptions) {
              if (option[1] === "all") {
                continue;
              } else if (!element[option[0]].includes(option[1])) {
                failed = true;
              }
            }
            if (!failed) {
              array_length += 1;
              return element;
            }
          });
        }
        buildHtml(pathGrid, passed);
      });
    }
  }
}
