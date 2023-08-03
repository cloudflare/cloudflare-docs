---
title: Uploaded content scanning
pcx_content_type: concept
weight: 3
---

# Uploaded content scanning

WAF content scanning will scan content being uploaded to your application.

{{<Aside type="warning" header="Important">}}

This feature is only available for select customers on an Enterprise plan. Contact your account team to get access.

At this stage, WAF content scanning API endpoints may change on short notice.

{{</Aside>}}

When enabled, content scanning attempts to detect content objects, such as uploaded files, and scans them for malicious signatures like malware. The scan results, along with additional metadata, are exposed as fields available in WAF [custom rules](/waf/custom-rules/), allowing you to implement fine-grained mitigation rules.

## Default configuration

Once you enable the feature, the default content scanner behavior is to scan certain content objects such as `multipart/form-data` file uploads for malicious content. However, the WAF will only perform an action on requests with content considered malicious once you create a WAF custom rule.

## Custom scan expressions

Sometimes, you may wish to specify where to find the content objects, such as when the content is a Base64-encoded string within a JSON payload. For example:

```json
{"file": "<BASE64_ENCODED_STRING>"}
```

In these situations, configure a custom scan expression to tell the content scanner where to find the content objects. For more information, refer to [Configure a custom scan expression](#2-optional-configure-a-custom-scan-expression).

---

## Start using WAF content scanning

{{<Aside type="note" header="Before you start">}}
Contact your account team to get access to WAF content scanning.
{{</Aside>}}

### 1. Enable WAF content scanning

Enable the feature using a `POST` request similar to the following:

```bash
curl --request POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/content-upload-scan/enable" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

### 2. (Optional) Configure a custom scan expression

If you wish to check uploaded content in a way that is not covered by the [default configuration](#default-configuration), add a custom scan expression. For example:

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--data '[
  {
    "payload": "lookup_json_string(http.request.body.raw, \"file\")"
  }
]'
```

The above `POST` request will add the following expression to the current list of custom scan expressions:

```txt
lookup_json_string(http.request.body.raw, "file")
```

This expression will scan any string found in an HTTP body with the following JSON string:

```json
{"file": "<BASE64_ENCODED_STRING>"}
```

{{<Aside type="note" header="Note">}}
The content scanner will automatically decode Base64 strings.
{{</Aside>}}

### 3. Validate the content scanning behavior

Use Security Analytics and HTTP logs to validate that malicious content objects are being detected correctly.

Alternatively, create a WAF custom rule like described in the next step using a _Log_ action instead of a mitigation action like _Block_. This rule will generate security events (available in **Security** > **Events**) that will allow you to validate your configuration.

### 4. Create a WAF custom rule

Create a WAF [custom rule](/waf/custom-rules/) that blocks detected malicious content objects uploaded to your application.

For example, create a custom rule with the _Block_ action and the following expression:

```txt
(cf.waf.content_scan.has_malicious_obj)
```

This rule will match requests where the WAF detects a suspicious or malicious content object. For a list of fields provided by WAF content scanning, refer to [Available fields](#available-fields).

You can combine the previous expression with other [fields](/ruleset-engine/rules-language/fields/) and [functions](/ruleset-engine/rules-language/functions/) of the Rules language. This allows you to customize the rule scope or combine content scanning with other security features. For example:

* The following expression will match requests with malicious content objects uploaded to the specified endpoint:

    ```txt
    (cf.waf.content_scan.has_malicious_obj and http.request.uri.path contains "upload.php")
    ```

* The following expression will match requests from bots uploading content objects:

    ```txt
    (cf.waf.content_scan.has_obj and cf.bot_management.score lt 10)
    ```

For additional examples, refer to [Example rules](#example-rules).

---

## Available fields

When enabled, WAF content scanning provides the following fields you can use in expressions of WAF [custom rules](/waf/custom-rules/):

<table>
  <thead>
    <tr>
      <th style="width: 52%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
  <tr>
    <td><code>cf.waf.content_scan.has_obj</code><br />{{<type>}}Boolean{{</type>}}</td>
    <td>When true, the request contains at least one content object.</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.has_malicious_obj</code><br />{{<type>}}Boolean{{</type>}}</td>
    <td>When true, the request contains at least one malicious content object.</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.num_malicious_obj</code><br />{{<type>}}Integer{{</type>}}</td>
    <td>The number of malicious content objects detected in the request (zero or greater).</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.has_failed</code><br />{{<type>}}Boolean{{</type>}}</td>
    <td>When true, the file scanner was unable to scan all the content objects detected in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.num_obj</code><br />{{<type>}}Integer{{</type>}}</td>
    <td>The number of content objects detected in the request (zero or greater).</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.obj_sizes</code><br />{{<type>}}Array&lt;Integer&gt;{{</type>}}</td>
    <td>An array of file sizes in the order the content objects were detected in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.obj_types</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
    <td>An array of file types in the order the content objects were detected in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.content_scan.obj_results</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
    <td>An array of scan results in the order the content objects were detected in the request.<br/>
    The possible values are: <code>clean</code>, <code>suspicious</code>, and <code>malicious</code>.</td>
  </tr>
</table>

---

## Example rules

The following custom rule example logs all requests with at least one uploaded content object:
* Expression: `cf.waf.content_scan.has_obj`
* Action: _Log_

The following example blocks requests addressed at `/upload.php` that contain at least one uploaded content object considered malicious:
* Expression: `cf.waf.content_scan.has_malicious_obj and http.request.uri.path eq "/upload.php"`
* Action: _Block_

The following example blocks requests addressed at `/upload` with uploaded content objects that are not PDF files:
* Expression: `any(cf.waf.content_scan.obj_types[*] != "application/pdf") and http.request.uri.path eq "/upload"`
* Action: _Block_

The following example blocks requests addressed at `/upload` with uploaded content objects over 500 KB in size:
* Expression: `any(cf.waf.content_scan.obj_sizes[*] > 500000) and http.request.uri.path eq "/upload"`
* Action: _Block_

---

## Common API calls

### General operations

<details>
<summary>Enable WAF content scanning</summary>
<div>

To enable content scanning, use a `POST` request similar to the following:

```bash
---
header: Example request
---
curl --request POST \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/enable" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

</div>
</details>

<details>
<summary>Disable WAF content scanning</summary>
<div>

To disable content scanning, use a `POST` request similar to the following:

```bash
---
header: Example request
---
curl --request POST \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/disable" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

</div>
</details>

<details>
<summary>Get WAF content scanning status</summary>
<div>

To obtain the current status of the content scanning feature, use a `GET` request similar to the following:

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/settings" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

</div>
</details>

### Custom expression operations

<details>
<summary>Get existing custom scan expressions</summary>
<div>

To get a list of existing custom scan expressions, use a `GET` request similar to the following:

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
---
header: Example response
---
{
  "result": [
    {
      "id": "<EXPRESSION_ID>",
      "payload": "lookup_json_string(http.request.body.raw, \"file\")"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

</div>
</details>

<details>
<summary>Add a custom scan expression</summary>
<div>

Use a `POST` request similar to the following:

```bash
---
header: Example request
---
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--data '[
  {
    "payload": "lookup_json_string(http.request.body.raw, \"file\")"
  }
]'
```

</div>
</details>

<details>
<summary>Delete a custom scan expression</summary>
<div>

Use a `DELETE` request similar to the following:

```bash
---
header: Example request
---
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/content-upload-scan/payloads/{expression_id}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

</div>
</details>
