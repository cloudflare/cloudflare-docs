---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115004180627-Problems-logging-into-Magento-1-Admin-Panel
title: Problems logging into Magento 1 Admin Panel
---

# Problems logging into Magento 1 Admin Panel



## Resolving issues with logging into Magento admin panel

In order to solve issues with logging into the Magento admin panel and to get the best performance out of Cloudflare and Magento, we recommend that you disable Cloudflare caching and performance features from the Magento Admin Panel by performing the following steps:

1\. Go to the Cloudflare Page Rule section, which you can find under the gear icon next to the domain on My Websites or by following this link: [https://www.cloudflare.com/page-rules?z=yourdomain](https://www.cloudflare.com/page-rules)

2\. Input the URL for the admin section, which is in this format: www.domain.com/admin (Replace with your admin area URL)

3\. For Cache level, choose "Bypass"

4\. For Performance, choose "Disable Performance"

5\. For Security, choose "Disable Security"

6\. Save the rule

You can also place a \* after the name of the Magento admin directory. So, if you are sent to www.domain.com/admin when logging in, make the same rule for www.domain.com/admin/\* to exclude all pages in your admin area.
