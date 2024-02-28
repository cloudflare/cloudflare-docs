---
title: Recommended DNS policies
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

We recommend you add the following DNS policies to build a defense-in-depth strategy for your organization.

{{<details header="All-DNS-Domain-Allowlist" open="true">}}

Allowlist any trusted domains and hostnames. With this policy, you ensure that your users can access your organization's domains even if the domains fall under a blocked category, such as **Newly Seen Domains** or **Login Screens**.

| Selector | Operator | Value             | Logic | Action |
| -------- | -------- | ----------------- | ----- | ------ |
| Domain   | in list  | _Trusted Domains_ | Or    | Allow  |
| Host     | in list  | _Trusted Domains_ |       |        |

{{</details>}}

{{<details header="All-DNS-SecurityCategories-Blocklist" open="true">}}

Block [security categories](/cloudflare-one/policies/gateway/domain-categories/#security-categories), such as **Command and Control & Botnet** and **Malware**, based on Cloudflare's threat intelligence.

| Selector            | Operator | Value                | Action |
| ------------------- | -------- | -------------------- | ------ |
| Security Categories | in       | _All Security Risks_ | Block  |

{{</details>}}

{{<details header="All-DNS-ContentCategories-Blocklist" open="true">}}

Entries in the [security risk content subcategory](/cloudflare-one/policies/gateway/domain-categories/#security-risk-subcategories), such as **New Domains**, do not always pose a security threat. We recommend you first create an Allow policy to track policy matching and identify any false positives. You can add false positives to your **Trusted Domains** list used in **All-DNS-Domain-Allowlist**.

After your test is complete, we recommend you change the action to Block to minimize risk to your organization.

| Selector           | Operator | Value            | Action |
| ------------------ | -------- | ---------------- | ------ |
| Content Categories | in       | _Security Risks_ | Allow  |

{{</details>}}

{{<details header="All-DNS-Application-Blocklist" open="true">}}

Block unauthorized applications to limit your users' access to certain web-based tools and minimize the risk of {{<glossary-tooltip term_id="shadow IT" link="https://www.cloudflare.com/learning/access-management/what-is-shadow-it/">}}shadow IT{{</glossary-tooltip>}}. For example, the following policy blocks popular AI chatbots.

| Selector    | Operator | Value             | Action |
| ----------- | -------- | ----------------- | ------ |
| Application | in       | _ChatGPT_, _Bard_ | Block  |

{{</details>}}

{{<details header="All-DNS-GeoCountryIP-Blocklist" open="true">}}

Block websites hosted in countries categorized as high risk. The designation of such countries may result from your organization's users or through the implementation of regulations including [EAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries), [OFAC](https://orpa.princeton.edu/export-controls/sanctioned-countries), and [ITAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector                        | Operator | Value                                                                                                                                                           | Action |
| ------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Resolved Country IP Geolocation | in       | _Afghanistan_, _Belarus_, _Congo (Kinshasa)_, _Cuba_, _Iran_, _Iraq_, _Korea (North)_, _Myanmar_, _Russian Federation_, _Sudan_, _Syria_, _Ukraine_, _Zimbabwe_ | Block  |

{{</details>}}

{{<details header="All-DNS-DomainTopLevel-Blocklist" open="true">}}

Block frequently misused top-level domains (TLDs) to reduce security risks, especially when there is no discernible advantage to be gained from allowing access. Similarly, restricting access to specific country-level TLDs may be necessary to comply with regulations such as [OFAC](https://orpa.princeton.edu/export-controls/sanctioned-countries) and [ITAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector | Operator      | Value                                                                                                    | Action |
| -------- | ------------- | -------------------------------------------------------------------------------------------------------- | ------ |
| Domain   | matches regex | `[.](cn\|ru)$ or [.](rest\|hair\|top\|live\|cfd\|boats\|beauty\|mom\|skin\|okinawa)$ or [.](zip\|mobi)$` | Block  |

{{</details>}}

{{<details header="All-DNS-DomainPhishing-Blocklist" open="true">}}

Block misused domains to protect your users against sophisticated phishing attacks, such as domains that specifically target your organization. For example, the following policy blocks specific keywords associated with an organization or its authentication services (such as `okta`, `2fa`, `cloudflare` and `sso`) while still allowing access to trusted domains.

| Selector | Operator      | Value                                       | Logic | Action |
| -------- | ------------- | ------------------------------------------- | ----- | ------ |
| Domain   | not in list   | _Trusted Domains_                           | And   | Block  |
| Domain   | matches regex | `.*okta.*\|.*cloudflare.*\|.*mfa.*\|.sso.*` |       |        |

{{</details>}}

{{<details header="All-DNS-ResolvedIP-Blocklist" open="true">}}

Block specific IP addresses that are malicious or pose a threat to your organization.

{{<render file="zero-trust/_threat-intelligence-automation.md">}}

| Selector    | Operator | Value          | Action |
| ----------- | -------- | -------------- | ------ |
| Resolved IP | in list  | _IP Blocklist_ | Block  |

{{</details>}}

{{<details header="All-DNS-DomainHost-Blocklist" open="true">}}

Block specific domains or hosts that are malicious or pose a threat to your organization. Like **All-DNS-ResolvedIP-Blocklist**, this blocklist can be updated manually or via API automation.

| Selector | Operator      | Value              | Logic | Action |
| -------- | ------------- | ------------------ | ----- | ------ |
| Domain   | in list       | _Domain Blocklist_ | Or    | Block  |
| Host     | in list       | _Host Blocklist_   | Or    |        |
| Host     | matches regex | `.*example\.com`   |       |        |

{{</details>}}
