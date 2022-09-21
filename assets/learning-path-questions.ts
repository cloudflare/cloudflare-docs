
import { learning_paths as paths } from "json-collector";

let current_path;

for (const item in paths) {
    if (paths[item].path == location.pathname) {
        current_path = paths[item];
    }
}

function buildLearningPath (){
    console.log(current_path)
    const pathContainer = document.getElementById("path-container");
    pathContainer.innerHTML = "";    

    for (let e in current_path.elements) {
        
        // Define the various elements we'll be building with
        const moduleDiv = document.createElement("div");
        moduleDiv.className = "learningPathModule"

        const moduleHeaderDiv = document.createElement("div");
        moduleHeaderDiv.className = "moduleHeader";

        const moduleHeader = document.createElement("h2")

        const timeEstimate = document.createElement("p")
        timeEstimate.className = "durationEstimate"

        const moduleDescription = document.createElement("p")

        const detailsComponent = document.createElement("details")

        const summaryValue = document.createElement("summary")
        const pagesListDiv = document.createElement("div")
        const pagesList = document.createElement("ul")

        let element = current_path.elements[e]
        if (element["type"] == "module") {
            moduleHeader.textContent = element.title
            moduleHeaderDiv.append(moduleHeader)
            moduleDiv.append(moduleHeaderDiv)
            if (element.estimated_time !== undefined) {
                timeEstimate.textContent = element.estimated_time
                moduleHeaderDiv.append(timeEstimate)
            } 
            if (element.description !== undefined) {
                moduleDescription.innerHTML = element.description
                moduleDiv.append(moduleDescription)
            }

            let num_units = element.pages.length
            summaryValue.textContent = `Contains ${num_units} units`

            for (let item in element.pages) {
                const listItem = document.createElement("li")
                listItem.textContent = element.pages[item].url_path
                pagesList.append(listItem)
            }

            if (e == 0) {
                detailsComponent.setAttribute("open", '')
            }

            pagesListDiv.append(pagesList)
            detailsComponent.appendChild(summaryValue)
            detailsComponent.appendChild(pagesListDiv)
            moduleDiv.append(detailsComponent)

            pathContainer.append(moduleDiv)
    }
}
}

/*
<div class="learningPathModule">
{{ if eq .type "module" }}
<div class="moduleHeader">
<h2 id="{{ .title | safeURL | anchorize }}"><span class="DocsMarkdown--header-anchor-positioner">
    <a
      class="DocsMarkdown--header-anchor Link Link-without-underline"
      href="#{{ .title | safeURL | anchorize }}"
      >&#8203;​</a
    >
  </span>
  <span>{{.title}}</span>
</h2>
{{ with .estimated_time }}
<p class="durationEstimate">{{ . }}</p>
{{- end -}}
</div>
{{ with .description }}
<p>{{. | markdownify }}</p>
{{ end }}
*/

/* 
{{ end }}
{{- if eq $index 0 -}}
<details open>
{{ else }}
<details>
{{ end }}
<summary>Contains {{len .pages}} units</summary>
<div>
    <ul>
    {{- range .pages -}}
    {{- if isset . "external_link" -}}
        <li><a href="{{.url_path}}" target="_blank">{{.link_title}}  {{- partialCached "external.icon" . -}}</a>
    {{- else if isset . "link_title" -}}
        <li><a href="{{.url_path}}" target="_blank">{{.link_title}}</a>
    {{- else -}}
    {{- with $.Site.GetPage (replaceRE "/$" "" .url_path) -}}
    
    <li><a href="{{ .RelPermalink }}" target="_blank">{{ .Title }}</a>
    {{- end -}}
    {{- end -}}

    {{with .additional_description}}
    <div class="learningPathNote">{{- . | markdownify -}}</div>
    {{- end -}}
    
    </li>
    {{- end -}}
    </ul>

</div>
</details>

{{ else if eq .type "question"}}
<div id="questionChoices">
{{ $id :=  .id }}
<fieldset id="{{ $id }}">
  <legend>{{ .question | markdownify }}</legend>
  {{ range .choices }}
  <div>
    <input type="radio" name="{{$id}}" id="{{ .value | lower }}" value="{{ .value | lower }}">
    <label for="{{ .name | lower }}">{{ .name }}</label>
  </div>
{{ end }}
</fieldset>
</div>
{{- end -}}
</div>

{{- end -}}

</div> */





/*
function filterByQuestion() {
    const questionChoices = document.getElementById("questionChoices");
    if (questionChoices) {
      questionChoices.addEventListener("change", (e) => {
        console.log(`${e.target.value}`)
        console.log(`${e.target.name}`)
      })
    }
  }
  */

buildLearningPath();
