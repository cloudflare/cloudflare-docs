---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/206190798-Using-Resolve-Override-in-Page-Rules
title: Using Resolve Override in Page Rules
---

# Using Resolve Override in Page Rules



## Overview

Cloudflare Page Rules allows you to override the URL or IP address of a request.

A common use case for this functionality is when you are serving an application from the URI (e.g. mydomain.com/app). In this case the 'app' may live on another server and may even be hosted by a third party. Requests to this endpoint must be directed to the server for that third party application. You can specify a CNAME host.

To make sure you have full control of these records, it is recommended that you set the Resolve Override within the same zone name.

___

To configure resolve override in Page Rules, do the following:

1\. [Create a DNS record](https://support.cloudflare.com/hc/articles/360019093151#h_60566325041543261564371) (either CNAME or A record) for your domain.

-   This example shows a CNAME setup using `domain.s3.amazonaws.com`.
    -   **Type:** CNAME
    -   **Name:** `resolve.cloudflaredocs.com`
    -   **Target:** `domain.s3.amazonaws.com`
    -   **TTL:** Auto
    -   **Proxy status:** Proxied (orange cloud icon)
-   This example points to a web server IP address.
    -   **Type:** A
    -   **Name:** `resolve.cloudflaredocs.com`
    -   **IPv4 address:** `1.2.3.4`
    -   **TTL:** Auto
    -   **Proxy status:** Proxied (orange cloud icon)

2\. [Create a Page Rule](https://support.cloudflare.com/hc/articles/218411427#h_38Gq7mduJiXIjpVLxp3q19) to override a URL or an IP address.

-   The following example Page Rule configuration would send all requests from a folder (`/app`) to an AWS S3 bucket:
    -   **If the URL matches:** `example.com/app/*`
    -   **Setting:** _Resolve Override_ | **Value:** `resolve.example.com`
    -   **Setting:** _Host Header Override_ | **Value:** `examplebucket.s3.amazonaws.com`
