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
addEventListener('scheduled', event =>
{
	event.waitUntil(triggerEvent(event.request))
})

async function triggerEvent(request)
{
	// Fetch some data
	// Update API
	return new Response("OK")
}
/* 
If you're doing this in Wrangler, set the cron syntax (once per hour shown below) by adding this to your wrangler.toml:
[triggers]
crons = ["0 * * * *"] 
*/
```
