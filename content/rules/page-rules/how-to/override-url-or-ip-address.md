---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/206190798-Using-Resolve-Override-in-Page-Rules
title: Override URL or IP address
meta:
    title: Override URL or IP address | Page Rules
---

# Override URL or IP address

Cloudflare Page Rules allows you to override the URL or IP address of a request. This feature is currently available for domains on the Enterprise plan.

{{<render file="_origin-rule-promotion.md" productFolder="rules" withParameters="/rules/origin-rules/features/#dns-record">}}

A common use case for this functionality is when you are serving an application from a particular URI (`mydomain.com/app`). In this case, the app may live on another server and may even be hosted by a third party. Requests to this endpoint must be directed to the server for that third party application. You can specify a `CNAME` host.

{{<Aside type="warning">}}
The `CNAME` record must exist within the Cloudflare DNS.
{{</Aside>}}

To make sure you have full control of these records, it is recommended that you set the Resolve Override within the same zone name.

___

To configure a resolve override in Page Rules, do the following:

1. [Create a DNS record](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) (either `CNAME` or `A` record) for your domain.

    - This example shows a `CNAME` record setup to point to `domain.s3.amazonaws.com`.

      -   **Type:** `CNAME`
      -   **Name:** `resolve.example.com`
      -   **Target:** `domain.s3.amazonaws.com`
      -   **TTL:** Auto
      -   **Proxy status:** Proxied

    -   This example uses an `A` record to point to a web server IP address.

        -   **Type:** `A`
        -   **Name:** `resolve.example.com`
        -   **IPv4 address:** `1.2.3.4`
        -   **TTL:** Auto
        -   **Proxy status:** Proxied

2. [Create a Page Rule](/rules/page-rules/manage/) to override a URL or an IP address.

    The following example Page Rule configuration would send all requests from a folder (`/app`) to an AWS S3 bucket:

    -   **If the URL matches:** `example.com/app/*`
    -   **Setting:** _Resolve Override_ | **Value:** `resolve.example.com`
    -   **Setting:** _Host Header Override_ | **Value:** `examplebucket.s3.amazonaws.com`

{{<Aside type="warning">}}

The _Resolve Override_ Page Rule setting only allows override of the hostname, not the path.

If you need to modify the path also, you will need to either use a [Worker](/workers/runtime-apis/request/#requestinitcfproperties) or combine the Page Rule with a [transform rule](/rules/transform/url-rewrite/).

{{</Aside>}}
