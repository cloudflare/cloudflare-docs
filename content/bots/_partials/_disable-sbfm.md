---
_build:
  publishResources: false
  render: never
  list: never
---

If you find that **Super Bot Fight Mode** is causing problems with your application traffic, you may want to disable it.

To disable Super Bot Fight Mode:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
1. Go to **Security** > **Bots**.
1. Click **Configure Super Bot Fight Mode**.
1. For all bot groupings (**Definitely automated**, **Verified bots**, etc.), set the value to **Allow**.
1. For all other options (**Static resource protection**, **JavaScript Detections**), make sure the toggles are **Off**.