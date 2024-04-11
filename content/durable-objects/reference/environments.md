---
title: Environments
pcx_content_type: concept
weight: 9
---

# Environments

[Wrangler](/workers/wrangler/install-and-update/) allows you to deploy the same Worker application with different configuration for each [environment](/workers/wrangler/environments/).

If you are using Wrangler environments, you must specify any [Durable Object bindings](/workers/configuration/bindings/#durable-object-bindings) you wish to use on a per-environment basis. 

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

`"EXAMPLE_CLASS"` in the staging environment is bound to a different Worker code name compared to the top-level `"EXAMPLE_CLASS"` binding, and will therefore access different Durable Objects with different persistent storage. 

If you want an environment-specific binding that accesses the same Objects as the top-level binding, specify the top-level Worker code name explicitly:

```toml
---
filename: wrangler.toml
---
[env.another]
durable_objects.bindings = [
  {name = "EXAMPLE_CLASS", class_name = "DurableObjectExample", script_name = "worker-name"}
]
```