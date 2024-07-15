---
_build:
  publishResources: false
  render: never
  list: never
---

Move to a terminal window, and use the following command to [create a Hyperdrive](/hyperdrive/get-started/):

```sh
$ npx wrangler hyperdrive create pgedge --connection-string="<PGEDGE_CONNECTION_STRING>"
```

When the command completes, it will return information about the Hyperdrive, including the Hyperdrive UUID. Copy the ID, and update the `wrangler.toml` file to include the following information:

```toml
node_compat = true # required for the postgres connection

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "hyperdrive_uuid"
```
