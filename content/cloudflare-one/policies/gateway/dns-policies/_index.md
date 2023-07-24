---
pcx_content_type: configuration
title: DNS policies
layout: single
weight: 2
---

# DNS policies

When a user makes a DNS request to Gateway, Gateway matches the request against the DNS policies you have set up for your organization. If the domain does not belong to any blocked categories, or if it matches an Override policy, the user's client receives the DNS resolution and initiates an HTTP connection.

A DNS policy consists of an **Action** as well as a logical expression that determines the scope of the action. To build an expression, you need to choose a **Selector** and an **Operator**, and enter a value or range of values in the **Value** field. You can use **And** and **Or** logical operators to evaluate multiple conditions.

- [Actions](#actions)
- [Selectors](#selectors)
- [Comparison operators](#comparison-operators)
- [Value](#value)
- [Logical operators](#logical-operators)

When creating a DNS policy, you can select as many security risk categories and content categories as needed to fully secure your network. Unless a more specific selector is configured in a policy (for example, _User Email_ or _Source IP_), then the policy will be evaluated against all DNS queries that reach Gateway from your organization.

{{<render file="gateway/_response.md" withParameters="query;;_Source IP_;;_Resolved IP_">}}

{{<Aside>}}
If you are using the legacy DNS policy builder, we recommend migrating your rules to the new policy builder in order to take full advantage of the DNS filtering options described below. Once you have recreated your rules in the **DNS** tab, you can delete the old rules from the **DNS (legacy)** tab.
{{</Aside>}}

{{<Aside type="warning">}}
Gateway will not properly filter traffic sent through third-party VPNs or other Internet filtering software, such as [iCloud Private Relay](https://support.apple.com/en-us/HT212614). To ensure your DNS policies apply to your traffic, we recommend restricting software that may interfere with Gateway.
{{</Aside>}}

## Actions

Just like actions in HTTP policies, actions in DNS policies allow you to choose what to do with a given set of elements. You can assign one action per policy.

These are the action types you can choose from:

- [Allow](#allow)
- [Block](#block)
- [Override](#override)
- [Safe Search](#safe-search)
- [YouTube Restricted Mode](#youtube-restricted-mode)

### Allow

API value: `allow`

Policies with Allow actions allow DNS queries to reach destinations you specify within the Selector and Value fields. For example, the following configuration allows DNS queries to reach domains we categorize as belonging to the Education content category:

| Selector           | Operator | Value     | Action |
| ------------------ | -------- | --------- | ------ |
| Content Categories | In       | Education | Allow  |

#### Disable DNSSEC validation

When you select **Disable DNSSEC validation**, Gateway will resolve DNS queries even if the cryptographic signature for the DNS record cannot be validated. We do not recommend disabling DNSSEC validation unless you know that the validation failure is due to DNSSEC configuration issues and not malicious attacks.

### Block

API value: `block`

Policies with Block actions block DNS queries to reach destinations you specify within the Selector and Value fields. For example, the following configuration blocks DNS queries from reaching domains we categorize as belonging to the Adult Themes content category:

| Selector           | Operator | Value        | Action |
| ------------------ | -------- | ------------ | ------ |
| Content Categories | In       | Adult Themes | Block  |

#### Custom block page

When choosing the Block action, toggle the **Display custom block page** setting to respond to queries with a block page and to specify the message you want to display to users who go to blocked websites. If disabled, Gateway will respond to blocked queries with `0.0.0.0`. For more information, refer to the dedicated documentation on [customizing the block page](/cloudflare-one/policies/gateway/configuring-block-page/).

### Override

API value: `override`

Policies with Override actions allow you to respond to all DNS queries for a given domain to another destination. For example, you can provide a custom response IP of `1.2.3.4` for all queries to `www.example.com` with the following policy:

| Selector | Operator | Value             | Action   | Override Hostname |
| -------- | -------- | ----------------- | -------- | ----------------- |
| Hostname | Is       | `www.example.com` | Override | `1.2.3.4`         |

{{<Aside>}}The Override action cannot be used with selectors evaluated after resolution, including **Authoritative Nameserver IP**, **Resolved IP**, and any DNS response values.{{</Aside>}}

### Safe Search

API value: `safesearch`

SafeSearch is a feature of search engines that helps you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children or at work.

You can use Cloudflare Gateway to enable SafeSearch on search engines like Google, Bing, Yandex, YouTube and DuckDuckGo. For example, to enable SafeSearch for Google, you can create the following policy:

| Selector | Operator | Value        | Action      |
| -------- | -------- | ------------ | ----------- |
| Domain   | Is       | `google.com` | Safe Search |

### YouTube Restricted Mode

API value: `ytrestricted`

Similarly, you can enforce YouTube Restricted mode by choosing the _YouTube Restricted_ action. YouTube Restricted Mode is an automated filter for adult and offensive content built into YouTube. To enable YouTube Restricted Mode, you could set up a policy like the following:

| Selector   | Operator | Value         | Action             |
| ---------- | -------- | ------------- | ------------------ |
| DNS Domain | Is       | `youtube.com` | YouTube Restricted |

This setup ensures users will be blocked from accessing offensive sites using DNS.

## Selectors

Gateway matches DNS traffic against the following selectors, or criteria:

### Application

{{<render file="gateway/_application.md" withParameters="DNS">}}

### Authoritative Nameserver IP

Use this selector to match against the IP address of the authoritative nameserver IP address.

| UI name                     | API example                                |
| --------------------------- | ------------------------------------------ |
| Authoritative Nameserver IP | `dns.authoritative_ns_ips == 198.51.100.0` |

### Content Categories

Use this selector to block domains belonging to specific [content categories](/cloudflare-one/policies/gateway/domain-categories/#content-categories). When using an Allow or Block action, you can optionally [block IP addresses](/cloudflare-one/policies/gateway/domain-categories/#filter-by-resolved-ip-category).

| UI name            | API example                           |
| ------------------ | ------------------------------------- |
| Content Categories | `any(dns.content_category[*] in {1})` |

### DNS CNAME Record

Use this selector to filter DNS responses by their `CNAME` records.

| UI name                  | API example                                                   |
| ------------------------ | ------------------------------------------------------------- |
| DNS CNAME Response Value | `any(dns.response.cname[*] in {"www.apple.com.edgekey.net"})` |

{{<Aside>}}
If one CNAME record points to another CNAME record, each record in the chain will be evaluated. For example, if `abc.example.com` points to `xyz.example.com`, then your DNS policy will evaluate both `abc.example.com` and `xyz.example.com`.
{{</Aside>}}

### DNS MX Record

Use this selector to filter DNS responses by their `MX` records.

| UI name               | API example                                                 |
| --------------------- | ----------------------------------------------------------- |
| DNS MX Response Value | `any(dns.response.mx[*] in {"gmail-smtp-in.l.google.com"})` |

### DNS PTR Record

Use this selector to filter DNS responses by their `PTR` records.

| UI name                | API example                                                |
| ---------------------- | ---------------------------------------------------------- |
| DNS PTR Response Value | `any(dns.response.ptr[*] in {"255.2.0.192.in-addr.arpa"})` |

### DNS Resolver IP

Use this selector to apply policies to DNS queries that arrived to your Gateway Resolver IP address aligned with a registered DNS location. For most Gateway customers, this is an IPv4 AnyCast address and policies created using this IPv4 address will apply to all DNS locations. However, each DNS location has a dedicated IPv6 address and some Gateway customers have been supplied with a dedicated IPv4 address — these both can be used to apply policies to specific registered DNS locations.

| UI name         | API example                               |
| --------------- | ----------------------------------------- |
| DNS Resolver IP | `any(dns.resolved_ip[*] == 198.51.100.0)` |

### DNS TXT Record

Use this selector to filter DNS responses by their `TXT` records.

| UI name                | API example                                 |
| ---------------------- | ------------------------------------------- |
| DNS TXT Response Value | `any(dns.response.txt[*] in {"your_text"})` |

### DNS Location

Use this selector to apply DNS policies to a specific [Gateway DNS location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) or set of locations.

| UI name      | API example                                             |
| ------------ | ------------------------------------------------------- |
| DNS Location | `dns.location in {"location_uuid_1" "location_uuid_2"}` |

### DOH Subdomain

Use this selector to match against DNS queries that arrive via DNS-over-HTTPS (DoH) destined for the DoH endpoint configured for each DNS location. For example, a DNS location with a DoH endpoint of `abcdefg.cloudflare-gateway.com` could be used in a DNS rule by choosing the DoH Subdomain selector and inputting a value of `abcdefg`.

| UI name       | API example                      |
| ------------- | -------------------------------- |
| DOH Subdomain | `dns.doh_subdomain == "abcdefg"` |

### Domain

Use this selector to match against a domain and all subdomains — for example, if you want to block `example.com` and subdomains such as `www.example.com`.

| UI name | API example                            |
| ------- | -------------------------------------- |
| Domain  | `any(dns.domains[*] == "example.com")` |

### Host

Use this selector to match against only the hostname specified — for example, if you want to block `test.example.com` but not `example.com` or `www.test.example.com`.

| UI name | API example                      |
| ------- | -------------------------------- |
| Host    | `dns.fqdn == "test.example.com"` |

### Indicator Feed

{{<render file="gateway/_indicator-feed.md" withParameters="dns">}}

### Query Record Type

Use this selector to choose the DNS resource record type that you would like to apply policies against — for example, you can choose to block A records for a domain but not MX records.

| UI name           | API example                |
| ----------------- | -------------------------- |
| Query Record Type | `dns.query_rtype == "TXT"` |

### Resolved Continent

Use this selector to filter based on the continent that the query resolves to. Geolocation is determined from the IP address in the response. To specify a continent, enter its two-letter code into the **Value** field:

- AF – Africa
- AN – Antarctica
- AS – Asia
- EU – Europe
- NA – North America
- OC – Oceania
- SA – South America
- T1 – Tor network

| UI name                           | API example                     |
| --------------------------------- | ------------------------------- |
| Resolved Continent IP Geolocation | `dns.dst.geo.continent == "EU"` |

### Resolved Country

Use this selector to filter based on the country that the query resolves to. Geolocation is determined from the IP address in the response. To specify a country, enter its [ISO 3166-1 Alpha 2 code](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                         | API example                   |
| ------------------------------- | ----------------------------- |
| Resolved Country IP Geolocation | `dns.dst.geo.country == "RU"` |

### Resolved IP

Use this selector to filter based on the IP addresses that the query resolves to.

| UI name     | API example                                |
| ----------- | ------------------------------------------ |
| Resolved IP | `any(dns.resolved_ips[*] == 198.51.100.0)` |

### Security Categories

Use this selector to block domains (and optionally, [IP addresses](/cloudflare-one/policies/gateway/domain-categories/#filter-by-resolved-ip-category)) belonging to specific [security categories](/cloudflare-one/policies/gateway/domain-categories/#security-categories).

| UI name             | API example                            |
| ------------------- | -------------------------------------- |
| Security Categories | `any(dns.security_category[*] in {1})` |

### Source Continent

Use this selector to filter based on the continent where the query arrived to Gateway from.
{{<render file="gateway/_source-continent.md" withParameters="dns.src">}}

### Source Country

Use this selector to filter based on the country where the query arrived to Gateway from.
{{<render file="gateway/_source-country.md" withParameters="dns.src">}}

### Source IP

Use this selector to apply DNS policies to a specific source IP address that queries arrive to Gateway from — for example, this could be the WAN IP address of the stub resolver used by an organization to send queries upstream to Gateway.

| UI name   | API example                  |
| --------- | ---------------------------- |
| Source IP | `dns.src_ip == 198.51.100.0` |

### Users

{{<render file="gateway/_users.md">}}

## Comparison operators

{{<render file="gateway/_comparison-operators.md">}}

## Value

{{<render file="gateway/_value.md">}}

## Logical operators

{{<render file="gateway/_logical-operators.md" withParameters="**Identity**">}}
