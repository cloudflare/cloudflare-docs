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

{{<render file="_why-disable-dnssec.md">}}

</div>
</details>
