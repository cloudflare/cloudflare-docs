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

{{if eq $params.model.task.name "Text Generation" }}
## Use the Playground

Try out this model with Workers AI Model Playground. It does not require any setup or authentication and an instant way to preview and test a model directly in the browser.

<a class="Button Button-is-docs-primary DocsMarkdown--link-content" href="https://playground.ai.cloudflare.com/?model={{$params.model.name}}" target="_blank">
  Launch the Model Playground
</a>
{{end}}

{{ .Scratch.Set "conditional-name" "code-examples" }}
{{ partial "models/conditionally.md" . | markdownify}}

{{ .Scratch.Set "conditional-name" "prompting-guides" }}
{{ partial "models/conditionally.md" . | markdownify}}

{{ .Scratch.Set "conditional-name" "responses" }}
{{ partial "models/conditionally.md" . | markdownify}}

{{if (index .Page.Params "json_schema") }}
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

{{end}}

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

