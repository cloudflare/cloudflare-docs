---
order: 
pcx-content-type: reference

---

import StaticResourcesBM from "../_partials/_static-resources-bm.md"

# Static resource protection

Pro, Business, and Enterprise customers can use Cloudflare's bot solutions to protect their static resources from bots.

<Aside type="warning" header="Warning">
If you enable static resource protection, you may block good bots — like mail clients — that routinely fetch static resources. Make sure you understand your existing infrastructure before enabling this feature.
</Aside>

## Super Bot Fight Mode

To enable this feature as a Pro or Business customer or an Enterprise customer without Bot Management:
1. Go to **Firewall** > **Bots**.
1. Select **Configure Super Bot Fight Mode**.
1. For **Static resource protection**, select **On**.

## Bot Management for Enterprise

<StaticResourcesBM/>

## Which files are protected?

Cloudflare defines static resources as files with the following extensions:
```|css|jar|js|jpg|jpeg|gif|ico|png|bmp|pict|csv|doc|docx|xls|xlsx|pdf|ps|pls|ppt|txt|ico|pptx|tif|tiff|ttf|otf|woff|woff2|webp|svg|svgz|eot|eps|ejs|swf|torrent|midi|mid|```