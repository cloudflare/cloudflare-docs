---
order: 1
type: example
summary: Return JSON directly from a Worker script, useful for building APIs and middleware.
demo: https://returning-json.workers-sites-examples.workers.dev
tags:
  - JSON
  - Originless
pcx-content-type: configuration
---

# Return JSON

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
export default {
  fetch() {
    const data = {
      hello: "world",
    };
    const json = JSON.stringify(data, null, 2);
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  },
};
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="80"/>
