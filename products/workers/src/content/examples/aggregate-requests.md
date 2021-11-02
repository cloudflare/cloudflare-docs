---
order: 1000
type: example
summary: Send two GET request to two urls and aggregates the responses into one response.
tags:
  - Originless
pcx-content-type: configuration
---

# Aggregate requests

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * The `DEMO` endpoint is set up to return JSON responses.
 */
const DEMO = "https://examples.cloudflareworkers.com/demos";
export default {
  async fetch() {
    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };
    const responses = await Promise.all([
      fetch(DEMO + "/requests/json", init),
      fetch(DEMO + "/requests/json", init),
    ]);
    const results = await Promise.all(responses.map((res) => res.text()));
    return new Response(results.join(), init);
  },
};
```
