---
pcx_content_type: concept
title: Guidelines for cURL commands
weight: 3
---

# Guidelines for cURL commands

Use long parameter names, like in the API docs, for clarity:

+ `--header` (instead of `-H`)
+ `--request` (when needed, instead of `-X`)
+ `--data` (instead of `-d`)

You do not need to use the `--url` parameter since it is the main cURL parameter. Also, the URL does not need to be enclosed in double quotes (`""`), except if it contains a `?` character (that is, when it includes a query string).

## Indentation

Use two spaces to indent request or response bodies (the additional data included in the request/response).

For requests with body content, start indenting when you get to the body part (the line after `--data` in the examples in this page). This means that the URL, any headers, and the line containing the `--data` parameter should not be indented.

Requests without a body should not be indented also, to make them consistent with requests containing a body.

## Do not use jq as part of cURL examples

[jq](https://jqlang.github.io/jq/) is a separate tool that not everyone will have installed. cURL examples should not include response formatting through jq as part of the example.

If you must suggest the use of this tool, you can add a link to the [Make API calls](/fundamentals/api/how-to/make-api-calls/) page in Fundamentals, which mentions this tool. Do not repeat the existing content about jq near the cURL example.

## Request guidelines

### Preliminary notes

+ Make sure not to use typographical or smart quotes in a cURL command, or the command will fail.
+ Placeholders in the URL should follow the same format as in the API documentation: `{zone_id}`
+ Placeholders in the request body (that is, the data included in a `POST`/`PUT`/`PATCH` request) should use this format: `<RULE_ID>`

The same placeholder name should correspond to the same value – use different placeholder names for different ID values. You can use the same request placeholders in the response, if they should match the values in the request.

## Authentication HTTP headers

If using Email + API Key authentication, include the following arguments in the cURL command to add the two required HTTP headers to the request:

```txt
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
```

{{<Aside type="note">}}
Ending slashes included to facilitate copy and paste. Do not include the last slash if this is the last line of the cURL command.
{{</Aside>}}

If using API Token (the preferred authentication method), include the following arguments in the cURL command to add the required HTTP header to the request:

```txt
--header "Authorization: Bearer <API_TOKEN>" \
```

## Request without body content (`GET`, `DELETE`)

For `GET` requests, do not include the `--request` command-line argument, since it is the default where the request does not include a body and it is not recommended for `GET`/`POST` requests:

### `GET` request template

```txt
curl {full_url_with_placeholders} \
--header "Authorization: Bearer <API_TOKEN>"
```

```bash
---
header: GET request example
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules \
--header "Authorization: Bearer <API_TOKEN>"
```

### `DELETE` request template

```txt
curl --request DELETE \
{full_url_with_placeholders} \
--header "Authorization: Bearer <API_TOKEN>"
```

Requests without a body do not need syntax highlight, but `bash` syntax highlighting is used to highlight the several delimited strings.

## Request with JSON body content (`POST`, `PUT`, `PATCH`)

Make sure to include a `Content-Type` header if the request includes a body. For requests with JSON content, the header should be `Content-Type: application/json`.

This header should appear after the authentication headers.

For `POST` requests, do not include the `--request` command-line argument, since it is the default when the request includes a body.

### `POST` request template

```txt
curl {full_url_with_placeholders} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '({|[)
  (...JSON content, pretty printed, using 2-space indents...)
(}|])'
```

```bash
---
header: POST request example
---
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '[
  {
    "filter": {
      "id": "<FILTER_ID>"
    },
    "action": "allow",
    "description": "Do not challenge login from office"
  }
]'
```

### `PUT`/`PATCH` request template

```txt
curl --request (PUT/PATCH) \
{full_url_with_placeholders} \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '({|[)
  (...JSON content, pretty printed, using 2-space indents...)
(}|])'
```

Enclose the JSON payload ( the `--data` command-line argument) in single quotes (`'`) instead of double quotes because it requires less escaping (strings in JSON must be delimited using double quotes).

### Escaping a single quote in the body

The recommended way of escaping a single quote inside the body is the following (assuming the user will run the command in a bash-like terminal):

+ Replace the single quote `'` with `'\''`

Which means "close string, add escaped single quote, begin string again".

```bash
---
header: Example
---
curl https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/policies \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "value": "script-src myapp.example.com cdnjs.cloudflare.com https://www.google-analytics.com/analytics.js '\''self'\''"
}'
```

### `POST` requests without a body

If you have a `POST` request without a body, add a `--request POST` argument explicitly to the cURL command.

```txt
curl --request POST \
{full_url_with_placeholders} \
--header "Authorization: Bearer <API_TOKEN>"
```

## Additional information

Code blocks with example requests that include a JSON body should use `bash` syntax, similarly to example requests without a body.

## Full request example

```bash
curl https://api.cloudflare.com/api/v4/zones/{zone_id}/page_shield/policies \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{
  "description": "My first policy in log mode",
  "action": "log",
  "expression": "http.host eq myapp.example.com",
  "enabled": "true",
  "value": "script-src myapp.example.com cdnjs.cloudflare.com https://www.google-analytics.com/analytics.js '\''self'\''"
}'
```

## Response guidelines

Include the complete response (including any empty error and message arrays, if present) using `json` syntax highlighting.

A response starts either with an object `({ ... })` or a list `([ ... ])`. The initial character should appear on its own line, as well as the last character.

```txt
({|[)
  (...JSON content, pretty printed, using 2-space indents...)
(}|])
```

+ If there are IDs that were obtained using a previous command, or if their exact value is not relevant in the current context, use a placeholder (for example, `<RULE_ID>`) instead of the ID. The same placeholder name should correspond to the same value. Use different placeholder names for different ID values.
+ Response excerpts or snippets containing the most relevant parts of the response body should mention that they do not correspond to the entire response.

## Full response example

```json
{
  "result": {
    "id": "<RULE_ID>",
    "paused": false,
    "description": "do not challenge login from office",
    "action": "allow",
    "priority": null,
    "filter": {
      "id": "<FILTER_ID>",
      "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
      "paused": false,
      "description": "Login from office"
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
