---
pcx-content-type: concept
order: 2
---

# Transform Rules

Transform Rules allow you to adjust the URI path, query string, and HTTP headers of requests and responses at the edge.

There are several types of Transform Rules:

*   **URL Rewrite Rules**: Rewrite the URL path and query string of an HTTP request.
*   **HTTP Request Header Modification Rules**: Set the value of an HTTP request header or remove a request header.
*   **HTTP Response Header Modification Rules**: Set the value of an HTTP response header or remove a response header.

To configure Transform Rules in the dashboard, use the **Transform Rules** tab in Rules.

***

## Transform Rules evaluation

Transform Rules run in order. Rules that appear later in the list of Transform Rules can overwrite changes done by previous rules. You can define the rule order in the dashboard or via API.

Request and response fields are immutable within each [phase](https://developers.cloudflare.com/ruleset-engine/about#phases) while evaluating Transform Rules for a request/response. For more information, refer to [Rule evaluation and field values](https://developers.cloudflare.com/ruleset-engine/about#rule-evaluation-and-field-values).

## Availability

Cloudflare Transform Rules are available to all customers. Keep in mind that support for regular expressions is based on your plan type.

This table outlines the Transform Rules features available with each customer plan:

<TableWrap>

Feature                                       | Free | Pro | Business | Enterprise
\----------------------------------------------|------|-----|----------|-----------
Active Transform Rules                        | 10   | 25  | 50       | 100
Regular expression support                    | No   | No  | Yes      | Yes

</TableWrap>

A Cloudflare user must have the [Firewall role](https://support.cloudflare.com/hc/articles/205065067#12345682) or one of the Administrator roles to access Transform Rules.

***

## Get started

To get started building your own Transform Rules in the dashboard, refer to the following pages:

*   [Create a URL Rewrite Rule](/transform/url-rewrite/create-dashboard)
*   [Create an HTTP Request Header Modification Rule](/transform/request-header-modification/create-dashboard)
*   [Create an HTTP Response Header Modification Rule](/transform/response-header-modification/create-dashboard)

You can also create Transform Rules via API:

*   [Create a URL Rewrite Rule via API](/transform/url-rewrite/create-api)
*   [Create an HTTP Request Header Modification Rule via API](/transform/request-header-modification/create-api)
*   [Create an HTTP Response Header Modification Rule via API](/transform/response-header-modification/create-api)

Refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language) for more information on building expressions for Transform Rules.
