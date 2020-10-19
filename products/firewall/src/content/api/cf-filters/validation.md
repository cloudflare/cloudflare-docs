---
title: Expression validation
order: 480
---

# Expression validation

The Cloudflare Filters API supports an endpoint for validating expressions.

<TableWrap>
  <table style="width: 100%;">
    <thead>
        <tr>
            <th style="width:30%;">
                Method + URL
            </th>
            <th>
                Description
            </th>
            <th style="width:40%;">
                Notes
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET https://api.cloudflare.com/client/v4/filters/validate-expr</td>
            <td>Validate via a query string (<em>?expression=</em>) </td>
            <td>Allows testing and validating expressions without changing anything</td>
        </tr>
        <tr>
            <td>POST https://api.cloudflare.com/client/v4/filters/validate-expr</td>
            <td>Validate via a JSON object</td>
            <td>Allows testing and validating expressions without changing anything</td>
        </tr>
    </tbody>
  </table>
</TableWrap>

## Example calls

```bash
GET /filters/validate-expr
```

### Request

```bash
curl -X GET -H "X-Auth-Email: user@cloudflare.com" -H "X-Auth-Key: REDACTED" 'https://api.cloudflare.com/client/v4/filters/validate-expr?expression=ip.src==34'
```

### Response

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

Note that the error message when rendered in fixed width font lines up with the position of the error in the input and the text describes the error:

```bash
Filter parsing error:
`ip.src==34`
          ^^ couldn't parse address in network: invalid IP address syntax
```

Which is correct as `34` is not an IP address.

```bash
POST /filters/validate-expr
```

### Request

```bash
curl -X POST \
    -H "X-Auth-Email: user@cloudflare.com" \
    -H "X-Auth-Key: REDACTED" \
     -H "Content-Type: application/json" \
     -d '{
    "expression": "ip.src in {2400:cb00::/32 2405:8100::/2000 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29}"
}' "https://api.cloudflare.com/client/v4/filters/validate-expr"
```

### Response

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

Which is:

```bash
Filter parsing error:
`ip.src in {2400:cb00::/32 2405:8100::/2000 2405:b500::/32 2606:4700::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29}`
                                        ^^^^ number too large to fit in target type while parsing with radix 10
```

Which is correct, as `/2000` is not a valid mask for an IPv6 CIDR.
