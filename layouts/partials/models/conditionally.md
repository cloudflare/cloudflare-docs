{{ $conditionalName := .Scratch.Get "conditional-name"}}
{{ $modelTemplates := (index $.Site.Data.models.content.models .Page.Params.model_display_name) }}
{{ $taskTemplates := (index $.Site.Data.models.content.tasks .Page.Params.task_type) }}
{{ if isset $modelTemplates $conditionalName }}
  {{ partial (index $modelTemplates $conditionalName) . | markdownify }}
{{ else if isset $taskTemplates $conditionalName}}
  {{ partial (index $taskTemplates $conditionalName) . | markdownify }}
{{ end }}
