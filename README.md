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

| Product                 | `pathPrefix`         | Icon | Content | Test                                                                         | Prod |
| :---------------------- | :------------------- | :--- | :------ | :--------------------------------------------------------------------------- | :--- |
| 1.1.1.1                 | 1-1-1-1              | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/1-1-1-1)              |      |
| Access                  | access               | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/access)               |      |
| Analytics               | analytics            | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/analytics)            |      |
| Argo Tunnel             | argo-tunnel          | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/argo-tunnel)          |      |
| BYOIP                   | byoip                | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/byoip)                |      |
| Distributed Web Gateway | distributed-web      | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/distributed-web)      |      |
| Firewall                | firewall             | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/firewall)             |      |
| Gateway                 | gateway              | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/gateway)              |      |
| HTTP3                   | http3                |      |         | [Test](https://cloudflare-docs-testing.ruthless.design/http3)                |      |
| Image Resizing          | images               | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/images)               |      |
| Life of a Request       | internet             | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/internet)             |      |
| Load Balancing          | load-balancing       | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/load-balancing)       |      |
| Logs                    | logs                 | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/logs)                 |      |
| Magic Transit           | magic-transit        | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/magic-transit)        |      |
| Mobile SDK              | mobile-sdk           | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/mobile-sdk)           |      |
| Network Interconnect    | network-interconnect | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/network-interconnect) |      |
| Randomness Beacon       | randomness-beacon    | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/randomness-beacon)    |      |
| Registrar               | registrar            | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/registrar)            |      |
| Spectrum                | spectrum             | ✕    | Started | [Test](https://cloudflare-docs-testing.ruthless.design/spectrum)             |      |
| SSL                     | ssl                  | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/ssl/ssl-tls)          |      |
| Stream                  | stream               | ✕    | Started | [Test](https://cloudflare-docs-testing.ruthless.design/stream)               |      |
| Tenant                  | tenant               |      |         | [Test](https://cloudflare-docs-testing.ruthless.design/tenant)               |      |
| Terraform               | terraform            | ✕    | Started | [Test](https://cloudflare-docs-testing.ruthless.design/terraform)            |      |
| Time Services           | time-services        | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/time-services)        |      |
| WAF                     | waf                  | ✕    |         | [Test](https://cloudflare-docs-testing.ruthless.design/waf)                  |      |
