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

```txt
https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

You can change the reporting endpoint so that the CSP reports are sent to the same hostname:

```txt
<YOUR-HOSTNAME>/cdn-cgi/script-monitor/report?<QUERY_STRING>
```

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
3.  In **Active Scripts**, click **Configure Reporting Endpoint**.
4.  Select **Cloudflare-owned endpoint** or **Same hostname**.
5.  Click **Apply**.
