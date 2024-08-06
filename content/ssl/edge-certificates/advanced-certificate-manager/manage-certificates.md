---
pcx_content_type: how-to
title: Manage advanced certificates
weight: 1
meta:
    description: Learn how to create, delete and perform other operations to manage your Cloudflare Advanced SSL certificates.
---

# Manage advanced certificates

## Create a certificate

If you are using an existing [Universal SSL certificate](/ssl/edge-certificates/universal-ssl/), Cloudflare will automatically replace this certificate once you finish ordering your advanced certificate.

Once you order a certificate, you can review the [certificate's status](/ssl/reference/certificate-statuses/) in the dashboard at **SSL/TLS** > **Edge Certificates** or via the API with a [GET request](/api/operations/certificate-packs-list-certificate-packs).

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To create a new advanced certificate in the dashboard:

1.  Log in to your Cloudflare account and select a domain.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  Select **Order Advanced Certificate**.
4.  If Cloudflare does not have your billing information, you will need to enter that information.
5.  Enter the following information:
    - Certificate Authority
    - Certificate Hostnames
    - Validation method
    - Certificate Validity Period
6.  Select **Save**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To create a new certificate using the API, send a [POST request](/api/operations/certificate-packs-order-advanced-certificate-manager-certificate-pack) to the Cloudflare API.
 
{{</tab>}}
{{</tabs>}}

{{<Aside type="warning">}}

{{<render file="_acm-ca-hostnames-conditions.md">}}

{{</Aside>}}

---

## Delete a certificate

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To delete an advanced certificate in the dashboard:

1.  Log in to your Cloudflare account and select a domain.
2.  Select **SSL/TLS** > **Edge Certificates**.
3.  Select a certificate.
4.  Select **Delete Certificate**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To delete a certificate using the API, send a [DELETE request](/api/operations/certificate-packs-delete-advanced-certificate-manager-certificate-pack) to the Cloudflare API.
 
{{</tab>}}
{{</tabs>}}

---

## Restart validation

To restart validation for a certificate in a `validation_timed_out` status, send a [PATCH request](/api/operations/certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack) to the API.

---

## Restrict cipher suites

{{<render file="_cipher-suites-definition.md">}}

For more details, refer to [Disable cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/).

---

## Perform domain control validation (DCV)

{{<render file="_dcv-definition.md">}}
<br/>

Normally, you only need to update DCV if you have your application on a partial setup (Cloudflare does not run your authoritative nameservers).

For more information about DCV, refer to [DCV methods](/ssl/edge-certificates/changing-dcv-method/).

{{<Aside type="warning">}}

Due to recent changes, HTTP DCV validation will soon not be allowed for wildcard certificates or certificates with multiple Subject Alternative Names (SANs). For more details and next steps, refer to [Changes to HTTP DCV](/ssl/reference/migration-guides/dcv-update/).

{{</Aside>}}

---

## Set up alerts

You can configure alerts to receive notifications for changes in your certificates.

{{<available-notifications product="SSL/TLS" notificationName="Advanced Certificate Alert">}}

{{<render file="_get-started.md" productFolder="notifications" >}}