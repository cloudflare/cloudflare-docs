import * as learningPath from "./learning_paths.json"

let paths = learningPath["default"];

function buildHtml(destination, array) {
    destination.innerHTML = '';
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
        for (const dropdown of selectorDropdowns) {
            dropdown.addEventListener("change", () => {
                let filteredPaths = paths
                let selectedOptions = getSelectValues(["products", "roles", "difficulty"]);
                for (const option of selectedOptions) {
                    if(option[1] === 'all') {
                        continue
                    } else {
                        for (const i in filteredPaths) {
                            if (filteredPaths[i][option[0]].includes(option[1])) {
                                continue
                                } else {
                                    filteredPaths.splice(i, 1)
                                }
                            }
                        }
                    }
                
                console.log(filteredPaths)
                buildHtml(pathGrid, filteredPaths)
            }
        )}
      // add filtering function
  }
})();
  
 
  
  
  /* export function filterResults(this) {
  
   /*  const filters = document.getElementsByName("selectorDropdowns");
    
    if(filters){
      let filter_ids = ["products_filter", "roles_filter", "difficulty_filter"]
      
      for (const filter of filter_ids) {
        const filterElement = document.getElementById(filter);
        filterElement.addEventListener("change", function (){
          
          
          console.log(this.value);
          
        });
      } */
      
  
      
      
      
    
  
  
  
    /* 
    
      const result = document.querySelector("#search div"); 
      result.style.display = "block"; 
      if (searchBox.value.length > 0) { 
        const results = index.search(searchBox.value); 
        result.innerHTML = results
          .slice(0, MAX_SEARCH_RESULTS)
          .map(x => `<a href="${x.item.url}"> 
            <img src="${x.item.cover || ""}" 
               width="40" height="40"> 
            <h3>${x.item.title}</h3> 
            <span>${x.item.content.substr(0,40)}</span> 
          </a>`)
          .join(""); 
      } else { 
        result.innerHTML = ''; 
      } 
    }, 
    ... 
  }
   */