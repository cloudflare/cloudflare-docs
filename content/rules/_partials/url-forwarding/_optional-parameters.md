---
_build:
  publishResources: false
  render: never
  list: never
---

The optional parameters are the following:

* `"status_code"` (integer): The HTTP status code sent in the redirect response (`301` by default). The value must be one of the following: `301` (Moved permanently), `302` (Found, also known as Moved temporarily), `307` (Temporary redirect), or `308` (Permanent redirect).
* `"preserve_query_string"` (boolean): Whether to preserve the query string when redirecting (`false` by default).
