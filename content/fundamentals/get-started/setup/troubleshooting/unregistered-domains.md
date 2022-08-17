---
pcx_content_type: reference
title: Unregistered domains
weight: 1
---

# Unregistered domains

When you [add a new domain](/fundamentals/get-started/setup/add-site/) to Cloudflare, you might experience `not a registered domain` errors.

This means that Cloudflare does not recognize your domain as being registered with a domain registrar.

## No existing domain

If the domain is actually unregistered — meaning that no one owns it — you can purchase that domain name through [Cloudflare Registrar](/registrar/get-started/register-domain/).

## Existing domain

If you have already own your domain but Cloudflare does not recognize your domain as registered:

- **Wait and retry**: If you purchased your domain within the past few hours, you may need to wait a few hours and try again.
- **Verify DNS records**: Before a domain can be added to Cloudflare, it must return a valid `SOA` record and `NS` records for valid, working nameservers. These records can be checked by third-party online tools such as https://www.whatsmydns.net/ or via a command-line terminal using a [`dig` command](https://en.wikipedia.org/wiki/Dig_(command)).

{{<Aside type="note">}}

If you add Cloudflare's nameservers at your registrar **before** [adding that domain](/fundamentals/get-started/setup/add-site/) to Cloudflare, your `NS` records will be considered invalid.

You need to add your domain to Cloudflare first, and only then add our nameservers at your registrar.
  
If you've already changed your nameservers to Cloudflare's and are now getting this error, resetting them to your registrar's default ones, waiting for a few hours, and then [adding that domain](/fundamentals/get-started/setup/add-site/) should work.

{{</Aside>}}

### .gov domain

Due to the technical limitation, if you have a `.gov` domain which has been approved by DotGov, contact [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) to add the domain to your account.
