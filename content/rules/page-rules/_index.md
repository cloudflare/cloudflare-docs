---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: Page Rules
---

# Page Rules

{{<Aside type="warning">}}
We advise considering alternative [Rules](/rules/) options due to their enhanced configurability. Please note that Page Rules are going to be deprecated in the foreseeable future.
{{</Aside>}}

You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Page Rules are available in **Rules** > **Page Rules**.

{{<Aside type="warning">}}
Page Rules require a [proxied](/dns/manage-dns-records/reference/proxied-dns-records) DNS record for your page rule to work. Page Rules won't apply to hostnames that don't exist in DNS or aren't being directed to Cloudflare.

Depending on the record type, you can use different values for the target as a placeholder. Either one of these achieves the same outcome and you only need to create one:

```
www.example.com  A      192.0.2.1
www.example.com  AAAA   2001:DB8::1
www.example.com  CNAME  domain.example
```

We recommend only using reserved IP addresses or domain names to avoid sending traffic to foreign infrastructure.

For more information on reserved IP addresses or top level domains, please refer to these RFCs:
[RFC 5737](https://datatracker.ietf.org/doc/html/rfc5737)
[RFC 3849](https://datatracker.ietf.org/doc/html/rfc3849)
[RFC 2606](https://datatracker.ietf.org/doc/html/rfc2606)
{{</Aside>}}

The default number of allowed page rules depends on the domain plan as shown below.

{{<feature-table id="rules.page_rules">}}

You can [purchase additional rules](https://www.cloudflare.com/features-page-rules/) (up to a maximum of 100) for domains in the Free, Lite, Pro, Pro Plus, and Business plans.

___

## Before getting started

It is important to understand two basic Page Rules behaviors:

-   Only the highest priority matching page rule takes effect on a request.
-   Page rules are prioritized in descending order in the Cloudflare dashboard, with the highest priority rule at the top.

{{<Aside type="tip">}}
Cloudflare recommends ordering your rules from most specific to least specific.
{{</Aside>}}

A page rule matches a URL pattern based on the following format (comprised of five segments): `<scheme>://<hostname><:port>/<path>?<query_string>`

An example URL with these four segments looks like:

```
https://www.example.com:443/image.png?parameter1=value1
```

The `scheme` and `port` segments are optional. If omitted, _scheme_ matches both `http://` and `https://` protocols. If no `port` is specified, the rule will match all ports.

Finally, you can disable a page rule at any time. While a rule is disabled, actions won’t trigger, but the rule still appears in the **Rules** app in the **Page Rules** tab, is editable, and counts against the number of rules allowed for your domain. The _Save as Draft_ option creates a page rule that is disabled by default.

___

## Related resources

-   [Recommended Page Rules to Consider](/rules/page-rules/tutorials/recommended-page-rules-to-consider/)
-   [What subdomains are appropriate for orange/grey clouds?](/dns/manage-dns-records/reference/proxied-dns-records/#limitations)
-   [How do I use Cache Everything with Cloudflare?](/cache/concepts/customize-cache/)
-   [How do I cache static HTML?](/cache/concepts/customize-cache/)
-   [Offline error message when updating or accessing the admin section of my content management system](/support/third-party-software/content-management-system-cms/improving-web-security-for-content-management-systems-like-wordpress/)
