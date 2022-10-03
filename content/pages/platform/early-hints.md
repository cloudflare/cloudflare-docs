---
pcx_content_type: concept
title: Early Hints
---

# Early Hints

[Early Hints](/cache/about/early-hints/) help the browser to load webpages faster. Early Hints is enabled automatically on all `pages.dev` domains. It can be [enabled](/cache/about/early-hints/#enabling-early-hints) for your custom domains by logging into the [Cloudflare dashboard](https://dash.cloudflare.com) > selecting your account and domain > **Speed** > **Optimization** and turning on the **Early Hints** toggle.

Early Hints automatically caches any [`preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) and [`preconnect`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect) type [`Link` headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) to send as Early Hints to the browser. The hints are sent to the browser before the full response is prepared, and the browser can figure out how to load the webpage faster for the end user. There are two ways to create these `Link` headers in Pages:

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

Automatic `Link` header generation should not have any negative performance impact on your website. If you find yourself needing to disable this feature, please reach let us know about your circumstance in our [Discord server](https://discord.com/invite/cloudflaredev).

You can remove any automatically generated `Link` headers by adding the following to your `_headers` file:

```txt
---
filename: _headers
---
/*
  ! Link
```
