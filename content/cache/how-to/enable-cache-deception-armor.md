---
pcx-content-type: how-to
---

# Enable Cache Deception Armor

To enable Cache Deception Armor, create a Page Rule. Keep in mind that Cache Deception Armor depends upon [Origin Cache Control](/about/cache-control). A `Cache-Control` header from the origin or [Edge Cache TTL Page Rule](/about/edge-browser-cache-ttl) will override this protection.

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
2.  Click **Rules**.
3.  From the **Page Rules** tab, click **Create Page Rule**.
4.  Enter the URL information and choose the **Cache Deception Armor** setting.
5.  Toggle the button to **enabled**.
6.  Click **Save and Deploy** when you are done.
