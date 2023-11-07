---
title: FAQ
pcx_content_type: faq
weight: 11
structured_data: true
meta:
  title: FAQ — Origin Rules
---

# FAQ

Below you will find answers to the most commonly asked questions regarding Origin Rules.

{{<faq-item>}}
{{<faq-question text="What happens if I use both an origin rule and a page rule to perform a Host header/DNS record override?">}}

{{<faq-answer>}}
In this situation the origin rule parameters will override the [page rule](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) parameters.
{{</faq-answer>}}
{{</faq-item>}}

Consider the following example scenarios:

* A page rule defines a Host header override, but not a resolve override (or DNS record override). An origin rule defines a DNS record override, but not a Host header override. The resulting request will have the `Host` header defined by the page rule and the origin hostname defined by the origin rule.
* A page rule defines a Host header override, and an origin rule also defines a Host header override. The resulting request will have the `Host` header defined by the origin rule.

{{<faq-item>}}
{{<faq-question text="Will Cloudflare automatically migrate my Page Rules with Host header and DNS record overrides to origin rules?">}}

{{<faq-answer>}}
No. This is currently a manual process, since your Page Rules may include additional settings that origin rules do not currently support.
{{</faq-answer>}}
{{</faq-item>}}

{{<faq-item>}}
{{<faq-question text="What happens if more than one origin rule matches the current request?">}}

{{<faq-answer>}}
If two or more origin rules match a request, the configuration of those rules is merged. While merging two configurations, the settings of later rules will override the settings defined in previous rules, updating or adding configuration properties. The final configuration applied by Cloudflare will be this merged version.
{{</faq-answer>}}
{{</faq-item>}}

For example, if you configure the following two [origin rules](/rules/origin-rules/) and both rules match, Cloudflare will use the destination port set by the first rule, and the DNS hostname override and `Host` header value set by the second rule.

{{<example>}}

**Origin rule #1**

Parameter              | Value
-----------------------|--------------
Set `Host` header      | `example.com`
Set destination port   | `8081`

{{</example>}}

{{<example>}}

**Origin rule #2**

Parameter          | Value
-------------------|--------------
Set `Host` header  | `example.net`
Set DNS hostname   | `example.net`

{{</example>}}

{{<details header="JSON example for API users">}}

When [using the API](/rules/origin-rules/create-api/), you configure origin rule parameters in an `action_parameters` object.

```json
{
  "rules": [
    {
      "expression": "http.request.uri.query contains \"/eu/\"",
      "description": "Origin rule #1",
      "action": "route",
      "action_parameters": {
        "host_header": "example.com",
        "origin": {
          "port": 8081
        }
      }
    },
    {
      "expression": "http.request.uri.query contains \"/eu/\"",
      "description": "Origin rule #2",
      "action": "route",
      "action_parameters": {
        "host_header": "example.net",
        "origin": {
          "host": "example.net",
        }
      }
    }
  ]
}
```

{{</details>}}

The merged configuration to apply would be the following:

Parameter            | Value
---------------------|--------------
Set `Host` header    | `example.net`
Set destination port | `8081`
Set DNS hostname     | `example.net`

If you also configured a destination port in rule #2, that value would override the `8081` destination port defined in rule #1.
