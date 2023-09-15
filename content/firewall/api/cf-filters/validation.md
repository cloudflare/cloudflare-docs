---
pcx_content_type: reference
title: Expression validation
weight: 8
layout: list
---

# Expression validation

The Cloudflare Filters API supports an endpoint for validating expressions.

{{<table-wrap>}}
  <table style="width: 100%;">
    <thead>
        <tr>
            <th>
                Operation
            </th>
            <th>
                Method + Endpoint
            </th>
            <th>
                Notes
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style='width:25%; word-wrap:break-word; white-space:normal'>Validate expression via query string<br/> (<code class="InlineCode">?expression=</code>) </td>
            <td><code class='InlineCode'>GET /filters/validate-expr</code></td>
            <td>Allows testing and validating expressions without changing your configuration.</td>
        </tr>
        <tr>
            <td style='width:25%; word-wrap:break-word; white-space:normal'>Validate expression via JSON object</td>
            <td><code class='InlineCode'>POST /filters/validate-expr</code></td>
            <td>Allows testing and validating expressions without changing your configuration.</td>
        </tr>
    </tbody>
  </table>
{{</table-wrap>}}

## Examples

### Validate expression via query string

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/filters/validate-expr?expression=ip.src==34" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
---
header: Response
---
{
  "result": null,
  "success": false,
  "errors": [
    {
      "message": "Filter parsing error:\n`ip.src==34`\n          ^^ couldn't parse address in network: invalid IP address syntax\n"
    }
  ],
  "messages": null
}
```

Note the validation error in the response. In this example, the error is due to an invalid IP address format:

```txt
Filter parsing error:
`ip.src==34`
          ^^ couldn't parse address in network: invalid IP address syntax
```

### Validate expression via JSON object

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/filters/validate-expr" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "expression": "ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}"
}'
```

```json
---
header: Response
---
{
  "result": null,
  "success": false,
  "errors": [
    {
      "message": "Filter parsing error:\n`ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}`\n                                        ^^^^ number too large to fit in target type while parsing with radix 10\n"
    }
  ],
  "messages": null
}
```

Note the validation error in the response. In this example, the value for the subnet mask, `/2000`, is not a valid IPv6 CIDR mask:

```txt
Filter parsing error:
`ip.src in {2400:cb00::/32 2405:8100::/2000 2c0f:f248::/32 2a06:98c0::/29}`
                                       ^^^^ number too large to fit in target type while parsing with radix 10
```
