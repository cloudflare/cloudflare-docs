# Cloudflare Docs

## Publishing

Clone the engine somewhere and set it up to be NPM linked:

```bash
git clone git@github.com:adamschwartz/cloudflare-docs-engine.git
npm link
```

For each product, `cd` into `products/$productName` and then run:

```bash
npm link cloudflare-docs-engine && npm run bootstrap && npm run build && wrangler publish
```

## Migration progress

| Product                 | `pathPrefix`         | Icon | Content | Test                                                                                  | Prod |
| :---------------------- | :------------------- | :--- | :------ | :------------------------------------------------------------------------------------ | :--- |
| 1.1.1.1                 | 1-1-1-1              | ✕    |         | [Test](https://1-1-1-1.cloudflare-docs.workers.dev/1-1-1-1)                           |      |
| Access                  | access               | ✕    |         | [Test](https://access.cloudflare-docs.workers.dev/access)                             |      |
| Analytics               | analytics            | ✕    |         | [Test](https://analytics.cloudflare-docs.workers.dev/analytics)                       |      |
| Argo Tunnel             | argo-tunnel          | ✕    |         | [Test](https://argo-tunnel.cloudflare-docs.workers.dev/argo-tunnel)                   |      |
| BYOIP                   | byoip                | ✕    |         | [Test](https://byoip.cloudflare-docs.workers.dev/byoip)                               |      |
| Distributed Web Gateway | distributed-web      | ✕    |         | [Test](https://distributed-web.cloudflare-docs.workers.dev/distributed-web)           |      |
| Firewall                | firewall             | ✕    |         | [Test](https://firewall.cloudflare-docs.workers.dev/firewall)                         |      |
| Gateway                 | gateway              | ✕    |         | [Test](https://gateway.cloudflare-docs.workers.dev/gateway)                           |      |
| HTTP3                   | http3                |      |         | [Test](https://http3.cloudflare-docs.workers.dev/http3)                               |      |
| Image Resizing          | images               | ✕    |         | [Test](https://images.cloudflare-docs.workers.dev/images)                             |      |
| Life of a Request       | internet             | ✕    |         | [Test](https://internet.cloudflare-docs.workers.dev/internet)                         |      |
| Load Balancing          | load-balancing       | ✕    |         | [Test](https://load-balancing.cloudflare-docs.workers.dev/load-balancing)             |      |
| Logs                    | logs                 | ✕    |         | [Test](https://logs.cloudflare-docs.workers.dev/logs)                                 |      |
| Magic Transit           | magic-transit        | ✕    |         | [Test](https://magic-transit.cloudflare-docs.workers.dev/magic-transit)               |      |
| Mobile SDK              | mobile-sdk           | ✕    |         | [Test](https://mobile-sdk.cloudflare-docs.workers.dev/mobile-sdk)                     |      |
| Network Interconnect    | network-interconnect | ✕    |         | [Test](https://network-interconnect.cloudflare-docs.workers.dev/network-interconnect) |      |
| Randomness Beacon       | randomness-beacon    | ✕    |         | [Test](https://randomness-beacon.cloudflare-docs.workers.dev/randomness-beacon)       |      |
| Registrar               | registrar            | ✕    |         | [Test](https://registrar.cloudflare-docs.workers.dev/registrar)                       |      |
| Spectrum                | spectrum             | ✕    | Started | [Test](https://spectrum.cloudflare-docs.workers.dev/spectrum)                         |      |
| SSL                     | ssl                  | ✕    |         | [Test](https://ssl/ssl-tls.cloudflare-docs.workers.dev/ssl/ssl-tls)                   |      |
| Stream                  | stream               | ✕    | Started | [Test](https://stream.cloudflare-docs.workers.dev/stream)                             |      |
| Tenant                  | tenant               |      |         | [Test](https://tenant.cloudflare-docs.workers.dev/tenant)                             |      |
| Terraform               | terraform            | ✕    | Started | [Test](https://terraform.cloudflare-docs.workers.dev/terraform)                       |      |
| Time Services           | time-services        | ✕    |         | [Test](https://time-services.cloudflare-docs.workers.dev/time-services)               |      |
| WAF                     | waf                  | ✕    |         | [Test](https://waf.cloudflare-docs.workers.dev/waf)                                   |      |

Test sites deploy to:

```txt
https://$pathPrefix.cloudflare-docs.workers.dev/$pathPrefix/
```

Production sites deploy to:

```txt
https://developers.cloudflare.com/$pathPrefix/
```
