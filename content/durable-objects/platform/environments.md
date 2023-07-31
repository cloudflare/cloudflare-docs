---
title: Environments
pcx_content_type: concept
weight: 16
---

# Environments

If you are using Wrangler [environments](/workers/wrangler/environments/), you must specify any Durable Object bindings you wish to use on a per-environment basis. 

Durable Object bindings are not inherited. For example, you can define an environment named `staging` as below:

```toml
---
filename: wrangler.toml
---
[env.staging]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample"}
]
```

Because Wrangler appends the [environment name](/workers/wrangler/environments/) to the top-level name when publishing, for a Worker named `worker-name` the above example is equivalent to:

```toml
---
filename: wrangler.toml
---
[env.staging]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name-staging"}
]
```

`"EXAMPLE_CLASS"` in the staging environment is bound to a different Worker script name compared to the top-level `"EXAMPLE_CLASS"` binding, and will therefore access different Durable Objects with different persistent storage. 

If you want an environment-specific binding that accesses the same objects as the top-level binding, specify the top-level Worker script name explicitly:

```toml
---
filename: wrangler.toml
---
[env.another]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name"}
]
```
