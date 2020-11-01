---
order: 480
type: table
---

# Expression validation

The Cloudflare Filters API supports an endpoint for validating expressions.

<TableWrap>
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
            <td style='width:25%; word-wrap:break-word; white-space:normal'>Validate expression via query string (<em>?expression=</em>) </td>
            <td><code class='InlineCode'>GET /filters/validate-expr</code></td>
            <td>Allows testing and validating expressions without changing anything</td>
        </tr>
        <tr>
            <td style='width:25%; word-wrap:break-word; white-space:normal'>Validate expression via JSON object</td>
            <td><code class='InlineCode'>POST /filters/validate-expr</code></td>
            <td>Allows testing and validating expressions without changing anything</td>
        </tr>
    </tbody>
  </table>
</TableWrap>

## Examples

### Validate expression via query string

#### Request

```bash
curl -X GET -H "X-Auth-Email: user@cloudflare.com" -H "X-Auth-Key: REDACTED" 'https://api.cloudflare.com/client/v4/filters/validate-expr?expression=ip.src==34'
```

#### Response

```json
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

```bash
Filter parsing error:
`ip.src==34`
          ^^ couldn't parse address in network: invalid IP address syntax
```

### Validate expression via JSON object

#### Request

```bash
curl -X POST \
    -H "X-Auth-Email: user@cloudflare.com" \
    -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '{
    "expression": "ip.src in {2400:cb00::/32 2405:8100::/2000 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29}"
}' "https://api.cloudflare.com/client/v4/filters/validate-expr"
```

#### Response

```json
{
  "result": null,
  "success": false,
  "errors": [
    {
      "message": "Filter parsing error:\n`ip.src in {2400:cb00::/32 2405:8100::/2000 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29}`\n                                        ^^^^ number too large to fit in target type while parsing with radix 10\n"
    }
  ],
  "messages": null
}
```

Note the validation error in the response. In this example, the value for the subnet mask, `/2000`, is not a valid IPv6 CIDR mask:

```bash
Filter parsing error:
`ip.src in {2400:cb00::/32 2405:8100::/2000 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29}`
                                        ^^^^ number too large to fit in target type while parsing with radix 10
```
