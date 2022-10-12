---
_build:
  publishResources: false
  render: never
  list: never
---

If you are onboarding an existing domain to Cloudflare, make sure DNSSEC **is disabled** at your registrar (where you purchased your domain name). Otherwise, your domain will experience connectivity errors when you change your nameservers.

{{<render file="_dnssec-providers.md">}}

<details>
<summary>Why do I have to disable DNSSEC</summary>
<div>

When your domain has [DNSSEC enabled](https://www.cloudflare.com/learning/dns/dns-security/#what-is-dnssec), your DNS provider digitally signs all your DNS records. This action prevents anyone else from issuing false DNS records on your behalf and redirecting traffic intended for your domain.

However, having a single set of signed records also prevents Cloudflare from issuing new DNS records on your behalf (which is part of using Cloudflare for your authoritative nameservers). So if you change your nameservers without disabling DNSSEC, DNSSEC will prevent Cloudflare's DNS records from resolving properly.

</div>
</details>
