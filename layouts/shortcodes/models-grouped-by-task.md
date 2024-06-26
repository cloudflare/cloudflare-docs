<div class="selectorDropdowns">
  <label for="model-filter" style="margin-right: 0.25em;">Filter models:</label>

  <!-- values should match the pill text, lowercasedq -->
  <select name="models" id="model-filter">
    <option value="all">Select...</option>
    <option value="lora">LoRA</option>
    <option value="function calling">Function calling</option>
  </select>
</div>

{{- range .Page.Pages.GroupByParam "task_type" -}}
{{- $firstPage := index .Pages 0 -}}
{{- $name := $firstPage.Params.model.task.name -}}
{{- $description := $firstPage.Params.model.task.description -}}

<div data-task="{{ $name }}">
  <h2 id="{{ $name | urlize }}">{{ $name }}</h2>

  {{ $description }}

  <style>
    table th:first-of-type {
      width: 10em;
    }
  </style>

  <table>
    <thead>
      <tr>
        <th>Model</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {{- $pages := .Pages -}}
      {{- range sort $pages "Params.weight" "desc" -}}
      {{- $params := .Params -}}
      <tr>
        <td>
          <a href="{{.RelPermalink}}" class="DocsMarkdown--link">
            <span class="DocsMarkdown--link-content">
              {{- $params.model_display_name -}}
              {{- range $params.model.properties -}}
              {{ with (and (eq .property_id "beta") (eq .value "true")) }}
              <span data-pill class="DocsMarkdown--pill DocsMarkdown--pill-beta" style="margin-top: 0.75em; width: max-content">Beta</span>
              {{- end -}}
              {{ with (and (eq .property_id "lora") (eq .value "true")) }}
              <span data-pill class="DocsMarkdown--pill DocsMarkdown--pill-early-access" style="margin-top: 0.75em; width: max-content">LoRA</span>
              {{- end -}}
              {{ with (and (eq .property_id "function_calling") (eq .value "true")) }}
              <span data-pill class="DocsMarkdown--pill DocsMarkdown--pill-alpha" style="margin-top: 0.75em; width: max-content">Function calling</span>
              {{- end -}}
              {{ with ((eq .property_id "planned_deprecation_date")) }}
              <span data-pill class="DocsMarkdown--pill DocsMarkdown--pill-deprecated" style="margin-top: 0.75em; width: max-content">Planned deprecation</span>
              {{- end -}}
              {{- end -}}
            </span>
          </a>
        </td>
        <td>{{- $params.model.description -}}</td>
      </tr>
      {{- end -}}
    </tbody>
  </table>
</div>
{{- end -}}

<script>
function filterModels() {
	const filter = select.value;
	const taskSections = document.querySelectorAll("div[data-task]");

	for (const task of taskSections) {
		const table = task.querySelector("table");
		const rows = table.querySelectorAll("tbody > tr");

		if (filter === "all") {
			task.style.display = "";
			rows.forEach((row) => (row.style.display = ""));
			continue;
		}

		let rowsHidden = 0;
		for (const row of rows) {
			const pills = row.querySelectorAll("[data-pill]");

			if (pills.length === 0) {
				row.style.display = "none";
				rowsHidden++;
				continue;
			}

			const arr = Array.from(pills);
			const hasPill = arr.find((x) => x.innerText.toLowerCase() === filter);

			if (hasPill) {
				task.style.display = "";
				row.style.display = "";
			} else {
				row.style.display = "none";
				rowsHidden++;
			}
		}

		if (rowsHidden >= rows.length) {
			task.style.display = "none";
		}
	}
}

const select = document.querySelector("#model-filter");
select.addEventListener("change", filterModels);
</script>