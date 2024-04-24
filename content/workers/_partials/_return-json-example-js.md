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
    const data = {
      hello: "world",
    };

    return Response.json(data);
  },
};
```