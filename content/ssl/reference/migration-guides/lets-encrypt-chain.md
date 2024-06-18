---
pcx_content_type: reference
title: Let's Encrypt chain update
weight: 1
meta:
  description: Review notes on the expiration of ISRG Root X1 cross-signed with DST Root CA X3, and how it may affect Cloudflare customers that use Let’s Encrypt.
---

# Let's Encrypt chain update

Let's Encrypt - one of the [certificate authorities (CAs)](/ssl/reference/certificate-authorities/) used by Cloudflare - has announced changes in its [chain of trust](/ssl/concepts/#chain-of-trust).

As the IdenTrust cross-sign (DST Root CA X3) expires on **September 30, 2024**, the self-signed ISRG Root X1 will be the only chain used for RSA certificates issued through Let's Encrypt. Refer to [Background](#background) or our [blog](https://blog.cloudflare.com/shortening-lets-encrypt-change-of-trust-no-impact-to-cloudflare-customers) for details.

To minimize impact, besides communicating the changes and providing recommendations early, Cloudflare will proceed as follows:

* Automatically switch to a different certificate authority the Cloudflare-managed certificates where you have not specifically chosen Let's Encrypt.
* Notify you of Cloudflare-managed certificates that you specifically set to use Let's Encrypt, and whether hostnames covered by these certificates are receiving requests from the [impacted devices or systems](#client-impact).
* Bundle Let’s Encrypt certificates uploaded to Cloudflare with the appropriate chains, as long as the [bundling method](/ssl/edge-certificates/custom-certificates/bundling-methodologies/) is set to compatible or modern.

Refer to the sections below for more information on each of these actions and how they may reflect on the different certificate types.

## Client impact

The expiration of the cross-signed chain will primarily affect older devices, for example Android 7.0 and earlier. Systems that solely rely on the cross-signed chain, lacking the ISRG Root X1 chain in their [trust store](/ssl/concepts/#trust-store), will also be affected.

## Important dates

- **June 2024**: Cloudflare will start automatically changing the CA for managed certificates where you had not opted to use Let's Encrypt.
- **September 9, 2024**: Cloudflare will stop using the cross-signed chain, both in certificate issuance and in [certificate bundling](#custom-certificates).
- **September 30, 2024**: The cross-signed chain will expire.

## How are your products affected

### Universal SSL

[Universal](/ssl/edge-certificates/universal-ssl/) certificates will be automatically switched to a more compatible certificate authority (CA). You do not have to take any action to prepare for this change.

### Advanced certificates

If you have specifically chosen Let's Encrypt to issue your [advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/), Cloudflare will check if your domain has been impacted and will reach out to you by email.

The email will inform you which certificates are using Let's Encrypt as their CA and whether or not their hostnames are receiving requests from [clients impacted by the change](#client-impact).

You can then [manage your advanced certificates](/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) to use a different CA if you choose to do so.

### Total TLS

For [Total TLS](/ssl/edge-certificates/additional-options/total-tls/), if you are concerned that using Let's Encrypt might impact your visitors' experience, go to **SSL/TLS** > **Edge Certificates** and make sure that a different certificate authority is selected in the Total TLS settings.

Cloudflare will not change Total TLS certificates automatically.

### Custom certificates

#### Compatible or modern

For [custom certificates](/ssl/edge-certificates/custom-certificates/) that use compatible or modern [bundle method](/ssl/edge-certificates/custom-certificates/bundling-methodologies/), and are uploaded before September 9, Cloudflare will continue to use the cross-signed chain until their expiry.

After September 9, 2024, all Let’s Encrypt certificates uploaded to Cloudflare will be bundled with the ISRG Root X1 chain, instead of the cross-signed chain.

{{<Aside type="warning">}}
As Cloudflare does not manage the [renewal of custom certificates](/ssl/edge-certificates/custom-certificates/renewing/), you will need to [update the custom certificate](/ssl/edge-certificates/custom-certificates/uploading/#update-an-existing-custom-certificate) before it expires. The new certificate that will be uploaded to extend the expiry will then be bundled with the new ISRG Root X1 chain.
{{</Aside>}}

#### User-defined

For user-defined bundle method, Cloudflare always serve the chain that you upload.

If you upload Let’s Encrypt certificates using this method, it is recommended that certificates uploaded after September 30, 2024, do not use the cross-signed chain.

### Custom hostname

[Custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/) certificates that leave the CA choice up to Cloudflare will be automatically switched to a more compatible certificate authority.

For custom hostname certificates that are specifically set to use Let's Encrypt, no change will happen automatically. Instead, Cloudflare will check the impact and reach out to you, as the SaaS provider, by email. The email will inform you which custom hostnames are receiving requests from [affected clients](#client-impact) so that you can take action as needed.

## Further recommendations

- **Monitor inquiries from your visitors**: Once Let's Encrypt change is rolled out, it is recommended that you monitor your support channels for any inquiries related to certificate warnings or access problems.

- **Update trust store**: If you control the clients that are connecting to your website or application, it is recommended that you update their [trust store](/ssl/concepts/#trust-store) to include the self-signed ISRG Root X1 chain to prevent impact.

## Background

Let’s Encrypt has been issuing RSA certificates through two chains: the self-signed ISRG Root X1 chain, and the ISRG Root X1 chain cross-signed by IdenTrust’s DST Root CA X3.

As explained in the [Let's Encrypt announcement](https://letsencrypt.org/2023/07/10/cross-sign-expiration), the cross-signed chain has allowed their certificates to be widely trusted, while the self-signed chain gradually developed compatibility with various devices.

As of late 2023, the number of Android devices trusting the self-signed ISRG Root X1 reached 93.9%, and Let's Encrypt has decided to drop the cross-signed chain.

## Other resources

- [Cloudflare CAs and certificates FAQ](/ssl/edge-certificates/troubleshooting/ca-faq/)
- [Let's Encrypt Chain of Trust](https://letsencrypt.org/certificates/)
