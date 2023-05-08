import { learning_paths as paths } from "./json-collector";

(function () {
  const currentLocation = window.location.href;
  const params = new URLSearchParams(document.location.search);
  const currentLearningPath = params.get("learning_path");
  let currentPathData;

  if (currentLearningPath !== null) {
    for (const path in paths) {
      if (paths[path]["uid"] === currentLearningPath) {
        currentPathData = paths[path];
      }
    }

    // Add learning path to breadcrumb list
    const firstLearningBreadcrumb = document.getElementById(
      "firstLearningBreadcrumb"
    );
    if (firstLearningBreadcrumb) {
      firstLearningBreadcrumb.insertAdjacentHTML(
        "afterend",
        `<li id="firstLearningBreadcrumb">
            <a href="${currentPathData["path"]}" class="DocsMarkdown--link">
              <span class="DocsMarkdown--link-content">${currentPathData["title"]}</span></a>
          </li>`
      );
    }

    // Update the link and title of the path in side navigation
    const titleNavText = document.getElementsByClassName("DocsSidebar--docs-title-text-scaler")
    const titleLength = currentPathData["title"].length
    if (titleNavText) {
      for (const item of titleNavText) {
        item.setAttribute("style", `--length:${titleLength}`)
        item.innerHTML = currentPathData["title"]
      }
    }
    
    const titleNavLinks = document.getElementsByClassName("DocsSidebar--docs-title-logo-link");
    if (titleNavLinks) {
      for (const item of titleNavLinks) {
        item.setAttribute("href", currentPathData["path"])
      }
    }

    // Update final next link to point to the next module
    const nextModuleLink = document.getElementById("nextModuleLink");
    if (nextModuleLink && currentPathData) {
      const moduleNameRegex = new RegExp("/learning-paths/modules/.*?/(.*?)/");
      const result = currentLocation.match(moduleNameRegex);
      const currentModule = result[1];
      let nextModule = "";

      currentPathData.modules.forEach((c, i) => {
        if (currentModule === c.uid) {
          if (i + 1 < currentPathData.modules.length) {
            nextModule =
              currentPathData.modules[i + 1]["folder"] +
              "/" +
              currentPathData.modules[i + 1]["uid"] +
              "/";
          }
        }
      });

      if (nextModule === "") {
        nextModuleLink.innerHTML = "Finish learning path >";
        nextModuleLink.setAttribute("href", "/learning-paths/");
      } else {
        nextModuleLink.setAttribute(
          "href",
          "/learning-paths/modules/" +
            nextModule +
            "?learning_path=" +
            currentLearningPath
        );
        nextModuleLink.innerHTML = "Continue to next module >";
      }
    }

    // Update navigational links to keep the current context
    const navigationLinks =
      document.getElementsByClassName("learningNavigation");
    if (navigationLinks) {
      for (const item of navigationLinks) {
        const currentHref = item.getAttribute("href");
        item.setAttribute(
          "href",
          currentHref + "?learning_path=" + currentLearningPath
        );
      }
    }

    // Update breadcrumbs to keep the current context
    const subsequentBreacrumb = document.getElementsByClassName(
      "subsequentBreacrumb"
    );
    if (subsequentBreacrumb) {
      for (const item of subsequentBreacrumb) {
        const currentHref = item.getAttribute("href");
        item.setAttribute(
          "href",
          currentHref + "?learning_path=" + currentLearningPath
        );
      }
    }

    // Update side nav to keep the current context
    const navLinks = document.getElementsByClassName("DocsSidebar--nav-link");
    if (navLinks) {
      for (const item of navLinks) {
        const currentHref = item.getAttribute("href");
        item.setAttribute(
          "href",
          currentHref + "?learning_path=" + currentLearningPath
        );
      }
    }

    // Update links w/in the body content to keep the current context
    const docContent =
      document.getElementById("main");
    const bodyLinks = docContent.getElementsByClassName("DocsMarkdown--link")
    if (bodyLinks) {
      for (const item of bodyLinks) {
        const currentHref = item.getAttribute("href");
        if (currentHref.includes('/learning-paths/modules/')) {
        item.setAttribute(
          "href",
          currentHref + "?learning_path=" + currentLearningPath
        );
      }
    }
    }
  }
})();
