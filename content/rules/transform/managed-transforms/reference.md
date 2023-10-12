---
title: Available Managed Transforms
pcx_content_type: reference
weight: 2
layout: list
---

# Available Managed Transforms

## HTTP request headers

{{<table-wrap>}}

<table>
  <thead>
    <tr>
      <th style="width:20%">Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Add bot protection headers</strong></td>
      <td>
        <p>Adds HTTP request headers with bot-related values:</p>
        <ul>
          <li><code>cf-bot-score</code>: Contains the bot score (for example, <code>30</code>).</li>
          <li><code>cf-verified-bot</code>: Contains <code>true</code> if the request comes from a <a href="/bots/concepts/bot/#verified-bots">verified bot</a>, or <code>false</code> otherwise.</li>
          <li><code>cf-threat-score</code>: Contains the threat score (0-100).</li>
          <li><code>cf-ja3-hash</code>: Contains the <a href="/bots/concepts/ja3-fingerprint/">JA3 fingerprint</a>.</li>
        </ul>
        <p>This Managed Transform requires a Enterprise plan with <a href="/bots/plans/bm-subscription/">Bot Management</a> enabled.</p>
      </td>
    </tr>
    <tr>
      <td><strong>Add TLS client auth headers</strong></td>
      <td>
        <p>Adds HTTP request headers with <a href="/api-shield/security/mtls/">Mutual TLS</a> (mTLS) client authentication values:</p>
        <ul>
          <li><code>cf-cert-revoked</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_revoked"><code>cf.tls_client_auth.cert_revoked</code></a> field.</li>
          <li><code>cf-cert-verified</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_verified"><code>cf.tls_client_auth.cert_verified</code></a> field.</li>
          <li><code>cf-cert-presented</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_presented"><code>cf.tls_client_auth.cert_presented</code></a> field.</li>
          <li><code>cf-cert-issuer-dn</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_dn"><code>cf.tls_client_auth.cert_issuer_dn</code></a> field.</li>
          <li><code>cf-cert-subject-dn</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_subject_dn"><code>cf.tls_client_auth.cert_subject_dn</code></a> field.</li>
          <li><code>cf-cert-issuer-dn-rfc2253</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_dn_rfc2253"><code>cf.tls_client_auth.cert_issuer_dn_rfc2253</code></a> field.</li>
          <li><code>cf-cert-subject-dn-rfc2253</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_subject_dn_rfc2253"><code>cf.tls_client_auth.cert_subject_dn_rfc2253</code></a> field.</li>
          <li><code>cf-cert-issuer-dn-legacy</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_dn_legacy"><code>cf.tls_client_auth.cert_issuer_dn_legacy</code></a> field.</li>
          <li><code>cf-cert-subject-dn-legacy</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_subject_dn_legacy"><code>cf.tls_client_auth.cert_subject_dn_legacy</code></a> field.</li>
          <li><code>cf-cert-serial</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_serial"><code>cf.tls_client_auth.cert_serial</code></a> field.</li>
          <li><code>cf-cert-issuer-serial</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_serial"><code>cf.tls_client_auth.cert_issuer_serial</code></a> field.</li>
          <li><code>cf-cert-fingerprint-sha256</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_fingerprint_sha256"><code>cf.tls_client_auth.cert_fingerprint_sha256</code></a> field.</li>
          <li><code>cf-cert-fingerprint-sha1</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_fingerprint_sha1"><code>cf.tls_client_auth.cert_fingerprint_sha1</code></a> field.</li>
          <li><code>cf-cert-not-before</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_not_before"><code>cf.tls_client_auth.cert_not_before</code></a> field.</li>
          <li><code>cf-cert-not-after</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_not_after"><code>cf.tls_client_auth.cert_not_after</code></a> field.</li>
          <li><code>cf-cert-ski</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_ski"><code>cf.tls_client_auth.cert_ski</code></a> field.</li>
          <li><code>cf-cert-issuer-ski</code>: Value from the <a href="/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_ski"><code>cf.tls_client_auth.cert_issuer_ski</code></a> field.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Add visitor location headers</strong></td>
      <td>
        <p>Adds HTTP request headers with location information for the visitor's IP address. The added headers are:</p>
        <ul>
          <li><code>cf-ipcity</code>: The visitor's city (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-city"><code>ip.src.city</code></a> field).</li>
          <li><code>cf-ipcountry</code>: The visitor's country (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-country"><code>ip.src.country</code></a> field).</li>
          <li><code>cf-ipcontinent</code>: The visitor's continent (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-continent"><code>ip.src.continent</code></a> field).</li>
          <li><code>cf-iplongitude</code>: The visitor's longitude (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-lon"><code>ip.src.lon</code></a> field).</li>
          <li><code>cf-iplatitude</code>: The visitor's latitude (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-lat"><code>ip.src.lat</code></a> field).</li>
          <li><code>cf-region</code>: The visitor's region (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-region"><code>ip.src.region</code></a> field).</li>
          <li><code>cf-region-code</code>: The visitor's region code (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-region_code"><code>ip.src.region_code</code></a> field).</li>
          <li><code>cf-metro-code</code>: The visitor's metro code (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-metro_code"><code>ip.src.metro_code</code></a> field).</li>
          <li><code>cf-postal-code</code>: The visitor's postal code (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-postal_code"><code>ip.src.postal_code</code></a> field).</li>
          <li><code>cf-timezone</code>: The name of the visitor's timezone (value from the <a href="/ruleset-engine/rules-language/fields/#field-ip-src-timezone-name"><code>ip.src.timezone.name</code></a> field).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Add "True-Client-IP" header</strong></td>
      <td>
        <p>Adds a <code>true-client-ip</code> request header with the visitor's IP address.</p>
        <p>Only available on Enterprise plans.</p>
        <p>Unavailable when <strong>Remove visitor IP headers</strong> is enabled.</p>
      </td>
    </tr>
    <tr>
      <td><strong>Remove visitor IP headers</strong></td>
      <td>
        <p>Removes HTTP request headers that may contain the visitor's IP address. Handles the following HTTP request headers:</p>
        <ul>
          <li><code>cf-connecting-ip</code></li>
          <li><code>x-forwarded-for</code> (refer to the <a href="#visitor-ip-address-in-the-x-forwarded-for-http-header">notes</a> below)</li>
          <li><code>true-client-ip</code></li>
        </ul>
        <p>Unavailable when <strong>Add "True-Client-IP" header</strong> is enabled.</p>
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}

