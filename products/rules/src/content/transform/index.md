---
title: Transform Rules
order: 2
---

# About Transform Rules

Transform Rules allow you to make adjustments to incoming requests at the edge before they go through any other Cloudflare products.

There are two types of Transform Rules:

* URL Rewrite Rules:
    * Rewrite the **path** of the URL of an HTTP request
    * Rewrite the **query string** of the URL of an HTTP request
* HTTP Request Header Modification Rules:
    * Set the value of an **HTTP request header**
    * Remove an **HTTP request header**

To configure Transform Rules in the dashboard, use the **Transform Rules** tab in Rules.

<ButtonGroup>
  <Button type="primary" href="/transform/create-url-rewrite-rule">Create a URL Rewrite Rule</Button>
  <Button type="primary" href="/transform/create-header-modification-rule">Create a Header Modification Rule</Button>
  <Button type="secondary" href="/transform/use-cases">Examples</Button>
</ButtonGroup>

---

## URL Rewrite Rules

A URL Rewrite Rule can perform a **static rewrite** or a **dynamic rewrite**. Static rewrites replace a given part of a request URL (path or query string) with a static string. Dynamic rewrites support more advanced scenarios where you use an [expression](https://developers.cloudflare.com/firewall/cf-firewall-rules/fields-and-expressions) to define the resulting path or query string.

To create a URL Rewrite Rule in the dashboard, see [Create a URL Rewrite Rule in the dashboard](/transform/create-url-rewrite-rule).

To create a URL Rewrite Rule via API, see [Create a URL Rewrite Rule via API](/transform/api/url-rewrite-rule).

### Rewrites and redirects 

You can manipulate the URL of a request through different operations, namely through rewrites and redirects. 

A **rewrite** is a server-side operation that occurs before a web server has fully processed a request. A rewrite is not visible to website visitors, since the URL displayed in the browser does not change. 

A **redirect** is a client-side operation that occurs after the web server has loaded the initial URL. In this case, a website visitor can see the URL changing when the redirect occurs.

You can configure URL Rewrite Rules in the dashboard to perform rewrites at the edge without reaching your web server. URL Rewrite Rules run in the `http_request_transform` phase of Cloudflare's request handling workflow. For more information on phases, check the [Ruleset Engine](https://developers.cloudflare.com/firewall/cf-rulesets) documentation.

Check [Configuring URL forwarding or redirects with Cloudflare Page Rules](https://support.cloudflare.com/hc/articles/200172286) in the Support KB to learn more about configuring redirects.

---

## HTTP Request Header Modification Rules

<Aside type="note">

This feature is available in Beta.

</Aside>

You can manipulate the headers of incoming HTTP requests through HTTP Request Header Modification Rules. Through these rules you can:

* Set the value of an HTTP request header to a literal string value, overwriting its previous value or adding a new header to the request.
* Set the value of an HTTP request header according to an expression, overwriting its previous value or adding a new header to the request.
* Remove an HTTP request header from the request (remove all headers with the provided name).

<Aside type='warning' label='Limitations'>

* You cannot modify or remove HTTP request headers whose name starts with `cf-` or `x-cf-` except for the `cf-connecting-ip` HTTP request header, which you can remove.

* During Beta, you can only set the value of an HTTP request header using string values. You cannot use integer, IP, or boolean values such as `cf.bot_management.score`, `ip.src`, or `cf.bot_management.verified_bot`.

</Aside>

HTTP Request Header Modification Rules run in the `http_request_late_transform` phase of Cloudflare's request handling workflow. For more information on phases, see [Phases](https://developers.cloudflare.com/firewall/cf-rulesets#phases) in the Ruleset Engine documentation.

To create an HTTP Request Header Modification Rule in the dashboard, see [Create an HTTP Request Header Modification Rule in the dashboard](/transform/create-header-modification-rule).

To create an HTTP Request Header Modification Rule via API, see [Create an HTTP Request Header Modification Rule via API](/transform/api/header-modification-rule).

---

## Availability

Cloudflare Transform Rules are available to all customers. Keep in mind that support for regular expressions is based on your plan type.

This table outlines the Transform Rules features available with each customer plan:

<TableWrap>

Feature                                       | Free | Pro | Business | Enterprise
----------------------------------------------|------|-----|----------|-----------
Active URL Rewrite Rules                      | 2    | 5   | 10       | 20
Active HTTP Request Header Modification Rules | 2    | 5   | 10       | 20
Regular expression support                    | No   | No  | Yes      | Yes

</TableWrap>

A Cloudflare user must have the [Firewall role](https://support.cloudflare.com/hc/articles/205065067#12345682) or one of the Administrator roles to access Transform Rules.

<Aside type='note' label='Note'>

During Beta, each plan has separate quotas for URL Rewrite Rules and HTTP Request Header Modification Rules. After Beta, these quotas will be unified in a single Transform Rules quota per plan.

</Aside>

---

## Get started

To get started building your own Transform Rules, see:

* [Create a URL Rewrite Rule](/transform/create-url-rewrite-rule)
* [Create an HTTP Request Header Modification Rule](/transform/create-header-modification-rule)

You can also [create Transform Rules via API](/transform/api).

For common Transform Rule scenarios, see [Common use cases](/transform/use-cases).

Check [Firewall Rules language](https://developers.cloudflare.com/firewall/cf-firewall-language) for more information on building expressions for Transform Rules, since the language is the same as the Firewall Rules language.
