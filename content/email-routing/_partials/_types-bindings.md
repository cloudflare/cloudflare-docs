---
_build:
  publishResources: false
  render: never
  list: never
---

You can add one or more types of bindings to your `wrangler.toml` file. However, each attribute must be on its own line:

```toml
send_email = [
    {type = "send_email", name = "<NAME_FOR_BINDING1>"},
   	{type = "send_email", name = "<NAME_FOR_BINDING2>", destination_address = "<YOUR_EMAIL>@example.com"},
   	{type = "send_email", name = "<NAME_FOR_BINDING3>", allowed_destination_addresses = ["<YOUR_EMAIL>@example.com", "<YOUR_EMAIL2>@example.com"]},
]
```