### Visitor IP address in the `x-forwarded-for` HTTP header

For the `x-forwarded-for` HTTP request header, enabling **Remove visitor IP headers** will only remove the visitor IP from the header value when Cloudflare receives a request proxied by at least another CDN (content delivery network). In this case, Cloudflare will only keep the IP address of the last proxy.

For example, consider an incoming request proxied by two CDNs (`CDN_1` and `CDN_2`) before reaching the Cloudflare network. The `x-forwarded-for` header would be similar to the following:<br>
`x-forwarded-for: <VISITOR_IP>, <THIRD_PARTY_CDN_1_IP>, <THIRD_PARTY_CDN_2_IP>`

With **Remove visitor IP headers** enabled, the `x-forwarded-for` header sent to the origin server will be:<br>
`x-forwarded-for: <THIRD_PARTY_CDN_2_IP>`

## HTTP response headers

{{<table-wrap>}}

<table>
  <thead>
    <tr>
      <th style="width:20%">Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Remove "X-Powered-By" headers</strong></td>
      <td>
        <p>Removes the <code>X-Powered-By</code> HTTP response header that provides information about the application at the origin server that handled the request.</p>
      </td>
    </tr>
    <tr>
      <td><strong>Add security headers</strong></td>
      <td>
        <p>Adds several security-related HTTP response headers. The added response headers and values are the following:</p>
        <ul>
          <li><code>x-content-type-options: nosniff</code></li>
          <li><code>x-xss-protection: 1; mode=block</code></li>
          <li><code>x-frame-options: SAMEORIGIN</code></li>
          <li><code>referrer-policy: same-origin</code></li>
          <li><code>expect-ct: max-age=86400, enforce</code></li>
        </ul>
        <p>To increase protection, <a href="/ssl/edge-certificates/additional-options/http-strict-transport-security/">enable HTTP Strict Transport Security (HSTS)</a> for your website.</p>
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}
