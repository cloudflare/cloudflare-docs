---
pcx-content-type: concept
title: Access Control Lists (ACLs)
weight: 4
---

# Access Control Lists (ACLs)

Access Control Lists (ACLs) are used to filter incoming or outgoing traffic to your DNS server.

When setting up a new zone transfer ([incoming](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) or [outgoing](/dns/zone-setups/zone-transfers/cloudflare-as-primary/)), you will need to update the ACL at your other DNS provider to allow for zone transfers.

You can also [create a new ACL](/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/) to specify additional NOTIFY IPs for Cloudflare as secondary zones or Allow ranges for Cloudflare as primary zones.