---
pcx-content-type: configuration
title: Stop R-U-Dead-Yet? (R.U.D.Y.) attacks
---

# Stop R-U-Dead-Yet? (R.U.D.Y.) attacks

R-U-Dead-Yet (R.U.D.Y.) attacks accomplish denial of service (DoS) by submitting long form fields. Use Firewall Rules to stop these attacks by blocking requests that do not have a legitimate session cookie.

This example combines three expressions to target HTTP POST requests that do not contain a legitimate authenticated session cookie.

The first expression uses the `http.request.uri.path` [field](/ruleset-engine/rules-language/fields/#standard-fields) to target the paths to secure from R.U.D.Y.:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.uri.path matches </span><span class="CodeBlock--token-string">&quot;(comment|conversation|event|poll)/create&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The second uses a regular expression to match the format of a legitimate `auth_session` cookie. The `not` operator targets requests where that cookie is not formatted correctly:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">not http.cookie matches </span><span class="CodeBlock--token-string">&quot;auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The third expression targets HTTP POST requests:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.method eq </span><span class="CodeBlock--token-string">&quot;POST&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The expressions are combined using the `and` operator. When an HTTP POST request to any of the specified URIs does not contain a properly formatted `auth_session` cookie, Cloudflare blocks the request:

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          http.request.method eq "POST" and http.request.uri.path matches
          "(comment|conversation|event poll)create" and not http.cookie matches
          "auth_session=[0-9a-zA-Z]{32}-[0-9]{10}-[0-9a-z]{6}"
        </code>
      </td>
      <td>
        <em>Block</em>
      </td>
    </tr>
  </tbody>
</table>
