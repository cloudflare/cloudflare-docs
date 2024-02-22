{{/* TODO: Move this to an optional related section */}}
{{ with .Page.Params }}
## More resources

{{- range .related }}

- [{{ .name }}]({{ .value }})

{{- end }}
{{ end }}