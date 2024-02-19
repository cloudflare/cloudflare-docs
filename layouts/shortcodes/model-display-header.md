{{ $params := .Page.Params }}

# {{ .Page.Title }}

**Model ID**: `@{{ $params.model.id }}`

{{ $params.model.description }}

{{ with $params.model.infos }}[More information]({{ . }}){{ end }} {{ with $params.model.terms }}[Terms & License]({{ . }}){{ end }}

## Properties

**Task Type**: {{ $params.task.name }} (TODO: Link to the Detail page?)<br/>

{{- range $params.model.limits }}
**{{ .name }}**: {{ .value }}<br/>
{{- end }}

## Model parameters

<div class="DocsMarkdown--definitions">
<ul>
  {{- range $params.model.params }}
  <li>
  <code>{{ .name }}</code>
  <code class="InlineCode InlineCode-is-type">{{ .type }}</code>
  {{ with .optional }}<span class="DocsMarkdown--prop-meta">optional</span>{{ end }}
  <ul><li>{{ .desc }}<li></ul>
  </li>
{{- end }}

</ul>
</div>
