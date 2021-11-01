---
order: 5
pcx-content-type: faq
---

# Troubleshooting

## Nameservers

If you see unexpected results when changing your nameservers, check the following:

### Is a **DS** record present at your registrar? 

You need to remove any **DS** records at your registrar to update your authoritative nameservers. This will disable DNSSEC and allow Cloudflare to resolve your domain name.

You can then [re-enable DNSSEC](/zone-setups/full-setup#re-enable-dnssec) at Cloudflare after you have changed your nameservers.

### Do the nameservers at your registrar exactly match the values provided by Cloudflare?

If the nameservers in your registrar do you exactly match those provided by Cloudflare, your domain will not resolve correctly.

### Are additional nameservers listed at your registrar?

You should have only Cloudflare nameservers listed at your registrar.

### Are you using a European registrar?

Certain European registrars have a different nameserver registration process. Contact [Cloudflare support](https://support.cloudflare.com/hc/articles/200172476) if you experience issues.