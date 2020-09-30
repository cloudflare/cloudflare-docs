---
order: 10
type: example
summary: Access custom Cloudflare properties and control how Cloudflare features are applied to every request.
demo: https://accessing-the-cloudflare-object.workers-sites-examples.workers.dev
tags:
  - API
  - JSON
  - Originless
---

# Accessing the Cloudflare object

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener("fetch", event => {
  const data =
    event.request.cf !== undefined ?
      event.request.cf :
      { error: "The `cf` object is not available inside the preview." }

  return event.respondWith(
    new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  )
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} height="395"/>
