---
_build:
  publishResources: false
  render: never
  list: never
---

## Allow corporate domains

This policy allows users to access official corporate domains. By deploying the policy with high [order of precedence](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence), you ensure that employees can access trusted domains even if they fall under a blocked category like `Newly seen domains` or `Login pages`.

| Selector | Operator | Value             | Action | Precedence |
| -------- | -------- | ----------------- | ------ | ---------- |
| Domain   | in list  | `Allowed domains` | Allow  | 1          |

## Block security threats

Block [security categories](/cloudflare-one/policies/gateway/domain-categories/#security-categories) such as Command & Control, Botnet and Malware based on Cloudflare’s threat intelligence.
{{<render file="gateway/policies/_block-security-categories.md">}}

## Block content categories

The categories included in this policy are not always a security threat, but blocking them can help minimize the risk that your organization is exposed to. For more information, refer to [domain categories](/cloudflare-one/policies/gateway/domain-categories/).

| Selector           | Operator | Value                                                     | Action |
| ------------------ | -------- | --------------------------------------------------------- | ------ |
| Content Categories | in       | `Questionable Content`, `Security Risks`, `Miscellaneous` | Block  |

{{<render file="gateway/policies/_block-applications.md">}}

## Block banned countries

You can implement policies to block websites hosted in countries categorized as high risk. The designation of such countries may result from your organization's customers or through the implementation of regulations including [EAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries), [OFAC](https://orpa.princeton.edu/export-controls/sanctioned-countries), and [ITAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector                        | Operator | Value                                                                                                                                                          | Action |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Resolved Country IP Geolocation | in       | `Afghanistan`, `Belarus`, `Congo (Kinshasa)`, `Cuba`, `Iran`, `Iraq`, `Korea, North`, `Myanmar`, `Russian Federation`, `Sudan`, `Syria`, `Ukraine`, `Zimbabwe` | Block  |

## Block top-level domains

Blocking [frequently misused](https://www.spamhaus.org/statistics/tlds/) top-level domains (TLDs) can reduce security risks, especially when there is no discernible advantage to be gained from allowing access. Similarly, restricting access to specific country-level TLDs may be necessary to comply with regulations like [ITAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries) or [OFAC](https://orpa.princeton.edu/export-controls/sanctioned-countries).

| Selector | Operator      | Value                                                                 | Logic | Action |
| -------- | ------------- | --------------------------------------------------------------------- | ----- | ------ |
| Domain   | matches regex | `[.](cn\|ru)$`                                                        | Or    | Block  |
| Domain   | matches regex | `[.](rest\|hair\|top\|live\|cfd\|boats\|beauty\|mom\|skin\|okinawa)$` | Or    |        |
| Domain   | matches regex | `[.](zip\|mobi)$`                                                     |       |        |

## Block phishing attacks

To protect against [sophisticated phishing attacks](https://blog.cloudflare.com/2022-07-sms-phishing-attacks/), you could prevent users from accessing phishing domains that are specifically targeting your organization. The following policy blocks specific keywords associated with an organization or its authentication services (such as `okta`, `2fa`, `cloudflare` or `sso`), while still allowing access to official corporate domains.

| Selector | Operator      | Value                                       | Logic | Action |
| -------- | ------------- | ------------------------------------------- | ----- | ------ |
| Domain   | not in list   | `Corporate Domains`                         | And   | Block  |
| Domain   | matches regex | `.*okta.*\|.*cloudflare.*\|.*mfa.*\|.sso.*` |       |        |

## Block online tracking

To safeguard user privacy, some organizations will block tracking domains such as `dig.whatsapp.com` as well as other tracking domains embedded at the OS level. This policy is implemented by creating a custom blocklist. Refer to [this repository](https://github.com/nextdns/native-tracking-domains/tree/28991a0d5b2ab6d35588a74af82162ea7caff420/domains) for a list of widespread tracking domains that you can add to your blocklist.

| Selector | Operator | Value                  | Action |
| -------- | -------- | ---------------------- | ------ |
| Domain   | in list  | `Top tracking domains` | Block  |

## Block malicious IPs

Block specific IP addresses that are known to be malicious or pose a threat to your organization. This policy is usually implemented by creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs).

| Selector    | Operator | Value     | Action |
| ----------- | -------- | --------- | ------ |
| Resolved IP | in list  | `DShield` | Block  |

## CIPA Filter

The CIPA Filter is a collection of subcategories that encompass a wide range of topics that could be harmful or inappropriate for minors. It is used as a part of [Project Cybersafe Schools](/fundamentals/reference/policies-compliances/cybersafe/) to block access to unwanted or harmful online content.

| Selector           | Operator | Value         | Action |
| ------------------ | -------- | ------------- | ------ |
| Content Categories | in       | `CIPA Filter` | Block  |

## Hide explicit search results

SafeSearch is a feature of search engines that helps you filter explicit or offensive content. You can enable SafeSearch on search engines like Google, Bing, Yandex, YouTube, and DuckDuckGo:

| Selector           | Operator | Value            | Action      |
| ------------------ | -------- | ---------------- | ----------- |
| Content Categories | in       | `Search Engines` | Safe Search |
