---
_build:
  publishResources: false
  render: never
  list: never
---

When you select the _Block_ action in a rule you can optionally define a custom response.

The custom response has three settings:

* **With response type**: Choose a content type or the default block response from the list. The available custom response types are the following:

    | Dashboard value | API value |
    |---|---|
    | Custom HTML | `"text/html"` |
    | Custom Text | `"text/plain"` |
    | Custom JSON | `"application/json"` |
    | Custom XML | `"text/xml"` |

* **With response code**: Choose an HTTP status code for the response, in the range 400-499. The default response code is 403.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected.
