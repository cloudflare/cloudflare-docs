---
title: Configure CSP reporting endpoint
pcx-content-type: how-to
weight: 6
meta:
  title: Configure the CSP reporting endpoint
---

# Configure the CSP reporting endpoint

When enabled, Page Shield uses a Content Security Policy (CSP) [report-only HTTP header](/page-shield/reference/csp-header/) to gather information about all the scripts running on your application.

By default, reports are sent to a Cloudflare-owned endpoint:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?&ltQUERY_STRING&gt</span></div></span></span></span></code></pre>{{</raw>}}

You can change the reporting endpoint so that the CSP reports are sent to the same hostname:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&ltYOUR-HOSTNAME&gt/cdn-cgi/script-monitor/report?&ltQUERY_STRING&gt</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}

Only available to Enterprise customers with a paid add-on.

{{</Aside>}}

## Prerequisites for using the same hostname for CSP reports

Using the same hostname for CSP reporting may interfere with other Cloudflare products. Before selecting this option, ensure that your Cloudflare configuration complies with the following:

- No rate limiting rules match the `cdn-cgi/*` URL path
- No firewall rules match the `cdn-cgi/*` URL path

## How to

To configure the CSP reporting endpoint:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2.  Go to **Security** > **Page Shield**.
3.  In **Script Monitor**, click **Configure Reporting Endpoint**.
4.  Select **Cloudflare-owned endpoint** or **Same hostname**.
5.  Click **Apply**.
