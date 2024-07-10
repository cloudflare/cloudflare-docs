---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/206652947-Using-Page-Rules-to-rewrite-Host-Headers
title: Rewrite Host headers
meta:
    title: Rewrite Host headers | Page Rules
---

# Rewrite Host headers

Customers can rewrite `Host` headers using different Cloudflare rules. This feature is currently available for domains on the Enterprise plan.

{{<render file="_page-rules-migration.md">}}

A common use case for this functionality is when your content is hosted on an Amazon S3 bucket. Amazon has designed their system to only accept host headers that have the same name as the bucket hosting your content. In this way, a request to `Host: your-domain.com` must be rewritten to `Host: your-bucket.s3.amazonaws.com`, or else the request will be denied.

In some cases, you can adjust your Amazon S3 Bucket to accept `Host` headers that are not the bucket name.

---

To rewrite the `Host` header:

1. Log in to your [Cloudflare account](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Rules** > **Page Rules**.
3. Select **Create Page Rule**.
4. Specify the URL to match.
5. In **Pick a Setting,** select _Host Header Override_. Then, enter the override value.
6. Select **Save and Deploy Page Rule**.

Now, any request matching the URL you specified will have the `Host` header overridden to the one you entered in the **Host Header Override** text box.

{{<render file="_page-rule-proxied-dns-warning.md">}}
