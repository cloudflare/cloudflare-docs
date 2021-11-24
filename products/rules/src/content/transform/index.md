---
title: Transform Rules
pcx-content-type: concept
order: 2
---

# About Transform Rules

Transform Rules allow you to adjust the URI path, query string, and HTTP headers of incoming requests at the edge.

There are several types of Transform Rules:

* URL Rewrite Rules:

    * Rewrite the **path** of the URL of an HTTP request
    * Rewrite the **query string** of the URL of an HTTP request

* HTTP Request Header Modification Rules:

    * Set the value of an **HTTP request header**
    * Remove an **HTTP request header**

* HTTP Response Header Modification Rules:

    * Set the value of an **HTTP response header**
    * Remove an **HTTP response header**

To configure Transform Rules in the dashboard, use the **Transform Rules** tab in Rules.

---

## Transform Rules evaluation

Transform Rules run in order. Rules that appear later in the list of Transform Rules can overwrite changes done by previous rules. You can define the rule order in the dashboard or via API.

All request fields are immutable while evaluating Transform Rules for a request. For example, if a URL Rewrite Rule #1 updates the URI path or the query string, URL Rewrite Rule #2 will not take these previous changes into consideration.

## Availability

Cloudflare Transform Rules are available to all customers. Keep in mind that support for regular expressions is based on your plan type.

This table outlines the Transform Rules features available with each customer plan:

<TableWrap>

Feature                                       | Free | Pro | Business | Enterprise
----------------------------------------------|------|-----|----------|-----------
Active Transform Rules                        | 2    | 5   | 10       | 20
Regular expression support                    | No   | No  | Yes      | Yes

</TableWrap>

A Cloudflare user must have the [Firewall role](https://support.cloudflare.com/hc/articles/205065067#12345682) or one of the Administrator roles to access Transform Rules.

---

## Get started

To get started building your own Transform Rules, refer to the following pages:

* [Create a URL Rewrite Rule in the dashboard](/transform/url-rewrite/create-dashboard)
* [Create an HTTP Request Header Modification Rule in the dashboard](/transform/request-header-modification/create-dashboard)
* [Create an HTTP Response Header Modification Rule in the dashboard](/transform/response-header-modification/create-dashboard)

You can also create Transform Rules via API:

* [Create a URL Rewrite Rule via API](/transform/url-rewrite/create-api)
* [Create an HTTP Request Header Modification Rule via API](/transform/request-header-modification/create-api)
* [Create an HTTP Response Header Modification Rule via API](/transform/response-header-modification/create-api)

Check [Firewall Rules language](https://developers.cloudflare.com/firewall/cf-firewall-language) for more information on building expressions for Transform Rules, since the language is the same as the Firewall Rules language.
