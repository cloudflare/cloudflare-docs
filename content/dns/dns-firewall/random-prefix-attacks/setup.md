---
pcx_content_type: overview
title: Setup
weight: 4
meta:
  title: Protect against random prefix attacks
---

# Protect against random prefix attacks

In order to enable automatic mitigation of [random prefix attacks](/dns/dns-firewall/random-prefix-attacks/about/):

1. Set up [DNS Firewall](/dns/dns-firewall/setup/).
2. Send a [`PATCH` request](https://developers.cloudflare.com/api/operations/dns-firewall-update-dns-firewall-cluster) to update your Firewall Cluster.

   ```sh
   curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/dns_firewall/<CLUSTER_TAG>" \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    --data '{"attack_mitigation":{
      "enabled":true,
      "only_when_origin_unhealthy":true
      }
    }'
   ```

Once you receive a `200` success response from the API, queries identified as being part of a random prefix attack will receive a `REFUSED` response.

If your organization is particularly sensitive to false positives, you can include the `"log_only"` parameter in your API call. This will gather metrics about any attacks, but not perform any mitigations.

```sh
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/dns_firewall/<CLUSTER_TAG>" \
    -H "Authorization: Bearer <token>" \
    -H "Content-Type: application/json" \
    --data '{"attack_mitigation":{
    "enabled":true,
    "only_when_origin_unhealthy":true,
    "log_only":true
    }
    }'
```

{{<Aside type="note">}}

By default, `"only_when_origin_unhealthy"` is set to true, which means that Cloudflare will only mitigate attacks when we detect that the origin is down (possibly as a result of an attack). This setting can also be changed via the API, using a request similar to the ones shown above.

{{</Aside>}}
