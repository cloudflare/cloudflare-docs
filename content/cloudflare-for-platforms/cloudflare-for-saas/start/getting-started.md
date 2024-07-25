---
title: Configuring Cloudflare for SaaS
pcx_content_type: get-started
weight: 2
meta:
  description: Get started with Cloudflare for SaaS
---

# Configuring Cloudflare for SaaS

---

{{<render file="_get-started-prereqs.md" withParameters="on a **Free** plan.">}}

---

## Initial setup

{{<render file="_get-started-initial-setup-preamble.md">}}
<br/>

### Step 1 — Create fallback origin

{{<render file="_get-started-fallback-origin.md" noMarkdown=true >}}

### Step 2 (optional) — Create CNAME target

The `CNAME` target — optional, but highly encouraged — provides a friendly and more flexible place for customers to [route their traffic](#step-3--have-customer-create-cname-record). You may want to use a subdomain such as `customers.<SAAS_PROVIDER>.com`.

[Create](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) a proxied `CNAME` that points your `CNAME` target to your fallback origin (can be a wildcard such as `*.customers.saasprovider.com`).

{{<example>}}

| **Type** | **Name** | **IPv4 address** | **Proxy status** |
| -------- | -------- | ---------------- | ---------------- |
| `CNAME`       | `.customers` | `proxy-fallback.saasprovider.com` | Proxied       |

{{</example>}}

---

## Per-hostname setup

{{<render file="_get-started-per-hostname.md" noMarkdown=true >}}

### Step 3 — Have customer create CNAME record

To finish the custom hostname setup, your customer needs to set up a `CNAME` record at their authoritative DNS that points to your [`CNAME` target](#step-2-optional--create-cname-target) [^1].

{{<render file="_get-started-check-statuses.md">}}

Your customer's `CNAME` record might look like the following:

```txt
www.mystore.com CNAME customers.saasprovider.com
```

This record would route traffic in the following way:

```mermaid
flowchart TD
accTitle: How traffic routing works with a CNAME target
A[Request to <code>www.mystore.com</code>] --> B[<code>customers.saasprovider.com</code>]
B --> C[<code>proxy-fallback.saasprovider.com</code>]
```
<br/>

Requests to `www.mystore.com` would go to your `CNAME` target (`customers.saasprovider.com`), which would then route to your fallback origin (`proxy-fallback.saasprovider.com`).

[^1]: {{<render file="_regional-services.md">}}

#### Service continuation

{{<render file="_get-started-service-continuation.md">}}
