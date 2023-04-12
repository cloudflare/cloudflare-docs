---
title: Zone holds
pcx_content_type: how-to
weight: 6
---

# Zone holds

Zone holds prevent other teams in your organization from adding zones that are already active in another account.

For example, you might already have an active Cloudflare zone for `example.com`. If another team does not realize this, they could add and activate `example.com` in another Cloudflare account, which may cause downtimes or security issues until the original zone could be re-activated.

## Availability

{{<feature-table id="account.zone_holds">}}

## Enable zone holds

When you enable a zone hold, no one else can [add your zone](/fundamentals/get-started/setup/add-site/) to their Cloudflare account. If they attempt to, they will receive the following message:

_The zone name provided is subject to a hold which disallows the creation of this zone. Please contact the domain owner to have this hold removed._

To enable a zone hold:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. On the zone homepage, go to **Quick Actions**.
4. For **Zone Hold**, switch the toggle to **On**.

You also have the option to **Also prevent subdomains**, which prevents anyone in your organization from creating subdomains or custom hostnames related to your zone.

## Release zone holds

You may want to temporarily release a zone hold to allow another team to [register a subdomain](/dns/zone-setups/subdomain-setup/) in a separate Cloudflare account, such as `docs.example.com`.

To release a zone hold:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. On the zone homepage, go to **Quick Actions**.
4. For **Zone Hold**, switch the toggle to **Off**.
5. Choose the length of your release.
6. Select **Release hold**.