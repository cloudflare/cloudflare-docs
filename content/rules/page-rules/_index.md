---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/218411427-What-do-the-custom-caching-options-mean-in-Page-Rules-#summary-of-page-rules-settings
title: Page Rules
weight: 19
---

# Page Rules

Page rules trigger one or more actions whenever a certain URL pattern is matched. Page Rules are available in **Rules** > **Page Rules**.

{{<Aside type="warning">}}
We advise considering alternative [Rules](/rules/) options due to their enhanced configurability.<br>
Page Rules are going to be deprecated in the foreseeable future. Refer to [our blog post](https://blog.cloudflare.com/future-of-page-rules/) for details.
{{</Aside>}}

## Availability

The default number of allowed page rules depends on the domain plan as shown below.

{{<feature-table id="rules.page_rules">}}

You can [purchase additional rules](/rules/page-rules/troubleshooting/billing-and-subscription/) (up to a maximum of 100) for domains in the Free, Lite, Pro, Pro Plus, and Business plans.

___

## Before getting started

It is important to understand a few Page Rules behaviors.

### Page Rules require proxied DNS records

Page Rules require a [proxied](/dns/manage-dns-records/reference/proxied-dns-records/) DNS record for your page rule to work. Page Rules will not apply to hostnames that do not exist in DNS or are not being directed to Cloudflare.

Depending on the record type, you can use different values for the target as a placeholder. Either one of these achieves the same outcome and you only need to create one:

```
www.example.com  A      192.0.2.1
www.example.com  AAAA   2001:DB8::1
www.example.com  CNAME  domain.example
```

Cloudflare recommends only using reserved IP addresses or domain names to avoid sending traffic to foreign infrastructure.

For more information on reserved IP addresses or top level domains, please refer to these RFCs:
- [RFC 5737](https://datatracker.ietf.org/doc/html/rfc5737)
- [RFC 3849](https://datatracker.ietf.org/doc/html/rfc3849)
- [RFC 2606](https://datatracker.ietf.org/doc/html/rfc2606)

### Priority order matters

Only the highest priority matching page rule takes effect on a request.

Page rules are prioritized in descending order in the Cloudflare dashboard, with the highest priority rule at the top. For this reason, Cloudflare recommends ordering your rules from most specific to least specific.

A page rule matches a URL pattern based on the following format (comprised of five segments):

```txt
<SCHEME>://<HOSTNAME>:<PORT>/<PATH>?<QUERY_STRING>
```

An example URL with all the segments looks like the following:

```txt
https://www.example.com:443/image.png?parameter1=value1
```

The `<SCHEME>` and `<PORT>` segments are optional. If omitted, `<SCHEME>` matches both `http://` and `https://` protocols. If no `<PORT>` is specified, the rule will match all ports.

### Disabled page rules

When a page rule is disabled, actions will not trigger, but the rule will:

- Still appear in the Cloudflare dashboard.
- Be editable.
- Count against the number of rules allowed for your domain.
