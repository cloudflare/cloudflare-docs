---
pcx_content_type: tutorial
title: Setup
weight: 2
meta:
   title: Set up outgoing zone transfers (Cloudflare as Primary)
---

# Set up outgoing zone transfers (Cloudflare as Primary)

With [outgoing zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-primary/), you can keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability and fault tolerance.

## Aspects to consider

### DNS-only CNAME records

As explained in [DNS record types](/dns/manage-dns-records/reference/dns-record-types/#cname), Cloudflare uses a process called [`CNAME` flattening](/dns/cname-flattening/) to return the final IP address instead of the `CNAME` target. `CNAME` flattening improves performance and is also what allows you to set a `CNAME` record on the zone apex.

Depending on the [settings](/dns/cname-flattening/set-up-cname-flattening/) you have, when you use DNS-only `CNAME` records with outgoing zone transfers, you can expect the following:

* For DNS-only `CNAME` records on the zone apex, Cloudflare will always transfer out the flattened IP addresses.
* For DNS-only `CNAME` records on subdomains, Cloudflare will only transfer out flattened IP addresses if the setting [**Flatten all CNAMEs**](/dns/cname-flattening/set-up-cname-flattening/#for-all-cname-records) is enabled.

### Proxied records

For each [proxied DNS record](/dns/manage-dns-records/reference/proxied-dns-records/) in your zone, Cloudflare will transfer out two `A` and two `AAAA` records.

These records correspond to the [Cloudflare IP addresses](https://www.cloudflare.com/ips) used for proxying traffic.

## Before you begin

Make sure your account team has enabled your zone for outgoing zone transfers.

Review your [existing DNS records](/dns/manage-dns-records/how-to/create-dns-records/) to make sure all of them have the desired **Proxy status**.

If using the API, you may also want to [locate your Zone and Account IDs](/fundamentals/setup/find-account-and-zone-ids/).

---

## Step 1 - Create TSIG (optional)

{{<render file="_tsig-definition.md">}}


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_tsig-create-dash.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_tsig-create-api.md">}}

{{</tab>}}
{{</tabs>}}

## Step 2 - Create Peer DNS Server (optional)

You only need to create a peer DNS server if you want:

- Your secondary nameservers to receive **NOTIFYs**  for changes to your Cloudflare DNS records.
- A **TSIG** to sign zone transfer requests and **NOTIFYs**.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a peer using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Select **DNS Zone Transfers**.
4. For **Peer DNS servers**, select **Create**.
5. Enter the following information, paying particular attention to:
    - **IP**: If configured, specifies where Cloudflare sends NOTIFY requests to.
    - **Port**: Specifies the IP Port for the NOTIFY IP.
    - **Enable incremental (IXFR) zone transfers**: Does not apply when you are using Cloudflare as your primary DNS provider (Cloudflare zones always accept IXFR requests).
    - **Link an existing TSIG**: If desired, link the TSIG you [previously created](#step-1---create-tsig-optional).
6. Select **Create**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To create a peer DNS server using the API, send a [POST](/api/operations/secondary-dns-(-peer)-create-peer) request.

{{</tab>}}
{{</tabs>}}

## Step 3 - Link peer to primary zone (optional)

If you previously [created a peer DNS server](#step-2---create-peer-dns-server-optional), you should link it to your primary zone.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a secondary zone using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS** > **Settings**.
4. For **DNS Zone Transfers**, select **Manage linked peers**.
5. Select a peer.
6. Select **Save**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To link a primary zone to a peer using the API, send a [POST](/api/operations/secondary-dns-(-primary-zone)-create-primary-zone-configuration) request with the ID of the peer you [previously created](#step-2---create-peer-dns-server-optional).

{{</tab>}}
{{</tabs>}}

## Step 4 - Create an ACL

When you create an Access Control List (ACL), that list contains the source IP addresses that are allowed to send zone transfer requests. If you do not configure an ACL, your zone transfers will fail from IP addresses other than the one specified in the peer DNS server linked to your primary zone on Cloudflare.

For more details, refer to [create an ACL](/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/).

## Step 5 - Update your secondary DNS provider

Your secondary DNS provider should send zone transfer requests (via AXFR or IXFR) to [this IP](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#transfer-ip) on port 53 and from the IP address specified in your [peer configuration](#step-2---create-peer-dns-server-optional).

It should also have updated [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#allow-range) to prevent NOTIFY messages sent from Cloudflare IP ranges from being blocked.

## Step 6 - Add secondary nameservers within Cloudflare

Using the information from your secondary DNS provider, [create `NS` records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) on your zone apex listing your secondary nameservers.

By default, Cloudflare ignores `NS` records that are added to the zone apex. To modify this behaviour, enable [multi-provider DNS](/dns/nameservers/nameserver-options/#multi-provider-dns):

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS** > **Settings**.
4. Enable **Multi-provider DNS**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

```bash
curl --request PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_settings' \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "multi_provider": true
}'
```

{{</tab>}}
{{</tabs>}}

## Step 7 - Enable outgoing zone transfers

When you enable outgoing zone transfers, this will send a DNS NOTIFY message to your secondary DNS provider.


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS** > **Settings**.
4. For **Outgoing Zone Transfers**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable outgoing zone transfers using the API, send a [POST](/api/operations/secondary-dns-(-primary-zone)-enable-outgoing-zone-transfers) request.

{{</tab>}}
{{</tabs>}}

## Step 8 - Add secondary nameservers to registrar

At your registrar, add the nameservers of your secondary DNS provider.