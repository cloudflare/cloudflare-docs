---
title: Best practices
pcx_content_type: reference
weight: 7
meta:
  title: IRR entry updates best practices
---

# Best practices for IRR entries

An IRR (Internet Routing Registry) record is what notifies ISPs (internet service providers) how you are allowing your resources to be used. It is necessary to keep your IRR entries up to date so that it is public information that Cloudflare has permission to advertise your prefix or prefixes. 

ARIN, a registry also known as the American Registry for Internet Numbers, maintains an IRR that allows registrants of AS numbers and IP addresses to publish that information so that ISPs can make appropriate routing decisions. This helps ensure ISPs will recognize your routes as legitimate and enables them to ignore unauthorized routes published by someone else.

You will need to set up an IRR entry so that Cloudflare has permission to advertise your prefix or prefixes and ensure that your traffic can be properly routed on the internet.

## Configure an IRR entry

You can add or update an IRR entry by following the directions within any of the recommended internet registries listed in the [Internet Routing Registry](https://www.irr.net/index.html). 

If you own your own subnet, use the RIPE and APNIC routing registries. These registries allow you to verify subnet ownership.

If you lease your subnet, follow these guidelines:
  - When you do not need ownership verification, use the AFRINIC or NTT routing registry.
  - When you submit a route object via email, use the ARIN registry. Address blocks owned by others do not appear in the ARIN interface.

The recommended registries are AFRINIC, APNIC, ARIN, NTT, RADB, and RIPE.

Each routing registry has its own set of instructions to configure an IRR entry. Refer to the table below for more information.

{{<table-wrap>}}<table>

<thead>
    <tr>
      <th>Route registry</th>
      <th>URL</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td>AFRINIC</td>
      <td><a href="https://afrinic.net/internet-routing-registry#guide">https://afrinic.net/internet-routing-registry#guide</a></td>
    </tr>
    <tr>
      <td>APNIC</td>
      <td><a href="https://www.apnic.net/manage-ip/apnic-services/routing-registry/">https://www.apnic.net/manage-ip/apnic-services/routing-registry/</a></td>
    </tr>
    <tr>
      <td>ARIN</td>
      <td><a href="https://www.arin.net/resources/manage/irr/quickstart/">https://www.arin.net/resources/manage/irr/quickstart/</a></td>
    </tr>
    <tr>
      <td>NTT</td>
      <td><a href="https://www.gin.ntt.net/support-center/policies-procedures/routing-registry/">https://www.gin.ntt.net/support-center/policies-procedures/routing-registry/</a></td>
    </tr>
    <tr>
      <td>RADB</td>
      <td><a href="https://www.radb.net/support/">https://www.radb.net/support/</a></td>
    </tr>
    <tr>
      <td>RIPE</td>
      <td><a href="https://www.ripe.net/manage-ips-and-asns/db/support/managing-route-objects-in-the-irr">https://www.ripe.net/manage-ips-and-asns/db/support/managing-route-objects-in-the-irr</a></td>
    </tr>
  </tbody>
</table>{{</table-wrap>}}
