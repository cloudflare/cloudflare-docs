---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360021902391-Enabling-Cloudflare-SSL-on-Azure-Storage-Static-Web-Hosting-Applications
title: Enabling Cloudflare SSL on Azure Storage Static Web Hosting Applications
---

# Enabling Cloudflare SSL on Azure Storage Static Web Hosting Applications



## Overview

Static Web Hosting allows an Azure storage container to directly serve static content.  However, the current [Azure Static Web Hosting](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website) technology stack does not support SSL for certain URLs. For example, if _foo.com_ were the domain using Static Web Hosting, traffic destined for _https://www.foo.com_ and _https://foo.com_ could not use SSL.  However, proxying Static Web Hosting Applications through Cloudflare allows SSL to be enabled for these URLs.

Static Web Hosting enables https with the following URLs, for example, if _foo.com_ is the domain:

```
https://<<account>>.blob.core.windows.net/
https://<<account>>.<<foo.com>>.web.core.windows.net
```

A Static Web Hosting custom domain, _foo.com_, uses a _CNAME_ to point to another _CNAME_ which utilizes the **\*.blob, \*.web** URLs.  That _CNAME_ then resolves to another _CNAME_ which is the _A record_ of the FE pool for the Azure storage account.  To clarify this configuration, refer to the following example:

```
storage.foo.com CNAME foo.blob.core.windows.net
foo.blob.core.windows.net CNAME blob.exampleprdstr01.store.core.windows.net
blob.exampleprdstr01.store.core.windows.net  A  13.78.152.64
```

{{<Aside type="note">}}
Currently, one IP address is returned for the *A record* except in the
case of ZRS (zone redundant storage) which will return the IP addresses
of all FE pools (one in each availability zone).
{{</Aside>}}

Route traffic from the Static Web Hosting application to Cloudflare in order to enable Cloudflare SSL:

`Browser <—SSL—> Cloudflare Proxy <—SSL—> Static Web Hosting`

[Setup a Cloudflare Account](https://support.cloudflare.com/hc/en-us/articles/360021902391#h_21187007881548695540718) to get started.

___

## Create a Cloudflare Account

To receive SSL on a custom domain:

1\. Create a new Cloudflare account or use an existing account. 

2\. Enter the name of your custom domain under **Add Your Site**.

3\. Cloudflare queries authoritative DNS servers for the DNS records registered for the domain.

___

## Choose a plan

Select the Free, Pro, or Business plan for the domain. If you choose Free or Pro, Cloudflare will generate an SSL certificate for communications between browsers and the Cloudflare proxy. If you prefer to upload your own SSL certificate to Cloudflare, choose the Business plan.

___

## Select a DNS Method

If you want Cloudflare to provide authoritative DNS, use the Cloudflare nameservers provided for your domain and place them in the DNS manager of your domain registrar.

If you want to [use the CNAME method](https://support.cloudflare.com/hc/articles/360020348832), you’ll need to follow additional steps.

___

## Select an SSL Method

When logged into your Cloudflare account, select the **Overview** tab **SSL/TLS** app.  The default **SSL** setting is Flexible SSL; however, there are [other SSL options](https://support.cloudflare.com/hc/articles/200170416). 

{{<Aside type="note">}}
For domains activated on Free or Pro plans, it may take up to 24 hours
for new SSL certificates to issue.
{{</Aside>}}

Because DNS settings are cached in various locations throughout the Internet, including on a client's browser, changes to SSL settings may take time to propagate and start functioning as expected.

If you want an HTTPS connection between CF and Azure, a valid SSL certificate must be installed on the blob itself. Since this is enabled in Azure by default, you may immediately change your SSL settings to _Full_ or _Full (strict)_ to ensure encryption between the client, Cloudflare, and Azure.

___

## Related resources

-   [Create a Cloudflare account and add a domain](https://support.cloudflare.com/hc/articles/201720164)
-   [Understanding a CNAME setup](https://support.cloudflare.com/hc/articles/360020348832)
-   [What SSL certificates are available through Cloudflare?](https://support.cloudflare.com/hc/articles/203295200)
-   [What are the SSL configuration options?](https://support.cloudflare.com/hc/articles/200170416)
