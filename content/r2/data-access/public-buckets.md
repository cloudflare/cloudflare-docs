---
pcx_content_type: how-to
title: Public Buckets
weight: 3
---

# Create Public Buckets on R2

## Overview

Public Bucket is a feature that allows users to expose the contents of their R2 buckets directly to the internet. By default, buckets are never publicly accessible and will always require explicit user permission to enable.

Public buckets can be set up in two ways:

1. The first exposes your bucket as a custom domain. 
2. The second exposes your bucket as an `*.r2.dev` Cloudflare subdomain that is generated after you set up your bucket. 

To configure firewall rules, caching, access controls, or bot management for your bucket, you must set up a custom domain.

## Connect your bucket to a custom domain

Domain access through a custom domain allows you to use features such as access management, Cache and bot management.

To connect a custom domain to your bucket:

1. Go to **R2** and select your bucket.
2. Go to **Settings**.
3. Go to **Domain Access**.

![Follow the steps below to enable Domain Access](/r2/static/public-buckets-domain-access.png)

4. Select **Connect Domain**.

![Follow the steps described to connect a custom domain to your bucket](/r2/static/public-buckets-connect-domain.png)

5. Enter the domain name you want to connect to and select **Continue**.

![Add Domain](/r2/static/public-buckets-add-domain.png)

6. Review the new record that will be added to the DNS table and select **Connect Domain**.

Your domain is now connected. It takes a few minutes for the status to change from **Initializing** to **Active**. Refresh to review the status update. If the status has not changed, select the *...* next to your bucket and select **Retry connection**.

![Active and Allowed](/r2/static/public-buckets-active-allowed.png)

To view the added DNS record, select *...* next to the connected domain and select **Manage DNS**.

![Manage Cloudflare DNS](/r2/static/public-buckets-manage-cloudflare-dns.png)

{{<Aside type="note">}}

There are a few restrictions when using custom domains to access R2 buckets:

* The domain being used must belong to the same account as the R2 bucket.
* Use of a domain with CNAME flattening enabled is not supported--you'll need to disable [CNAME flattening](/dns/additional-options/cname-flattening/) before enabling domain access.
* Object access is only available via HTTPS; plaintxt HTTP is not supported.

{{</Aside>}}

## Disable domain access

Disabling a domain will turn off public access to your bucket through that domain. Your bucket will still be publicly accessible.

To disable a domain:

1. In **R2**, select the bucket for which you want to disable custom domain access.
2. Go to **Settings**.
3. Scroll down to **Domain Access**.
4. Next to the domain you want to disable, select **...** and select **Disable domain**.

![Disable Domain](/r2/static/public-buckets-disable-domain.png)

5. The badge under **Access to Bucket** will update to **Not allowed**.

![Not Allowed](/r2/static/public-buckets-not-allowed-2.png)

## Remove domain

Removing a domain will remove custom domain configuration that you have set up on the dashboard. Your bucket will still be publicly accessible.

To remove a domain:

1. In **R2**, select the bucket for which you want to remove domain access.
2. Go to **Settings**.
3. Scroll down to **Domain Access**.
4. Select **...** next to the domain to disable and select **Remove domain**.

![Remove Domain](/r2/static/public-buckets-remove-domain.png)

5. Select ‘Remove domain’ in the confirmation window. The CNAME record pointing to the domain will also be removed as part of this step. You can always add the domain again.

The domain is no longer connected to your bucket and will no longer appear in the connected domains list.

## Enable public access for your bucket

Enabling public access for your bucket will make the content of your bucket available to the Internet. To enable public access for your buckets:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) > select your account > **R2**.

![Choose R2 from the side menu](/r2/static/public-buckets-r2.png)

2. In. **R2**, select the bucket you want to enable public access for.

![Select your bucket](/r2/static/public-buckets-bucket.png)

3. Go to **Settings**.

![Select settings](/r2/static/public-buckets-settings.png)

4. In **Settings**, go to **Bucket Access**.

![Select bucket access](/r2/static/public-buckets-not-allowed.png)

5. Under **Bucket Access**, select **Allow Access**.

![Allow access](/r2/static/public-buckets-allow-access.png)

6. You will be prompted to confirm your choice. In the confirmation dialog, type ‘allow’ to confirm and select **Allow**.
7. You can now access the bucket and its objects using the Public Bucket URL.

![Show Public Bucket URL](/r2/static/public-buckets-allowed.png)

You can review if your bucket is publicly accessible by going to your bucket and checking that **Public URL Access** states **Allowed**.

{{<Aside type="note">}}

To enable access management, Cache and bot management features, you must set up a custom domain when enabling public access to your bucket.

{{</Aside>}}

## Disable public access for your bucket

Your bucket will not be exposed to the Internet after you disable public access.

To disable public access for your bucket:

1. In **R2**, select the bucket for which you want to turn off public access.

![Choose R2 from the side menu](/r2/static/public-buckets-r2.png)

2. Go to **Settings**.

![Select settings](/r2/static/public-buckets-settings.png)

3. Scroll down to **Public Access**.

![Public Access](/r2/static/public-buckets-allowed.png)

3. Select **Disallow Access**.

![Disallow access](/r2/static/public-buckets-disallow-access.png)

4. In the confirmation dialog, type ‘disallow’ to confirm and select **Disallow**.

Your bucket and its objects can no longer be accessed using the Public Bucket URL. 
