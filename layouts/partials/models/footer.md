{{ $modelContent := (index $.Site.Data.models.content.models .Page.Params.model_display_name) }}
{{ $taskContent := (index $.Site.Data.models.content.tasks .Page.Params.task_type) }}

{{ $hasLinks := or (isset $modelContent "links") (isset $taskContent "links") }}

{{ if $hasLinks }}
## More resources
  {{ range (index $modelContent "links") }}
- [{{ .name }}]({{ .url }})
  {{- end }}
  {{ range (index $taskContent "links") }}
- [{{ .name }}]({{ .url }})
  {{- end }}

{{ end }}