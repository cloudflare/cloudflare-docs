---
title: Make API calls
pcx_content_type: how-to
weight: 11
---

# Make API calls

Once you create your API token, all API requests are authorized in the same way. Cloudflare uses the [RFC standard](https://tools.ietf.org/html/rfc6750#section-2.1) `Authorization: Bearer <API_TOKEN>` interface. An example request is shown below.

```bash
$ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>" \
-H "Authorization: Bearer YQSn-xWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T"
```

Never send or store your API token secret in plaintext. Also be sure not to check it into code repositories, especially public ones.

## Making API calls on Windows

### Using a Command Prompt window

To use the Cloudflare API on a Command Prompt window, you must use double quotes (`"`) as string delimiters instead of single quotes (`'`).

A typical `POST` request will be similar to the following:

```txt
C:\> curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/control/retention/flag" -H "Authorization: Bearer <API_TOKEN>" -d "{""flag"": true}"
```

To escape a double quote character in a request body (for example, a body specified with `-d` or `--data` in a `POST` request), prepend it with another double quote (`"`) or a backslash (`\`) character.

To break a single command in two or more lines, use `^` as the line continuation character at the end of a line:

```txt
C:\> curl -X POST ^
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/control/retention/flag" ^
-H "Authorization: Bearer <API_TOKEN>" ^
-d "{""flag"": true}"
```

### Using PowerShell

In PowerShell, `curl` is an alias to the `Invoke-WebRequest` cmdlet, which supports a different syntax from the usual cURL tool. To use cURL, enter `curl.exe` instead.

A typical `POST` request will be similar to the following:

```txt
PS C:\> curl.exe -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/control/retention/flag" -H "Authorization: Bearer <API_TOKEN>" -d '{\"flag\": true}'
```

To escape a double quote (`"`) character in a request body (specified with `-d` or `--data`), prepend it with another double quote (`"`) or a backslash (`\`). You must escape double quotes even when using single quotes (`'`) as string delimiters.

To break a single command in two or more lines, use a backtick (`` ` ``) character as the line continuation character at the end of a line:

```txt
PS C:\> curl.exe -X POST `
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logs/control/retention/flag" `
-H "Authorization: Bearer <API_TOKEN>" `
-d '{\"flag\": true}'
```

## Using Cloudflare’s APIs

Every Cloudflare API element is fixed to a version number. The latest version is Version 4. The stable base URL for all Version 4 HTTPS endpoints is: `https://api.cloudflare.com/client/v4/`

For specific guidance on making API calls, refer to the following resources:

*   The product's [Developer Docs section](/products/) for how-to guides.
*   [API schema docs](/api) for request and response payloads for each endpoint.
*   If you are using [golang](https://github.com/cloudflare/cloudflare-go) or [Hashicorp's Terraform](https://github.com/cloudflare/terraform-provider-cloudflare), use our first-party libraries to integrate with Cloudflare's API.
