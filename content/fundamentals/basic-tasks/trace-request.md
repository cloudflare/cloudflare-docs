---
title: Trace a request (beta)
pcx_content_type: how-to
meta:
  title: Trace a request with Cloudflare Trace (beta)
---

{{<heading-pill style="beta">}} Cloudflare Trace {{</heading-pill>}}

{{<plan type="all">}}

Cloudflare Trace (beta) follows an HTTP/S request through Cloudflare’s reverse proxy to your origin. Use this tool to understand how different Cloudflare configurations interact with an HTTP/S request for one of your [proxied hostnames](/dns/manage-dns-records/reference/proxied-dns-records/).

You can define specific request properties to simulate different conditions for an HTTP/S request. Inactive rules configured in Cloudflare products will not be evaluated.

Cloudflare Trace is available to users with an Administrator or Super Administrator role.

---

## Use Trace in the dashboard

### 1. Configure one or more Cloudflare products

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account.
2. Set configuration settings at the account level, or select a domain and configure settings for one or more Cloudflare products.

### 2. Build a trace

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to Account Home > **Trace**.

2. Enter a URL to trace. The URL must include a hostname that is [proxied by Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/).

3. Select an HTTP method. If you select _POST_, _PUT_, or _PATCH_, you should enter a value in **Request body**.

4. (Optional) Define any custom request properties to simulate the conditions of a specific HTTP/S request. You can customize the following request properties:

    * **Protocol** (HTTP protocol version)
    * **Request headers**
    * **Cookies**
    * **Geolocation** (request source [country](/ruleset-engine/rules-language/fields/#field-ip-src-country), [region](/ruleset-engine/rules-language/fields/#field-ip-src-region_code), and [city](/ruleset-engine/rules-language/fields/#field-ip-src-city))
    * [**Bot score**](/bots/concepts/bot-score/)
    * [**Threat score**](/ruleset-engine/rules-language/fields/#field-cf-threat_score)
    * **Request body** (for `POST`, `PUT`, and `PATCH` requests)
    * **Skip challenge** (skips a Cloudflare-issued [challenge](/firewall/cf-firewall-rules/cloudflare-challenges/), if any, allowing the trace to continue)

5. Select **Send trace**.

### 3. Assess results

The **Trace results** page shows all evaluated and executed configurations from different Cloudflare products, in evaluation order. Any inactive rules are not evaluated.

1. Analyze the different [steps](#steps-in-trace-results) with evaluated and executed configurations for the current trace. Trace results include matches for all active rules and configurations, whether configured at the account level or for a specific domain or subdomain.

    To show all configurations, including the ones that did not match the request, select _All configurations_ in the **Results shown** dropdown.

2. (Optional) Update your Cloudflare configuration (at the account or at the domain/subdomain level) and create a new trace to check the impact of your changes.

### 4. (Optional) Save the trace configuration

To run a trace later with the same configuration:

1. Copy the JSON shown in the dashboard with the current trace configuration.
2. When creating a new trace, paste it in the JSON box to define all the settings of the new trace.

## Use Trace via API

Use the [Request Trace](/api/operations/account-request-tracer-request-trace) operation to perform a trace using the Cloudflare API.

---

## Steps in trace results

For matched configurations in trace results, each step corresponds to one of the following:

* Execution of one or more rules of a Cloudflare product, in the context of a [phase](/ruleset-engine/about/phases/) (for products built on the [Ruleset Engine](/ruleset-engine/))
* [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) (execution of one or more rules)

The following steps are planned for future additions:

* [Workers](/workers/) (execution of one or more scripts)

---

## Limitations

Currently, you cannot perform traces for:

* Domains or subdomains associated with [BYOIP](/byoip/) addresses
* [Custom hostnames](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/)
* [Spectrum](/spectrum/) applications

Also, the following products will not appear in trace results:

* [Firewall rules](/firewall/)
* [WAF managed rules (previous version)](/waf/reference/legacy/old-waf-managed-rules/)
* [Rate limiting rules (previous version)](/waf/reference/legacy/old-rate-limiting/)
