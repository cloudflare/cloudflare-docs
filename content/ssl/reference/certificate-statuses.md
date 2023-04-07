---
pcx_content_type: reference
title: Certificate statuses
weight: 8
---

# Certificate statuses

Certificates statuses show which stage of the issuance process each certificate is in.

## New certificates

When you order a new certificate, either an [edge certificate](/ssl/edge-certificates/) or a certificate used for a [custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/), its status will move through various stages as it progresses to Cloudflare’s global network:

1.  Initializing
2.  Pending Validation
3.  Pending Issuance
4.  Pending Deployment
5.  Active

Once you issue a certificate, it should be in **Pending Validation**, but change to **Active** after the validation is completed. If you see any errors, you or your customer may need to take additional actions to validate the certificate.

If you deactivate a certificate, it will become a **Deactivating** and then an **Inactive** status.

## Custom certificates

If you are using a [custom certificate](/ssl/edge-certificates/custom-certificates/) and your [zone status](/dns/zone-setups/reference/domain-status/) is **Pending** or **Moved**, your certificate may have a status of **Holding Deployment**.

When your zone becomes active, your custom certificate will deploy automatically (also moving to an **Active** status).

If your zone is already active when you upload a custom certificate, you will not see this status.

## Staging certificates

When you create certificates in your [staging environment](/ssl/edge-certificates/staging-environment/), those staging certificates have their own set of statuses:

- **Staging deployment**: Similar to **Pending Deployment**, but for staging certificates.
- **Staging active**: Similar to **Active**, but for staging certificates.
- **Deactivating**: Your staging certificate is in the process of becoming **Inactive**.
- **Inactive**: Your staging certificate is not at the edge, but you can deploy it if needed.

## Client certificates

When you use [client certificates](/ssl/client-certificates/), those client certificates have their own set of statuses:

- **Active**: The client certificate is active.
- **Revoked**: The client certificate is revoked.
- **Pending Reactivation**: The client certificate was revoked, but it is being restored.
- **Pending Revocation**: The client certificate was active, but it is being revoked.

---

## Monitor certificate statuses

### SSL/TLS

Monitor a certificate's status in the dashboard at **SSL/TLS** > **Edge Certificates** or by using the [Get Certificate Pack endpoint](/api/operations/certificate-packs-get-certificate-pack).

For more details on certificate validation, refer to [Domain Control Validation](/ssl/edge-certificates/changing-dcv-method/).

### SSL for SaaS

Monitor a certificate's status in the dashboard at **SSL/TLS** > **Custom Hostnames** or by using the [Custom Hostname Details endpoint](/api/operations/custom-hostname-for-a-zone-custom-hostname-details).

For more details on certificate validation, refer to [Issue and validate certificates](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/).
