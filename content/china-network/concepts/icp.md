---
title: Internet Content Provider (ICP)
pcx_content_type: concept
weight: 3
source: https://support.cloudflare.com/hc/en-us/articles/209714777-Understanding-and-configuring-an-ICP-number
---

# Internet Content Provider (ICP)

Internet Content Provider (ICP) is a licensing regime instated by the Telecommunications Regulations of the People's Republic of China (中华人民共和国电信条例), promulgated in September 2000.

Under ICP, all websites with their own domain name that operate inside China must obtain a license, whether hosted on a server in mainland China or provided to visitors from China via a CDN. Licenses are issued at the provincial level. You can use the MIIT website to [check if a domain already has an ICP number](https://beian.miit.gov.cn/#/Integrated/recordQuery) (only available in Chinese).

All public websites in mainland China must have an ICP number [displayed on the website's home page](#display-your-icp-number). Websites with the same root domain can share the same ICP number. China-based hosting providers are instructed to shut down any website (often without notice) without an ICP number.

## Types of ICP

To host web services in mainland China, you are legally required to acquire an **ICP filing** or an **ICP license** in China.

The type of ICP you must obtain depends on the type of website you are providing to customers in China:

{{<table-wrap>}}

| | ICP filing | ICP license |
|---|---|---|
| Definition | An ICP filing, known in Chinese as “Bei’An,” is the first level of ICP registration. An ICP filing enables the holder to host a website on a server or CDN in mainland China for informational purposes only. | An ICP license, known as “ICP Zheng” in Chinese, allows online platforms or third-party sellers selling goods and services to deploy their website on a hosting server or CDN within mainland China. |
| Website purpose | Non-commercial and non-transactional purposes. | Commercial and transactional purposes. |
| Eligibility | Representative office<br/>Wholly foreign-owned enterprise<br/>Joint venture<br/>Local company<br/>Individuals (personal website) | Joint venture (foreign company with less than 50% ownership)<br/>Local company |
| Example format | Beijing ICP preparation XXXXXXXX number | Beijing ICP license XXXXXXXX number |
| Other requirements | N/A | Companies acquiring an ICP license must already have obtained an ICP filing. |
Timeline | 1-2 months | 2-3 months |

{{</table-wrap>}}

If you wish to host a marketing-related website, you only need an ICP filing.

---

## Obtain an ICP number

Cloudflare recommends that you apply for an ICP license through your hosting or Cloud Services Provider. You will need to provide the necessary documents to your provider to register the ICP number on your behalf:

{{<table-wrap>}}

For individuals | For commercial companies
----------------|-------------------------
– ICP application form<br>– Copy of your personal ID<br>– Forms to authenticate website information<br>– Copy of your domain certificate | – Copy of your business license<br>– Your organization code certificate 

{{</table-wrap>}}

After all required documents are submitted, it can take four to eight weeks to obtain an ICP number depending on the type of website and the province where the company is registered. Although there is no cost to register with the MIIT, your provider may charge you a fee.

After receiving the ICP number and the certificate, add it to your website's home page. 

## Display your ICP number

After you obtain an ICP number, you must display it in the footer of your website, like in the following example:

![An ICP number displayed in the footer of a website.](/images/china-network/icp-number-in-footer.png)
