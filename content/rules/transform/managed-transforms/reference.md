---
title: Available Managed Transforms
pcx-content-type: reference
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
        <p>This Managed Transform requires a Cloudflare Enterprise plan with <a href="/bots/get-started/bm-subscription/">Bot Management</a> enabled.</p>
      </td>
    </tr>
    <tr>
      <td><strong>Add visitor location headers</strong></td>
      <td>
        <p>Adds HTTP request headers with location information for the visitor's IP address. The added headers are:</p>
        <ul>
          <li><code>cf-ipcity</code>: The visitor's city (value from the <code>ip.src.city</code> field).</li>
          <li><code>cf-ipcountry</code>: The visitor's country (value from the <code>ip.src.country</code> field).</li>
          <li><code>cf-ipcontinent</code>: The visitor's continent (value from the <code>ip.geoip.continent</code> field).</li>
          <li><code>cf-iplongitude</code>: The visitor's longitude (value from the <code>ip.src.lon</code> field).</li>
          <li><code>cf-iplatitude</code>: The visitor's latitude (value from the <code>ip.src.lat</code> field).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Remove visitor IP headers</strong></td>
      <td>
        <p>Removes HTTP request headers that may contain the visitor's IP address. Handles the following HTTP request headers:</p>
        <ul>
          <li><code>cf-connecting-ip</code></li>
          <li><code>x-forwarded-for</code></li>
          <li><code>true-client-ip</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}

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
          <li><code>X-Content-Type-Options: nosniff</code></li>
          <li><code>X-XSS-Protection: 1; mode=block</code></li>
          <li><code>X-Frame-Options: SAMEORIGIN</code></li>
          <li><code>Referrer-Policy: same-origin</code></li>
          <li><code>Expect-CT: max-age=86400, enforce</code></li>
        </ul>
        <p>To increase protection, <a href="/ssl/edge-certificates/additional-options/http-strict-transport-security/">enable HTTP Strict Transport Security (HSTS)</a> for your website.</p>
      </td>
    </tr>
  </tbody>
</table>

{{</table-wrap>}}