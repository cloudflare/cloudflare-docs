---
order: 7
pcx-content-type: reference
---

# Certificate statuses

Certificates move through the following stages as they progress to Cloudflare’s edge:

1.  Initializing
2.  Pending Validation
3.  Pending Issuance
4.  Pending Deployment
5.  Active

Once you issue a certificate, it should be in **Pending Validation**, but change to **Active** within five minutes. If you see any errors, you or your customer may need to take additional actions to validate the certificate.

## SSL/TLS

Monitor a certificate's status in the dashboard at **SSL/TLS** > **Edge Certificates** or by [using the API](https://api.cloudflare.com/#certificate-packs-get-certificate-pack).

For more details on certificate validation, refer to [Changing DCV method](/edge-certificates/changing-dcv-method).

## SSL for SaaS

Monitor a certificate's status in the dashboard at **SSL/TLS** > **Custom Hostnames** or by [using the API](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details).

For more details on certificate validation, refer to [Changing DCV method](/ssl-for-saas/common-tasks/certificate-validation-methods).
