---
pcx-content-type: configuration
title: URL rewrite examples
weight: 4
---

# URL rewrite examples

The following examples illustrate how to perform URL rewrites with Transform Rules:

- [Rewrite path of welcome page for visitors in specific countries](#rewrite-path-of-welcome-page-for-visitors-in-specific-countries)
- [Rewrite URL query string of blog visitors](#rewrite-url-query-string-of-blog-visitors)
- [Rewrite path of archived blog posts](#rewrite-path-of-archived-blog-posts)
- [Rewrite path of moved section of a website](#rewrite-path-of-moved-section-of-a-website)
- [Rewrite path with several URL segments to a different URL segment](#rewrite-path-with-several-url-segments-to-a-different-url-segment)
- [Rewrite blog archive URLs to support a new URL format](#rewrite-blog-archive-urls-to-support-a-new-url-format)

### Rewrite path of welcome page for visitors in specific countries

To have a welcome page in two languages, create two URL Rewrite Rules with a static rewrite of the path component:

**URL Rewrite Rule #1**

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.uri.path == &quot;/welcome.html&quot; &amp;&amp; ip.geoip.country == &quot;GB&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Path** > **Rewrite to...** > _Static_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/welcome-gb.html</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

**URL Rewrite Rule #2**

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.uri.path == &quot;/welcome.html&quot; &amp;&amp; ip.geoip.country == &quot;PT&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Path** > **Rewrite to...** > _Static_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/welcome-pt.html</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

### Rewrite URL query string of blog visitors

To rewrite a request to the `/blog` path to `/blog?sort-by=date`, create a URL Rewrite Rule with the following settings:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.uri.path == &quot;/blog&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Query** > **Rewrite to...** > _Static_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">sort-by=date</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

Additionally, set the path rewrite action of the same rule to _Preserve_ so that the URL path does not change.

![Rule configuration for query rewrite in the blog example](/rules/static/transform/use-case-blog.png)

### Rewrite path of archived blog posts

To rewrite all requests to `/news/2012/...` to `/archive/news/2012/...` you must add a reference to the content of the original URL. Create a new URL Rewrite Rule and define a dynamic URL path rewrite using an expression:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">starts_with(http.request.uri.path, &quot;/news/2012/&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Path** > **Rewrite to...** > _Dynamic_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">concat(&quot;/archive&quot;, http.request.uri.path)</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

The filter uses the `starts_with()` function all paths starting with `/news/2012/`. The dynamic path rewrite uses the `concat()` function to concatenate a prefix to the original URL path of the HTTP request.

### Rewrite path of moved section of a website

To rewrite everything under `/blog/<x>` to `/marketing/<x>` you must modify the first component of the path (`/blog/`). Create a URL Rewrite Rule and use the `regex_replace()` function for this purpose:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">starts_with(http.request.uri.path, &quot;/blog/&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Path** > **Rewrite to...** > _Dynamic_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">regex_replace(http.request.uri.path, &quot;^/blog/&quot;, &quot;/marketing/&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

The `regex_replace()` function matches the path component on a regular expression (`^/blog/`) and then provides a replacement for that match (`/marketing/`).

### Rewrite path with several URL segments to a different URL segment

To rewrite paths like `/images/<folder1>/<folder2>/<filename>` — where `<folder1>`, `<folder2>`, and `<filename>` can vary — to `/img/<filename>`, create a URL Rewrite Rule with a dynamic rewrite of the path component:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.uri.path ~ &quot;^/images/[^/]+/[^/]+/[^/]+$&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Path** > **Rewrite to...** > _Dynamic_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">regex_replace(http.request.uri.path, &quot;^/images/[^/]+/[^/]+/(.+)$&quot;, &quot;/img/${1}&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

For example, this rule would rewrite the `/images/nature/animals/tiger.png` path to `/img/tiger.png`.

### Rewrite blog archive URLs to support a new URL format

To rewrite the URLs of a blog archive that follow the URL format `/posts/<YYYY>-<MM>-<DD>-<title>` to the new format `/posts/<YYYY>/<MM>/<DD>/<title>`, create the following URL Rewrite Rule:

{{<example>}}

Text in **Expression Editor**:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">http.request.uri.path ~ &quot;^/posts/[0-9]+-[0-9]+-[0-9]+-.*&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Text after **Path** > **Rewrite to...** > _Dynamic_:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">regex_replace(http.request.uri.path, &quot;^/posts/([0-9]+)-([0-9]+)-([0-9]+)-(.*)$&quot;, &quot;/posts/${1}/${2}/${3}/${4}&quot;)</span></div></span></span></span></code></pre>{{</raw>}}

{{</example>}}

The function `regex_replace()` also allows you to extract parts of the URL using regular expressions' capture groups. Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.
