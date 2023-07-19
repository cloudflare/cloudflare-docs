---
_build:
  publishResources: false
  render: never
  list: never
---

If you find that **Super Bot Fight Mode** is causing problems with your application traffic, you may want to disable it.

To disable Super Bot Fight Mode:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **Bots**.
3. Click **Configure Super Bot Fight Mode**.
4. For all bot groupings (**Definitely automated**, **Verified bots**, etc.), set the value to **Allow**.
5. For all other options (**Static resource protection**, **JavaScript Detections**), make sure the toggles are **Off**.