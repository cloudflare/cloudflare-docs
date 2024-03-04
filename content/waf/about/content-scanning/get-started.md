---
title: Get started
pcx_content_type: get-started
weight: 2
meta:
  title: Get started with content scanning
---

# Get started

{{<Aside type="note">}}
WAF content scanning is available to customers on an Enterprise plan with a paid add-on.
{{</Aside>}}

## 1. Enable WAF content scanning

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Settings**.
3. Under **Incoming traffic detections**, turn on **Malicious uploads**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Enable the feature using a `POST` request similar to the following:

```bash
curl --request POST \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/enable" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

{{</tab>}}
{{</tabs>}}

## 2. Validate the content scanning behavior

Use [Security Analytics](/waf/analytics/security-analytics/) and HTTP logs to validate that malicious content objects are being detected correctly.

Alternatively, create a WAF custom rule like described in the next step using a _Log_ action instead of a mitigation action like _Block_. This rule will generate security events (available in **Security** > **Events**) that will allow you to validate your configuration.

## 3. Create a WAF custom rule

Create a WAF [custom rule](/waf/custom-rules/) that blocks detected malicious content objects uploaded to your application.

For example, create a custom rule with the _Block_ action and the following expression:

Field                        | Operator | Value
-----------------------------|----------|------
Has malicious content object | equals   | True

If you use the Expression Editor, enter the following expression:

```txt
(cf.waf.content_scan.has_malicious_obj)
```

This rule will match requests where the WAF detects a suspicious or malicious content object. For a list of fields provided by WAF content scanning, refer to [Content scanning fields](/waf/about/content-scanning/#content-scanning-fields).

{{<details header="Optional: Combine with other Rules language fields">}}

You can combine the previous expression with other [fields](/ruleset-engine/rules-language/fields/) and [functions](/ruleset-engine/rules-language/functions/) of the Rules language. This allows you to customize the rule scope or combine content scanning with other security features. For example:

- The following expression will match requests with malicious content objects uploaded to a specific endpoint:

    Field                        | Operator | Value        | Logic
    -----------------------------|----------|--------------|------
    Has malicious content object | equals   | True         | And
    URI Path                     | contains | `upload.php` |

    Expression when using the editor:

    ```txt
    (cf.waf.content_scan.has_malicious_obj and http.request.uri.path contains "upload.php")
    ```

- The following expression will match requests from bots uploading content objects:

    Field                        | Operator  | Value        | Logic
    -----------------------------|-----------|--------------|------
    Has malicious content object | equals    | True         | And
    Bot Score                    | less than | `10`         |

    Expression when using the editor:

    ```txt
    (cf.waf.content_scan.has_obj and cf.bot_management.score lt 10)
    ```

{{</details>}}

For additional examples, refer to [Example rules](/waf/about/content-scanning/example-rules/).

## 4. (Optional) Configure a custom scan expression

To check uploaded content in a way that is not covered by the default configuration, add a [custom scan expression](/waf/about/content-scanning/#custom-scan-expressions).

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** > **Settings**.
3. Under **Incoming traffic detections**, select **Malicious uploads**.
4. Select **Add new location**.
5. In **Content location**, enter your custom scan expression. For example:

    ```txt
    lookup_json_string(http.request.body.raw, "file")
    ```

6. Select **Save**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

Use a `POST` request similar to the following:

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '[
  {
    "payload": "lookup_json_string(http.request.body.raw, \"file\")"
  }
]'
```

The above request will add the following expression to the current list of custom scan expressions:

```txt
lookup_json_string(http.request.body.raw, "file")
```

{{</tab>}}
{{</tabs>}}

The custom scan expression will scan any string found in an HTTP body with the following JSON string:

```json
{"file": "<BASE64_ENCODED_STRING>"}
```

{{<Aside type="note" header="Note">}}
The content scanner will automatically decode Base64 strings.
{{</Aside>}}
