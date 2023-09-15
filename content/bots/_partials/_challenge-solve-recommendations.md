---
_build:
  publishResources: false
  render: never
  list: never
---

When measuring automated traffic, the percentage of the CSR shows how effective your rule is:

- If you see a high CSR (above **3%**), you might want to reevaluate the criteria of your rule to prevent human visitors from receiving challenges. You should lower your threshold in small increments of 3 to 5 points at a time until it drops.
- If you see a low CSR (below **3%**), you likely do not need to adjust your rule but may still want to review its CSR periodically.
- If the rate is close to **0%**, your rule is only acting on automated traffic. Consider changing the rule action to _Block_.