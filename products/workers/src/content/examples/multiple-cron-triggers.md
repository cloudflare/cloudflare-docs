---
order: 1000
type: example
summary: Set multiple Cron Triggers on three different schedules.
tags:
  - Middleware
pcx-content-type: configuration
---

# Multiple Cron Triggers

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener("scheduled", (event) => {
  event.waitUntil(triggerEvent(event));
});

async function triggerEvent(event) {
  // Write code for updating your API
  switch (event.cron) {
    // You can set up to three schedules maximum.
    case "*/3 * * * *":
      // Every three minutes
      await updateAPI();
      break;
    case "*/10 * * * *":
      // Every ten minutes
      await updateAPI2();
      break;
    case "*/45 * * * *":
      // Every forty-five minutes
      await updateAPI3();
      break;
  }
  console.log("cron processed");
}
```
