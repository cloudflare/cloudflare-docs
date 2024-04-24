---
pcx_content_type: configuration
title: Require a specific cookie
---

# Require a specific cookie

To secure a sensitive area such as a development area, you can share a cookie with trusted individuals and then filter requests so that only users with that cookie can access your site.

Use the [`http.cookie`](/ruleset-engine/rules-language/fields/#field-http-cookie) field to target requests based on the presence of a specific cookie.

This example comprises two rules:

- The first rule targets requests to `dev.www.example.com` that have a specific cookie key, `devaccess`. As long as the value of the cookie key contains one of three authorized users — `james`, `matt`, or `michael` — the expression matches and the request is allowed, skipping all other custom rules.
- The second rule blocks all access to `dev.www.example.com`.

Since custom rules are evaluated in order, Cloudflare grants access to requests that satisfy rule 1 and blocks all other requests to `dev.www.example.com`:

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (http.cookie contains "devaccess=james" or http.cookie contains "devaccess=matt" or
          http.cookie contains "devaccess=michael") and http.host eq "dev.www.example.com"
        </code>
      </td>
      <td>
        <em>Skip:</em><br>
        — <em>All remaining custom rules</em>
      </td>
    </tr>
    <tr>
      <td>
        <code>(http.host eq "dev.www.example.com")</code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>
