---
pcx_content_type: how-to
title: Setup
weight: 4
meta:
  title: Protect against random prefix attacks
---

# Protect against random prefix attacks

In order to enable automatic mitigation of [random prefix attacks](/dns/dns-firewall/random-prefix-attacks/about/):

1. Set up [DNS Firewall](/dns/dns-firewall/setup/).
2. Send a [`PATCH` request](/api/operations/dns-firewall-update-dns-firewall-cluster) to update your DNS Firewall cluster.

   ```sh
   curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/dns_firewall/<CLUSTER_TAG>" \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    --data '{"attack_mitigation":{
      "enabled":true,
      "only_when_upstream_unhealthy":true
      }
    }'
   ```

Once you receive a `200` success response from the API, queries identified as being part of a random prefix attack will receive a `REFUSED` response.

{{<Aside type="note">}}

If you do not specify otherwise in your API call, Cloudflare automatically sets the `"only_when_upstream_unhealthy"` parameter to true, which means that Cloudflare will only mitigate attacks when we detect that the upstream is unresponsive (possibly as a result of an attack). This setting can also be changed via the API, using a request similar to the ones shown above.

{{</Aside>}}
