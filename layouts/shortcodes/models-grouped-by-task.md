{{- range .Page.Pages.GroupByParam "task_type" -}}
{{- $firstPage := index .Pages 0 }}

## {{ $firstPage.Params.model.task.name }}

{{ $firstPage.Params.model.task.description }}

<style>
table th:first-of-type {
    width: 10em;
}
</style>

{{ $now := time.Now }}

| Model | Description |
| ----- | ----------- |

{{- $pages := .Pages -}}
{{- range sort $pages "Params.weight" "desc" -}}
{{- $params := .Params }}
{{- $betaFlag := false }}
{{- $loraFlag := false }}
{{- $deprecationFlag := false }}
{{- $deprecationValue := "" -}}
{{- $functionCallingFlag := false }}
{{- range $params.model.properties }}
{{- if and (eq .property_id "beta") (eq .value "true") }}
{{- $betaFlag = true }}
{{- end }}
{{- if and (eq .property_id "lora") (eq .value "true") }}
{{- $loraFlag = true }}
{{- end }}
{{- if (eq .property_id "planned_deprecation_date") }}
{{- $deprecationFlag = true }}
{{- $deprecationValue = .value -}}
{{- end }}
{{- if and (eq .property_id "function_calling") (eq .value "true") }}
{{- $functionCallingFlag = true }}
{{- end }}
{{- end }}
| [{{ $params.model_display_name }}{{ if $betaFlag }} <span class="DocsMarkdown--pill DocsMarkdown--pill-beta" style="width: max-content">Beta</span>{{ end }}{{ if $loraFlag }} <span class="DocsMarkdown--pill DocsMarkdown--pill-early-access" style="width: max-content">LoRA</span>{{ end }}{{ if $functionCallingFlag }} <span class="DocsMarkdown--pill DocsMarkdown--pill-alpha" style="width: max-content">Function calling</span>{{ end }}{{ if $deprecationFlag }} <span class="DocsMarkdown--pill DocsMarkdown--pill-deprecated" style="width: max-content">{{ if $now.After (time.AsTime $deprecationValue) }}Deprecated{{ else }}Planned deprecation{{ end }}</span>{{ end }}]({{ .RelPermalink }}) | {{ $params.model.description }} |
{{- end -}}
{{- end -}}
