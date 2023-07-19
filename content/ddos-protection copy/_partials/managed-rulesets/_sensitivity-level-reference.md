---
_build:
  publishResources: false
  render: never
  list: never
---

API property name: `"sensitivity_level"`.

Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold.

The available sensitivity levels are:

| UI value          | API value   |
| ----------------- | ----------- |
| _High_            | `"default"` |
| _Medium_          | `"medium"`  |
| _Low_             | `"low"`     |
| _Essentially Off_ | `"eoff"`    |

The default sensitivity level is _High_.

In most cases, when you select the _Essentially Off_ sensitivity level the rule will not trigger for any of the selected actions, including _Log_. However, if the attack is extremely large, Cloudflare's protection systems will still trigger the rule's mitigation action to protect Cloudflare's network.
