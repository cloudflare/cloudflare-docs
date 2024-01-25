---
title: Parameters
pcx_content_type: reference
weight: 3
meta:
  title: Custom error response parameters
---

# Parameter reference

Custom error responses have the following parameters:

{{<definitions>}}

* **`content`** {{<type>}}String{{</type>}} {{<prop-meta>}}Required{{</prop-meta>}}

  * The response body to return. It can include [error tokens](/rules/custom-error-responses/error-tokens/) that will be replaced with real values before sending the error response to the visitor.
  * The maximum content size is 10 KB.

* **`content_type`** {{<type>}}String{{</type>}} {{<prop-meta>}}Required{{</prop-meta>}}

  * The content type of the returned response. Must be one of the following:

    * `text/html`
    * `text/plain`
    * `application/json`
    * `text/xml`

* **`status_code`** {{<type>}}Integer{{</type>}} {{<prop-meta>}}Optional{{</prop-meta>}}
  * The HTTP status code of the response. If provided, this value will override the current response status code.
  * The status code must be between `400` and `999`.

{{</definitions>}}

{{<Aside type="warning">}}

If you create an HTML error response, make sure the `referrer` meta tag is not present in the HTML code since it will disrupt [Cloudflare challenges](/waf/reference/cloudflare-challenges/):

`<meta name="referrer" (...) />`

{{</Aside>}}
