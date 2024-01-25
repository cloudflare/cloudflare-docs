---
pcx_content_type: get-started
title: Setup
weight: 2
meta:
    title: Set up apex proxying
---

# Set up apex proxying

To set up Cloudflare for SaaS for [apex proxying](/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/) - as opposed to the [normal setup](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) - perform the following steps.

---

{{<render file="_get-started-prereqs.md" withParameters="(this should be within the account associated with your IP prefixes).">}}

---

## Initial setup

{{<render file="_get-started-initial-setup-preamble.md">}}
<br/>

### Step 1 - Get IP range

With apex proxying, you can either [bring your own IP range](/byoip/) or use a set of IP addresses provided by Cloudflare.

For more details on this step, reach out to your account team.

{{<Aside type="warning">}}

These IP addresses are different than those associated with your Cloudflare zone.

{{</Aside>}}

### Step 2 - Create fallback origin

{{<render file="_get-started-fallback-origin.md" noMarkdown=true >}}

---

## Per-hostname setup

{{<render file="_get-started-per-hostname.md" noMarkdown=true >}}

### Step 3 - Have customer create DNS record

To finish the custom hostname setup, your customer can set up either an `A` or `CNAME` record at their authoritative DNS provider.

{{<Aside type="note">}}

If you want your customers to be able to use `CNAME` records, you will need to complete the [normal setup process](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/) as well.

{{</Aside>}}

#### `A` record

If your customer uses an `A` record at their authoritative DNS provider, they need to point their hostname to the IP prefixed allocated for your account.

{{<render file="_get-started-check-statuses.md">}}

Your customer's `A` record might look like the following:

```txt
example.com.  60  IN  A   192.0.2.1
```

#### `CNAME` record

If your customer uses a `CNAME` record at their authoritative DNS, they need to point their hostname to your [`CNAME` target](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#step-2-optional--create-cname-target) [^1].

{{<render file="_get-started-check-statuses.md">}}

Your customer's `CNAME` record might look like the following:

```txt
mystore.com CNAME customers.saasprovider.com
```

[^1]: {{<render file="_regional-services.md">}}

#### Service continuation

{{<render file="_get-started-service-continuation.md">}}