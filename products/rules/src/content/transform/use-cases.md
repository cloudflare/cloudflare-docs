---
order: 220
---

# Common use cases

<Aside type="warning" header="Important">

This feature is part of an early access experience for selected customers.

</Aside>

The following common use cases illustrate how to perform rewrites of URL components with Transform Rules.

## Rewrite path of welcome page for United Kingdom and Portugal visitors

If you want to have a welcome page in two languages, create two Transform Rules with a static rewrite of the path component:

**Rule #1**

Text in **Expression Editor**:

```txt
http.request.uri.path == "/welcome.html" && ip.geoip.country == "GB"
```

Text after **Path** > **Rewrite to...** > _Static_:

```txt
/welcome-gb.html
```
 
**Rule #2**

Text in **Expression Editor**:

```txt
http.request.uri.path == "/welcome.html" && ip.geoip.country == "PT"
```

Text after **Path** > **Rewrite to...** > _Static_:

```txt
/welcome-pt.html
```

## Rewrite URL query string of blog visitors

To rewrite a request to the `/blog` path to `/blog?sort-by=date`, create a Transform Rule with the following settings:

**Rule #1**

Text in **Expression Editor**:

```txt
http.request.uri.path == "/blog"
```

Text after **Query** > **Rewrite to...** > _Static_: 

```txt
sort-by=date
```

Additionally, set the path rewrite action of the same rule to _Preserve_ so that the URL path doesn’t change.

![Rule configuration for query rewrite in the blog example](../static/transform/use-case-blog.png)

## Rewrite path of archived blog posts

To rewrite all requests to `/news/2012/...` to `/archive/news/2012/...` you must add a reference to the content of the original URL. Create a new Transform Rule and define a dynamic URL path rewrite using an expression:

**Rule #1**

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/news/2012/")
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
concat("/archive", http.request.uri.path)
```

The filter uses the `starts_with()` function all paths starting with `/news/2012/`. The dynamic path rewrite uses the `concat()` function to concatenate a prefix to the original URL path of the HTTP request.

## Rewrite path of moved section of a website

To rewrite everything under `/blog/<x>` to `/marketing/<x>` you must modify the first component of the path (`/blog/`). Use the `regex_replace()` function for this purpose:

**Rule #1**

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/blog/")
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/blog/", "/marketing/")
```

The `regex_replace()` function matches the path component on a regular expression (`^/blog/`) and then provides a replacement for that match (`/marketing/`).

## Rewrite blog archive URLs to support a new URL format

To rewrite the URLs of a blog archive that follow the URL format `/posts/<YYYY>-<MM>-<DD>-<title>` to the new format `/posts/<YYYY>/<MM>/<DD>/<title>`, create the following Transform Rule:

Text in **Expression Editor**:

```txt
http.request.uri.path ~ "^/posts/[0-9]+-[0-9]+-[0-9]+-.*"
```

Text after **Path** > **Rewrite to...** > _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/posts/([0-9]+)-([0-9]+)-([0-9]+)-(.*)$", "/posts/${1}/${2}/${3}/${4}")
```

The function `regex_replace()` also allows you to extract parts of the URL using regular expressions’ capture groups. Create capture groups by putting part of the regular expression in parentheses. You can then reference a capture group using `${<num>}` in the replacement string, where `<num>` is the number of the capture group.

<Aside type="warning" header="Notes">

You can only use the fields under [`http.request.uri`](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#uri-argument-and-value-fields) and [`http.request.headers`](https://developers.cloudflare.com/firewall/cf-firewall-language/fields#http-header-fields) in rewrite expressions.

You can only call the functions `concat()` and `regex_replace()` functions **once** in a rewrite expression. For more on these functions, see [Transformation functions](https://developers.cloudflare.com/firewall/cf-firewall-language/functions#transformation-functions).

</Aside>
