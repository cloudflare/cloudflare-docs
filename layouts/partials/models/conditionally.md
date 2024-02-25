{{ $conditionalName := .Scratch.Get "conditional-name"}}
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