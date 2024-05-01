---
title: Setup
pcx_content_type: tutorial
weight: 1
meta:
  title: Change your nameservers (Full setup)
---

# Change your nameservers (Full setup)

{{<render file="_full-setup-definition.md">}}

{{<tutorial>}}

{{<tutorial-prereqs>}}

Before you update your domain nameservers, make sure that you:

- Already own a domain name (such as `example.com` or `cloudflare.com`).

{{<Aside type="note">}}

If you do not already have a [domain name](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/), get one at-cost through [Cloudflare Registrar](https://dash.cloudflare.com/?to=/:account/domains/register).

All domains purchased through Cloudflare Registrar automatically use Cloudflare for authoritative DNS, which means you can skip the rest of this tutorial.

{{</Aside>}}

- Have previously created a [Cloudflare account](/fundamentals/setup/account/create-account/).
- Disabled [DNSSEC](/dns/concepts/#dnssec) at your registrar (where you bought your domain name).

{{<render file="_dnssec-providers.md">}}

{{<render file="_dnssec-enabled-migration.md">}}

{{</tutorial-prereqs>}}

{{<tutorial-step title="Add site to Cloudflare">}}

In the Cloudflare dashboard, [add your domain](/fundamentals/setup/manage-domains/add-site/).

{{</tutorial-step>}}

{{<tutorial-step title="Review DNS records">}}

When you start using Cloudflare's nameservers for authoritative DNS and your zone is in a full setup, Cloudflare will become your primary DNS provider. This means that your DNS records in Cloudflare need to be accurate for your domain to work properly.

{{<render file="_dns-scan-intro.md">}} <br />

{{<render file="_dns-scan-note.md">}}

{{<render file="_dns-scan-procedure.md">}}

{{<render file="_dns-nxdomain-warning.md">}}

{{</tutorial-step>}}

{{<tutorial-step title="Update your nameservers">}}

{{<render file="_nameserver-preamble.md">}}

{{<render file="_minimize-downtime-tip.md">}}

### Get nameserver names

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. On **Overview**, locate the nameserver names in **2. Replace with Cloudflare's nameservers**.

    ![Find nameserver names on the Overview page of your domain](/images/dns/nameserver-names.png)

<br/>
3. Keep this window open while you perform the next step.

{{<Aside type="note">}}
Cloudflare automatically assigns nameservers to a domain and these assignments cannot be changed. For more details, refer to [Nameserver assignments](/dns/zone-setups/reference/nameserver-assignment/).
{{</Aside>}}

### Update your registrar

1. Log in to the admin account for your domain registrar. If you do not know your provider, use [ICANN Lookup](https://lookup.icann.org/).

{{<Aside type="note">}}
Depending on your use case, you may have to perform this step on the DNS records management of your domain parent zone, or at a domain reseller, instead. Refer to [Nameservers](/dns/nameservers/update-nameservers/#specific-processes) for details.
{{</Aside>}}

2. Remove your existing authoritative nameservers.

3. Add the nameservers provided by Cloudflare. If their names are not **copied exactly**, your DNS will not resolve correctly.

{{<render file="_ns-update-providers.md">}}

{{<Aside type="note">}}

To avoid common issues, refer to our [Nameserver replacement checklist](/dns/zone-setups/full-setup/troubleshooting/).

{{</Aside>}}

### Verify changes

Wait up to 24 hours while your registrar updates your nameservers.

When your domain is **Active**:

- You will receive an email from Cloudflare.
- Your domain will have a [status](/dns/zone-setups/reference/domain-status/) of **Active** on the **Websites** page of your account.
- Online tools such as https://www.whatsmydns.net/ will show your Cloudflare-assigned nameservers (most of these tools use cached query results, so it may take longer for them to show the updated nameservers).
- CLI commands will show your Cloudflare-assigned nameservers

```txt
*Linux/Unix*
dig <DOMAIN_NAME> +trace @1.1.1.1
dig <DOMAIN_NAME> +trace @8.8.8.8

*Windows*
nslookup <DOMAIN_NAME> 1.1.1.1
nslookup <DOMAIN_NAME> 8.8.8.8
```

{{<Aside type="note">}}

If you see unexpected results, refer to our [troubleshooting suggestions](/dns/zone-setups/full-setup/troubleshooting/) and check with your domain registrar.

{{</Aside>}}

{{</tutorial-step>}}

{{<tutorial-step title="Re-enable DNSSEC">}}

When you updated your nameservers, you should have also disabled DNSSEC at your registrar.

You should now [enable DNSSEC](/dns/dnssec/) to protect from domain spoofing.

{{</tutorial-step>}}

{{</tutorial>}}
