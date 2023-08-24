---
pcx_content_type: how-to
title: Public buckets
weight: 2
---

# Create public buckets on R2

Public Bucket is a feature that allows users to expose the contents of their R2 buckets directly to the Internet. By default, buckets are never publicly accessible and will always require explicit user permission to enable.

Public buckets can be set up in either one of two ways:

- Expose your bucket as a custom domain under your control.
- Expose your bucket as a Cloudflare-managed subdomain under `https://r2.dev`.

To configure firewall rules, caching, access controls, or bot management for your bucket, you must do so through a custom domain.
Using a custom domain does not require enabling `r2.dev`.

## Custom domains

### Caching

Domain access through a custom domain allows you to use [Cloudflare Cache](/cache/) to accelerate access to your R2 bucket.

{{<Aside type="note">}}

By default, only certain file types are cached. To cache all files in your bucket, you must set a Cache Everything page rule. For more information on default Cache behavior and how to customize it, refer to [Default Cache Behavior](/cache/concepts/default-cache-behavior/#default-cached-file-extensions)

{{</Aside>}}

### Access control

To restrict access to your custom domain's bucket, use Cloudflare's existing security products.

- [Cloudflare Zero Trust Access](/cloudflare-one/applications/configure-apps): Protects buckets that should only be accessible by your teammates.
- [Cloudflare WAF Token Authentication](https://support.cloudflare.com/hc/en-us/articles/115001376488-Configuring-Token-Authentication#4NRqqMni2CYkLKlVcs0m6S): Restricts access to documents, files, and media to selected users by providing them with an access token.

{{<Aside type="warning">}}

Disable public access to your [`r2.dev` subdomain](#disable-managed-public-access-for-your-bucket) when using products like WAF or Cloudflare Access. If you do not disable public access, your bucket will remain publicly available through your `r2.dev` subdomain.

{{</Aside>}}

## Connect a bucket to a custom domain

1. Go to **R2** and select your bucket.
2. On the bucket page, select **Settings**.
3. Under **Public access** > **Custom Domains**, select **Connect Domain**.
5. Enter the domain name you want to connect to and select **Continue**.
6. Review the new record that will be added to the DNS table and select **Connect Domain**.

Your domain is now connected. The status takes a few minutes to change from **Initializing** to **Active**, and you may need to refresh to review the status update. If the status has not changed, select the *...* next to your bucket and select **Retry connection**.

To view the added DNS record, select *...* next to the connected domain and select **Manage DNS**.

### Restrictions

There are a few restrictions when using custom domains to access R2 buckets.

* The domain being used must belong to the same account as the R2 bucket.
* Use of a domain with CNAME flattening enabled is not supported. You will need to disable [CNAME flattening](/dns/cname-flattening/) before enabling domain access.
* Object access is only available via HTTPS; plaintxt HTTP is not supported.

## Disable domain access

Disabling a domain will turn off public access to your bucket through that domain. Access through other domains or the managed `r2.dev` subdomain are unaffected.
The specified domain will also remain connected to R2 until you remove it or delete the bucket.

To disable a domain:

1. In **R2**, select the bucket you want to modify.
2. On the bucket page, Select **Settings**.
3. Under **Public access** > **Custom Domains**, select **Connect Domain**.
4. Next to the domain you want to disable, select **...** and **Disable domain**.
5. The badge under **Access to Bucket** will update to **Not allowed**.

## Remove domain

Removing a domain will remove custom domain configuration that you have set up on the dashboard. Your bucket will still be publicly accessible.

To remove a domain:

1. In **R2**, select the bucket you want to modify.
2. On the bucket page, select **Settings**.
3. Under **Public access** > **Custom Domains**, select **Connect Domain**.
4. Next to the domain you want to disable, select **...** and **Remove domain**.
5. Select ‘Remove domain’ in the confirmation window. The CNAME record pointing to the domain will also be removed as part of this step. You can always add the domain again.

The domain is no longer connected to your bucket and will no longer appear in the connected domains list.

## Enable managed public access

When you enable managed public access for your bucket, the content of your bucket is available to the Internet through a Cloudflare-managed `r2.dev` subdomain.

{{<Aside type="note">}}

Public access through `r2.dev` subdomains are rate limited and should only be used for development purposes.

To enable access management, Cache and bot management features, you must set up a custom domain when enabling public access to your bucket.

{{</Aside>}}

To enable access through `r2.dev` for your buckets:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) > select your account > **R2**.
2. In **R2**, select the bucket you want to modify.
3. On the bucket page, select **Settings**.
4. In **Settings**, go to **Bucket Access**.
5. Under **Bucket Details** > **R2.dev subdomain**, select **Allow Access**.
6. In **Allow Public Access?**, confirm your choice by typing ‘allow’ to confirm and select **Allow**.
7. You can now access the bucket and its objects using the Public Bucket URL.

You can review if your bucket is publicly accessible by going to your bucket and checking that **Public URL Access** states **Allowed**.

## Disable managed public access

Your bucket will not be exposed to the Internet as an `r2.dev` subdomain after you disable public access. If you have connected other domains, the bucket will remain accessible on those domains.

To disable public access for your bucket:

1. In **R2**, select the bucket you want to modify.
2. On the bucket page, select **Settings**.
3. Under **Bucket Details** > **R2.dev subdomain**, select **Disallow Access**.
4. In **Disallow Public Access?**, type ‘disallow’ to confirm and select **Disallow**.

Your bucket and its objects can no longer be accessed using the Public Bucket URL. 
