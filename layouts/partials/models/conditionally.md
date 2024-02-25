{{ $conditionalName := .Scratch.Get "conditional-name"}}
{{ $modelTemplates := (index $.Site.Data.models.content.models .Page.Params.model_display_name) }}
{{ $taskTemplates := (index $.Site.Data.models.content.tasks .Page.Params.task_type) }}
{{ $partialsRoot := "layouts/partials/"}}

{{ $conditionalTemplate := printf "models/%s/%s.md" $conditionalName .Page.Params.model_display_name }}
{{if fileExists (printf "%s%s" $partialsRoot $conditionalTemplate) }}
  {{ partial $conditionalTemplate . }}
{{ else }}
  {{ $conditionalTemplate = printf "models/%s/%s.md" $conditionalName .Page.Params.task_type }}
  {{if fileExists (printf "%s%s" $partialsRoot $conditionalTemplate) }}
    {{ partial $conditionalTemplate . }}
  {{ end }}
{{ end }}