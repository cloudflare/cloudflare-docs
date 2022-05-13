---
pcx-content-type: reference
title: Default values
weight: 4
meta:
    title: Default values - Access Control Lists (ACLs)
---

# Default values - Access Control Lists (ACLs)

Access Control Lists (ACLs) are used to filter incoming or outgoing traffic to your DNS server.

When setting up a new zone transfer, you will need to update the ACLs at your other DNS provider to prevent those requests from being blocked.

{{<Aside type="note">}}
To specify additional NOTIFY IPs for Cloudflare as secondary zones or Allow ranges for Cloudflare as primary zones, [create a new ACL](/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/).
{{</Aside>}}

## Cloudflare as Primary

If you are using Cloudflare for Primary DNS — meaning that you are setting up Cloudflare to send [outgoing zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-primary/) — you need to update the following settings at your secondary DNS provider. 

### Allow range

Cloudflare's NOTIFY messages originate from the following IP prefixes. These ranges need to be allowed at your Secondary DNS servers.

- 198.41.144.240/28
- 198.41.150.240/28
- 2a06:98c0:3601::/48
- 2a06:98c0:1401::/48

### Transfer IP

Cloudflare will listen to AXFR/IXFR zone transfer requests and SOA queries from your Secondary DNS server on this IP address.

- 172.65.64.6

## Cloudflare as Secondary

If you are using Cloudflare for Secondary DNS — meaning that you are setting up Cloudflare to receive [incoming zone transfers](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) — you need to update the following settings at your primary DNS provider. 

### Allow range

Cloudflare's AXFR/IXFR zone transfer requests originate from the following IP prefixes. These ranges need to be allowed at your Primary DNS servers.

- 198.41.144.240/28
- 198.41.150.240/28
- 2a06:98c0:3601::/48
- 2a06:98c0:1401::/48

### Notify IPs

Notify IPs are the IP addresses where you notify Cloudflare's Secondary DNS to initiate a pull of new zone information from your Primary DNS servers:

- 172.65.30.82
- 172.65.50.145
- 2606:4700:60:0:317:26ee:3bdf:5774
- 2606:4700:60:0:35a:4be3:4144:c5ee

### Bind server configuration

To run a BIND server as a primary, add the following statements to your zone file:

```txt
allow-transfer {198.41.144.240/28;198.41.150.240/28;2a06:98c0:3601::/48;2a06:98c0:1401::/48;}
also-notify { 172.65.30.82;172.65.50.145;2606:4700:60:0:317:26ee:3bdf:5774;2606:4700:60:0:35a:4be3:4144:c5ee;}
```