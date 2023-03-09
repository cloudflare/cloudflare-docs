---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360020296512-DNS-Troubleshooting-FAQ
title: DNS Troubleshooting FAQ
---

# DNS Troubleshooting FAQ



## Why do I have a dc-######### subdomain?

The dc-##### subdomain is added to overcome a conflict created when your SRV or _MX record_ resolves to a domain configured to proxy to Cloudflare.

Therefore, Cloudflare will create a dc-##### DNS record that resolves to the origin IP address. The dc-##### record ensures that traffic for your MX or SRV record isn’t proxied (it directly resolves to your origin IP) while the Cloudflare proxy works for all other traffic.

For example, before using Cloudflare, suppose your DNS records for mail are as follows:

`example.com MX example.com` `example.com A 192.0.2.1`

After using Cloudflare and proxying the _A record_, Cloudflare will provide DNS responses with a Cloudflare IP (203.0.113.1 in the example below):

`example.com MX example.com` `example.com A 203.0.113.1`

Since proxying mail traffic to Cloudflare would break your mail services, Cloudflare detects this situation and creates a dc-##### record:

`example.com MX dc-1234abcd.example.com` `dc-1234abcd.example.com A 192.0.2.1` `example.com A 203.0.113.1`

Removing the dc-###### record is only possible via one of these methods:

-   If no mail is received for the domain, delete the _MX record._
-   If mail is received for the domain, update the _MX record_ to resolve to a separate _A record_ for a mail subdomain that isn’t proxied by Cloudflare:

`example.com MX mail.example.com` `mail.example.com A 192.0.2.1` `example.com A 203.0.113.1`

{{<Aside type="warning">}}
If your mail server resides on the same IP as your web server, your MX
record will expose your origin IP address.
{{</Aside>}}

___

## Why are DNS queries returning incorrect results?

Third-party tools can sometimes fail to return correct DNS results if a recursive DNS cache fails to refresh. In this circumstance, purge your public DNS cache via these methods:

-   [Purging your DNS cache at OpenDNS](http://www.opendns.com/support/cache/)
-   [Purging your DNS cache at Google](https://developers.google.com/speed/public-dns/cache)
-   [Purging your DNS cache locally](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## No A, AAAA or CNAME record found?

_No A, AAAA or CNAME record found_ means the Cloudflare **DNS** app lacks proper records for DNS resolution.

[Add the missing DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records) to your domain.

{{<Aside type="note">}}
Sites generally have at least an *A record* that points to the origin
server IP address, typically for the www subdomain and the root domain.
{{</Aside>}}

___

## Why have I received an email: Your Name Servers have Changed?

For domains where Cloudflare hosts the DNS, Cloudflare continuously checks whether the domain uses Cloudflare’s nameservers for DNS resolution. If Cloudflare's nameservers are not used, the domain status is updated from _Active_ to _Moved_ in the Cloudflare **Overview** app and an email is sent to the customer.  Any domain _Moved_ for more than 7 days is deleted unless the domain again becomes _Active_.

Steps to resolve the issue require updating the DNS at your domain registrar to utilize the Cloudflare nameservers:

1.  Follow steps 2 and 3 within our [domain troubleshooting article](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-).
2.  Click **Re-check Now** in the Cloudflare UI **Overview** app.

___

## Why can't I add certain TLDs via the DNS API?

The DNS API cannot be used for domains with .cf, .ga, .gq, .ml, or .tk TLDs. Use the Cloudflare Dashboard for managing such TLDs. Enterprise customer can [contact Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) to remove this limitation.
