---
pcx-content-type: tutorial
title: Setup
weight: 2
meta:
   title: Set up outgoing zone transfers (Cloudflare as Primary)
---

# Set up outgoing zone transfers (Cloudflare as Primary)

With [outgoing zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-primary/), you can keep Cloudflare as your primary DNS provider and use another, secondary provider for increased availability and fault tolerance.

## Limitations

Outgoing zone transfers are only available for:

- Customers on an Enterprise plan.
- Zones using Cloudflare as their [authoritative DNS provider](/dns/zone-setups/full-setup/).
- Zones with [unproxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/).

Additionally, if your zone currently uses `CNAME` records at your domain apex (possible through Cloudflare's [CNAME Flattening](/dns/additional-options/cname-flattening/)), your secondary DNS provider will also need to support these type of records.

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

## Step 2 - Create Peer Server (optional)

You only need to create a peer server if you want:

- Your secondary nameservers to receive **NOTIFYs**  for changes to your Cloudflare DNS records.
- A **TSIG** to sign zone transfer requests and **NOTIFYs**.

### Using the dashboard

To create a peer server using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Click **DNS Zone Transfers**.
4. For **Peer DNS servers**, click **Create**. 
5. Enter the following information, paying particular attention to:
    - **IP**: If configured, specifies where Cloudflare sends notify requests to.
    - **Port**: Specifies the IP Port for the notify IP.
    - **Enable incremental (IXFR) zone transfers**: Does not apply when you are using Cloudflare as your primary DNS provider (Cloudflare zones always accept IXFR requests).
    - **Link a an existing TSIG**: If desired, link the TSIG you [previously created](#step-1---create-tsig-optional). 
6. Click **Create**.

### Using the API

To create a peer DNS server using the API, send a [POST](https://api.cloudflare.com/#secondary-dns-peer--create-peer) request.

## Step 3 - Link peer to primary zone (optional)

If you previously [created a peer server](#step-2---create-peer-server-optional), you should link it to your primary zone.

### Using the dashboard

To create a secondary zone using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS**.
4. For **DNS Zone Transfers**, click **Manage linked peers**.
5. Select a peer server.
6. Click **Save**.

### Using the API

To link a primary zone to a peer using the API, send a [POST](https://api.cloudflare.com/#secondary-dns-primary-zone--create-primary-zone-configuration) request with the ID of the peer server you [previously created](#step-2---create-peer-server-optional).

## Step 4 - Create an ACL

When you create an Access Control List (ACL), that list contains the source IP addresses that are allowed to send zone transfer requests. If you do not configure an ACL, your zone transfers will fail.

For more details, refer to [create an ACL](/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/).

## Step 5 - Update your secondary DNS provider

Your secondary DNS provider should send requests to the port specified in your [peer server configuration](#step-2---create-peer-server-optional) and from the IP address included in the [default ACL configuration](/dns/zone-setups/zone-transfers/access-control-lists/default-values/#transfer-ip).

It should also have updated [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/default-values/#allow-range) to prevent NOTIFY messages from being blocked.

## Step 6 - Enable outgoing zone transfers

When you enable outgoing zone transfers, this action triggers a Force NOTIFY to your secondary DNS provider.

### Using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **DNS**.
4. For **Outgoing Zone Transfers**, switch the toggle to **On**.

### Using the API

To link a primary zone to a peer using the API, send a [POST](https://api.cloudflare.com/#secondary-dns-primary-zone--enable-outgoing-zone-transfers) request.

## Step 7 - Add secondary nameservers within Cloudflare

Using the information from your secondary DNS provider, [create `NS` records](/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) listing your secondary nameservers.

By default, Cloudflare ignores `NS` records that are added to the zone apex. Ask your account team to update your zone settings to respond with additional nameserver records.

## Step 8 - Add secondary nameservers to registrar

At your registrar, add the nameservers of your secondary DNS provider.