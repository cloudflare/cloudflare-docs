---
order: 11
type: example
summary: Respond to the Worker request with the response from another website (example.com in this example).
demo: https://respond-with-another-site.workers-sites-examples.workers.dev
tags:
  - Middleware
pcx-content-type: configuration
---

# Respond with another site

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
export default {
  async fetch(request) {
    // Only allow GET requests
    if (request.method === "GET") {
      return fetch(`https://example.com`);
    }
    return new Response(`Method ${request.method} not allowed.`, {
      status: 405,
      headers: {
        Allow: "GET",
      },
    });
  },
};
```

## Demo

<p><a href={props.frontmatter.demo}>Open demo</a></p>

<Demo src={props.frontmatter.demo} title={props.frontmatter.summary} aspectRatio={16/9}/>
