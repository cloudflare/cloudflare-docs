{{- range .Page.Pages.GroupByParam "task_type" -}}
  {{- $firstPage := index .Pages 0 }}

##  {{ $firstPage.Params.model.task.name }}

{{ $firstPage.Params.model.task.description }}

| Model | Model ID      | Description                  |
|-------|---------------|------------------------------|
  {{- range .Pages -}}
    {{- $params := .Params }}
| [{{ $params.model_display_name }}]({{ .RelPermalink }}) | `{{$params.model.name}}` | {{ $params.model.description }}
  {{- end -}}
{{- end -}}