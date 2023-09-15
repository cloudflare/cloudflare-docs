---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/231369048-Using-Cloudflare-with-a-personal-domain-on-Medium
title: Using Cloudflare with a personal domain on Medium
---

# Using Cloudflare with a personal domain on Medium



## Overview

Setting up Cloudflare to work with a Medium publication requires several steps and can sometimes take several days before everything is working properly. This article contains the steps needed at each site and the approximate times.

1\. Go to [medium.com](https://medium.com/) and create a publication using your Medium account. Note that Medium does not support custom domains with a standard Medium profile page (**medium.com/@username**). This will only work with a publication. To see complete instructions on creating a publication [click here](https://help.medium.com/hc/en-us/articles/214559417-New-Publication). 

2\. Submit a request to Medium support for custom domain using [this form](https://help.medium.com/hc/en-us/requests/new?ticket_form_id=165177). In approximately 12-24 hours Medium will reply with a list of twelve A records and a CNAME that will need to be added to your DNS records in your Cloudflare account. The A records consist of 12 standard IP addresses, but the CNAME contains a custom token.

3\. The unique CNAME will consist of a domain and a target. Medium instructions typically encourage adding **.domain.com** or **.subdomain.domain.com** to the domain string, but Cloudflare customers do not need to include **.domain.com**. If pointing to a standard domain just include the string (we add the domain automatically). If pointing to a subdomain just include the subdomain without the domain.

4\. Make sure that all A records are proxied through Cloudflare (orange clouded). Do not proxy CNAME records (grey cloud). CNAME flattening should also be turned on. The CNAME configuration is only necessary while Medium is securing the SSL certificate. After it has been applied the CNAME can be removed.

5\. Go to the **Overview** tab of your Cloudflare **SSL/TLS** app and set SSL to **Full** or **Full (Strict)**.

Once the settings are configured correctly, Medium will validate the domain and obtain the SSL certificate. This can take 1-2 days, but sometimes longer. During this time you should expect your domain to direct to **medium.com**, or return an error. Once the SSL certificate has been applied you can change your CNAME settings, but the SSL setting must still be either Full or Full (Strict).
