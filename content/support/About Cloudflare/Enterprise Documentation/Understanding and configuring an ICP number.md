---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/209714777-Understanding-and-configuring-an-ICP-number
title: Understanding and configuring an ICP number
---

# Understanding and configuring an ICP number



## Overview

An ICP (Internet Content Provider) number is a state-issued registration that allows you to host your website on, or serve content from, a mainland Chinese server. All public websites in mainland China must have an ICP number listed on the website's home page.  Hosting providers are instructed to shut down any website (often without notice) lacking an ICP number.

Websites with the same root domain can share the same ICP number. You can use the MIIT website to [check whether a domain already has an ICP Number](https://beian.miit.gov.cn/#/Integrated/recordQuery).

{{<Aside type="note">}}
The MIIT website is only available in Chinese.
{{</Aside>}}
___

## Required documents

In general, if you own your website as an individual, you have to submit the following:

-   ICP application form
-   Copy of your personal ID
-   Forms to authenticate website information
-   Copy of your domain certificate

If you represent a commercial company, you also have to submit the following:

-   Copy of your business license
-   Your organization code certificate 

___

## ICP number types

There are two types of ICP numbers issued by the Chinese Ministry of Industry and Information Technology (MIIT) (People's Republic of China Ministry of Industry and Information Technology) at the provincial level:

ICP license- for example, Beijing ICP license XXXXXXXX number, is used for commercial websites, and applies to any website that allows a customer to purchase goods or services online. This is only available for commercial entities; individuals cannot apply for an ICP license.

ICP Filing - for example, Beijing ICP preparation XXXXXXXX number - is used for non-commercial websites (for example - an individual's blog). This applies to websites that do not include direct sales.

___

## ICP application process

It is recommended that you apply for an ICP license through your hosting or Cloud Services Provider. You will need to provide the necessary documents (refer to _Required documents_ above) to your provider to register the ICP number on your behalf.

After all required documents are submitted, it can take 4 to 8 weeks to obtain an ICP number depending on the type of website and the province where the company is registered. Although there is no cost to register with the MIIT, your provider may charge you a fee.

After receiving the ICP number and the certificate, add it to the bottom of your website's home page. 

![Old URL: https://support.cloudflare.com/hc/article_attachments/360040367132/baidu_home_page.png
Article IDs: 209714777 | Understanding and Configuring an ICP number
](/support/static/hc-import-baidu_home_page.png)

___

## Related resources

[Should I choose Cloudflare or Yunjiasu?](https://support.cloudflare.com/hc/articles/209156358)
