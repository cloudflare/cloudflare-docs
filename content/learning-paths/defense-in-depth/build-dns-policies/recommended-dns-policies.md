---
title: Recommended DNS policies
pcx_content_type: overview
weight: 1
layout: learning-unit
---

Add the following recommended DNS policies.

## 1. All-DNS-Domain-Allowlist

| Selector | Operator | Value                                 | Logic | Action |
| -------- | -------- | ------------------------------------- | ----- | ------ |
| Domain   | in list  | <Corporate Domains \| Trusted Domain> | Or    | Allow  |
| Host     | in list  | <Corporate Domains \| Trusted Domain> |       |        |

## 2. All-DNS-SecurityCategories-Blocklist

| Selector            | Operator | Value             | Action |
| ------------------- | -------- | ----------------- | ------ |
| Security Categories | in       | All Scurity Risks | Block  |

## 3. All-DNS-ContentCategories-Blocklist

| Selector           | Operator | Value            | Action       |
| ------------------ | -------- | ---------------- | ------------ |
| Content Categories | in       | <Security Risks> | Allow\|Block |

## 4. All-DNS-Application-Blocklist

| Selector    | Operator | Value         | Action |
| ----------- | -------- | ------------- | ------ |
| Application | in       | ChatGPT\|Bard | Block  |

## 5. All-DNS-GeoCountryIP-Blocklist

| Selector                        | Operator | Value                                                                                                                                  | Action |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Resolved Country IP Geolocation | in       | Afghanistan, Belarus, Congo (Kinshasa), Cuba, Iran, Iraq, Korea (North), Myanmar, Russian Federation, Sudan, Syria, Uktraine, Zimbabwe | Block  |

## 6. All-DNS-DomainTopLevel-Blocklist

| Selector | Operator      | Value                                                                                                    | Action |
| -------- | ------------- | -------------------------------------------------------------------------------------------------------- | ------ |
| Domain   | matches regex | `[.](cn\|ru)$ or [.](rest\|hair\|top\|live\|cfd\|boats\|beauty\|mom\|skin\|okinawa)$ or [.](zip\|mobi)$` | Block  |

## 7. All-DNS-DomainPhishing-Blocklist

| Selector | Operator      | Value                                       | Logic | Action |
| -------- | ------------- | ------------------------------------------- | ----- | ------ |
| Domain   | not in list   | <Corporate Domains>                         | And   | Block  |
| Domain   | matches regex | `.*okta.*\|.*cloudflare.*\|.*mfa.*\|.sso.*` |       |        |

## 8. All-DNS-ResolvedIP-Blocklist

| Selector    | Operator | Value          | Action |
| ----------- | -------- | -------------- | ------ |
| Resolved IP | in list  | <IP Blocklist> | Block  |
