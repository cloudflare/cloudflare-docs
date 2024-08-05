import { learning_paths as paths, type LearningPath } from "./json-collector";

function buildHtml(destination: HTMLElement, array: LearningPath[]) {
  const numTrails = document.querySelector<HTMLElement>("#numTrails");
  if(!numTrails) return;

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

type Filterable = 'product_group' | 'products';
type FilterableObj = {
  [key in Filterable]?: string;
}
function getSelectValues(selectElementCollection: NodeListOf<HTMLSelectElement>) {
  let selectedValues: FilterableObj = {};
  for (const htmlElement of selectElementCollection) {
    let selectElement = htmlElement;
    let selectedValue =
      selectElement.options[selectElement.selectedIndex].value;
    selectedValues[selectElement.id as Filterable] = selectedValue;
  }
  return selectedValues;
}

function filterResults() {
  const pathGrid = document.querySelector<HTMLElement>("#pathGrid");
  if (pathGrid) {
    const selectorDropdowns = document.querySelectorAll<HTMLSelectElement>(".selectorFilter");
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
              else if (!currentPath[filterName as Filterable]?.includes(filterValue) ) {
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

filterResults();
