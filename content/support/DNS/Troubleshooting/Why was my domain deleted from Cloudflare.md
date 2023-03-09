---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-
title: Why was my domain deleted from Cloudflare
---

# Why was my domain deleted from Cloudflare?



## Overview

Domain deletion commonly occurs for the following reasons:

-   A user with access to the domain removed it.
-   The nameservers no longer point to Cloudflare. Cloudflare continuously monitors domain registration.
-   The domain was not authenticated (pending for 28 days).

___

## Step 1 - Check Audit Logs in your Cloudflare account

Cloudflare **Audit Logs** contain information about domain deletion.  Review [using the Audit Logs](https://support.cloudflare.com/hc/en-us/articles/115002833612-How-do-I-use-Audit-Logs-) for additional information about the **Audit Logs** feature.

1.  Log in to the Cloudflare dashboard.
2.  Click the appropriate Cloudflare account where the deleted domain existed.
3.  Click **Audit Log** in the second navigation bar from the top.
4.  For **Domain**, enter the domain name that was deleted.
5.  Click on a _Delete_ **Action** and ensure that **Resource** says _Account_.
6.  Observe the **Date**, **User IP Address**, and **User** that deleted the domain.
7.  If **User IP Address** is _127.0.0.1_ or contains no data, the deletion was automatically performed by Cloudflare’s systems: Move to Step 2 

___

## Step 2 - Check whether domain registration lists Cloudflare nameservers

1\. Use either the command-line based “whois” application provided with your Operating System or a website such as [whois.icann.org](https://whois.icann.org/en) or [www.whois.net](https://www.whois.net/).

-   If you are unable to find the nameserver details for your domain, reach out to your domain registrar or domain provider to provide the domain registration information.
-   Ensure Cloudflare’s nameservers are the only two nameservers listed in the domain registration details.
-   Ensure nameservers are spelled correctly in the domain registration.

2\. Confirm that the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** section of the Cloudflare **DNS** app.

3\. If you identify incorrect information, log in to your domain provider’s portal to make updates or contact your domain provider for assistance.

___

## Step 3 - Check whether domain resolution uses Cloudflare nameservers

1\. Use command-line or third-party tools to confirm if Cloudflare's nameservers are configured:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig +trace NS something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig NS something.anotherdomain.com @8.8.8.8</span></div></span></span></span></code></pre>{{</raw>}}

The +trace option outputs detailed information when the DNS response fails. This information can be useful when troubleshooting the issue with your DNS provider.

The @8.8.8.8 option returns results from Google's public DNS resolver. The results will confirm whether public resolvers receive a DNS response.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">nslookup -type=ns something.anotherdomain.com 8.8.8.8</span></div></span></span></span></code></pre>{{</raw>}}

Some online services, such as [whatsmydns.net](https://www.whatsmydns.net/), check for DNS resolution worldwide.  

-   Ensure Cloudflare’s two nameservers are the only nameservers returned in the query results.
-   Ensure there are no misspelled nameservers.
-   Confirm the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** section of the Cloudflare **DNS** app.

2\. If you identify incorrect information, log in to your domain provider’s portal to make updates or contact your domain provider for assistance.

3\. If the nameserver and domain registration data are correct, reach out to your domain provider to confirm if there have been recent DNS propagation issues.

___

## Recover a deleted domain

Recover a deleted domain via the **\+ Add site** link located on the right side of the top navigation bar in the Cloudflare dashboard. The domain must be added like a new domain.

___

## Related resources

-   [Secondary Nameservers](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-) (Enterprise feature)
-   [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup) (Business and Enterprise feature)
-   [How to change nameservers to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup)
