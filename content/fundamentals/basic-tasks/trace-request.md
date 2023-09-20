---
title: Trace a request
pcx_content_type: how-to
---

# Cloudflare Trace

Cloudflare Trace follows an HTTP/S request through Cloudflare’s reverse proxy to your origin. You can use this tool to understand how different Cloudflare configurations interact with an HTTP request for one of your [proxied hostnames](/dns/manage-dns-records/reference/proxied-dns-records/).

You can define specific request properties to simulate different conditions for an HTTP/S request. Inactive rules configured in Cloudflare products will not be evaluated.

## Use Trace

### 1. Configure one or more Cloudflare products

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Set configuration settings at the account level, or select a domain and configure settings for one or more Cloudflare products.

### 2. Build a trace

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Trace**.

3. Enter a URL to trace. The URL must include a hostname that is [proxied by Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/).

4. Select an HTTP method. If you select _POST_, _PUT_, or _PATCH_, you should enter a value in **Request body**.

5. (Optional) Define any custom request properties to simulate the conditions of a specific HTTP/S request. You can customize the following request properties:

    * Protocol
    * Request headers
    * Request cookies
    * Geolocation
    * Bot score
    * Threat score
    * Request body
    * Skip challenge (skips a Cloudflare-issued challenge, if any, allowing the trace to continue)

6. Select **Send trace**.

### 3. Assess results

The **Trace results** page shows all evaluated and executed configurations from different Cloudflare products, in evaluation order. Any inactive rules are not evaluated.

1. Analyze the different steps evaluated and executed by Cloudflare for the current trace. Trace results include matches for all active rules and configurations, whether configured at the account level or for a specific domain or subdomain.

    To show all configurations, including the ones that did not match the request, select _All configurations_ in the **Results shown** dropdown.

2. (Optional) Update your Cloudflare configuration (at the account or at the domain/subdomain level) and create a new trace to check the impact of your changes.

To run a trace with the same configuration later, copy the JSON shown in the dashboard and enter it when creating a new trace.
