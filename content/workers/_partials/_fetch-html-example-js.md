---
_build:
  publishResources: false
  render: never
  list: never
---

```js
---
playground: true
---
export default {
  async fetch(request) {
    /**
     * Replace `remote` with the host you wish to send requests to
     */
    const remote = "https://example.com";

    return await fetch(remote, request);
  },
};
```