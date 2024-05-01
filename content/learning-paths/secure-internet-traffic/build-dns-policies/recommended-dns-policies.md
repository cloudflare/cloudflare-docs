---
title: Recommended DNS policies
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

We recommend you add the following DNS policies to build an Internet and SaaS app security strategy for your organization.

{{<details header="All-DNS-Domain-Allowlist" open="true">}}

Allowlist any known domains and hostnames. With this policy, you ensure that your users can access your organization's domains even if the domains fall under a blocked category, such as **Newly Seen Domains** or **Login Screens**.

| Selector | Operator | Value           | Logic | Action |
| -------- | -------- | --------------- | ----- | ------ |
| Domain   | in list  | _Known Domains_ | Or    | Allow  |
| Host     | in list  | _Known Domains_ |       |        |

{{</details>}}

{{<details header="Quarantined-Users-DNS-Restricted-Access" open="true">}}

{{<render file="zero-trust/_blocklist-restricted-users.md">}}

| Selector         | Operator    | Value                               | Logic | Action |
| ---------------- | ----------- | ----------------------------------- | ----- | ------ |
| Domain           | in list     | _Known Domains_                     | Or    | Block  |
| Host             | in list     | _Known Domains_                     | And   |        |
| User Group Names | in          | _Quarantined Users_                 |       |        |

{{</details>}}

{{<details header="All-DNS-SecurityCategories-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-security-categories.md">}}

{{<render file="gateway/policies/_block-security-categories.md" productFolder="cloudflare-one">}}

{{</details>}}

{{<details header="All-DNS-ContentCategories-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-content-categories.md" withParameters="DNS;;_Security Risks_">}}

{{</details>}}

{{<details header="All-DNS-Application-Blocklist" open="true">}}

{{<render file="zero-trust/_blocklist-application.md">}}

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

Block misused domains to protect your users against sophisticated phishing attacks, such as domains that specifically target your organization. For example, the following policy blocks specific keywords associated with an organization or its authentication services (such as `okta`, `2fa`, `cloudflare` and `sso`) while still allowing access to known domains.

| Selector | Operator      | Value                                       | Logic | Action |
| -------- | ------------- | ------------------------------------------- | ----- | ------ |
| Domain   | not in list   | _Known Domains_                             | And   | Block  |
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

{{<render file="zero-trust/_blocklist-domain-host.md" withParameters="DNS">}}

{{</details>}}
