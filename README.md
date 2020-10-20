# Cloudflare Docs

__[View the docs →](https://developers.cloudflare.com/docs/)__

[Contribute to the docs](https://developers.cloudflare.com/docs-engine/how-to-guides/contribute-to-a-product)

[Set up local development](https://developers.cloudflare.com/docs-engine/how-to-guides/migrate-a-product#step-2-set-up-local-development)

## For Cloudflare employees

To get write access to this repo, please reach out to the __Developer Docs__ room in chat.

## Migration progress

| Product                 | `pathPrefix`         | Icon  | Content | Test                                                                                  | Prod                                                        |
| :---------------------- | :------------------- | :---: | :-----: | :------------------------------------------------------------------------------------ | :---------------------------------------------------------- |
| 1.1.1.1                 | 1.1.1.1              |   ✕   |    ✕    | [Test](https://1-1-1-1.cloudflare-docs.workers.dev/1.1.1.1)                           | [Prod](https://developers.cloudflare.com/1.1.1.1)           |
| Access                  | access               |   ✕   |    ✕    | [Test](https://access.cloudflare-docs.workers.dev/access)                             | [Prod](https://developers.cloudflare.com/access)            |
| Analytics               | analytics            |   ✕   | Started | [Test](https://analytics.cloudflare-docs.workers.dev/analytics)                       |                                                             |
| Argo Tunnel             | argo-tunnel          |   ✕   |    ✕    | [Test](https://argo-tunnel.cloudflare-docs.workers.dev/argo-tunnel)                   | [Prod](https://developers.cloudflare.com/argo-tunnel)       |
| BYOIP                   | byoip                |   ✕   |    ✕    | [Test](https://byoip.cloudflare-docs.workers.dev/byoip)                               | [Prod](https://developers.cloudflare.com/byoip)             |
| Distributed Web Gateway | distributed-web      |   ✕   |    ✕    | [Test](https://distributed-web.cloudflare-docs.workers.dev/distributed-web)           | [Prod](https://developers.cloudflare.com/distributed-web)   |
| Docs Engine¹            | docs-engine          |   ✕   |    ✕    | [Test](https://docs-engine.cloudflare-docs.workers.dev/docs-engine)                   | [Prod](https://developers.cloudflare.com/docs-engine)       |
| Firewall                | firewall             |   ✕   |    ✕    | [Test](https://firewall.cloudflare-docs.workers.dev/firewall)                         | [Prod](https://developers.cloudflare.com/firewall)          |
| Gateway                 | gateway              |   ✕   |    ✕    | [Test](https://gateway.cloudflare-docs.workers.dev/gateway)                           | [Prod](https://developers.cloudflare.com/gateway)           |
| HTTP/3                  | http3                |       |    ✕    | [Test](https://http3.cloudflare-docs.workers.dev/http3)                               | [Prod](https://developers.cloudflare.com/http3)             |
| Image Resizing          | images               |   ✕   |    ✕    | [Test](https://images.cloudflare-docs.workers.dev/images)                             | [Prod](https://developers.cloudflare.com/images)            |
| Life of a Request       | internet             |   ✕   |    ✕    | [Test](https://internet.cloudflare-docs.workers.dev/internet)                         | [Prod](https://developers.cloudflare.com/internet)          |
| Load Balancing          | load-balancing       |   ✕   |         | [Test](https://load-balancing.cloudflare-docs.workers.dev/load-balancing)             |                                                             |
| Logs                    | logs                 |   ✕   |    ✕    | [Test](https://logs.cloudflare-docs.workers.dev/logs)                                 | [Prod](https://developers.cloudflare.com/logs)              |
| Magic Transit           | magic-transit        |   ✕   |         | [Test](https://magic-transit.cloudflare-docs.workers.dev/magic-transit)               |                                                             |
| Mobile SDK              | mobile-sdk           |   ✕   | Started | [Test](https://mobile-sdk.cloudflare-docs.workers.dev/mobile-sdk)                     |                                                             |
| Network Interconnect    | network-interconnect |   ✕   | Started | [Test](https://network-interconnect.cloudflare-docs.workers.dev/network-interconnect) |                                                             |
| Randomness Beacon       | randomness-beacon    |   ✕   |    ✕    | [Test](https://randomness-beacon.cloudflare-docs.workers.dev/randomness-beacon)       | [Prod](https://developers.cloudflare.com/randomness-beacon) |
| Registrar               | registrar            |   ✕   |    ✕    | [Test](https://registrar.cloudflare-docs.workers.dev/registrar)                       | [Prod](https://developers.cloudflare.com/registrar)         |
| Spectrum                | spectrum             |   ✕   |    ✕    | [Test](https://spectrum.cloudflare-docs.workers.dev/spectrum)                         | [Prod](https://developers.cloudflare.com/spectrum)          |
| SSL                     | ssl                  |   ✕   | Started | [Test](https://ssl.cloudflare-docs.workers.dev/ssl)                                   |                                                             |
| Stream                  | stream               |   ✕   |    ✕    | [Test](https://stream.cloudflare-docs.workers.dev/stream)                             | [Prod](https://developers.cloudflare.com/stream)            |
| Tenant                  | tenant               |       |    ✕    | [Test](https://tenant.cloudflare-docs.workers.dev/tenant)                             | [Prod](https://developers.cloudflare.com/tenant)            |
| Terraform               | terraform            |   ✕   |    ✕    | [Test](https://terraform.cloudflare-docs.workers.dev/terraform)                       | [Prod](https://developers.cloudflare.com/terraform)         |
| Time Services           | time-services        |   ✕   |    ✕    | [Test](https://time-services.cloudflare-docs.workers.dev/time-services)               | [Prod](https://developers.cloudflare.com/time-services)     |
| WAF                     | waf                  |   ✕   |    ✕    | [Test](https://waf.cloudflare-docs.workers.dev/waf)                                   | [Prod](https://developers.cloudflare.com/waf)               |
| Workers                 | workers              |   ✕   |    ✕    | [Test](https://workers.cloudflare-docs.workers.dev/workers)                           | [Prod](https://developers.cloudflare.com/workers)           |

¹ The documentation for the Docs Engine itself.

### Deployment

Each [product](https://github.com/cloudflare/cloudflare-docs/tree/master/products)’s docs are automatically deployed via [@cloudflare/wrangler](https://github.com/cloudflare/wrangler) using Github Actions.

Non-migrated products only deploy to the test environment:

```txt
https://$pathPrefix.cloudflare-docs.workers.dev/$pathPrefix/
```

Migrated products deploy to both the test environment above and the prod environment at:

```txt
https://developers.cloudflare.com/$pathPrefix/
```
