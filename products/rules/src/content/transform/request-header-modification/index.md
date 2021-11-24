---
title: Request Header Modification Rules
pcx-content-type: concept
order: 1
---

# HTTP Request Header Modification Rules

You can manipulate the headers of incoming HTTP requests through HTTP Request Header Modification Rules. Through these rules you can:

* Set the value of an HTTP request header to a literal string value, overwriting its previous value or adding a new header to the request.
* Set the value of an HTTP request header according to an expression, overwriting its previous value or adding a new header to the request.
* Remove an HTTP request header from the request (remove all headers with the provided name).

To modify HTTP headers in the **response**, refer to [HTTP Response Header Modification Rules](/transform/response-header-modification).

<Aside type='warning' header='Important'>

* You cannot modify or remove HTTP request headers whose name starts with `cf-` or `x-cf-` except for the `cf-connecting-ip` HTTP request header, which you can remove.

* If you modify the value of an existing HTTP request header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP request header is **removed**.

* Currently, there is a limited number of HTTP request headers that you cannot modify. Cloudflare may remove restrictions for some of these HTTP request headers when presented with valid use cases. [Create a post in the community](https://community.cloudflare.com) for consideration.

</Aside>

To create an HTTP Request Header Modification Rule, refer to the following pages:

* [Create an HTTP Request Header Modification Rule in the dashboard](/transform/request-header-modification/create-dashboard)
* [Create an HTTP Request Header Modification Rule via API](/transform/request-header-modification/create-api)
