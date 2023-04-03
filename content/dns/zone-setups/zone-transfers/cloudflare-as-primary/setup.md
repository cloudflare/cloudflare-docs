---
pcx_content_type: tutorial
title: Setup
weight: 2
meta:
   title: Set up outgoing zone transfers (Cloudflare as Primary)
---

# Set up outgoing zone transfers (Cloudflare as Primary)

With [outgoing zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-primary/), you can keep Cloudflare as your primary DNS provider and use one or more secondary provider for increased availability and fault tolerance.

## Limitations

### DNS-only CNAME at zone apex

If you are using Cloudflare as your [primary DNS provider](/dns/zone-setups/full-setup/), we allow you to set a `CNAME` record on the zone apex because we do [`CNAME` Flattening](/dns/cname-flattening/). 

If you take advantage of this behavior within Cloudflare (using an unproxied `CNAME` record on your zone apex) while using outgoing zone transfers for this zone, Cloudflare will not transfer out the target hostname of the `CNAME` record but instead the flattened IP address(es) that also get served as DNS responses from Cloudflare authoritative nameservers.

### Proxied records

If your zone has [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/), you may also experience issues with outgoing zone transfers.

When Cloudflare performs outgoing transfers, we transfer out the origin IP or hostname of each DNS record. This means that - if Cloudflare (as primary) and your secondary provider are both authoritative - they will not reply with the same response for proxied DNS records. Cloudflare would respond with two [Cloudflare edge IP addresses](https://www.cloudflare.com/ips) and your secondary provider would respond with the origin IP or hostname.

{{<Aside type="note">}}

If you need Cloudflare to transfer out edge IP addresses instead of origin IP addresses or hostnames for proxied records, reach out to your account team for further instructions.

{{</Aside>}}

## Before you begin

Make sure your account team has enabled your zone for outgoing zone transfers.

Also, review your [existing DNS records](/dns/manage-dns-records/how-to/create-dns-records/) to make sure all of them have a **Proxy status** of **Unproxied**.

If using the API, you may also want to [locate your Zone and Account IDs](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

---

## Step 1 - Create TSIG (optional)

{{<render file="_tsig-definition.md">}}

### Using the dashboard

{{<render file="_tsig-create-dash.md">}}

### Using the API

{{<render file="_tsig-create-api.md">}}

## Step 2 - Create Peer DNS Server (optional)

You only need to create a peer DNS server if you want:

- Your secondary nameservers to receive **NOTIFYs**  for changes to your Cloudflare DNS records.
- A **TSIG** to sign zone transfer requests and **NOTIFYs**.

### Using the dashboard

To create a peer using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Click **DNS Zone Transfers**.
4. For **Peer DNS servers**, click **Create**. 
5. Enter the following information, paying particular attention to:
    - **IP**: If configured, specifies where Cloudflare sends NOTIFY requests to.
    - **Port**: Specifies the IP Port for the NOTIFY IP.
    - **Enable incremental (IXFR) zone transfers**: Does not apply when you are using Cloudflare as your primary DNS provider (Cloudflare zones always accept IXFR requests).
    - **Link an existing TSIG**: If desired, link the TSIG you [previously created](#step-1---create-tsig-optional). 
6. Click **Create**.

### Using the API

To create a peer DNS server using the API, send a [POST](/api/operations/secondary-dns-(-peer)-create-peer) request.

## Step 3 - Link peer to primary zone (optional)

If you previously [created a peer DNS server](#step-2---create-peer-dns-server-optional), you should link it to your primary zone.

### Using the dashboard

To create a secondary zone using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS** > **Settings**.
4. For **DNS Zone Transfers**, click **Manage linked peers**.
5. Select a peer.
6. Click **Save**.

### Using the API

To link a primary zone to a peer using the API, send a [POST](/api/operations/secondary-dns-(-primary-zone)-create-primary-zone-configuration) request with the ID of the peer you [previously created](#step-2---create-peer-dns-server-optional).

## Step 4 - Create an ACL

When you create an Access Control List (ACL), that list contains the source IP addresses that are allowed to send zone transfer requests. If you do not configure an ACL, your zone transfers will fail from IP addresses other than the one specified in the peer DNS server linked to your primary zone on Cloudflare.

For more details, refer to [create an ACL](/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/).

## Step 5 - Update your secondary DNS provider

Your secondary DNS provider should send zone transfer requests (via AXFR or IXFR) to [this IP](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#transfer-ip) on port 53 and from the IP address specified in your [peer configuration](#step-2---create-peer-dns-server-optional).

It should also have updated [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#allow-range) to prevent NOTIFY messages sent from Cloudflare IP ranges from being blocked.

## Step 6 - Add secondary nameservers within Cloudflare

Using the information from your secondary DNS provider, [create `NS` records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) on your zone apex listing your secondary nameservers.

By default, Cloudflare ignores `NS` records that are added to the zone apex. By sending the following API call, you can enable the usage of apex NS records and Cloudflare nameservers will respond with them alongside the assigned Cloudflare nameservers of the zone.

```bash
curl -X PATCH 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_settings/use_apex_ns' \
-H 'X-Auth-Email: <EMAIL>' \
-H 'X-Auth-Key: <API_KEY>' \
-H 'Content-Type: application/json' \
--data '{
  "id": "use_apex_ns",
  "value": true
}'
```

{{<Aside type="note">}}

Cloudflare is actively working to support this setting within the dashboard.

{{</Aside>}}

## Step 7 - Enable outgoing zone transfers

When you enable outgoing zone transfers, this will send a DNS NOTIFY message to your secondary DNS provider.

### Using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS** > **Settings**.
4. For **Outgoing Zone Transfers**, switch the toggle to **On**.

### Using the API

To enable outgoing zone transfers using the API, send a [POST](/api/operations/secondary-dns-(-primary-zone)-enable-outgoing-zone-transfers) request.

## Step 8 - Add secondary nameservers to registrar

At your registrar, add the nameservers of your secondary DNS provider.