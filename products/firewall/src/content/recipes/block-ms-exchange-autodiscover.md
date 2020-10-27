# Block Microsoft Exchange Autodiscover requests

In some cases, Microsoft Exchange Autodiscover service requests can be “noisy,” triggering large numbers of 404 errors.

This example uses the `matches` [comparison operator](/cf-firewall-language/operators/#comparison-operators) and a regular expression to block `autodiscover.xml` and `autodiscover.src` requests.

<TableWrap>

| Expression                                                      | Action |
| --------------------------------------------------------------- | ------ |
| `http.request.uri.path matches "/autodiscover\.(xml \| src)\$"` | Block  |

</TableWrap>
