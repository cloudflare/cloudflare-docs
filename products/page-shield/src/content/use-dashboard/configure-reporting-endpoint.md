---
title: Configure CSP reporting endpoint
order: 5
pcx-content-type: how-to
---

# Configure the CSP reporting endpoint

When enabled, Page Shield uses a Content Security Policy (CSP) [report-only HTTP header](/reference/csp-header) to gather information about all the scripts running on your application. 

By default, reports are sent to a Cloudflare-owned endpoint:

```txt
https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

You can change the reporting endpoint so that the CSP reports are sent to the same hostname:

```txt
<YOUR-HOSTNAME>/cdn-cgi/script-monitor/report?<QUERY_STRING>
```

<Aside type="note">

Only available to Enterprise customers with a paid add-on.

</Aside>

## Prerequisites for using the same hostname for CSP reports

Using the same hostname for CSP reporting may interfere with other Cloudflare products. Before selecting this option, ensure that your Cloudflare configuration complies with the following:

* No Rate Limiting Rules match the `cdn-cgi/*` URL path
* No Firewall Rules match the `cdn-cgi/*` URL path

## How to

To configure the CSP reporting endpoint:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
1. Go to **Firewall** > **Page Shield**.
1. In **Script Monitor**, click **Configure Reporting Endpoint**.
1. Select **Cloudflare-owned endpoint** or **Same hostname**.
1. Click **Apply**.
