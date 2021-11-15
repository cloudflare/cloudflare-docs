---
title: Response Header Modification Rules
pcx-content-type: concept
order: 2
---

# HTTP Response Header Modification Rules

You can manipulate the headers included in the HTTP response through HTTP Response Header Modification Rules. Through these rules you can:

* Set the value of an HTTP response header to a literal string value, overwriting its previous value or adding a new header to the response.
* Set the value of an HTTP response header according to an expression, overwriting its previous value or adding a new header to the response.
* Remove an HTTP header from the response (remove all headers with the provided name).

To modify HTTP headers in the **request**, refer to [HTTP Request Header Modification Rules](/transform/request-header-modification).

<Aside type='warning' header='Important'>

* The response header values are calculated using the field values from the corresponding HTTP request. For example, the value of `ip.src.country` will be the country of the website visitor, not the origin where the response was sent from.

* You cannot modify or remove HTTP response headers whose name starts with `cf-` or `x-cf-` except for the `cf-connecting-ip` HTTP response header, which you can remove.

* If you modify the value of an existing HTTP response header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP response header is **removed**.

* Currently, there is a limited number of HTTP response headers that you cannot modify. Cloudflare may remove restrictions for some of these HTTP response headers when presented with valid use cases. [Create a post in the community](https://community.cloudflare.com) for consideration.

</Aside>

To create an HTTP Response Header Modification Rule, refer to the following pages:

* [Create an HTTP Response Header Modification Rule in the dashboard](/transform/response-header-modification/create-dashboard)
* [Create an HTTP Response Header Modification Rule via API](/transform/response-header-modification/create-api)
