---
pcx_content_type: tutorial
title: Setup
weight: 1
meta:
   title: Set up incoming zone transfers (Cloudflare as Secondary)
---

# Set up incoming zone transfers (Cloudflare as Secondary)

With [incoming zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), you can keep your primary DNS provider and use Cloudflare as a secondary DNS provider.

{{<render file="_secondary-dns-override.md">}} <br />

## Before you begin

* You should already have a registered domain, set up with your primary DNS provider.
* Make sure you have completed the following tasks at your primary DNS provider and at Cloudflare.

### At your primary DNS provider

Your primary DNS provider should allow traffic from the IP address and port specified in your [peer server configuration](#2-create-peer-server).

It should also have updated [Access Control Lists (ACLs)](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#cloudflare-as-secondary) to prevent zone transfers from being blocked.

We strongly recommend configuring [DNS NOTIFY](https://datatracker.ietf.org/doc/html/rfc1996) at your primary DNS provider to ensure your secondary zone on Cloudflare is updated with the most recent changes as quickly as possible. In order to do so, set up [Cloudflare NOTIFY IPs](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#notify-ips) at your primary DNS provider.

You will also need the following information from your Primary DNS provider:

- **Primary IP address**: The IP address that Cloudflare sends zone transfer requests to (via AXFR or IXFR).
- **Zone transfer type**: Will zone transfers be full (AXFR) or incremental (IXFR)?
- **TSIG name** (optional): A descriptive name of the TSIG following domain name syntax ([RFC 8945 section 4.2](https://datatracker.ietf.org/doc/html/rfc8945#section-4.2)).
 {{<render file="_tsig-name-match.md">}}
- **TSIG secret** (optional): The secret string used to authenticate zone transfers.
- **TSIG algorithm** (optional): The algorithm used to authenticate zone transfers.

### At Cloudflare

Make sure your account team has enabled your zone for Secondary DNS.

Get the following values from your Cloudflare account:
- [Account ID](/fundamentals/setup/find-account-and-zone-ids/)
- [Zone ID](/fundamentals/setup/find-account-and-zone-ids/)
- [Nameserver names](/dns/zone-setups/full-setup/setup/#get-nameserver-names), which should have **secondary** in the name.

---

## 1. Create TSIG (optional)

{{<render file="_tsig-definition.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_tsig-create-dash.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_tsig-create-api.md">}}

{{</tab>}}
{{</tabs>}}

## 2. Create Peer Server

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a peer server using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. Click **DNS Zone Transfers**.
4. For **Peer DNS servers**, click **Create**.
5. Enter the following information, paying particular attention to:
    - **IP**: Specifies where Cloudflare sends transfer requests to.
    - **Port**: Specifies the IP Port for the transfer IP.
    - **Enable incremental (IXFR) zone transfers**: Specifies if Cloudflare sends IXFR requests in addition to the default AXFR requests.
    - **Link a an existing TSIG**: If desired, link the TSIG you [previously created](#1-create-tsig-optional).
6. Click **Create**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To create a peer DNS server using the API, send a [POST request](/api/operations/secondary-dns-(-peer)-create-peer).

{{</tab>}}
{{</tabs>}}

## 3. Create the Secondary Zone

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a secondary zone using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. In the top navigation bar, click **Add site**.
3. Enter your zone name and choose **Secondary DNS** (if this option is not available, contact your account team).
4. Click **Add site**.
5. Select your plan type.
6. Choose a value for **Zone refresh**, which controls the number of seconds between zone updates from your primary DNS server.
    {{<Aside type="warning">}}Cloudflare will not use the REFRESH value inside the SOA record that is served by your primary provider. Instead the value of zone refresh configured for your secondary zone on Cloudflare will be used to determine the interval after which the SOA serial of the primary zone will be checked for changes.
    {{</Aside>}}
7. Select the peer server you [previously created](#2-create-peer-server). If needed, you can link more than one peer server to a zone.
8. Click **Continue**.
9. Review the list of transferred records and click **Continue**.
    {{<Aside type="note">}} If no records appear, you may have misconfigured the TSIG or the IP address of the peer server or the [Access Control List](/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#cloudflare-as-secondary) was improperly configured at your primary DNS provider.
    {{</Aside>}}
10. Click **Initiate zone transfer**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To create a secondary zone using the API, send a [POST](/api/operations/secondary-dns-(-secondary-zone)-create-secondary-zone-configuration) request with the `type` parameter set to `"secondary"`.

{{</tab>}}
{{</tabs>}}

## 4. Update registrar

At your registrar, add the secondary nameservers [specified in the Cloudflare dashboard](/dns/zone-setups/full-setup/setup/#get-nameserver-names).

When you have added them, go into your new secondary zone and click **Done, check nameservers**.

## 5. Create notifications (optional)

To increase the reliability of your incoming zone transfers, [set up notifications](/notifications/get-started/#create-a-notification) to be notified when your primaries are failing, when records are updated, [and more](/notifications/notification-available/#dns).

## 6. Proxy traffic through Cloudflare (optional)

{{<render file="_secondary-dns-override.md">}}
