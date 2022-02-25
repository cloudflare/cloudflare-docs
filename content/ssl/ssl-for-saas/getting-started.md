---
title: Get started
pcx-content-type: get-started
weight: 1
meta:
  title: Get started with SSL for SaaS
---

import IssueCertsPreamble from "../\_partials/\_issue-certs-preamble.md"
import CreateCustomHostname from "../\_partials/\_create-custom-hostname.md"
import CreateCustomHostnameAPI from "../\_partials/\_create-custom-hostname-api.md"

# Get started with SSL for SaaS

***

## Prerequisites

Before you can start creating custom hostnames, you need to have access to [SSL for SaaS](/ssl/ssl-for-saas/#availability).

If you have not used the Cloudflare API previously, review our [API Quickstart](/api/).

***

## Step 1 — Create fallback origin and CNAME target

The fallback origin is where Cloudflare will route traffic sent to your custom hostnames (must be proxied).

The CNAME target — optional, but highly encouraged — provides a friendly and more flexible place for customers to [route their traffic](#step-5--have-customer-create-a-cname-record).

1.  Create a [new application](https://support.cloudflare.com/hc/articles/201720164) and select the **Free** plan.

2.  Navigate to **DNS**.

3.  Create two DNS records:

    *   A proxied *A* or *AAAA* record pointing to the IP address of your **fallback origin** (where Cloudflare will send custom hostname traffic).
    *   A *CNAME* record that points your **CNAME target** to your fallback origin (can be a wildcard such as `*.customers.saasprovider.com`).

     <Example>

    Record|Type|Name|Content
    \-----|-------|-------|-----
    Fallback origin|A|`proxy-fallback.saasprovider.com`|192.0.2.1
    CNAME target|CNAME|`*.customers.saasprovider.com`|`proxy-fallback.saasprovider.com`

     </Example>

4.  Enable **Custom Hostnames** for your zone:

    *   If you are an Enterprise customer, upgrade your zone to an Enterprise plan and contact your Customer Success Manager to enable **SSL for SaaS Certificates**.
    *   If you are not an Enterprise customer, go to **SSL/TLS** > **Custom Hostnames** to enable **Cloudflare for SaaS**.

5.  Set the **Fallback Origin** via either the dashboard or API.
    *   **Dashboard**:

        1.  Navigate to **SSL/TLS** > **Custom Hostnames**.
        2.  In the **Custom Hostnames** card, enter the hostname for your fallback origin.
        3.  Click **Add**.

    *   **API**: Using the hostname from the A or AAAA record you just created, [update the fallback origin value](https://api.cloudflare.com/#custom-hostname-fallback-origin-for-a-zone-update-fallback-origin-for-custom-hostnames).

***

## Step 2 — Review validation and verification options

Each Custom Hostname requires successful Certificate Validation and Hostname Verification.

*   [Certificate Validation](/ssl/ssl-for-saas/common-tasks/certificate-validation-methods/): Upon successful validation, the certificates are deployed to Cloudflare’s edge network.
*   [Hostname Verification](/ssl/ssl-for-saas/common-tasks/hostname-verification/): Upon successful validation, Cloudflare proxies traffic for this hostname.

Depending on which method you select for each of these options, additional steps might be required for you and your customers.

***

## Step 3 — Issue certificate

Once your account has been provisioned, you are ready to issue certificates.

<IssueCertsPreamble/>

<details>
<summary>Using the dashboard</summary>
<div>

<CreateCustomHostname/>

</div>
</details>

<details>
<summary>Using the API</summary>
<div>

<CreateCustomHostnameAPI/>

</div>
</details>

***

## Step 4 — Monitor and view certificates

Once you issue certificates, Cloudflare will initiate the domain validation process using the method you specified.

With a CNAME in place, the entire process — from validation to issuance to edge deployment — completes in approximately 90 seconds.

### Monitor certificate status

For help tracking a certificate's status, refer to [Monitor certificates](/ssl/ssl-for-saas/common-tasks/issuing-certificates/).

### View certificates

Once domain validation has been completed, the certificates will be issued and distributed to Cloudflare’s edge.

To view these certificates, use `openssl` or your browser. The command below can be used in advance of your customer pointing the `app.example.com` hostname to the edge ([provided validation was completed](/ssl/ssl-for-saas/common-tasks/certificate-validation-methods/)).

```sh
$ openssl s_client -servername app.example.com -connect $CNAME_TARGET:443 </dev/null 2>/dev/null | openssl x509 -noout -text | grep app.example.com
```

***

## Step 5 — Have customer create a CNAME record

Your customer needs to set up a CNAME record at their DNS provider that points to your [CNAME target](#step-1--create-fallback-origin-and-cname-target).

For example:

```txt
app CNAME john.customers.saasprovider.com
```

This routes traffic from `app.customer.com` to your origin.
