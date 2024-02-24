{{ $linksMap := $.Site.Data.models.properties.links }}
{{ $limitsMap := $.Site.Data.models.properties.limits }}
{{ $params :=  .Page.Params }}

{{ $properties := dict }}
{{ range $params.model.properties }}
  {{ $entry := . }}
  {{ $properties = merge $properties (dict $entry.property_id $entry.value) }}
{{ end }}

**Model ID**: `{{ $params.model.name }}`

{{ $params.model.description }}

{{ range $key, $display := $linksMap -}}
  {{- with (index $properties $key) -}}
[{{ $display }}]({{ . }}) &nbsp;
  {{- end -}}
{{- end }}


## Properties

{{/* TODO: Can I get the page better here? */}}
**Task Type**: [{{ $params.model.task.name }}](/workers-ai/wip-models/#{{ $params.task_type }})

{{- range $key, $display := $limitsMap -}}
  {{- with (index $properties $key) }}
**{{ $display }}**: {{ . }}
  {{ end -}}
{{- end -}}

{{ .Scratch.Set "conditional-name" "code-examples" }}
{{ partial "models/conditionally.md" . }}


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

