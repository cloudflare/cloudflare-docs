---
title: Page Rule integration with APO
order: 16
---

# Page Rule integration with APO

The following Page rules can control APO. Any changes to Caching page rules require purging the cache for the changes to take effect.

- **Cache Level: Bypass** — APO bypasses pages with response header `cf-apo-via: origin,page-rules`
- **Cache Level: Ignore Query String** — APO ignores all query strings when serving from Cache.
- **Cache Level: Cache Everything** — APO caches pages with all query strings. Default cookies rules still apply. 

  <Aside>

    Automatic page purge via the WordPress plugin won’t clean all cached pages, only pages without query strings. Cached responses will be returned even with request header `cache-control: no-cache`.

  </Aside>

- **Bypass Cache on Cookie (Biz and Ent plans only)** — APO applies custom bypass cookies in addition to the default list.
- **Edge Cache TTL** — APO applies custom Edge TTL instead of 30 days. This page rule is helpful for pages that can generate captchas or nonces.
- **Browser Cache TTL** — APO applies custom Browser TTL for all assets aside from the HTML page. This limitation is due to technical issues we hope to address in future releases.