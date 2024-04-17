---
_build:
  publishResources: false
  render: never
  list: never
---

```toml
---
filename: wrangler.toml
---
name = "my-worker-dev"

[vars]
API_HOST = "example.com"
API_ACCOUNT_ID = "example_user"
SERVICE_X_DATA = { URL = "service-x-api.dev.example", MY_ID = 123 }
```