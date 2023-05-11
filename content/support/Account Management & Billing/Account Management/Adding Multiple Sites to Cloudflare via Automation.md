---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360000841472-Adding-Multiple-Sites-to-Cloudflare-via-Automation
title: Adding Multiple Sites to Cloudflare via Automation
---

# Adding Multiple Sites to Cloudflare via Automation

## Overview

If you need to add multiple sites (10+) to Cloudflare at once, you can do so via the Cloudflare API. Adding multiple sites can be useful when you:

{{<Aside type="note">}}
If you attempt to add more than 50 domains at a time, any additional
domains will be blocked until they are processed.
{{</Aside>}}

-   Have multiple domains mapping back to a single, canonical domain - e.g. domains in different countries (.com.au, .co.uk, etc) that you want to have protected by Cloudflare
-   Are an agency or IT consultancy, and manage multiple domains on behalf of your customers (note: you should consider the Cloudflare [Partner program](https://www.cloudflare.com/partners/))
-   You're moving an existing set of sites over to Cloudflare

Using the API will allow you to add multiple sites quickly & efficiently, especially if you are already familiar with [how to change your name-servers](/dns/zone-setups/full-setup/setup) or [add a DNS record](/dns/manage-dns-records/how-to/create-dns-records).

___

## Prerequisites

{{<Aside type="note">}}
You cannot have more pending sites than active sites associated with
your Cloudflare account. We recommend waiting until your pending sites
have been processed before adding additional domains.
{{</Aside>}}

To add multiple sites to Cloudflare via Automation, you'll need:

-   An existing account on Cloudflare ([sign up](https://www.cloudflare.com/a/signup) / [log-in](https://www.cloudflare.com/a/login)))
-   Basic familiarity with the command line
-   curl installed (by default on macOS & Linux)
-   Your Cloudflare [API key at hand](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
-   A list of domains you want to add, each on a separate line (newline separated) - e.g. "domains.txt"

___

## Add domains via the API

Cloudflare has a fully featured API ([documentation](https://api.cloudflare.com/)) that allows you to automate the creation of new domains, as well as configure DNS records, Page Rules and our many security settings. We'll be using this API to automate adding multiple domains at once.

Open your terminal application (e.g. Terminal, or Terminal.app) and set your API key & email:

```sh
$ export CF_API_EMAIL=you@example.com
$ export CF_API_KEY=abc123def456ghi789
```

Then, we'll write a simple for-loop that takes each domain name 

```sh
$ for domain in $(cat domains.txt); do \  curl -X POST -H "X-Auth-Key: $CF_API_KEY" -H "X-Auth-Email: $CF_API_EMAIL" \  -H "Content-Type: application/json" \  "https://api.cloudflare.com/client/v4/zones" \  --data '{"account": {"id": "id_of_that_account"}, "name":"'$domain'","jump_start":true}'; done
```

The "jump\_start" key will have Cloudflare automatically attempt to scan for common DNS records—e.g. "www", "mail", "blog" and many others—so that you don't have to configure them by hand (you should still confirm we found them all).  _id\_of\_that\_account_ is found on the Cloudflare **Overview** app under **Account ID**.

The API will return a response, including the [nameservers you'll need to change](https://support.cloudflare.com/hc/en-us/articles/206455647-How-do-I-change-my-domain-nameservers-) at your registrar (where you registered the domain).

```json
{ "result": { "id": "abc123def456ghi789", "name": "example.com", "status": "pending", "paused": false, "type": "full", "development_mode": 0, "name_servers": [ "chad.ns.cloudflare.com", "lucy.ns.cloudflare.com" ], "original_name_servers": [ "ns-cloud-e1.googledomains.com", "ns-cloud-e2.googledomains.com", "ns-cloud-e3.googledomains.com", "ns-cloud-e4.googledomains.com" ], "original_registrar": null, "original_dnshost": null, "modified_on": "2018-02-12T01:42:13.827149Z", "created_on": "2018-02-12T01:42:13.827149Z", "meta": { "step": 4, "wildcard_proxiable": false, "custom_certificate_quota": 0, "page_rule_quota": 3, "phishing_detected": false, "multiple_railguns_allowed": false }, "owner": { "id": "abc123def456ghi789", "type": "user", "email": "you@example.com" }, "account": { "id": "abc123def456ghi789", "name": "you@example.com" }, "permissions": [ "#access:edit", "#access:read", "#analytics:read", "#app:edit", "#billing:edit", "#billing:read", "#cache_purge:edit", "#dns_records:edit", "#dns_records:read", "#lb:edit", "#lb:read", "#logs:read", "#member:edit", "#member:read", "#organization:edit", "#organization:read", "#ssl:edit", "#ssl:read", "#subscription:edit", "#subscription:read", "#waf:edit", "#waf:read", "#worker:edit", "#worker:read", "#zone:edit", "#zone:read", "#zone_settings:edit", "#zone_settings:read" ], "plan": { "id": "0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "name": "Free Website", "price": 0, "currency": "USD", "frequency": "", "is_subscribed": true, "can_subscribe": false, "legacy_id": "free", "legacy_discount": false, "externally_managed": false } }, "success": true, "errors": [], "messages": []}
```

Note the "name\_servers" key in the response. These will be the same unique pair for all sites you add under your account - e.g.

```json
"name_servers": [
   "chad.ns.cloudflare.com",
   "lucy.ns.cloudflare.com"
 ]
```

Copy your values (not the ones above!) and [update the nameservers](https://support.cloudflare.com/hc/en-us/articles/206455647-How-do-I-change-my-domain-nameservers-) at your registrar.

___

## Add domains via flarectl (Cloudflare's CLI tool)

You can also add domains using flarectl, Cloudflare's official CLI. You can [download a pre-built](https://github.com/cloudflare/cloudflare-go/releases) package for your operating system (Windows, macOS/Darwin, Linux) and create domains using it.

You'll need to set your API credentials first:

```sh
$ export CF_API_EMAIL=you@example.comexport CF_API_KEY=abc123def456ghi789
```

... and then run the following command in flarectl:

```sh
$ for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done
```

After this, you can get the name-servers for each domain via "flarectl zone list":

```sh
$ for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done
```

Search for help or tips within the [Cloudflare Community](https://community.cloudflare.com/).

___

## Common issues

If any errors were returned in this process, the domain may not be registered (or only just registered), be a subdomain, or otherwise been invalid. The following articles cover the most common cases: 

-   [Why can't I add my domain to Cloudflare?](/dns/zone-setups/troubleshooting/cannot-add-domain/)
