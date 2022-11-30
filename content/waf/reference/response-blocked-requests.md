---
title: Response for blocked requests
pcx_content_type: reference
weight: 1
---

# Response for blocked requests

By default, when you select the _Block_ action in a rule, the WAF will send a response according to the preferred content type defined in the received `Accept` header value (if any):

Preferred content type          | Format of _Block_ action response
--------------------------------|----------------------
`text/html`                     | HTML
`application/json`              | JSON
`application/xml` or `text/xml` | XML
`text/plain`                    | Plain text
Other / Not defined             | HTML

## Custom response

You can define a custom response for blocked requests. A custom response has the following settings:

* **Response type**: Choose a content type or the default block response from the list. The available custom response types are the following:

    | Dashboard value | API value            |
    |-----------------|----------------------|
    | Custom HTML     | `"text/html"`        |
    | Custom Text     | `"text/plain"`       |
    | Custom JSON     | `"application/json"` |
    | Custom XML      | `"text/xml"`         |

* **Response code**: Choose an HTTP status code for the response, in the range 400-499. The default response code is 403.
* **Response body**: The body of the custom response. Configure a valid body according to the response type you selected.
