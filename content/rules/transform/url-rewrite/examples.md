---
pcx_content_type: configuration
title: URL rewrite examples
weight: 4
---

# URL rewrite examples

The following examples illustrate how to rewrite URLs with Transform Rules:

- [Rewrite path of welcome page for visitors in specific countries](#rewrite-path-of-welcome-page-for-visitors-in-specific-countries)
- [Rewrite URL query string of blog visitors](#rewrite-url-query-string-of-blog-visitors)
- [Rewrite path of archived blog posts](#rewrite-path-of-archived-blog-posts)
- [Rewrite path of moved section of a website](#rewrite-path-of-moved-section-of-a-website)
- [Rewrite path with several URL segments to a different URL segment](#rewrite-path-with-several-url-segments-to-a-different-url-segment)
- [Rewrite blog archive URLs to support a new URL format](#rewrite-blog-archive-urls-to-support-a-new-url-format)

---

## Rewrite path of welcome page for visitors in specific countries

To have a welcome page in two languages, create two rewrite URL rules with a static rewrite of the path component:

**Rewrite URL rule #1**

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path == "/welcome.html" && ip.geoip.country == "GB"
```

Text after **Path** > **Rewrite to...** > _Static_:

```txt
/welcome-gb.html
```

{{</example>}}

**Rewrite URL rule #2**

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path == "/welcome.html" && ip.geoip.country == "PT"
```

Text after **Path** > **Rewrite to...** > _Static_:

```txt
/welcome-pt.html
```

{{</example>}}

## Rewrite URL query string of blog visitors

To rewrite a request to the `/blog` path to `/blog?sort-by=date`, create a rewrite URL rule with the following settings:

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path == "/blog"
```

Text after **Query** > **Rewrite to...** > _Static_:

```txt
sort-by=date
```

{{</example>}}

Additionally, set the path rewrite action of the same rule to _Preserve_ so that the URL path does not change.

![Rewrite URL rule configuration to perform a static query rewrite according to the blog example described in the page.](/images/rules/transform/use-case-blog.png)

## Rewrite path of archived blog posts

To rewrite all requests to `/news/2012/...` to `/archive/news/2012/...` you must add a reference to the content of the original URL. Create a new rewrite URL rule and define a dynamic URL path rewrite using an expression:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/news/2012/")
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
concat("/archive", http.request.uri.path)
```

{{</example>}}

The filter uses the `starts_with()` function all paths starting with `/news/2012/`. The dynamic path rewrite uses the `concat()` function to concatenate a prefix to the original URL path of the HTTP request.

## Rewrite path of moved section of a website

To rewrite everything under `/blog/<x>` to `/marketing/<x>` you must modify the first component of the path (`/blog/`). Create a rewrite URL rule and use the `regex_replace()` function for this purpose:

{{<example>}}

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/blog/")
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/blog/", "/marketing/")
```

{{</example>}}

The `regex_replace()` function matches the path component on a regular expression (`^/blog/`) and then provides a replacement for that match (`/marketing/`).

## Rewrite path with several URL segments to a different URL segment

To rewrite paths like `/images/<folder1>/<folder2>/<filename>` — where `<folder1>`, `<folder2>`, and `<filename>` can vary — to `/img/<filename>`, create a rewrite URL rule with a dynamic rewrite of the path component:

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path ~ "^/images/[^/]+/[^/]+/[^/]+$"
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/images/[^/]+/[^/]+/(.+)$", "/img/${1}")
```

{{</example>}}

For example, this rule would rewrite the `/images/nature/animals/tiger.png` path to `/img/tiger.png`.

## Rewrite blog archive URLs to support a new URL format

To rewrite the URLs of a blog archive that follow the URL format `/posts/<YYYY>-<MM>-<DD>-<title>` to the new format `/posts/<YYYY>/<MM>/<DD>/<title>`, create the following rewrite URL rule:

{{<example>}}

Text in **Expression Editor**:

```txt
http.request.uri.path ~ "^/posts/[0-9]+-[0-9]+-[0-9]+-.*"
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/posts/([0-9]+)-([0-9]+)-([0-9]+)-(.*)$", "/posts/${1}/${2}/${3}/${4}")
```

{{</example>}}

The function `regex_replace()` also allows you to extract parts of the URL using regular expressions' capture groups. Create capture groups by putting part of the regular expression in parentheses. Then, reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.
