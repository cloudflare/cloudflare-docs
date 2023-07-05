---
title: Purge cache by cache-tags
pcx_content_type: concept
weight: 3
---

# Purge cache by cache-tags (Enterprise only)

Cache-tag purging makes multi-file purging easier because you can bulk purge by adding cache-tags to your assets, such as web pages, image files, and more. Note that Tag, Hostname and Prefix purges are only available for Cloudflare Enterprise.

## General workflow for cache-tags

1. Add tags to the `Cache-Tag HTTP` response header from your origin web server for your web content, such as pages, static assets, etc.
2. [Ensure your web traffic is proxied](/dns/manage-dns-records/reference/proxied-dns-records/) through Cloudflare.
3. Cloudflare associates the tags in the `Cache-Tag HTTP` header with the content being cached.
4. Use specific cache-tags to purge your Cloudflare CDN cache of all content containing that cache-tag from your dashboard or [using our API](/api/operations/zone-purge).
5. Cloudflare forces a [cache miss](/cache/concepts/default-cache-behavior/#cloudflare-cache-responses) on content with the purged cache-tag.

{{<Aside type="warning" header="Warning">}}

Be careful when purging. A cache miss can cause execution delays by requiring a fetch from your origin server.

{{</Aside>}}

## Add Cache-Tag HTTP response headers

You add cache-tags to your web content in Cache-Tag HTTP response headers to allow the client and server to pass additional information in requests or responses. HTTP headers consist of a specific case-insensitive name followed by a colon `:` and the valid value, for example, `Cache-Tag:tag1,tag2,tag3`. Use commas to separate the tags when you want to use multiple cache-tags.

When your content reaches our edge network, Cloudflare:

- Removes the `Cache-Tag HTTP` header before sending the response to your website visitor. Your end users never see `Cache-Tag HTTP` headers on your Cloudflare-enabled website.
- Removes whitespaces from the header and any before and after cache-tag names: `tag1`, `tag2` and `tag1,tag2` are considered the same.
- Removes all repeated and trailing commas before applying cache-tags: `tag1,,,tag2` and `tag1,tag2` are considered the same.

## A few things to remember

- A single HTTP response can have more than one `Cache-Tag HTTP` header field.
- The minimum length of a cache-tag is one byte.
- Individual tags do not have a maximum length, but the aggregate `Cache-Tag HTTP` header cannot exceed 16 KB after the header field name, which is approximately 1,000 unique tags. Length includes whitespace and commas but does not include the header field name.
- For cache purges, the maximum length of a cache-tag in an API call is 1,024 characters.
- The `Cache-Tag HTTP` header must only contain UTF-8 encoded characters.
- Spaces are not allowed in cache-tags.
- Case does not matter. For example, `Tag1` and `tag1` are considered the same.

## Purge using cache-tags

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select **Caching** > **Configuration**.
3. Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
4. Under **Purge by**, select **Tag**.
5. In the text box, enter your tags to use to purge the cached resources. To purge multiple cache-tagged resources, separate each tag with a comma or have one tag per line.
6. Select **Purge**.

{{<Aside type="note" header="API">}}

You can purge using cache-tags via the Cloudflare API. For more information, refer to the [API documentation](/api/operations/zone-purge). You can purge up to 30 cache-tags per API call and up to 250,000 cache-tags per a 24-hour period.

{{</Aside>}}
