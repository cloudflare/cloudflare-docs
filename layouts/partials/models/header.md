THIS: {{ index $.Site.Data.models.properties.links "info"}}

**Model ID**: `{{ .model.name }}`

{{ .model.description }}

{{ $propertyMap := (dict
    "info" "More Information"
    "terms" "Terms & License"
    "default_max_tokens_stream" "Default max (sequence) tokens (stream)"
    "default_max_tokens" "Default max (sequence) tokens"
    "context_length_limit" "Context tokens limit"
    "sequence_length_limit" "Sequence tokens limit"
    "max_input_tokens" "Max input tokens"
    "output_dimensions" "Output dimensions")
}}

{{- range .model.properties -}}
  {{- $propertyId := .property_id -}}
  {{- $value := .value -}}
  {{- range (slice "info" "terms") -}}
    {{- $key := . -}}
    {{- if eq $propertyId $key -}}
[{{ index $propertyMap $key }}]({{ $value }}) &nbsp;
    {{- end -}}
  {{- end -}}
{{- end }}


## Properties

{{/* TODO: Can I get the page better here? */}}
**Task Type**: [{{ .model.task.name }}](/workers-ai/wip-models/#{{ .task_type }})

{{/* This loops through the slice in order */}}
{{- range .model.properties -}}
  {{- $propertyId := .property_id -}}
  {{- $value := .value -}}
  {{- range (slice "context_length_limit" "sequence_length_limit" "max_input_tokens" "output_dimensions") -}}
    {{- $key := . -}}
    {{- if eq $propertyId $key }}
**{{ index $propertyMap $key }}**: {{ $value }}
    {{ end -}}
  {{- end -}}
{{- end }}


{{/* These don't exist yet
## Model parameters

<div class="DocsMarkdown--definitions">
<ul>
  {{- range .model.params }}
  <li>
  <code>{{ .name }}</code>
  <code class="InlineCode InlineCode-is-type">{{ .type }}</code>
  {{ with .optional }}<span class="DocsMarkdown--prop-meta">optional</span>{{ end }}
  <ul><li>{{ .desc }}<li></ul>
  </li>
{{- end }}

</ul>
</div>

*/}}