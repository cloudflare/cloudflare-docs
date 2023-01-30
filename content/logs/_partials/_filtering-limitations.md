---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note" header="Note">}}
Filtering is not supported on the following data types: `objects`, `array[int]`, `array[object]`.

For the Firewall events dataset, the following fields are not supported: `Action`, `Kind`, `MatchIndex`, `Metadata`, `OriginatorRayID`, `RuleID`, and `Source`.

For the Gateway HTTP dataset, the following fields are not supported: `Downloaded File Names` and `Uploaded File Names`.
{{</Aside>}}