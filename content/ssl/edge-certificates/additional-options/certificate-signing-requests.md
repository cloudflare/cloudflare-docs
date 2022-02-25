---
order: 10
pcx-content-type: how-to
---

import CSRDefinition from "../../\_partials/\_csr-definition.md"

# Certificate Signing Requests (CSRs)

<CSRDefinition/>

A CSR contains information about your domain: your organization name and address, the common name (domain name), and Subject Alternative Names (SANs).

<Aside type="note">

At the moment, CSRs are only available to Enterprise customers who have purchased an account-level subscription for [Advanced Certificate Manager](/edge-certificates/advanced-certificate-manager).

</Aside>

## Types of CSRs

You can create two types of CSRs:

*   **Zone-level**: Meant only for sign certificates associated with the current zone.
*   **Account-level**: Meant for organizations that issue certificates across multiple domains.

## Create and use a CSR

To create a CSR:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and an application.
2.  Navigate to **SSL/TLS** > **Edge Certificates**.
3.  On **Certificate Signing Request (CSR)**, click **Generate**.
4.  Choose a **Scope** (only [certain customers](#types-of-csrs) can choose **Account**.
5.  Enter relevant information on the form and click **Create**.

To use a CSR:

1.  Navigate to **SSL/TLS** > **Edge Certificates**.
2.  On **Certificate Signing Request (CSR)**, select the record you just created.
3.  Copy (or click **Click to copy**) the value for **Certificate Signing Request**.
4.  Obtain a certificate from the Certificate Authority (CA) of your choice using your CSR.
5.  When you [upload the custom certificate](/edge-certificates/custom-certificates/uploading) to Cloudflare, select an **Encoding mode** of **Certificate Signing Request (CSR)** and enter the associated value.

     <Aside type="note">

    You will not see the option to adjust your **Encoding Mode** until after you have created a CSR associated with the specific zone or your account.

     </Aside>
