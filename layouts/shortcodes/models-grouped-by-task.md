{{- range .Page.Pages.GroupByParam "task_type" -}}
{{- $firstPage := index .Pages 0 }}

## {{ $firstPage.Params.model.task.name }}

{{ $firstPage.Params.model.task.description }}

| Model | Description |
| ----- | ----------- |

{{- $pages := .Pages -}}
{{- range sort $pages "Params.weight" "desc" -}}
{{- $params := .Params }}
{{- $betaFlag := false }}
{{- range $params.model.properties }}
{{- if and (eq .property_id "beta") (eq .value "true") }}
{{- $betaFlag = true }}
{{- end }}
{{- end }}
| [{{ $params.model_display_name }}{{ if $betaFlag }} <div class="DocsMarkdown--pill DocsMarkdown--pill-beta">Beta</div>{{ end }}]({{ .RelPermalink }}) | {{ $params.model.description }} |
{{- end -}}
{{- end -}}
