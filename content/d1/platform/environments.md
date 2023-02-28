---
title: Environments
pcx_content_type: configuration
---

# Environments

Environments are different contexts that your code runs in. The Cloudflare developer platform allows you to create and manage different environments. Through environments, you can deploy the same project to multiple places under multiple names.

To specify different D1 databases for different environments, use the following syntax in your `wrangler.toml` file:

```toml
# This is a staging environment
[env.staging]
d1_databases = [
    { binding = "<BINDING_NAME_1>", database_name = "<DATABASE_NAME_1>", database_id = "<UUID1>" },
]

# This is a production environment
[env.production]
d1_databases = [
    { binding = "<BINDING_NAME_2>", database_name = "<DATABASE_NAME_2>", database_id = "<UUID2>" },
]
```

In the code above, the `staging` environment is using a different database (`DATABASE_NAME_1`) than the `production` environment (`DATABASE_NAME_2`).