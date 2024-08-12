---
pcx_content_type: configuration
title: DNS policies
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

{{<details header="Available selectors">}}

**Traffic**

- [Application](#application)
- [Authoritative Nameserver IP](#authoritative-nameserver-ip)
- [Content Categories](#content-categories)
- [DNS CNAME Response Value](#dns-cname-record)
- [DNS MX Response Value](#dns-mx-record)
- [DNS PTR Response Value](#dns-ptr-record)
- [DNS Resolver IP](#dns-resolver-ip)
- [DNS TXT Response Value](#dns-txt-record)
- [DOH Subdomain](#doh-subdomain)
- [Domain](#domain)
- [Host](#host)
- [Indicator Feeds](#indicator-feeds)
- [Location](#location)
- [Query Record Type](#query-record-type)
- [Resolved Continent IP Geolocation](#resolved-continent)
- [Resolved Country IP Geolocation](#resolved-country)
- [Resolved IP](#resolved-ip)
- [Security Categories](#security-categories)
- [Source Continent IP Geolocation](#source-continent)
- [Source Country IP Geolocation](#source-country)
- [Source IP](#source-ip)

**Identity**

- [SAML Attributes](#users)
- [User Email](#users)
- [User Group Emails](#users)
- [User Group IDs](#users)
- [User Group Names](#users)
- [User Name](#users)

{{</details>}}

Policies with Allow actions allow DNS queries to reach destinations you specify within the Selector and Value fields. For example, the following configuration allows DNS queries to reach domains we categorize as belonging to the Education content category:

| Selector           | Operator | Value     | Action |
| ------------------ | -------- | --------- | ------ |
| Content Categories | in       | Education | Allow  |

#### Disable DNSSEC validation

When you select **Disable DNSSEC validation**, Gateway will resolve DNS queries even if the cryptographic signature for the DNS record cannot be validated. We do not recommend disabling DNSSEC validation unless you know that the validation failure is due to DNSSEC configuration issues and not malicious attacks.

### Block

API value: `block`

{{<details header="Available selectors">}}

**Traffic**

- [Application](#application)
- [Authoritative Nameserver IP](#authoritative-nameserver-ip)
- [Content Categories](#content-categories)
- [DNS CNAME Response Value](#dns-cname-record)
- [DNS MX Response Value](#dns-mx-record)
- [DNS PTR Response Value](#dns-ptr-record)
- [DNS Resolver IP](#dns-resolver-ip)
- [DNS TXT Response Value](#dns-txt-record)
- [DOH Subdomain](#doh-subdomain)
- [Domain](#domain)
- [Host](#host)
- [Indicator Feeds](#indicator-feeds)
- [Location](#location)
- [Query Record Type](#query-record-type)
- [Resolved Continent IP Geolocation](#resolved-continent)
- [Resolved Country IP Geolocation](#resolved-country)
- [Resolved IP](#resolved-ip)
- [Security Categories](#security-categories)
- [Source Continent IP Geolocation](#source-continent)
- [Source Country IP Geolocation](#source-country)
- [Source IP](#source-ip)

**Identity**

- [SAML Attributes](#users)
- [User Email](#users)
- [User Group Emails](#users)
- [User Group IDs](#users)
- [User Group Names](#users)
- [User Name](#users)

{{</details>}}

Policies with Block actions block DNS queries to reach destinations you specify within the Selector and Value fields. For example, the following configuration blocks DNS queries from reaching domains we categorize as belonging to the Adult Themes content category:

| Selector           | Operator | Value        | Action |
| ------------------ | -------- | ------------ | ------ |
| Content Categories | in       | Adult Themes | Block  |

#### Custom block page

When choosing the Block action, turn on **Display custom block page** to respond to queries with a block page and to specify the message you want to display to users who go to blocked websites. If the block page is disabled, Gateway will respond to blocked queries with an `A` record of `0.0.0.0` for IPv4 destinations, or with an `AAAA` record of `::` for IPv6 destinations. For more information, refer to the dedicated documentation on [customizing the block page](/cloudflare-one/policies/gateway/configuring-block-page/).

{{<heading-pill style="early-access" heading="h4">}}WARP client block notifications{{</heading-pill>}}

{{<render file="gateway/_client-notifications.md">}}

### Override

API value: `override`

{{<details header="Available selectors">}}

The Override action cannot be used with selectors evaluated during or after DNS resolution.

**Traffic**

- [Application](#application)
- [Content Categories](#content-categories)
- [DNS Resolver IP](#dns-resolver-ip)
- [DOH Subdomain](#doh-subdomain)
- [Domain](#domain)
- [Host](#host)
- [Location](#location)
- [Query Record Type](#query-record-type)
- [Resolved Continent IP Geolocation](#resolved-continent)
- [Resolved Country IP Geolocation](#resolved-country)
- [Security Categories](#security-categories)
- [Source Continent IP Geolocation](#source-continent)
- [Source Country IP Geolocation](#source-country)
- [Source IP](#source-ip)

**Identity**

- [SAML Attributes](#users)
- [User Email](#users)
- [User Group Emails](#users)
- [User Group IDs](#users)
- [User Group Names](#users)
- [User Name](#users)

{{</details>}}

Policies with Override actions allow you to respond to all DNS queries for a given domain to another destination. For example, you can provide a custom response IP of `1.2.3.4` for all queries to `www.example.com` with the following policy:

| Selector | Operator | Value             | Action   | Override Hostname |
| -------- | -------- | ----------------- | -------- | ----------------- |
| Hostname | is       | `www.example.com` | Override | `1.2.3.4`         |

### Safe Search

API value: `safesearch`

{{<details header="Available selectors">}}

**Traffic**

- [Application](#application)
- [Content Categories](#content-categories)
- [DNS Resolver IP](#dns-resolver-ip)
- [DOH Subdomain](#doh-subdomain)
- [Domain](#domain)
- [Host](#host)
- [Location](#location)
- [Query Record Type](#query-record-type)
- [Resolved Continent IP Geolocation](#resolved-continent)
- [Resolved Country IP Geolocation](#resolved-country)
- [Security Categories](#security-categories)
- [Source Continent IP Geolocation](#source-continent)
- [Source Country IP Geolocation](#source-country)
- [Source IP](#source-ip)

**Identity**

- [SAML Attributes](#users)
- [User Email](#users)
- [User Group Emails](#users)
- [User Group IDs](#users)
- [User Group Names](#users)
- [User Name](#users)

{{</details>}}

SafeSearch is a feature of search engines that helps you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children or at work.

You can use Cloudflare Gateway to enable SafeSearch on search engines like Google, Bing, Yandex, YouTube and DuckDuckGo. For example, to enable SafeSearch for Google, you can create the following policy:

| Selector | Operator | Value        | Action      |
| -------- | -------- | ------------ | ----------- |
| Domain   | is       | `google.com` | Safe Search |

### YouTube Restricted Mode

API value: `ytrestricted`

{{<details header="Available selectors">}}

**Traffic**

- [Application](#application)
- [Content Categories](#content-categories)
- [DNS Resolver IP](#dns-resolver-ip)
- [DOH Subdomain](#doh-subdomain)
- [Domain](#domain)
- [Host](#host)
- [Location](#location)
- [Query Record Type](#query-record-type)
- [Resolved Continent IP Geolocation](#resolved-continent)
- [Resolved Country IP Geolocation](#resolved-country)
- [Security Categories](#security-categories)
- [Source Continent IP Geolocation](#source-continent)
- [Source Country IP Geolocation](#source-country)
- [Source IP](#source-ip)

**Identity**

- [SAML Attributes](#users)
- [User Email](#users)
- [User Group Emails](#users)
- [User Group IDs](#users)
- [User Group Names](#users)
- [User Name](#users)

{{</details>}}

Similarly, you can enforce YouTube Restricted mode by choosing the _YouTube Restricted_ action. YouTube Restricted Mode is an automated filter for adult and offensive content built into YouTube. To enable YouTube Restricted Mode, you could set up a policy like the following:

| Selector   | Operator | Value         | Action             |
| ---------- | -------- | ------------- | ------------------ |
| DNS Domain | is       | `youtube.com` | YouTube Restricted |

This setup ensures users will be blocked from accessing offensive sites using DNS.

## Selectors

Gateway matches DNS queries against the following selectors, or criteria:

### Application

{{<render file="gateway/selectors/_application.md" withParameters="DNS">}}

### Authoritative Nameserver IP

Use this selector to match against the IP address of the authoritative nameserver IP address.

| UI name                     | API example                                | Evaluation phase      |
| --------------------------- | ------------------------------------------ | --------------------- |
| Authoritative Nameserver IP | `dns.authoritative_ns_ips == 198.51.100.0` | During DNS resolution |

### Content Categories

{{<render file="gateway/selectors/_content-categories.md">}}

{{<render file="gateway/selectors/_category-options.md">}}

### DNS CNAME Record

Use this selector to filter DNS responses by their `CNAME` records.

| UI name                  | API example                                                   | Evaluation phase     |
| ------------------------ | ------------------------------------------------------------- | -------------------- |
| DNS CNAME Response Value | `any(dns.response.cname[*] in {"www.apple.com.edgekey.net"})` | After DNS resolution |

{{<Aside type="note">}}
If one CNAME record points to another CNAME record, each record in the chain will be evaluated. For example, if `abc.example.com` points to `xyz.example.com`, then your DNS policy will evaluate both `abc.example.com` and `xyz.example.com`.
{{</Aside>}}

### DNS MX Record

Use this selector to filter DNS responses by their `MX` records.

| UI name               | API example                                                 | Evaluation phase     |
| --------------------- | ----------------------------------------------------------- | -------------------- |
| DNS MX Response Value | `any(dns.response.mx[*] in {"gmail-smtp-in.l.google.com"})` | After DNS resolution |

### DNS PTR Record

Use this selector to filter DNS responses by their `PTR` records.

| UI name                | API example                                                | Evaluation phase     |
| ---------------------- | ---------------------------------------------------------- | -------------------- |
| DNS PTR Response Value | `any(dns.response.ptr[*] in {"255.2.0.192.in-addr.arpa"})` | After DNS resolution |

### DNS Resolver IP

{{<render file="gateway/selectors/_dns-resolver-ip.md">}}

### DNS TXT Record

Use this selector to filter DNS responses by their `TXT` records.

| UI name                | API example                                 | Evaluation phase     |
| ---------------------- | ------------------------------------------- | -------------------- |
| DNS TXT Response Value | `any(dns.response.txt[*] in {"your_text"})` | After DNS resolution |

### DoH Subdomain

{{<render file="gateway/selectors/_doh-subdomain.md">}}

### Domain

{{<render file="gateway/selectors/_domain.md">}}

### Host

{{<render file="gateway/selectors/_host.md">}}

### Indicator Feeds

{{<render file="gateway/selectors/_indicator-feeds.md" withParameters="dns">}}

### Location

{{<render file="gateway/selectors/_location.md">}}

### Query Record Type

{{<render file="gateway/selectors/_query-record-type.md">}}

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

| UI name                           | API example                     | Evaluation phase     |
| --------------------------------- | ------------------------------- | -------------------- |
| Resolved Continent IP Geolocation | `dns.dst.geo.continent == "EU"` | After DNS resolution |

### Resolved Country

Use this selector to filter based on the country that the query resolves to. Geolocation is determined from the IP address in the response. To specify a country, enter its [ISO 3166-1 Alpha 2 code](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                         | API example                   | Evaluation phase     |
| ------------------------------- | ----------------------------- | -------------------- |
| Resolved Country IP Geolocation | `dns.dst.geo.country == "RU"` | After DNS resolution |

### Resolved IP

Use this selector to filter based on the IP addresses that the query resolves to.

| UI name     | API example                                | Evaluation phase     |
| ----------- | ------------------------------------------ | -------------------- |
| Resolved IP | `any(dns.resolved_ips[*] == 198.51.100.0)` | After DNS resolution |

### Security Categories

{{<render file="gateway/selectors/_security-categories.md">}}

{{<render file="gateway/selectors/_category-options.md">}}

### Source Continent

Use this selector to filter based on the continent where the query arrived to Gateway from.
{{<render file="gateway/selectors/_source-continent.md" withParameters="dns.src">}}

### Source Country

Use this selector to filter based on the country where the query arrived to Gateway from.
{{<render file="gateway/selectors/_source-country.md" withParameters="dns.src">}}

### Source IP

{{<render file="gateway/selectors/_source-ip-dns.md">}}

### Users

{{<render file="gateway/selectors/_users.md">}}

## Comparison operators

{{<render file="gateway/_comparison-operators.md">}}

## Value

{{<render file="gateway/_value.md" withParameters="hostnames;;Host">}}

## Logical operators

{{<render file="gateway/_logical-operators.md" withParameters="**Identity**">}}

## Limitations

### Third-party filtering conflict

Gateway will not properly filter traffic sent through third-party VPNs or other Internet filtering software, such as [iCloud Private Relay](https://support.apple.com/102602). To ensure your DNS policies apply to your traffic, we recommend restricting software that may interfere with Gateway.

### Magic WAN forwarding

To apply DNS policies to queries forwarded through [Magic WAN](/magic-wan/zero-trust/cloudflare-gateway/), you can either point your organization's DNS resolver to an IPv6, DoH, or DoT endpoint or request a dedicated resolver IPv4 address. For more information, refer to [DNS resolver IPs and hostnames](/cloudflare-one/connections/connect-devices/agentless/dns/locations/dns-resolver-ips/).
