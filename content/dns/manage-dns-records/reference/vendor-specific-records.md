---
pcx_content_type: configuration
source: https://support.cloudflare.com/hc/en-us/articles/360020991331-Adding-vendor-specific-DNS-records-to-Cloudflare
title: Vendor-specific DNS records
---

# Vendor-specific DNS records

This article requires prior knowledge of DNS record management via the Cloudflare dashboard. To learn more, refer to Cloudflare's article on [managing DNS records](/dns/manage-dns-records/how-to/create-dns-records/).

## Google

### Google Workspace MX records

Google Workspace requires [specific MX records](https://support.google.com/a/answer/174125) added to your DNS provider.

Once you [add these records to Cloudflare](/dns/manage-dns-records/how-to/create-dns-records/):

- [Test the configuration](https://toolbox.googleapps.com/apps/checkmx/check)
- Do not add other `MX` records other than those provided by Google.

### Google Workspace service URLs

If you want to customize the service addresses URLs associated with Google Workspace, refer to [Google's documentation](https://support.google.com/a/answer/53340).

{{<Aside type="warning">}}
Google enforces HTTPS on its services. If you see errors about redirect
loops when browsing to your site through Cloudflare, use Cloudflare's [Full encryption mode](/ssl/origin-configuration/ssl-modes/full/).
{{</Aside>}}

### Google site verification

To add a site verification record in Cloudflare, follow [Google's documentation](https://support.google.com/a/answer/7173990).

---

## Amazon

### Amazon Route53

AWS customers must [update their domain's nameservers](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-name-servers-glue-records.html) to point to their new Cloudflare nameservers.

### Amazon S3 bucket

Find the [URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html) for your bucket.

Then, [create a `CNAME` record](/dns/manage-dns-records/how-to/create-dns-records/) in Cloudflare. For example, if the full host URL of the bucket is `files.example.com.s3.amazonaws.com`, you would add a `CNAME` record similar to the following:

```txt
files  CNAME  files.example.com.s3.amazonaws.com
```

### Amazon Simple Email Service (SES)

For help setting up DKIM in SES, refer to the [Amazon documentation](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html).

### Amazon ELB configuration

Refer to [Amazon's ELB help content](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html) for guidance on ELB configuration at Amazon, but generally you should:

Add a [`CNAME` record](/dns/manage-dns-records/how-to/create-dns-records/) to Cloudflare for the hostname you receive from AWS, for example:

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `CNAME` | `elb` | `<AWS_HOSTNAME>.<REGION>._elb.amazonaws.com` | Proxied |
  
---

## Microsoft

### Microsoft 365

For information about the records to Microsoft 365, refer to [Microsoft's documentation](https://learn.microsoft.com/en-us/microsoft-365/admin/get-help-with-domains/information-for-dns-records).

### Microsoft Azure

Follow Microsoft’s instructions on [configuring Azure DNS settings](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain).

Then, add Azure’s required records to [Cloudflare DNS](/dns/manage-dns-records/how-to/create-dns-records/).

---

## Miscellaneous vendors

### ClickFunnels

You can configure Cloudflare to work with ClickFunnels. The process requires updating your Cloudflare DNS settings.

-   [Adding a Cloudflare subdomain](https://help.clickfunnels.com/hc/en-us/articles/360005906774-Adding-A-Cloudflare-Subdomain-)
-   [Adding a Cloudflare domain](https://help.clickfunnels.com/hc/en-us/articles/360005906094-Cloudflare-CNAME-Record)

### Zoho

To use Cloudflare with Zoho, refer to [Zoho configuration with Cloudflare](https://www.zoho.com/mail/help/adminconsole/cloudflare.html).

### Unbounce

Refer to Unbounce's documentation to [get a `CNAME` value](https://documentation.unbounce.com/hc/en-us/articles/204011950), then [add that record within Cloudflare](/dns/manage-dns-records/how-to/create-dns-records/).

{{<Aside type="warning">}}
If Cloudflare is activated via one of our hosting partners, your `CNAME` record should be [DNS-only (unproxied)](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records).
{{</Aside>}}

### SendGrid

Refer to SendGrid's documentation for how to [make SendGrid compatible with Cloudflare](https://docs.sendgrid.com/ui/sending-email/content-delivery-networks#using-cloudflare).

{{<Aside type="note">}}

You may need to refer to Cloudflare's documentation for updated navigation instructions regarding [adding DNS records](/dns/manage-dns-records/how-to/create-dns-records/) and creating [Configuration rules](/rules/configuration-rules/create-dashboard/).

{{</Aside>}}

### WPEngine

For help configuring WPEngine sites, refer to:

- [Configuring DNS with WPEngine](https://wpengine.com/support/wordpress-best-practice-configuring-dns-for-wp-engine/)
- [Cloudflare best practices](https://wpengine.com/support/cloudflare-best-practices/)

### Ning custom domain

For help with Ning, refer to [Use a custom domain with Ning](https://www.ning.com/help/use-your-own-domain-e-g-example-com-for-your-ning-network/).

{{<render file="_third-party-caveat" withParameters="Ning">}}

### SmugMug

For help with SmugMug, refer to [Use a custom domain with SmugMug](https://www.smugmughelp.com/en/articles/363-use-a-custom-domain).

{{<render file="_third-party-caveat" withParameters="SmugMug">}}

### Mailchimp

For help with Mailchimp, refer to [Use a custom domain with Mailchimp](https://mailchimp.com/help/connect-domain/).

{{<render file="_third-party-caveat" withParameters="Mailchimp">}}

### Rackspace CloudFiles

Configure Rackspace CloudFiles via _CNAME record_. Consult the [Rackspace documentation](https://docs.rackspace.com/support/how-to/using-cnames-with-cloud-files-containers/).

Refer to Rackspace CloudFiles's documentation to [get a `CNAME` value](https://docs.rackspace.com/support/how-to/using-cnames-with-cloud-files-containers/), then [add that record within Cloudflare](/dns/manage-dns-records/how-to/create-dns-records/).

{{<Aside type="warning">}}
The `CNAME` record needs to be [DNS-only (unproxied)](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) since rackcdn.com is
not compatible with Cloudflare.
{{</Aside>}}

### Squarespace

First, make sure you [update your nameservers](/dns/zone-setups/full-setup/) and your domain is [active](/dns/zone-setups/reference/domain-status/).

Then, set up your Squarespace DNS records:

1. Get your Squarespace DNS information by following [these instructions](https://support.squarespace.com/hc/en-us/articles/213469948).
2. In Cloudflare, [add those records](/dns/manage-dns-records/how-to/create-dns-records/):
    - All `A` records should be [Proxied](/dns/manage-dns-records/reference/proxied-dns-records/)
    - The `CNAME` record for `www` should also be **Proxied**.
    - The `CNAME` record for `verify.squarespace.com` should be **DNS-only**.
3. If set up properly, your Squarespace DNS Settings page will now indicate that your 'Settings contain problems.' **This is the expected behavior**.

![Screenshot of error warnings in squarespace](/images/support/hc-import-squarespace_dns_settings-test-2.png)
  
#### Pending domain owner verification
  
The `CNAME` record you added for `verify.squarespace.com` should be **DNS-only**.
  
If you proxy this record, Squarespace will not be able to verify your domain ownership and show you a `This website is pending domain owner verification` error. To fix the issue, [edit](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) the `CNAME` record and change the **Proxy status** to **DNS-only**.

### Tumblr custom domain

Refer to Tumblr's documentation to [get DNS record values](https://help.tumblr.com/hc/en-us/articles/231256548-Custom-Domains). Then, [add records to Cloudflare DNS](/dns/manage-dns-records/how-to/create-dns-records/).

{{<render file="_third-party-caveat" withParameters="Tumblr">}}
