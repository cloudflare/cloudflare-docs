---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360023040812-Best-Practice-Caching-Everything-While-Ignoring-Query-Strings
title: Cache Everything while ignoring query strings
---

# Cache Everything while ignoring query strings

There might be times when you wish to cache content resources that are not in the list of file extensions that Cloudflare [caches by default](/cache/concepts/default-cache-behavior/), such as HTML files. But you would also like to maximize caching a resource even when it’s served via a URL that contains varying query strings. For example, you want to ensure that the resource (`form.html`) associated with the following URLs is cached in the Cloudflare edge network:

```txt
https://www.example.com/support/form.html?param1=abc&param2=def

https://www.example.com/support/form.html?param1=ghi&param2=jkl

https://www.example.com/support/form.html?param1=stu&param2=vwx
```
___

## Page Rules limitations

By default, Cloudflare Page Rules does not allow creating a rule that combines the two options mentioned in the use case above.

Currently, you can pick just one **Cache Level** setting per page rule. As such, for the options discussed in this use case, you could only pick either _Cache Everything_ or _Ignore Query String_.

The _Cache Everything_ setting forces Cloudflare to consider all content that matches the page rule URL pattern as potentially cacheable. Whether we actually store the asset and for how long is determined by the **Cache-Control** headers returned with responses from the origin server. Learn more about [Origin Cache Control](/cache/concepts/cache-control/).

_Ignore Query String_ modifies the cache key used at the Cloudflare edge to improve cache hit rates by reducing the number of unnecessary variations of an object that could be stored. It does so by storing and serving the same object from the edge regardless of any query string key value pairs appearing in the request path.

If you’re an Enterprise customer, you can get around these limitations by using Cloudflare [Custom Cache Keys](/cache/how-to/cache-keys/). You can request your cache keys from your Cloudflare Solutions Engineer.

___

## Option 1 - Use Cloudflare Cache Keys in Page Rules

Once your cache key is activated for your Enterprise domain, you can add it to Page Rules as shown below:

![Best Practice: Caching Everything While Ignoring Query Strings
](/images/support/hc-import-cf_page_rules_custom_cache_key.png)

In this example, the rule enforces the ignore query string cache key `${uri\_iqs` behaviour for all HTML pages and allows the rule creator to set the **Cache Level**: _Cache Everything_ setting that is also needed.

___

## Option 2 - Use Cloudflare Cache Keys with a Worker

You can also achieve this type of caching in Enterprise domains by [using Cloudflare Workers](/workers/examples/cache-using-fetch/).

Here is an example recipe:

```js
addEventListener('fetch', event => {
     event.respondWith(fetchAndApply(event.request))
})

asyncfunction fetchAndApply(request) {
     let url = new URL(request.url)

     // Only use the path for the cache key, removing query strings
     // e.g. https://www.example.com/some-form.html
     let cacheKey = `${url.protocol}//${url.hostname}${url.pathname}`

     // Force response to be cached for 1 month
     return fetch(url, {
          cf: {
            cacheTtl: 2419200,
            cacheKey: cacheKey
          }
     })
}
```

This recipe tells Cloudflare to intercept every HTTP request matching the route it is applied to, store the scheme (in this example, `https`), the hostname (`www.example.com`), the path (`/some-form.html`) but not the query strings (if any) as the cache key. The _Edge Cache TTL_ is set to 2,419,200 seconds and enforces the same logic as Cache Everything.

In order to apply the custom cache key to specific paths or file extensions, it may be necessary to add additional logic to the Worker or apply the code to multiple different Worker routes. Refer to the [Workers documentation](/workers/) for further details or contact your Solutions Engineer.

___

## Related resources

-   [Understanding and Configuring Cloudflare Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/)
-   [Using Custom Cache Keys](/cache/how-to/cache-keys/)
-   [How do I use Cache Everything with Cloudflare?](/cache/concepts/customize-cache/)
