---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360037983412-Configuring-an-Amazon-Web-Services-static-site-to-use-Cloudflare
title: Configuring an Amazon Web Services static site to use Cloudflare
---

# Configuring an Amazon Web Services static site to use Cloudflare



## Overview

You can use Cloudflare to proxy sites that rely on Amazon Web Services (AWS) to store static content using Amazon's Simple Storage Service (S3).

This article assumes that:

-   your site is associated with a registered domain, and
-   you have static content, such as images or HTML pages, to add to your S3 bucket.

To get started, follow the instructions below.

___

## Configure your AWS S3 buckets

An AWS S3 bucket is a public cloud storage resource. These buckets are similar to file folders, and store objects containing data and descriptive metadata. Learn more about [](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)[Working with Amazon S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html).

In this guide, let's assume that you'd like your site to be available via both:

-   A subdomain URL, such as `https://www.example.com`, and
-   the apex domain (also known as "root domain") URL, such as `https://example.com`.

To accomplish this, you will need to configure two S3 buckets by completing the tasks below.

### Task 1 - Set up an S3 bucket for a subdomain

To create and configure your subdomain S3 bucket, follow these instructions from Amazon:

1.  Use the AWS management console to [Create an S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html). For the **Bucket name**, use the subdomain URL without the `https://` part; for example, `www.example.com`.
2.  Then, [Configure an S3 Bucket for Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html). After you save the static website hosting configuration, you can skip disabling public access for your bucket.

### Task 2 - Set up an S3 bucket for a apex domain

After you've set up your subdomain bucket, you can create and configure your apex domain bucket. Follow these instructions from Amazon:

1.  Use the AWS management console to [Create an S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html). For the **Bucket name**, use the domain URL without the `https://` part; for example, `example.com`.
2.  Next, you need to redirect requests from this bucket's URL to the subdomain bucket URL you created. Follow the steps in [](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html)[](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/redirect-website-requests.html)[Redirect Requests to an S3 Bucket Hosted Website to Another Host](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/redirect-website-requests.html). For **Target Bucket or Domain**, enter the same bucket name that you used for the subdomain bucket in Task 1; for example, `www.example.com`.

___

## Configure bucket policies to allow Cloudflare IP addresses

Now that you've created your buckets and enabled hosting for static content, you can set up permissions to allow Cloudflare to access your bucket. This ensures that your site only responds to requests coming from the Cloudflare proxy. This is the [current list of IP address ranges](https://www.cloudflare.com/ips/) used by the Cloudflare proxy.

To set up your policy:

1.  Follow these instructions from Amazon to [Add an S3 Bucket Policy](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-bucket-policy.html).
2.  For the step where you enter the policy in the **Bucket policy editor**, use this sample to fill out the needed JSON code, making sure to replace:
    -   `www.example.com` (appearing in `"Resource": "arn:aws:s3:www.example.com/*"`) with the S3 bucket name for your subdomain URL.
    -   The placeholder IP addresses with the current list of [Cloudflare IP addresses](https://www.cloudflare.com/ips)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::www.example.com/*",
            "Condition": {
                "NotIpAddress": {
                    "aws:SourceIp": [
                        "192.2.0.1" (example IP address),
                        "192.2.0.2" (example IP address),
                        (add all IPs listed at https://www.cloudflare.com/ips)
                    ]
                }
            }
        }
    ]
}
```

___

## Upload static content to your S3 bucket

To add static content to your S3 bucket, follow Amazon's instructions for [Uploading Files and Folders to an S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/upload-objects.html).

{{<Aside type="warning">}}
When uploading static content, you must select the correct properties
and permissions. Also for each uploaded resource, enter the most
appropriate value for the *Content-Type* header as this affects the way
your content displays.
{{</Aside>}}

___

## Set up your site on Cloudflare

Before setting up your site on Cloudflare, ensure you have the URLs or endpoints for both your subdomain and root buckets. For each bucket, you can find the URL in the AWS S3 console under **Properties** > **Static website hosting** > **Endpoint**.

To get started:

1.  Follow the instructions to [Create a Cloudflare account and add a website](https://support.cloudflare.com/hc/articles/201720164). If you already have an account, you can go directly to **Add a domain to Cloudflare**.
2.  When you get to the step to verify your DNS records in the **DNS query results** screen, you will need to create two new CNAME records for the subdomain and apex domain URLs, respectively.
3.  Click **Add Record** to create the subdomain DNS record (e.g., `www.example.com`). Follow instructions for adding a _CNAME_ record in [Managing DNS records in Cloudflare](https://support.cloudflare.com/hc/articles/360019093151).
    -   In the **Name** field, enter the subdomain name; for example, _www_.
    -   In the **Value** field, enter the subdomain bucket endpoint. Do not include the `https://` part.
    -   Click **Save**.
4.  Next for the apex domain (e.g. `example.com`), click **Add Record.** Follow instructions for adding a _CNAME_ record in [Managing DNS records in Cloudflare](https://support.cloudflare.com/hc/articles/360019093151).
    -   In the **Name** field, enter the apex domain name; for example, _example.com_.
    -   In the **Value** field, the apex domain bucket endpoint. Do not include the `https://` part.
    -   Click **Save**.
5.  Since S3 static sites do not support HTTPS by default, use a [Configuration Rule](/rules/configuration-rules/settings/#ssl) to set the **SSL Mode** to [Flexible](/ssl/origin-configuration/ssl-modes/).
6.  To finish, [Change your domain nameservers to Cloudflare](https://support.cloudflare.com/hc/articles/205195708).

Once your site is fully configured in Cloudflare, your visitors can access your AWS S3 hosted content using either the subdomain or apex domain endpoint you set up.

___

## Troubleshooting

_I keep getting “Invalid hostname: Use ‘@’ to represent the root domain.” when creating DNS records in Cloudflare._ 

-   Make sure you are creating CNAME records and not another record type.

___

_Cloudflare is my domain name registrar and I don’t know how to change my nameservers._

-   You don’t need to change the nameservers if you are already using Cloudflare as a domain name registrar.

___

_My static HTML pages show up as HTML code without any formatting on my domain._

-   Ensure that you have selected the correct metadata options in **Set Properties** \> **Metadata** \> **Header:** _Content-Type_, **Value:** _text/html_.
