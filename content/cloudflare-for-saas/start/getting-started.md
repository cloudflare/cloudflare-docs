---
title: Configuration
pcx-content-type: get-started
weight: 1
---

# Configuration

---

## Prerequisites

Before you can start creating custom hostnames, you need to have access to [Cloudflare for SaaS](/cloudflare-for-saas/#availability).

If you have not used the Cloudflare API previously, review our [API Quickstart](/api/).

If there are multiple proxied DNS records for one zone, Cloudflare must prioritize which record controls the zone settings and associated origin server. Adding a new custom hostname may take priority over your current settings or cause your settings to no longer apply. To prevent overriding or voiding your settings, review [Hostname priority (Cloudflare for SaaS)](/ssl/ssl-tls/certificate-and-hostname-priority/#hostname-priority-ssl-for-saas)
 
---

## Step 1 — Create fallback origin and CNAME target

The fallback origin is where Cloudflare will route traffic sent to your custom hostnames (must be proxied).

{{<Aside type="note">}}

You can also [use a Worker as your origin](/cloudflare-for-saas/ssl/reference/worker-as-origin/) or [create a custom origin server](/cloudflare-for-saas/start/advanced-settings/custom-origin/) to send traffic from one or more custom hostnames somewhere besides your default proxy fallback.

{{</Aside>}}

The CNAME target — optional, but highly encouraged — provides a friendly and more flexible place for customers to [route their traffic](#step-5--have-customer-create-a-cname-record).

We suggest using a domain other than your main company domain (example.cloud instead of example.com) to lower risk and add flexibility to your custom hostname management.

1.  Create a [new application](/fundamentals/get-started/setup/add-site/) and select the **Free** plan.

2. [Create two DNS records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records).

  *   A proxied *A* or *AAAA* record pointing to the IP address of your **fallback origin** (where Cloudflare will send custom hostname traffic).
  *   A *CNAME* record that points your **CNAME target** to your fallback origin (can be a wildcard such as `*.customers.saasprovider.com`).

  | Record          | Type  | Name                              | Content                           |
  | --------------- | ----- | --------------------------------- | --------------------------------- |
  | Fallback origin | A     | `proxy-fallback.saasprovider.com` | 192.0.2.1                         |
  | CNAME target    | CNAME | `*.customers.saasprovider.com`    | `proxy-fallback.saasprovider.com` |

4.  Enable **Custom Hostnames** for your zone:

    - If you are an Enterprise customer, upgrade your zone to an Enterprise plan and contact your Customer Success Manager to enable **Cloudflare for SaaS Certificates**.
    - If you are not an Enterprise customer, go to **SSL/TLS** > **Custom Hostnames** to enable **Cloudflare for SaaS**.

5.  Set the **Fallback Origin** via either the dashboard or API.

<details>
<summary>Using the dashboard</summary>
<div>

1.  Navigate to **SSL/TLS** > **Custom Hostnames**.
2.  In the **Custom Hostnames** card, enter the hostname for your fallback origin.
3.  Click **Add**.

</div>
</details>

<details>
<summary>Using the API</summary>
<div>

Using the hostname from the A or AAAA record you just created, [update the fallback origin value](https://api.cloudflare.com/#custom-hostname-fallback-origin-for-a-zone-update-fallback-origin-for-custom-hostnames).

</div>
</details>

---

## Step 2 — Review validation and verification options

Each Custom Hostname requires successful Certificate Validation and Hostname Verification.

- [Certificate Validation](/cloudflare-for-saas/ssl/common-tasks/issue-and-validate/): Upon successful validation, the certificates are deployed to Cloudflare’s edge network.
- [Hostname Verification](/cloudflare-for-saas/domain-support/hostname-verification/): Upon successful validation, Cloudflare proxies traffic for this hostname.

{{<Aside type="note">}}

Verification checks occur frequently immediately after a hostname is created, but the gaps between check intervals increase over the following seven days. For more detail, refer to [Hostname verification backoff schedule](/cloudflare-for-saas/ssl/reference/hostname-verification-backoff-schedule/).

{{</Aside>}}

Depending on which method you select for each of these options, additional steps might be required for you and your customers.

{{<Aside type="warning">}}
You can no longer use HTTP based validation for Wildcard certificates according to the Certificate Authority Browser Forum.
{{</Aside>}}

---

## Step 3 — Issue certificate

Once your account has been provisioned, you are ready to issue certificates.

{{<render file="_issue-certs-preamble.md">}}

<details>
<summary>Using the dashboard</summary>
<div>

{{<render file="_create-custom-hostname.md">}}

</div>
</details>

<details>
<summary>Using the API</summary>
<div>

{{<render file="_create-custom-hostname-api.md">}}

</div>
</details>

---

## Step 4 — Monitor and view certificates

Once you issue certificates, Cloudflare will initiate the domain validation process using the method you specified.

With a CNAME in place, the entire process — from validation to issuance to edge deployment — completes in approximately 90 seconds.

### Monitor certificate status

For help tracking a certificate's status, refer to [Monitor certificates](/cloudflare-for-saas/ssl/common-tasks/issue-and-validate/).

### View certificates

Once domain validation has been completed, the certificates will be issued and distributed to Cloudflare’s edge.

To view these certificates, use `openssl` or your browser. The command below can be used in advance of your customer pointing the `app.example.com` hostname to the edge ([provided validation was completed](/cloudflare-for-saas/ssl/common-tasks/issue-and-validate/)).

```sh
$ openssl s_client -servername app.example.com -connect $CNAME_TARGET:443 </dev/null 2>/dev/null | openssl x509 -noout -text | grep app.example.com
```

---

## Step 5 — Have customer create a CNAME record

Your customer needs to set up a CNAME record at their DNS provider that points to your [CNAME target](#step-1--create-fallback-origin-and-cname-target). For an existing site, ensure your custom hostname and certificate are verified and valid prior to completing this step. Shifting traffic before the certificate has been issued may cause an insecurity in your domain.

For example:

```txt
app CNAME john.customers.saasprovider.com
```

This routes traffic from `app.customer.com` to your origin.

---

## Step 6 — Offboard custom hostnames

As a SaaS provider, you must remove a customer's custom hostname from your zone if they decide to churn. This is especially important if your end customers are using Cloudflare because if the custom hostname changes the DNS target to point away from your SaaS zone, the custom hostname will continue to route to your service. This is a result of the [custom hostname priority logic](/ssl/ssl-tls/certificate-and-hostname-priority/#hostname-priority-ssl-for-saas).

### Delete custom hostname

<details>
<summary>Using the dashboard</summary>
<div>

{{<render file="_delete-custom-hostname-dash.md">}}

</div>
</details>

<details>
<summary>Using the API</summary>
<div>

To delete a custom hostname and any issued certificates using the API, use a [DELETE command](https://api.cloudflare.com/#custom-hostname-for-a-zone-delete-custom-hostname-and-any-issued-ssl-certificates-) on the `DELETE zones/:zone_identifier/custom_hostnames/:identifier` endpoint.

</div>
</details>