---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: configRulesReferenceOrLink;;rumRulesReferenceOrLink
---

{{<Aside type="warning" header="Warning">}}
$1 have precedence over any $2. If a Web Analytics rule turns on analytics measurements for an incoming request and the same request matches a configuration rule turning off Web Analytics, the configuration rule will win.
{{</Aside>}}
