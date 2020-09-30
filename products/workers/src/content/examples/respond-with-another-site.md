---
order: 11
type: example
summary: Respond to the Worker request with the response from another website (example.com in this example).
demo: https://respond-with-another-site.workers-sites-examples.workers.dev
tags:
  - Proxy
---

# Respond with another site

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener("fetch", event => {
  return event.respondWith(
    fetch("https://example.com")
  )
})
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} aspectRatio={16/9}/>
