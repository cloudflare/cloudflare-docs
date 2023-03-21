---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-
title: Why was my domain deleted from Cloudflare?
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

{{<Aside type="note">}}
*Delete* is an **Action** that denotes domain deletion but is also
commonly used for deletion of other various account settings. Therefore,
ensure that **Resource** says *Zone*.
{{</Aside>}}

___

## Step 2 - Check whether domain registration lists Cloudflare nameservers

{{<Aside type="tip">}}
It is not necessary to check domain registration for domains utilizing a
Cloudflare CNAME setup.
{{</Aside>}}

1\. Use either the command-line based “whois” application provided with your Operating System or a website such as [whois.icann.org](https://whois.icann.org/en) or [www.whois.net](https://www.whois.net/).

-   If you are unable to find the nameserver details for your domain, reach out to your domain registrar or domain provider to provide the domain registration information.
-   Ensure Cloudflare’s nameservers are the only two nameservers listed in the domain registration details.
-   Ensure nameservers are spelled correctly in the domain registration.

2\. Confirm that the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** section of the Cloudflare **DNS** app.

3\. If you identify incorrect information, log in to your domain provider’s portal to make updates or contact your domain provider for assistance.

___

## Step 3 - Check whether domain resolution uses Cloudflare nameservers

{{<Aside type="tip">}}
It is not necessary to check domain registration for domains utilizing a
Cloudflare CNAME setup.
{{</Aside>}}

1\. Use command-line or third-party tools to confirm if Cloudflare's nameservers are configured:

```sh
$ dig NS something.anotherdomain.com
$ dig +trace NS something.anotherdomain.com
$ dig NS something.anotherdomain.com @8.8.8.8
```

The +trace option outputs detailed information when the DNS response fails. This information can be useful when troubleshooting the issue with your DNS provider.

The @8.8.8.8 option returns results from Google's public DNS resolver. The results will confirm whether public resolvers receive a DNS response.


```sh
$ nslookup -type=ns something.anotherdomain.com
$ nslookup -type=ns something.anotherdomain.com 8.8.8.8
```
Some online services, such as [whatsmydns.net](https://www.whatsmydns.net/), check for DNS resolution worldwide.  

-   Ensure Cloudflare’s two nameservers are the only nameservers returned in the query results.
-   Ensure there are no misspelled nameservers.
-   Confirm the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** section of the Cloudflare **DNS** app.

2\. If you identify incorrect information, log in to your domain provider’s portal to make updates or contact your domain provider for assistance.

3\. If the nameserver and domain registration data are correct, reach out to your domain provider to confirm if there have been recent DNS propagation issues.

{{<Aside type="note">}}
Some registrars provide more than two nameservers; however, use only the
two provided in the DNS app of your Cloudflare account.
{{</Aside>}}

___

## Recover a deleted domain

Recover a deleted domain via the **\+ Add site** link located on the right side of the top navigation bar in the Cloudflare dashboard. The domain must be added like a new domain.

{{<Aside type="warning">}}
Cloudflare support is unable to restore DNS or settings for deleted
domains.
{{</Aside>}}

___

## Related resources

-   [Secondary Nameservers](https://support.cloudflare.com/hc/en-us/articles/360001356152-How-do-I-setup-and-manage-Secondary-DNS-) (Enterprise feature)
-   [CNAME setup](/dns/zone-setups/partial-setup) (Business and Enterprise feature)
-   [How to change nameservers to Cloudflare](/dns/zone-setups/full-setup/setup)
