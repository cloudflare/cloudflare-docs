---
_build:
  publishResources: false
  render: never
  list: never
---

```mermaid
flowchart TD;
    User-->|Sends Request|Cloudflare;
    Cloudflare-->B>Has cached content?];
    B-->|Yes - Requested content|User;
    B-->|No|C[Application];
    C -->D>Has cached content?];
    D-->|Yes - Requested content|User;
    D-->|No|Origin;
    Origin-->|Requested content|User;
```