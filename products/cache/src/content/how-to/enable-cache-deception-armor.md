---
pcx-content-type: how-to
---

# Enable Cache Deception Armor

To enable Cache Deception Armor, create a Page Rule. Keep in mind that Cache Deception Armor depends upon [Origin Cache Control](/about/cache-control). A `Cache-Control` header from the origin or [Edge Cache TTL Page Rule](/about/edge-browser-cache-ttl) will override this protection.

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
1. Click **Rules**.
1. From the **Page Rules** tab, click **Create Page Rule**.
1. Enter the URL information and choose the **Cache Deception Armor** setting.
1. Toggle the button to **enabled**.
1. Click **Save and Deploy** when you are done.
