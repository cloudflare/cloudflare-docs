{{ $params := .Page.Params }}

# {{ .Page.Title }}

{{ partial "models/header.md" $params }}

{{ $codeExampleOverrideRoot := printf "layouts/partials/models/model-overwrite-code-examples/%s.md" $params.model_display_name }}

{{ $codeExampleOverrideRoot }}

{{if fileExists $codeExampleOverrideRoot }}

{{ $codeExampleOverride := printf "models/model-overwrite-code-examples/%s.md" $params.model_display_name }}
{{ partial $codeExampleOverride $params}}

{{ else }}

{{ $codeExampleTemplateRoot := printf "layouts/partials/models/%s/code-examples.md" $params.task_type }}

{{if fileExists $codeExampleTemplateRoot }}
{{ $codeExampleTemplate := printf "models/%s/code-examples.md" $params.task_type }}
{{ partial $codeExampleTemplate $params}}
{{ end }}

{{ end }}

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)

{{ partial "models/footer.md" $params }}
