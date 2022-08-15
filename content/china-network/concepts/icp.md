---
title: Internet Content Provider (ICP)
pcx_content_type: concept
weight: 3
layout: list
---

# Internet Content Provider (ICP)

Internet Content Provider (ICP) is a licensing regime instated by the Telecommunications Regulations of the People's Republic of China (中华人民共和国电信条例), promulgated in September 2000.

Under ICP, all websites with their own domain name that operate inside China must obtain a license, whether hosted on a server in mainland China or provided to visitors from China via a CDN). Licenses are issued at the provincial level.

Local government requires that all domains have valid ICP licenses to onboard Cloudflare's China Network. China-based Internet service providers will block a site if a license is not acquired within a grace period.

## Types of ICP

To host web services in mainland China, you are legally required to acquire an **ICP filing** or an **ICP license** in China.

The type of ICP you must obtain depends on the type of website you are providing to customers in China:


{{<table-wrap>}}

| | ICP filing | ICP license |
|---|---|---|
| Definition | An ICP filing, known in Chinese as “Bei’An,” is the first level of ICP registration. An ICP filing enables the holder to host a website on a server or CDN in mainland China for informational purposes only. | An ICP license, known as “ICP Zheng” in Chinese, allows online platforms or third-party sellers selling goods and services to deploy their website on a hosting server or CDN within mainland China. |
| Website purpose | Non-commercial and non-transactional purposes. | Commercial and transactional purposes. |
| Eligibility | Representative office<br/>Wholly foreign-owned enterprise<br/>Joint venture<br/>Local company<br/>Individuals (personal website) | Joint venture (foreign company with less than 50% ownership)<br/>Local company |
| Other requirements | N/A | Companies acquiring an ICP license must already have obtained an ICP filing. |
Timeline | 1-2 months | 2-3 months |

{{</table-wrap>}}

If you wish to host a marketing-related website, you only need an ICP filing.

## Displaying your ICP number

After you obtain an ICP number, you must display it in the footer of your website, like in the following example:

![An ICP number displayed in the footer of a website.](/china-network/static/icp-number-in-footer.png)
