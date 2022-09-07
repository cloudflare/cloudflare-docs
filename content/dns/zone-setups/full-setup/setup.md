---
title: Setup
pcx_content_type: tutorial
weight: 1
meta:
  title: Change your authoritative nameservers (Full setup)
---

# Change your authoritative nameservers (Full setup)

{{<render file="_full-setup-definition.md">}}

## Step 1 — Do you already own a domain?

<details>
<summary>Yes</summary>
<div>

If you already own a domain and want to use Cloudflare for your authoritative DNS, proceed with this tutorial.

</div>
</details>

<details>
<summary>No</summary>
<div>

If you do not already own a domain name and plan to use Cloudflare for your authoritative DNS, we highly recommend purchasing your domain name through [Cloudflare Registrar](/registrar/get-started/register-domain/).

Using Cloudflare Registrar simplifies your setup process by automatically using Cloudflare for authoritative DNS.

</div>
</details>

## Step 2 — Complete prerequisites

### Create an account

Before you can complete your domain setup, you need to create an account and [add your domain](/fundamentals/get-started/setup/add-site/) to Cloudflare.

### Disable DNSSEC

If you are onboarding an existing domain to Cloudflare — as opposed to purchasing a new domain through [Cloudflare Registrar](/registrar/) — make sure DNSSEC **is disabled** at your registrar (where you purchased your domain name). Otherwise, your domain will experience connectivity errors when you change your nameservers.

<details>
<summary>Why do I have to disable DNSSEC</summary>
<div>

When your domain has [DNSSEC enabled](https://www.cloudflare.com/learning/dns/dns-security/#what-is-dnssec), your DNS provider digitally signs all your DNS records. This action prevents anyone else from issuing false DNS records on your behalf and redirecting traffic intended for your domain.

However, having a single set of signed records also prevents Cloudflare from issuing new DNS records on your behalf (which is part of using Cloudflare for your authoritative nameservers). So if you change your nameservers without disabling DNSSEC, DNSSEC will prevent Cloudflare's DNS records from resolving properly.

</div>
</details>

### Review DNS records in Cloudflare

When you start using Cloudflare's nameservers for authoritative DNS, Cloudflare will become your primary DNS provider. This means that your DNS records in Cloudflare need to be accurate for your domain to work properly.

If you [added your domain](/fundamentals/get-started/setup/add-site/) to Cloudflare, Cloudflare automatically scans for common records and adds them to your account’s DNS page.

{{<render file="_dns-scan-procedure.md">}}

## Step 3 — Update your nameservers

{{<render file="_update-nameservers.md">}}

## Step 4 — Re-enable DNSSEC using Cloudflare

When you updated your nameservers, you should have also disabled DNSSEC at your registrar.

You should now [enable DNSSEC](/dns/additional-options/dnssec/) within Cloudflare to protect from domain spoofing.