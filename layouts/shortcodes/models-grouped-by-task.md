{{- range .Page.Pages.GroupByParam "task_type" -}}
  {{ $firstPage := index (.Pages) 0 -}}

##  {{ $firstPage.Params.task.name }}

{{ $firstPage.Params.task.description }}

| Model | Model ID      | Description                  |
|-------|---------------|------------------------------|
  {{- range .Pages -}}
    {{- $model := .Params.model }}
| [{{ $model.name }}]({{ .RelPermalink }}) | `@{{ $model.id }}` | {{ $model.description }}
  {{ end -}}
{{- end -}}