{{ $params := .Page.Params }}

## More resources

{{- range $params.related }}

- [{{ .name }}]({{ .value }})

{{- end }}
