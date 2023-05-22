---
title: FAQ
pcx_content_type: faq
weight: 11
meta:
  title: FAQ — Origin Rules
---

# FAQ

Below you will find answers to the most commonly asked questions regarding Origin Rules.

## What happens if I use both an Origin Rule and a Page Rule to perform a Host header/DNS record override?

In this situation the Origin Rule parameters will override the [Page Rule](https://support.cloudflare.com/hc/en-us/articles/218411427) parameters. Consider the following example scenarios:

* A Page Rule defines a Host header override, but not a resolve override (or DNS record override). An Origin Rule defines a DNS record override, but not a Host header override. The resulting request will have the `Host` header defined by the Page Rule and the origin hostname defined by the Origin Rule.
* A Page Rule defines a Host header override, and an Origin Rule also defines a Host header override. The resulting request will have the `Host` header defined by the Origin Rule.

## Will Cloudflare automatically migrate my Page Rules with Host header and DNS record overrides to Origin Rules?

No. This is currently a manual process, since your Page Rules may include additional settings that Origin Rules do not currently support.

## What happens if more than one Origin Rule matches the current request?

If two or more Origin Rules match a request, the configuration of those rules is merged. While merging two configurations, the settings of later rules will override the settings defined in previous rules, updating or adding configuration properties. The final configuration applied by Cloudflare will be this merged version.

For example, if you configure the following two [Origin Rules](/rules/origin-rules/) and both rules match, Cloudflare will use the destination port set by the first rule, and the DNS hostname override and `Host` header value set by the second rule.

{{<example>}}

**Origin Rule #1**

Parameter              | Value
-----------------------|--------------
Set `Host` header      | `example.com`
Set destination port   | `8081`

{{</example>}}

{{<example>}}

**Origin Rule #2**

Parameter          | Value
-------------------|--------------
Set `Host` header  | `example.net`
Set DNS hostname   | `example.net`

{{</example>}}

<details>
<summary>JSON example for API users</summary>
<div>

When [using the API](/rules/origin-rules/create-api/), you configure Origin Rule parameters in an `action_parameters` object.

```json
{
  "rules": [
    {
      "expression": "http.request.uri.query contains \"/eu/\"",
      "description": "Origin Rule #1",
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
      "description": "Origin Rule #2",
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

</div>
</details>

The merged configuration to apply would be the following:

Parameter            | Value
---------------------|--------------
Set `Host` header    | `example.net`
Set destination port | `8081`
Set DNS hostname     | `example.net`

If you also configured a destination port in rule #2, that value would override the `8081` destination port defined in rule #1.
