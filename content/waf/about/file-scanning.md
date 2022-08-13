---
title: File scanning
pcx_content_type: concept
weight: 3
layout: list
---

# File scanning

WAF file scanning scans files being uploaded to your application.

{{<Aside type="note">}}
This feature is only available for select customers on an Enterprise plan. Contact your account team to get access.
{{</Aside>}}

WAF file scanning will automatically attempt to detect uploaded files and scan them for malicious content and malware. The scan results, along with additional metadata, will be exposed as fields available in WAF custom rules, allowing you to implement fine-grained mitigation rules.

## Available fields

WAF file scanning provides the following fields:

<table>
  <thead>
    <tr>
      <th style="width: 40%">Field</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
  <tr>
    <td><code>cf.waf.file_scanner.has_file</code><br />{{<type>}}Boolean{{</type>}}</td>
    <td>When true, the request contains at least one file.</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.has_malicious_file</code><br />{{<type>}}Boolean{{</type>}}</td>
    <td>When true, the request contains at least one malicious file.</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.scan_failed</code><br />{{<type>}}Boolean{{</type>}}</td>
    <td>When true, the file scanner was unable to scan all the files in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.num_files</code><br />{{<type>}}Integer{{</type>}}</td>
    <td>The number of files detected for this request (zero or greater).</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.max_file_size</code><br />{{<type>}}Integer{{</type>}}</td>
    <td>The file size in bytes of the largest file in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.file_sizes</code><br />{{<type>}}Array&lt;Integer&gt;{{</type>}}</td>
    <td>An array of file sizes in the order the files were detected in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.file_types</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
    <td>An array of file types in the order the files were detected in the request.</td>
  </tr>
  <tr>
    <td><code>cf.waf.file_scanner.scan_results</code><br />{{<type>}}Array&lt;String&gt;{{</type>}}</td>
    <td>An array of scan results in the order the files were detected in the request.</td>
  </tr>
</table>

You can use the fields in expressions of [custom rules](/waf/custom-rules/).

---

## Start using file scanning

{{<Aside type="note" header="Before you start">}}
Contact your account team to get access to WAF file scanning.
{{</Aside>}}

### Step 1 — Create a WAF custom rule

Create a custom rule that logs detected malicious files uploaded to your application.

For example, create a custom rule with the _Log_ action and the following expression:

```txt
(cf.waf.file_scanner.has_malicious_file)
```

This rule will match requests where the WAF detects at least one malicious file.

You can combine the previous expression with other [fields](/ruleset-engine/rules-language/fields/) and [functions](/ruleset-engine/rules-language/functions/) of the Rules language. This allows you to customize the rule scope or combine this feature with other security features. For example:

- The following expression will match requests uploading malicious files if they target the specified endpoint:

  ```txt
  (cf.waf.file_scanner.has_malicious_file and http.request.uri.path contains "upload.php")
  ```

- The following expression will match requests from bots uploading files:

  ```txt
  (cf.waf.file_scanner.has_file and cf.bot_management.score lt 10)
  ```

### Step 2 — Monitor traffic

After deploying your custom rule, go to Firewall Events, available at **Security** > **Overview**, and check for logged requests matching the rule you created.

If you find legitimate traffic being logged due to the custom rule, adjust your rule expression so that the rule does not match these incoming requests.

### Step 3 — Update your rule to block traffic

After making sure that you are only blocking the right requests, change the custom rule action from _Log_ to _Block_ so that the WAF starts blocking requests uploading malicious files.
