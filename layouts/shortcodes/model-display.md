{{ $params := .Page.Params }}

# {{ .Page.Title }}

{{ partial "models/header.md" $params }}

{{ $codeExampleTemplate := printf "models/%s/code-examples.md" $params.task_type }}

{{ partial $codeExampleTemplate $params}}

## API schema

The following schema is based on [JSON Schema](https://json-schema.org/)


{{ partial "models/footer.md" $params }}

