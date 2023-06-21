---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/206652947-Using-Page-Rules-to-rewrite-Host-Headers
title: Using Page Rules to rewrite Host Headers
---

# Using Page Rules to rewrite Host Headers

Customers can rewrite Host Headers using the Cloudflare **Rules** app. This feature is currently available for domains on the Enterprise plan.

{{<render file="_origin-rule-promotion.md" productFolder="rules" withParameters="/rules/origin-rules/features/#host-header">}}

A common use case for this functionality is when your content is hosted on an Amazon S3 bucket. Amazon has designed their system to only accept host headers that have the same name as the bucket hosting your content. In this way, a request to "Host: your-domain.com" must be rewritten to “Host: your-bucket.s3.amazonaws.com", or else the request will be denied.

{{<Aside type="note">}}
In some cases you can adjust your Amazon S3 Bucket to accept Host
Headers that are not the bucket name.
{{</Aside>}}

To rewrite the Host Header:

1. Go to **Rules** > **Page Rules** and create a new Page Rule.

2. Specify the URL to match.

3. In **Pick a Setting,** select _Host Header Override_. Then, enter the override value.

4. Click **Save and Deploy**.

Now, any request matching the URL you specified will have the host header overridden to the one you entered in the **Host Header Override** text box. Refer to the example below:

![Example configuration of a Page Rule that overrides the Host Header for all requests to theburritobot.com](/support/static/page-rule-host-header-override_resized.png)
