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

{{<render file="_get-started-prereqs.md">}}

---

## Initial setup

{{<render file="_get-started-initial-setup-preamble.md">}}
<br/>

### Step 1 - Get IP range

With apex proxying, you can either [bring your own IP range](/byoip/) or use a set of IP addresses provided by Cloudflare.

For more details on this step, reach out to your account team.

### Step 2 - Create fallback origin

{{<render file="_get-started-fallback-origin.md" noMarkdown=true >}}

---

## Per-hostname setup

{{<render file="_get-started-per-hostname.md" noMarkdown=true >}}

### Step 3 - Have customer create A record

To finish the custom hostname setup, your customer needs to set up an `A` record at their authoritative DNS that points their hostname to the IP prefixed allocated for your account.

{{<render file="_get-started-check-statuses.md">}}

Your customer's `A` record might look like the following:

```txt
example.com.  60  IN  A   192.0.2.1
```

#### Service continuation

{{<render file="_get-started-service-continuation.md">}}