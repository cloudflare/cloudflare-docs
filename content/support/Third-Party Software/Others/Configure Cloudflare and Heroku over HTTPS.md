---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/205893698-Configure-Cloudflare-and-Heroku-over-HTTPS
title: Configure Cloudflare and Heroku over HTTPS
---

# Configure Cloudflare and Heroku over HTTPS



## Overview

Heroku is a cloud PaaS that supports several pre-configured programming languages. Heroku deals with all your infrastructure so you can focus on your application without having to work at the command line.

This article describes how to configure Heroku with Cloudflare to serve your traffic over HTTPS. For this article, we'll assume that you already have an [active domain on Cloudflare](https://support.cloudflare.com/hc/en-us/sections/200820158-CloudFlare-101), as well as a running Heroku app.

___

## Step 1 - Add a custom domain to your Heroku app

Follow Heroku's instructions: [Custom Domain Names for Apps](https://devcenter.heroku.com/articles/custom-domains).

___

## Step 2 - Add a subdomain in Cloudflare DNS

Below, you will need to add DNS records for a subdomain and a root domain. Learn how to [Managing DNS records in Cloudflare](https://support.cloudflare.com/hc/articles/360019093151).

### Step 2a - Add a subdomain

To start, log in to your Cloudflare account, navigate to the **DNS** app and add a 'www' _CNAME_ record that points to the custom domain (also known as _DNS target_) that you obtained in Step 1 above for your subdomain.

### Step 2b - Add your root domain

Adding a root or apex domain on Heroku also requires using a CNAME record pointed from your root. You cannot use A records on Heroku because no IP addresses are exposed for Heroku users to use.

Fortunately, Cloudflare offers [CNAME flattening](https://support.cloudflare.com/hc/en-us/articles/360017421192-Cloudflare-DNS-FAQ#h_41430356531541184358992) to resolve requests for your root domain.

Add a CNAME record for your root (e.g. example.com) and point it to DNS target you obtained in Step 1 above for your domain.

___

## Step 3 - Confirm that your domain is routed through Cloudflare

The easiest way to confirm that Cloudflare is working for your domain is to issue a cURL command.

```sh
$  curl -I www.example.com
HTTP/1.1 200 OK
Date: Tue, 23 Jan 2018 18:51:30 GMT
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
Cache-Control: public, max-age=0
Last-Modified: Mon, 31 Dec 1979 04:08:00 GMT
X-Powered-By: Express
Server: cloudflare
CF-RAY: 3e1cf1d936f28c52-SFO-DOG
```

You can identify Cloudflare-proxied requests by the _CF-Ray_ response header. If either of these two are present, your requests are being proxied by Cloudflare accordingly.

You can repeat the above cURL command for any of the subdomains that you have configured within your DNS settings.

___

## Step 4 - Configure your domain for SSL

### Step 4a - Enable SSL

Cloudflare provides a SANs wildcard certificate with all paid plans, and a SNI wildcard certificate with the Free plan. Full details on SSL [can be found here](https://www.cloudflare.com/ssl).

If you don't know what this means, navigate to the **Overview** tab of the **SSL/TLS** app in your Cloudflare dashboard. Select _Flexible_ mode to serve your site over HTTPS to all public visitors.

Once the certificate status changes to **• Active Certificate**, incoming traffic will be served to your site over HTTPS (e.g., visitors will see HTTPS prefixed to your domain name in the browser bar).  

### Step 4b - Force all traffic over HTTPS

To ensure all traffic to your site is encrypted, Cloudflare lets you force an automatic HTTPS redirect.  To configure this, consult: [How do I redirect all visitors to HTTPS/SSL?](https://support.cloudflare.com/hc/articles/200170536)

You can then use a cURL command to verify that all requests are being forced over HTTPS.

```sh
$ curl -I -L example.com
HTTP/1.1 301 Moved Permanently
Date: Tue, 23 Jan 2018 23:17:44 GMT
Connection: keep-alive
Cache-Control: max-age=3600
Expires: Wed, 24 Jan 2018 00:17:44 GMT
Location: https://example.com/
Server: cloudflare
CF-RAY: 3e1e77d5c42b8c52-SFO-DOG
```

If SSL was not working for your domain (e.g. your SSL certificate has not yet been issued), you would see a [525](https://support.cloudflare.com/hc/articles/115003011431#525error) or [526](https://support.cloudflare.com/hc/articles/115003011431#526error) HTTP response after the redirect.

Please note that the issuing of a Universal SSL certificate typically takes up to 24 hours. Our paid SSL certificates issue within 10-15 minutes.
