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

To format JSON output for readability in the command line, you can use a tool like `jq`, a command-line JSON processor. For more information on obtaining and installing `jq`, refer to [Download jq](https://stedolan.github.io/jq/download/).

The following example will format the curl JSON output using `jq`:

```bash
$ curl "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>" \
-H "Authorization: Bearer <API_TOKEN>" | jq .
```

## Using Cloudflare’s APIs

Every Cloudflare API element is fixed to a version number. The latest version is Version 4. The stable base URL for all Version 4 HTTPS endpoints is: `https://api.cloudflare.com/client/v4/`

For specific guidance on making API calls, refer to the following resources:

*   The product's [Developer Docs section](/products/) for how-to guides.
*   [API schema docs](/api) for request and response payloads for each endpoint.
*   If you are using [golang](https://github.com/cloudflare/cloudflare-go) or [Hashicorp's Terraform](https://github.com/cloudflare/terraform-provider-cloudflare), use our first-party libraries to integrate with Cloudflare's API.


## Making API calls on Windows

Recent versions of Windows 10 and 11 [already include the curl tool](https://curl.se/windows/microsoft.html) used in the developer documentation's API examples. If you are using a different Windows version, refer to [Windows downloads](https://curl.se/windows/) in the curl website for more information on obtaining and installing this tool.

### Using a Command Prompt window

To use the Cloudflare API with curl on a Command Prompt window, you must use double quotes (`"`) as string delimiters instead of single quotes (`'`).

A typical `PATCH` request will be similar to the following:

```txt
C:\> curl -X PATCH "https://api.cloudflare.com/client/v4/user/invites/<ID>" -H "X-Auth-Email: <EMAIL>" -H "X-Auth-Key: <API_KEY>" -d "{""status"": ""accepted""}"
```

To escape a double quote character in a request body (for example, a body specified with `-d` or `--data` in a `POST`/`PATCH` request), prepend it with another double quote (`"`) or a backslash (`\`) character.

To break a single command in two or more lines, use `^` as the line continuation character at the end of a line:

```txt
C:\> curl -X PATCH ^
"https://api.cloudflare.com/client/v4/user/invites/<ID>" ^
-H "X-Auth-Email: <EMAIL>" ^
-H "X-Auth-Key: <API_KEY>" ^
-d "{""status"": ""accepted""}"
```

### Using PowerShell

{{<Aside type="note">}}
Cloudflare recommends that you use the most recent stable or preview version of PowerShell. For more information, refer to [Installing PowerShell on Windows](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows).
{{</Aside>}}

PowerShell has specific cmdlets (`Invoke-RestMethod` and `ConvertFrom-Json`) for making REST API calls and handling JSON responses. The syntax for these cmdlets is different from the curl examples provided in the developer documentation.

The following example uses the `Invoke-RestMethod` cmdlet:

```txt
PS C:\> Invoke-RestMethod -URI https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/ssl/certificate_packs?ssl_status=all -Method 'GET' -ContentType 'application/json' -Headers @{'X-Auth-Email'='<EMAIL>';'X-Auth-Key'='<KEY>'}

result      : {@{id=78411cfa-5727-4dc1-8d4a-773d01f17c7c; type=universal; hosts=System.Object[];
              primary_certificate=c173c8a1-9724-4e96-a748-2c4494186098; status=active; certificates=System.Object[];
              created_on=2022-12-09T23:11:06.010263Z; validity_days=90; validation_method=txt;
              certificate_authority=lets_encrypt}}
result_info : @{page=1; per_page=20; total_pages=1; count=1; total_count=1}
success     : True
errors      : {}
messages    : {}
```

By default, the output will only contain the first level of the JSON object hierarchy (in the above example, the content of objects such as `hosts` and `certificates` is not shown). To show additional levels and format the output like the `jq` tool, you can use the `ConvertFrom-Json` cmdlet specifying the desired maximum depth (by default, `2`):

```txt
PS C:\> Invoke-RestMethod -URI https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/ssl/certificate_packs?ssl_status=all -Method 'GET' -ContentType 'application/json' -Headers @{'X-Auth-Email'='<EMAIL>';'X-Auth-Key'='<KEY>'} | ConvertTo-Json -Depth 5

{
    "result":  [
                   {
                       "id":  "78411cfa-5727-4dc1-8d4a-773d01f17c7c",
                       "type":  "universal",
                       "hosts":  [
                                     "*.example.com",
                                     "example.com"
                                 ],
                       "primary_certificate":  "c173c8a1-9724-4e96-a748-2c4494186098",
                       "status":  "active",
                       "certificates":  [
                                            {
                                                "id":  "c173c8a1-9724-4e96-a748-2c4494186098",
                                                "hosts":  [
                                                              "*.example.com",
                                                              "example.com"
                                                          ],
                                                "issuer":  "LetsEncrypt",
                                                "signature":  "ECDSAWithSHA384",
                                                "status":  "active",
                                                "bundle_method":  "ubiquitous",
                                                "zone_id":  "<ZONE_ID>",
                                                "uploaded_on":  "2023-02-02T11:20:25.403338Z",
                                                "modified_on":  "2022-12-08T00:26:15.577555Z",
                                                "expires_on":  "2023-03-07T23:26:12.000000Z",
                                                "priority":  null
                                            }
                                        ],
                       "created_on":  "2022-12-09T23:11:06.010263Z",
                       "validity_days":  90,
                       "validation_method":  "txt",
                       "certificate_authority":  "lets_encrypt"
                   }
               ],
    // (...)
}
```

{{<Aside type="warning" header="ConvertFrom-Json handling of DateTime values">}}
The `ConvertTo-Json` cmdlet tries to convert strings formatted as timestamps to DateTime values, according to the exact format in the string. For details on this behavior, refer to the notes in the [ConvertFrom-Json](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-json#notes) documentation.
{{</Aside>}}

You can also use the curl tool in PowerShell. However, in PowerShell `curl` is an alias to the `Invoke-WebRequest` cmdlet, which supports a different syntax from the usual curl tool. To use curl, enter `curl.exe` instead.

A typical `PATCH` request with curl will be similar to the following:

```txt
PS C:\> curl.exe -X PATCH "https://api.cloudflare.com/client/v4/user/invites/<ID>" -H "Authorization: Bearer <API_TOKEN>" -d '{\"status\": \"accepted\"}'
```

To escape a double quote (`"`) character in a request body (specified with `-d` or `--data`), prepend it with another double quote (`"`) or a backslash (`\`). You must escape double quotes even when using single quotes (`'`) as string delimiters.

To break a single command in two or more lines, use a backtick (`` ` ``) character as the line continuation character at the end of a line:

```txt
PS C:\> curl.exe -X PATCH `
"https://api.cloudflare.com/client/v4/user/invites/<ID>" `
-H "X-Auth-Email: <EMAIL>" `
-H "X-Auth-Key: <API_KEY>" `
-d '{\"status\": \"accepted\"}'
```
