---
title: Nameservers
pcx_content_type: troubleshooting
weight: 1
meta:
  title: Troubleshooting zone setups - Nameservers
---

# Nameservers

If you see unexpected results when [changing your nameservers](/dns/zone-setups/full-setup/setup/), review the following troubleshooting questions.

## Is a DS record present at your registrar?

You need to remove any pre-Cloudflare **DS** records at your registrar to update your authoritative nameservers. This will disable DNSSEC and allow Cloudflare to resolve your domain name.

You can then [re-enable DNSSEC](/dns/zone-setups/full-setup/setup/#re-enable-dnssec) in Cloudflare and at your registrar after you have changed your nameservers.

## Do the nameservers at your registrar exactly match the values provided by Cloudflare?

If the nameservers in your registrar do not exactly match those provided by Cloudflare, your domain will not resolve correctly.

## Are additional nameservers listed at your registrar?

If so, you should remove these nameservers.

You should have only Cloudflare nameservers listed at your registrar.

## Have you waited longer than 24 hours?

For some registrars, you will need to wait up to 24 hours for updates to your nameservers.
