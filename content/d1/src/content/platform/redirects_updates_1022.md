---
order: 6
pcx-content-type: concept
---

# Headers

## Attaching headers

To attach headers to Cloudflare Pages responses, create a `_headers` plain text file in the output folder of your project. The [build output folder](https://developers.cloudflare.com/pages/platform/build-configuration) is project-specific so the `_headers` file should not always be in the root directory of the repository. Changes to headers will be updated to your website at build time so make sure you commit and push the file to trigger a new build each time you update headers.

Headers are defined in sections over multiple lines. To begin a section, you must define the matching rules for which requests these headers will be applied to. Second, you define the headers which are applied.


```
[url]
  [name]: [value]
```

You can define as many `[name]: [value]` pairs as you require on subsequent lines. For example:

**_headers``` //how do i fix this
```
/secure/page
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer

/static/*
  Access-Control-Allow-Origin: *
  X-Robots-Tag: nosnippet

https://myproject.pages.dev/*
  X-Robots-Tag: noindex

```


<TableWrap>

| Request URL                                   | Headers                           | 
| --------------------------------------------  | --------------------------------- | 
| https://custom.domain/secure/page             | X-Frame-Options: DENY             |
                                                  X-Content-Type-Options: nosniff   
                                                  Referrer-Policy: no-referrer      
| https://custom.domain/static/image.jpg        | Access-Control-Allow-Origin: *    |
                                                  X-Robots-Tag: nosnippet
| https://myproject.pages.dev/home              | X-Robots-Tag: noindex             |
| https://myproject.pages.dev/secure/page       | X-Frame-Options: DENY             |
                                                  X-Content-Type-Options: nosniff
                                                  Referrer-Policy: no-referrer
                                                  X-Robots-Tag: noindex
| https://myproject.pages.dev/static/styles.css | Access-Control-Allow-Origin: *    |
                                                  X-Robots-Tag: nosnippet, noindex

</TableWrap>

## Matching
The same matching rules apply to both `_redirects` and `_headers`. Note however, that redirects are applied before headers, so in the case of a request matching rules in both files, the redirect will win out.

### Splats
On matching, a splat (asterisk, `*`) will greedily match all characters. You may only include a single splat in the URL.

The matched value can be used in the header values with `:splat`.
### Placeholders
A placeholder can be defined with `:placeholder_name`. A colon indicates the start of a placeholder, and the name that follows may be composed of alphanumeric characters and underscores, `:\w+`. A placeholder with any given name can only be used once in the URL. Placeholders match all characters apart from the delimiter, which: when part of the host, is a period or a forward-slash; and when part of the path, is a forward-slash.

Similarly, the matched value can be used in the header values with `:placeholder_name`.

## Examples

### Cross-Origin Resource Sharing (CORS)
To enable other domains to fetch every asset from your Pages project, the following can be added to the `_headers` file:

**_headers**
```
/*
  Access-Control-Allow-Origin: *
```

To be more restrictive, you can use placeholder matching to, for example, allow access from a staging branch on a subdomain:

**_headers**
```
https://:project.pages.dev/*
  Access-Control-Allow-Origin: https://staging.:project.pages.dev/
```

### Prevent your pages.dev deployments showing in search results
[Google](https://developers.google.com/search/docs/advanced/robots/robots_meta_tag#directives) and other search engines often support the `X-Robots-Tag` header to hint at how you wish your website to be included in their search results.

For example, to prevent your pages.dev deployment from being indexed, you can add the following to your `_headers` file:

**_headers**
```
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

### Harden security for an application
You can prevent click-jacking by informing browsers not to embed your application inside another (e.g. with an `<iframe>`) with a [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) header.


[`X-Content-Type-Options: nosniff`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options) prevents browsers from interpreting a response as any other content-type than what is defined with the `Content-Type` header.

[`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) allows you to customize how much information visitors give about where they're coming from when they navigate away from your page.

Browser features can be disabled to varying degrees with the [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) header (recently renamed from `Feature-Policy`).

And if you need fine-grained control over the content in your application, the [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) header allows you to configure a number of security settings, including similar controls to the X-Frame-Options header.

**_headers**
```
/app/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Permissions-Policy: document-domain=()
  Content-Security-Policy: script-src 'self'; frame-ancestors 'none';
```



