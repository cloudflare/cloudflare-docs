---
order: 1000
type: example
summary: Set a Cron Trigger for your Worker.
tags:
  - Middleware
pcx-content-type: configuration
---

# Cron Triggers

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener('scheduled', event => {
    event.waitUntil(triggerEvent(event.request))
})

async function triggerEvent(request) {
    // Fetch some data
    // Update API
    return new Response("OK")
}
```

## Setting Cron Triggers in Wrangler
If you're deploying with Wrangler, you can set the cron syntax (once per hour shown below) by adding this to your `wrangler.toml`:

```toml
name = "worker"

# ...

[triggers]
crons = ["0 * * * *"] 
```
