**Model ID**: `@{{ .model.id }}`

{{ .model.description }}

{{ with .model.infos }}[More information]({{ . }}){{ end }}
{{ with .model.terms }}[Terms & License]({{ . }}){{ end }}

## Properties

**Task Type**: {{ .task.name }} (TODO: Link to the Detail page?)<br/>

{{- range .model.limits }}
**{{ .name }}**: {{ .value }}<br/>
{{- end }}

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
