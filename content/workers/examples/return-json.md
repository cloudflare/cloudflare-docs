---
type: example
summary: Return JSON directly from a Worker script, useful for building APIs and
  middleware.
demo: https://returning-json.workers-sites-examples.workers.dev
tags:
  - JSON
  - Originless
pcx-content-type: configuration
title: Return JSON
weight: 2
layout: example
---

# Return JSON

{{<content-column>}}
  <p>{props.frontmatter.summary}</p>
{{</content-column>}}

```js
addEventListener("fetch", event => {
  const data = {
    hello: "world"
  }

  const json = JSON.stringify(data, null, 2)

  return event.respondWith(
    new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  )
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="80"/>
