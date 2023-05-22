---
title: Configuring Cloudflare for SaaS
pcx_content_type: get-started
weight: 2
meta:
  description: Get started with Cloudflare for SaaS
---

# Configuring Cloudflare for SaaS

---

{{<render file="_get-started-prereqs.md">}}

---

## Initial setup

{{<render file="_get-started-initial-setup-preamble.md">}}
<br/>

### Step 1 — Create fallback origin

{{<render file="_get-started-fallback-origin.md">}}

### Step 2 (optional) — Create CNAME target

The `CNAME` target — optional, but highly encouraged — provides a friendly and more flexible place for customers to [route their traffic](#step-5--have-customer-create-a-cname-record). You may want to use a subdomain such as `customers.<SAAS_PROVIDER>.com`.

[Create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a proxied `CNAME` that points your `CNAME` target to your fallback origin (can be a wildcard such as `*.customers.saasprovider.com`).

{{<example>}}

| **Type** | **Name** | **IPv4 address** | **Proxy status** |
| -------- | -------- | ---------------- | ---------------- |
| `CNAME`       | `.customers` | `proxy-fallback.saasprovider.com` | Proxied       |

{{</example>}}

---

## Per-hostname setup

You need to perform the following steps for each custom hostname.

### Step 1 — Plan for validation

Before you create a hostname, you need to plan for:

1. [Certificate validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/): Upon successful validation, the certificates are deployed to Cloudflare’s global network.
2. [Hostname validation](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/): Upon successful validation, Cloudflare proxies traffic for this hostname.

You must complete both these steps for the hostname to work as expected.

{{<Aside type="warning" header="Important">}}

Depending on which method you select for each of these options, additional steps might be required for you and your customers.

{{</Aside>}}

### Step 2 — Create custom hostname

After planning for certification and hostname validation, you can create the custom hostname.

To create a custom hostname:

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_create-custom-hostname.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_create-custom-hostname-api.md">}}

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

{{<render file="_issue-certs-preamble.md">}}

{{</Aside>}}

### Step 3 — Have customer create CNAME record

To finish the custom hostname setup, your customer needs to set up a `CNAME` record at their authoritative DNS that points to [`CNAME` target](#step-2-optional--create-cname-target) [^1].

{{<Aside type="warning">}}

Before your customer does this step, confirm that the hostname's **Certificate status** and **Hostname status** are both **Active**. 

If not, confirm that you are using a method of [certificate](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/http/#http-automatic) or [hostnames](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/) validation that occurs after your customer adds their `CNAME` record.

{{</Aside>}}

Your customer's `CNAME` record might look like the following:

```txt
mystore.com CNAME customers.saasprovider.com
```

This record would route traffic in the following way:

```mermaid
flowchart TD
accTitle: How traffic routing works with a CNAME target
A[Request to <code>mystore.com</code>] --> B[<code>customers.saasprovider.com</code>]
B --> C[<code>proxy-fallback.saasprovider.com</code>]
```
<br/>

Requests to `mystore.com` would go to your `CNAME` target (`customers.saasprovider.com`), which would then route to your fallback origin (`proxy-fallback.saasprovider.com`).

[^1]: If you have [regional services](/data-localization/regional-services/) set up for your custom hostnames, Cloudflare always uses the processing region associated with your CNAME target record (instead of the processing region of any [custom origins](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/custom-origin/)).

#### Service continuation

If your customer is also using Cloudflare for their domain, they should keep their `CNAME` record in place for as long as they want to use your service.

For more details, refer to [Remove custom hostnames](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/remove-custom-hostnames/).