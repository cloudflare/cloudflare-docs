---
_build:
  publishResources: false
  render: never
  list: never
---

Cloudflare Registrar offers one-click DNSSEC activation for free to all customers:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Domain Registration** > **Manage Domains**.
3. Find the domain you where you want to activate DNSSEC and select **Manage**.
4. Select **Configuration** > **Enable DNSSEC**. If DNSSEC was previously activated, select **Disable DNSSEC** to disable it.

Cloudflare publishes delegation signer (DS) records in the form of [CDS and CDNSKEY records](https://www.cloudflare.com/learning/dns/dns-security/) for a domain delegated to Cloudflare. Cloudflare Registrar scans those records at regular intervals, and gathers those details and sends them to your domain's registry.

This process can take one to two days after you first enable DNSSEC.