import { learning_paths as paths } from "json-collector";

export function init() {
    const currentLocation = window.location.href
  
    if (currentLocation.includes("/learning-paths/modules")) {
      let params = new URLSearchParams(document.location.search);
      let currentLearningPath = params.get("learning_path")
      let currentPathData;
  
      
  
      if ( currentLearningPath !== null ) {
  
        for (let path in paths) {
          if (paths[path]["uid"] === currentLearningPath) {
            currentPathData = paths[path]
          }
        }

        // Add learning path to breadcrumb list
        const firstLearningBreadcrumb = document.getElementById("firstLearningBreadcrumb");
        if (firstLearningBreadcrumb) {
            firstLearningBreadcrumb.insertAdjacentHTML("afterend", `<li id="firstLearningBreadcrumb">
            <a href="${currentPathData["path"]}" class="DocsMarkdown--link">
              <span class="DocsMarkdown--link-content">${currentPathData["title"]}</span></a>
          </li>`)
        }

        // Update final next link to point to the next module
        const nextModuleLink = document.getElementById("nextModuleLink");
        if (nextModuleLink && currentPathData !== undefined) {
          const moduleNameRegex = new RegExp('\/learning-paths\/modules\/(.*?)\/'); 
          const result = currentLocation.match(moduleNameRegex)
          const currentModule = result[1]
          let nextModule = ""
          
          currentPathData.modules.forEach((c, i) => {
            if (currentModule === c.uid) {
              if (i+1 < currentPathData.modules.length) {
                nextModule = currentPathData.modules[i+1]["uid"]
              }
            }
          
          })
          if (nextModule !== "") {
            nextModuleLink.setAttribute("href", "/learning-paths/modules/" + nextModule + "?learning_path=" + currentLearningPath)
            nextModuleLink.innerHTML = "Continue to next module >"
          } else {
            nextModuleLink.innerHTML = "Finish learning path >"
            nextModuleLink.setAttribute("href", "/learning-paths/")
          }
        }
  
        // Update navigational links to keep the current context
        const navigationLinks = document.getElementsByClassName("learningNavigation");
        if(navigationLinks) {
          for (let item of navigationLinks) {
            const currentHref = item.getAttribute("href")
            item.setAttribute("href", currentHref + "?learning_path=" + currentLearningPath)
          }
        }

        // Update breadcrumbs to keep the current context
        const subsequentBreacrumb = document.getElementsByClassName("subsequentBreacrumb");
        if(subsequentBreacrumb) {
          for (let item of subsequentBreacrumb) {
            const currentHref = item.getAttribute("href")
            item.setAttribute("href", currentHref + "?learning_path=" + currentLearningPath)
          }
        }

        // Update side nav to keep the current context
        const navLinks = document.getElementsByClassName("DocsSidebar--nav-link");
        if(navLinks) {
          for (let item of navLinks) {
            const currentHref = item.getAttribute("href")
            item.setAttribute("href", currentHref + "?learning_path=" + currentLearningPath)
          }
        }        
      }
    }
  }