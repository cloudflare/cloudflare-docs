---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/206776797-Understanding-Query-String-Sort
title: Query String Sort
---

# Query String Sort

**Query String Sort** increases cache-hit rates by first sorting query strings into a consistent order before checking the Cloudflare cache.

By default, Cloudflare’s cache treats resources as distinct if their URL query strings are in a different order. For instance, these resources are cached separately:

-   `/video/48088296?title=0&byline=0&portrait=0&color=51a516`
-   `/video/48088296?byline=0&color=51a516&portrait=0&title=0`

Query String Sort changes this behavior. If two query strings exist with the same name, the URL is sorted by the parameter value. For example:

`/example/file?word=alpha&word=beta and /example/file?word=beta&word=alpha`

would be sorted to:

`/example/file?word=alpha&word=beta`

## Availability

{{<feature-table id="cache.query_string_sort">}}

___

## Enable Query String Sort

To enable Query String Sort:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select your account and zone.
3. Go to **Caching** > **Configuration**.
4. For **Enable Query String Sort**, switch the toggle to **On**.

___

## Unexpected behavior with WordPress admin pages

When a site or an application requires exact query string ordering, enabling Query String Sort might cause unexpected behavior.

For example in the WordPress admin UI, you might notice any of the following behaviors:

-   No media appear in the Media Library
-   Inability to customize the site via **Appearance** \> **Customize**
-   Inability to drag any widget to a sidebar in **Appearance** \> **Widgets**
-   Inability to edit menus in **Appearance** \> **Menus**

To understand why this happens, note that WordPress [concatenates JavaScript files](https://wordpress.org/support/article/editing-wp-config-php/#disable-javascript-concatenation) to speed up the administration interface. The way WordPress implements this involves multiple occurrences of _load\[\]_ parameters in the query string, where the order of those parameters is crucial.

### Identifying the problem

The screenshot below shows an example where resources in the Media Library are not rendered correctly and the browser debugging console reveals that the page is throwing an error:

![Resources in the Media Library are not rendered correctly](/images/support/media_library_enabling_query.png)

When the page `load-scripts.php` loads, the browser sends a request to Cloudflare for:

```txt
/wp-admin/load-scripts.php?c=0&load%5B%5D=hoverIntent,common,admin-bar,underscore,shortcode,backbone,wp-util,wp-backbone,media-models,wp-plupload,wp-mediaelement,wp-api-r&load%5B%5D=equest,media-views,media-editor,media-audiovideo,mce-view,imgareaselect,image-edit,media-grid,media,svg-painter&ver=5.0.3
```

With Query String Sort enabled, Cloudflare will then sort the parameters and values in the request query string, resulting in the following:


```txt
/wp-admin/load-scripts.php?c=0&load%5B%5D=equest,media-views,media-editor,media-audiovideo,mce-view,imgareaselect,image-edit,media-grid,media,svg-painter&load%5B%5D=hoverIntent,common,admin-bar,underscore,shortcode,backbone,wp-util,wp-backbone,media-models,wp-plupload,wp-mediaelement,wp-api-r&ver=5.0.3
```

Note that the `load[]` parameters were swapped, as `equest` should come before `hoverIntent` when alphabetically ordered.

When this happens, you will most likely find errors in the browser console, such as:

`_____ is not defined at load-scripts.php?c=0&load[]=...`

This type of error indicates that Query String Sort is inadvertently breaking some WordPress admin page functionality.

After sorting, the query then goes to Cloudflare's cache infrastructure (and to the origin server, if the resource is not in the Cloudflare cache or is not cacheable). The origin server then serves the concatenated scripts, which are ordered differently. Because scripts might depend on other scripts, this process might break dependencies.

### Responding to the issue

Start by analyzing your site or application behavior around the use of query strings. Do you have assets served with multiple possible arrangements of query strings?

For example, you might have an image resizing endpoint or a search form, where the order of query parameters might vary - such as width, height, and version - yet a unique parameter combination points to a single relevant asset.

To minimize problems, consider:

-   Disabling **Query String Sort** for the site if you’re sure that this feature does not add value to any part of your site. Cloudflare disables this option by default in the **Caching** app.
-   Use Cloudflare **Page Rules** to enable **Query String Sort** for URLs where preserving the query string parameter order is not important.
-   Alternatively, use Cloudflare **Page Rules** to disable **Query String Sort** for URLs where a specific parameter order is required. For example, disable Query String Sort for `example.com/wp-admin/load-scripts.php*` or any URLs with similar requirements (replace example.com with your domain name).

To learn more about Page Rules, visit [Understanding and Configuring Cloudflare Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

___

## Related resources

-   [Increasing Cache Hit Rates with Query String Sort](https://blog.cloudflare.com/increasing-cache-hit-rates-with-query-string-sort/)
-   [Best Practice: Caching Everything While Ignoring Query Strings](/cache/troubleshooting/cache-everything-ignore-query-strings/)
