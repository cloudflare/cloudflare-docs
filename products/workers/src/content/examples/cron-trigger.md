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
    event.waitUntil(triggerEvent(event.scheduledTime))
})

async function triggerEvent(scheduledTime) {
    // Fetch some data
    // Update API
    console.log("cron processed")
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

You also can set a different Cron Trigger for each environment in your `wrangler.toml`. You need to put the `[triggers]` table under your chosen environment. For example:

```toml
[env.dev.triggers]
crons = ["0 * * * *"]
```
