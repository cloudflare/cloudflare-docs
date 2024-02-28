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
**Task Type**: [{{ $params.model.task.name }}](/workers-ai/models/#{{ $params.task_type }})
{{ range $key, $display := $limitsMap -}}
  {{- with (index $properties $key) }}
**{{ $display }}**: {{ . }}
  {{ end -}}
{{- end -}}

{{ .Scratch.Set "conditional-name" "code-examples" }}
{{ partial "models/conditionally.md" . | markdownify}}

{{ .Scratch.Set "conditional-name" "prompting-guides" }}
{{ partial "models/conditionally.md" . | markdownify}}

{{ .Scratch.Set "conditional-name" "responses" }}
{{ partial "models/conditionally.md" . | markdownify}}


## API Schema

The following schema is based on [JSON Schema](https://json-schema.org/)

<details>
  <summary>Input JSON Schema</summary>

  ```json
  {{ .Page.Params.json_schema.input }}
  ```
</details>

<details>
  <summary>Output JSON Schema</summary>

  ```json
  {{ .Page.Params.json_schema.output }}
  ```
</details>

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

