---
order: 3
---

# Determining a location

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

Gateway uses different ways to match a DNS query to [locations](/locations) depending on the type of request and network. This is how Gateway determines the location of a DNS query:

![Determine location](../static/gateway-determine-location-dns.png)

Here is a step by step flow of how Gateway determines the location for an incoming DNS query:

## Step 1: DNS over HTTPS check and lookup based on hostname

Check if the DNS query is using DNS over HTTPS. If yes, lookup location by the unique hostname. If not, go to step 2.

## Step 2: IPv4 check and lookup based on source IPv4 address

Check if the DNS query is sent over IPv4. If yes, lookup location by the source IPv4 address. If no, go to step 3.

## Step 3: Lookup based on IPv6

If the query is in this step, it means that the DNS query is using IPv6. Gateway will lookup the location associated with the DNS query based on the destination IPv6 address.
