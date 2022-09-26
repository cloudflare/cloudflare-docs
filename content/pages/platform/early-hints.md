---
pcx_content_type: concept
title: Early Hints
---

# Early Hints

[Early Hints](https://developers.cloudflare.com/cache/about/early-hints/) is enabled automatically on all `pages.dev` domains. [It can be enabled for your any custom domains](https://developers.cloudflare.com/cache/about/early-hints/#enabling-early-hints) by navigating to **Speed** > **Optimization** and toggling the "Early Hints" setting in the dashboard.

Early Hints automatically caches any [`preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) and [`preconnect`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect) type [`Link` headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) to send as Early Hints. There are two ways to create these `Link` headers in Pages:

## 1. Using a `_headers` file

Custom headers can be created by using the [`_headers` file](/pages/platform/headers/). For example, if you include a particular stylesheet on your `/blog/` section of your website, you can create the following rule:

```txt
---
filename: _headers
---
/blog/*
  Link: </styles.css>; rel=preload; as=stylesheet
```

Pages will then attach this `Link: </styles.css>; rel=preload; as=stylesheet` header, which Early Hints will then emit as an Early Hint once cached.

## 2. Automatic `Link` header generation

In order to make the authoring experience easier, Pages also automatically generates `Link` headers from any `<link>` HTML elements with any of the following attributes:

- `href`
- `as`
- `rel` (`preload` or `preconnect`)

Note: `<link>` elements which contain any other additional attributes (e.g. `fetchpriority`, `crossorigin` or `data-do-not-generate-a-link-header`) will not be used to generate `Link` headers in order to prevent accidentally losing any custom prioritization logic that would otherwise be dropped as an Early Hint.

This allows you to directly create Early Hints as you're authoring your document, without needing to flick between your HTML and `_headers` file.

```html
---
filename: /blog/index.html
---

<html>
  <head>
    <link rel="preload" href="/style.css" as="stylesheet" />
    <link rel="stylesheet" href="/style.css" />
  </head>
</html>
```

### Disabling automatic `Link` header generation Automatic `Link` header

Automatic `Link` header generation should not have any negative performance impact on your website. If
you find yourself needing to disable this feature, please get in touch with us!

You can remove any automatically generated `Link` headers by adding the following to your `_headers` file:

```txt
---
filename: _headers
---
/*
  ! Link
```
