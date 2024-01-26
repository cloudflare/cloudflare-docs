---
title: Recommended DNS policies
pcx_content_type: overview
weight: 1
layout: learning-unit
---

Add the following recommended DNS policies.

## 1. All-DNS-Domain-Allowlist

Allowlist the Corporate and Trusted Domains or Hostnames. With this policy you ensure that employees can access trusted domains even if they fall under a blocked category like _Newly seen domains_ or _Login pages_.

| Selector | Operator | Value                                 | Logic | Action |
| -------- | -------- | ------------------------------------- | ----- | ------ |
| Domain   | in list  | <Corporate Domains \| Trusted Domain> | Or    | Allow  |
| Host     | in list  | <Corporate Domains \| Trusted Domain> |       |        |

## 2. All-DNS-SecurityCategories-Blocklist

Block security categories such as _Command & Control_, _Botnet_ and _Malware_ based on Cloudflare's threat intelligence.

| Selector            | Operator | Value             | Action |
| ------------------- | -------- | ----------------- | ------ |
| Security Categories | in       | All Scurity Risks | Block  |

## 3. All-DNS-ContentCategories-Blocklist

Although these categories are not always a security threat it's convenient to block them to minimize the risk your organization be exposed to Security Threats.

Initially, Allow action will help to track the policy matching, and identify potential false positives. Finally blocking these categories, allowlisting the trusted domains on the _Trusted Domain_ List used in the **All-DNS-Domain-Allowlist**.

| Selector           | Operator | Value            | Action       |
| ------------------ | -------- | ---------------- | ------------ |
| Content Categories | in       | <Security Risks> | Allow\|Block |

## 4. All-DNS-Application-Blocklist

Block unauthorized applications to limit their users' access to certain web-based tools and minimize the risk of Shadow IT. For example, the following policy blocks AI assistants.

| Selector    | Operator | Value         | Action |
| ----------- | -------- | ------------- | ------ |
| Application | in       | ChatGPT\|Bard | Block  |

## 5. All-DNS-GeoCountryIP-Blocklist

Block websites hosted in countries categorized as high risk. The designation of such countries may result from your organization's customers or through the implementation of regulations including [EAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries), [OFAC](https://orpa.princeton.edu/export-controls/sanctioned-countries), and [ITAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector                        | Operator | Value                                                                                                                                  | Action |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Resolved Country IP Geolocation | in       | Afghanistan, Belarus, Congo (Kinshasa), Cuba, Iran, Iraq, Korea (North), Myanmar, Russian Federation, Sudan, Syria, Uktraine, Zimbabwe | Block  |

## 6. All-DNS-DomainTopLevel-Blocklist

Block frequently misused top-level domains (TLDs) to reduce security risks, especially when there is no discernible advantage to be gained from allowing access. Similarly, restricting access to specific country-level TLDs may be necessary to comply with regulations such as [OFAC](https://orpa.princeton.edu/export-controls/sanctioned-countries) and [ITAR](https://www.tradecompliance.pitt.edu/embargoed-and-sanctioned-countries).

| Selector | Operator      | Value                                                                                                    | Action |
| -------- | ------------- | -------------------------------------------------------------------------------------------------------- | ------ |
| Domain   | matches regex | `[.](cn\|ru)$ or [.](rest\|hair\|top\|live\|cfd\|boats\|beauty\|mom\|skin\|okinawa)$ or [.](zip\|mobi)$` | Block  |

## 7. All-DNS-DomainPhishing-Blocklist

Block misused domains to protect users against sophisticated phishing attacks, you could prevent users from accessing phishing domains that are specifically targeting your organization. The following policy blocks specific keywords associated with an organization or its authentication services (such as okta, 2fa, cloudflare or sso), while still allowing access to official corporate domains.

| Selector | Operator      | Value                                       | Logic | Action |
| -------- | ------------- | ------------------------------------------- | ----- | ------ |
| Domain   | not in list   | <Corporate Domains>                         | And   | Block  |
| Domain   | matches regex | `.*okta.*\|.*cloudflare.*\|.*mfa.*\|.sso.*` |       |        |

## 8. All-DNS-ResolvedIP-Blocklist

Block specific IP addresses that are known to be malicious or pose a threat to your organization. This policy is usually implemented by creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs). Ideally Incident Response Teams can feed this List with API automation.

| Selector    | Operator | Value          | Action |
| ----------- | -------- | -------------- | ------ |
| Resolved IP | in list  | <IP Blocklist> | Block  |

## 9. All-DNS-DomainHost-Blocklist

Block specific Domains or Hosts that are known to be malicious or pose a threat to your organization. This policy is usually implemented by creating custom blocklists or by using blocklists provided by threat intelligence partners or regional Computer Emergency and Response Teams (CERTs). Ideally Incident Response Teams can feed this List with API automation.

| Selector | Operator      | Value              | Logic | Action |
| -------- | ------------- | ------------------ | ----- | ------ |
| Domain   | in list       | <Domain Blocklist> | Or    | Block  |
| Host     | in list       | <Host Blocklist>   | Or    |        |
| Host     | matches regex | `.*example\.com`   |       |        |
