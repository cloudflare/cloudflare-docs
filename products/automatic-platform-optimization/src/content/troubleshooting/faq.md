---
title: FAQs
order: 15
---

# Frequently Asked Questions

## Do I still need to create "Edge Cache TTL" page rules with "Cache Level: Cache Everything"?

No, you don't need create Edge Cache TTL page rules. When the WordPress plugin is installed, APO automatically caches content for 30 days and invalidates on change within 30 seconds. However, because APO now supports cache-related page rules, make sure existing page rules don't affect the resources served by APO.

## Does Origin Cache Control override APO?

No. APO ignores Origin Cache Control for caching on the Edge, but APO serves original Origin Cache Control to the client. 

## Why are my browser cache control headers missing with APO?

The browser cache control headers may be missing with APO if you set your browser to cache TTL to "respect existing headers." For example:

```
$ curl -sv -o /dev/null https://example.com/ -H 'Accept: text/html' 2>&1 | grep cache-control
< cache-control: max-age=86400, stale-while-revalidate=86400, stale-if-error=86400
```

##  Is the stale-if-error directive still needed with APO?

No, the stale-if-error directive is not needed because the feature is built into APO.

## When I check the posts and homepage cache status, the response header shows `cf-cache-status: BYPASS`. Is APO working?

When Chrome DevTools is open, Chrome sends `Cache-Control: no-cache` by default. You can uncheck the **Disable cache (while DevTools is open)** setting and see that `cf-cache-status: HIT` and `cf-apo-via: cache` headers will be returned.

## When I check `cf-cache-status` via cURL, `MISS` and `DYNAMIC` are always returned. In my browser, I see `HIT` but other tools return `DYNAMIC`. Is this expected behavior?

Yes, this is expected behavior because the requests must contain `accept: "text/html"`.

## Are Google Fonts optimized when APO is activated?

Yes, Google Fonts are also optimized when APO is activated. You can confirm the optimization by checking the font URLs. For example, the URL will change from `https://fonts.gstatic.com/s/...` to `https://example.com/fonts.gstatic.com/s/...` when the site loads. For proxied fonts, the `cf-apo-via:proxy` header is returned.

## Can I customize query string caching with APO?

For more information on query parameters, see [Query parameters and cached responses](/reference/query-parameters).
