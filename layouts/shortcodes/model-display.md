{{ $params := .Page.Params }}
# {{ .Page.Title }}

**Model ID**: `@{{ $params.model.id }}`

{{ $params.model.description }}

## Properties

**Task Type**: {{ $params.task.name }} (TODO: Link to the Detail page?)
