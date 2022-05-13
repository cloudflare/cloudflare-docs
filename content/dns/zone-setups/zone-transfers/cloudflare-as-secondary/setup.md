---
pcx-content-type: tutorial
title: Setup
weight: 2
meta:
   title: Set up incoming zone transfers (Cloudflare as Secondary)
---

# Set up incoming zone transfers (Cloudflare as Secondary)

With [incoming zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider.

{{<render file="_secondary-dns-override.md">}}

## Before you begin

Make sure you have completed the following tasks before setting up incoming zone transfers.

### At your primary DNS provider

Your primary DNS provider should allow traffic from the port specified in your [peer server configuration](#step-2---create-peer-server).

It should also have updated [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/default-values/#cloudflare-as-secondary) to prevent zone transfers from being blocked.

You will also need the following information from your Primary DNS provider:

- **Primary IP address**: The IP address that Cloudflare should accept zone transfers from.
- **Zone transfer type**: Will zone transfers be full (AXFR) or incremental (IXFR)?
- **TSIG secret** (optional): The secret string used to authenticate zone transfers.
- **TSIF Algorithm** (optional): The algorithm used to authenticate zone transfers.

### At Cloudflare

Make sure your account team has enabled your zone for Secondary DNS.

Get the following values from your Cloudflare account:
- [Account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/)
- [Zone ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/)
- [Nameserver names](/dns/zone-setups/full-setup/setup/#get-nameserver-names), which should have **secondary** in the name.

### DNSSEC

If you want [DNSSEC](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) available for your secondary zone, you will need one of the following setups (reach out to your account team for more details):

- **Hidden primary**: Since Cloudflare secondary nameservers are the only nameservers listed at your registrar, Cloudflare can sign records as needed.
- **Pre-signed zones**: If your primary DNS provider signs records and transfers them, Cloudflare serves records and does not do any signing. Cloudflare only supports NSEC records (and not NSEC3 records) and this setup does not support [Secondary Overrides](https://support.cloudflare.com/hc/articles/360042169091).
- **Multi-signer DNSSEC**: Both Cloudflare and your primary DNS provider know the signing keys of the other provider and perform their own online signing.

---

## Step 1 - Create TSIG (optional)

A Transaction Signature (TSIG) authenticates communication between a primary and secondary DNS server.

While optional, this step is highly recommended.

### Using the dashboard

To create a TSIG using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Click **DNS Zone Transfers**.
4. For **TSIG**, click **Create**. 
5. Enter the following information:
    - **TSIG name**: Provide a descriptive name.
    - **Secret (optional)**: Get a shared secret to add to your third-party nameservers. If left blank, this field generates a random secret.
    - **Algorithm**: Choose a TSIG signing algorithm.
6. Click **Create**.

### Using the API

To create a TSIG using the API, send a [POST](https://api.cloudflare.com/#secondary-dns-tsig--create-tsig) request.

## Step 2 - Create Peer Server

### Using the dashboard

To create a peer server using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Click **DNS Zone Transfers**.
4. For **Peer DNS servers**, click **Create**. 
5. Enter the following information, paying particular attention to:
    - **Port**: Which needs to support traffic at your primary DNS provider.
    - **Enable incremental (IXFR) zone transfers**: Which need to be supported by your primary DNS provider.
    - **Link a an existing TSIG**: If desired, link the TSIG you [previously created](#step-1---create-tsig-optional). 
6. Click **Create**.

### Using the API

To create a peer DNS server using the API, send a [POST](https://api.cloudflare.com/#secondary-dns-peer--create-peer) request.

## Step 3 - Create the Secondary Zone

### Using the dashboard

To create a secondary zone using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. In the top navigation bar, click **Add site**.
3. Enter your zone name and choose **Secondary DNS** (if this option is not available, contact your account team).
4. Click **Add site**.
5. Select your plan type.
6. Choose a value for **Zone refresh**, which controls the number of seconds between zone updates from your primary DNs server.
7. Select the peer server you [previously created](#step-2---create-peer-server). If needed, you can link more than one peer server to a zone.
8. Click **Continue**.
9. Review the list of transferred records and click **Continue**.
    {{<Aside type="note">}} If no records appear, you may have misconfigured the TSIG or the IP address of the peer server or the [Access Control List](/dns/zone-setups/zone-transfers/access-control-lists/default-values/#cloudflare-as-secondary) was improperly configured at your primary DNS provider.
    {{</Aside>}}
10. Click **Initiate zone transfer**.

### Using the API

To create a secondary zone using the API, send a [POST](https://api.cloudflare.com/#zone-create-zone) request with the `type` parameter set to `"secondary"`.

## Step 4 - Update registrar

At your registrar, add the secondary nameservers [specified in the Cloudflare dashboard](/dns/zone-setups/full-setup/setup/#get-nameserver-names).

When you have added them, go into your new secondary zone and click **Done, check nameservers**.

## Step 5 - Create notifications (optional)

To increase the reliability of your incoming zone transfers, [set up notifications](/fundamentals/notifications/create-notifications/) to be notified when your primaries are failing, when records are updated, [and more](/fundamentals/notifications/notification-available/#dns).

## Step 6 - Proxy traffic through Cloudflare (optional)

{{<render file="_secondary-dns-override.md">}}