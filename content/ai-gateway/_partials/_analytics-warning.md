---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}

The cost metric is an estimation based on the number of tokens sent and received in requests. **We currently only calculate costs for OpenAI GPT.** If you stream responses, we use a tokenizer package to estimate the number of tokens used in order to calculate the cost. The cost metric is meant to be a helpful estimation to analyze and predict cost trends, but you should always **refer to your provider dashboard to see an accurate cost number.**

{{</Aside>}}