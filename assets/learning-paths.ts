import { learning_paths as paths } from "./json-collector";

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

function getSelectValues(selectElementCollection: HTMLCollectionOf<Element>) {
  let selectedValues: Record<string, string> = {};
  for (const htmlElement of selectElementCollection) {
    let selectElement = htmlElement as HTMLSelectElement;
    let selectedValue =
      selectElement.options[selectElement.selectedIndex].value;
    selectedValues[selectElement.id] = selectedValue;
  }
  return selectedValues;
}

export function filterResults() {
  const pathGrid = document.getElementById("pathGrid");
  if (pathGrid) {
    const selectorDropdowns = document.getElementsByClassName("selectorFilter");
    let passed = [];
    for (const dropdown of selectorDropdowns) {
      dropdown.addEventListener("change", () => {
        let selectedOptions = getSelectValues(selectorDropdowns);
        if (
          Object.values(selectedOptions).every(
            (selectedValue) => selectedValue === "all"
          )
        ) {
          passed = paths;
        } else {
          passed = paths.filter((currentPath) => {
            let keepItem = true;
            for (const [filterName, filterValue] of Object.entries(
              selectedOptions
            )) {
              if (filterValue === "all") {
                continue;
              } else if (currentPath["additional_groups"] && filterName === "product_group" && currentPath["additional_groups"].includes(filterValue)) {
                continue;
              }
              else if (!currentPath[filterName].includes(filterValue) ) {
                keepItem = false;
                break;
              }
            }
            return keepItem;
          });
        }
        buildHtml(pathGrid, passed);
      });
    }
  }
}
