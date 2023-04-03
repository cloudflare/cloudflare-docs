---
pcx_content_type: how-to
title: Certificate Signing Requests (CSRs)
weight: 11
---

# Certificate Signing Requests (CSRs)

{{<render file="_csr-definition.md">}} 

## Availability

{{<feature-table id="ssl.csr">}}

## Types of CSRs

You can create two types of CSRs:

- **Zone-level**: Meant only for sign certificates associated with the current zone.
- **Account-level**: Meant for organizations that issue certificates across multiple domains.

## Create and use a CSR

To create a CSR:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and an application.
2.  Go to **SSL/TLS** > **Edge Certificates**.
3.  On **Certificate Signing Request (CSR)**, select **Generate**.
4.  Choose a **Scope** (only [certain customers](#types-of-csrs) can choose **Account**).
5.  Enter relevant information on the form and select **Create**.

To use a CSR:

1.  Go to **SSL/TLS** > **Edge Certificates**.
2.  On **Certificate Signing Request (CSR)**, select the record you just created.
3.  Copy (or select **Click to copy**) the value for **Certificate Signing Request**.
4.  Obtain a certificate from the Certificate Authority (CA) of your choice using your CSR.
5.  When you [upload the custom certificate](/ssl/edge-certificates/custom-certificates/uploading/) to Cloudflare, select an **Encoding mode** of **Certificate Signing Request (CSR)** and enter the associated value.

     {{<Aside type="note">}}You will not see the option to adjust your **Encoding Mode** until after you have created a CSR associated with the specific zone or your account.
     {{</Aside>}}

## Renew a certificate

When you [renew a custom certificate](/ssl/edge-certificates/custom-certificates/renewing/), you can reuse a previously generated CSR.
