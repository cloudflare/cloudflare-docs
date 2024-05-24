---
_build:
  publishResources: false
  render: never
  list: never
---

Using the detection IDs below, you can detect and mitigate account takeover attacks. You can monitor the number of login requests for a given software and network combination, as well as the percentage of login errors. When it reaches a suspicious level, you can prevent these attacks by using [custom rules](/waf/custom-rules/), [rate limiting rules](/waf/rate-limiting-rules/), and [Workers](/workers/). 

| Detection ID | Description |
| --- | --- |
| `201326592` | Observes all login failures to the zone. |
| `201326593` | Observes all login traffic to the zone. |