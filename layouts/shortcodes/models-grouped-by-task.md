{{- range .Page.Pages.GroupByParam "task_type" -}}
{{- $firstPage := index .Pages 0 }}

## {{ $firstPage.Params.model.task.name }}

{{ $firstPage.Params.model.task.description }}

<style>
table th:first-of-type {
    width: 10em;
}
</style>

| Model | Description |
| ----- | ----------- |

{{- $pages := .Pages -}}
{{- range sort $pages "Params.weight" "desc" -}}
{{- $params := .Params }}
{{- $betaFlag := false }}
{{- $loraFlag := false }}
{{- range $params.model.properties }}
{{- if and (eq .property_id "beta") (eq .value "true") }}
{{- $betaFlag = true }}
{{- end }}
{{- if and (eq .property_id "lora") (eq .value "true") }}
{{- $loraFlag = true }}
{{- end }}
{{- end }}
| [{{ $params.model_display_name }}{{ if $betaFlag }} <span class="DocsMarkdown--pill DocsMarkdown--pill-beta" style="width: max-content">Beta</span>{{ end }}{{ if $loraFlag }} <span class="DocsMarkdown--pill DocsMarkdown--pill-deprecated" style="width: max-content">Lora</span>{{ end }}]({{ .RelPermalink }}) | {{ $params.model.description }} |
{{- end -}}
{{- end -}}
