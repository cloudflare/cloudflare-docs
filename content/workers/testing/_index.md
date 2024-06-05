---
pcx_content_type: navigation
title: Testing
weight: 9
---

# Testing

Review the tools available for testing and debugging Workers.

{{<directory-listing showDescriptions="true">}}

## Testing comparison matrix

| Feature                                   | Vitest&nbsp;Pool | `unstable_dev()` | Miniflare's&nbsp;API |
| ----------------------------------------- | ---------------- | ---------------- | -------------------- |
| Unit testing                              | ✅               | ❌               | ❌                   |
| Integration testing                       | ✅               | ✅               | ✅                   |
| Loading Wrangler configuration files      | ✅               | ✅               | ❌                   |
| Bindings directly in tests                | ✅               | ❌               | ✅                   |
| Isolated per-test storage                 | ✅               | ❌               | ❌                   |
| Outbound request mocking                  | ✅               | ❌               | ✅                   |
| Multiple Worker support                   | ✅               | 🚧[^1]           | ✅                   |
| Direct access to Durable Object instances | ✅               | ❌               | ❌                   |
| Run Durable Object alarms immediately     | ✅               | ❌               | ❌                   |
| List Durable Objects                      | ✅               | ❌               | ❌                   |
| Testing service Workers                   | ❌               | ✅               | ✅                   |

[^1]: Support for multiple Workers in [`unstable_dev()`](/workers/wrangler/api/#unstable_dev) relies on `wrangler dev`'s service registry which can be unreliable when running multiple tests in parallel.

{{<render file="_testing-pages-functions.md" productFolder="workers">}}
