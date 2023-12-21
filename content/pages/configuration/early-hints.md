---
pcx_content_type: concept
title: Early Hints
---

# Early Hints

[Early Hints](/cache/advanced-configuration/early-hints/) help the browser to load webpages faster. Early Hints is enabled automatically on all `pages.dev` domains. [To enable](/cache/advanced-configuration/early-hints/#enable-early-hints) Early Hints for your custom domains:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com). 
2. Select your account and zone.
3. Go to **Speed** > **Optimization** > **Content Optimization**.
4. Turn on the **Early Hints** toggle.

Early Hints automatically caches any [`preload`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload) and [`preconnect`](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preconnect) type [`Link` headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) to send as Early Hints to the browser. The hints are sent to the browser before the full response is prepared, and the browser can figure out how to load the webpage faster for the end user. There are two ways to create these `Link` headers in Pages:

## Configure Early Hints

Early Hints can be created with either of the two methods detailed below.

### 1. Configure your `_headers` file

Create custom headers using the [`_headers` file](/pages/platform/headers/). If you include a particular stylesheet on your `/blog/` section of your website, you would create the following rule:

```txt
---
filename: _headers
---
/blog/*
  Link: </styles.css>; rel=preload; as=style
```

Pages will attach this `Link: </styles.css>; rel=preload; as=stylesheet` header. Early Hints will then emit this header as an Early Hint once cached.

### 2. Automatic `Link` header generation

In order to make the authoring experience easier, Pages also automatically generates `Link` headers from any `<link>` HTML elements with any of the following attributes:

- `href`
- `as`
- `rel` (`preload` or `preconnect`)

`<link>` elements which contain any other additional attributes (for example, `fetchpriority`, `crossorigin` or `data-do-not-generate-a-link-header`) will not be used to generate `Link` headers in order to prevent accidentally losing any custom prioritization logic that would otherwise be dropped as an Early Hint.

This allows you to directly create Early Hints as you are writing your document, without needing to alternate between your HTML and `_headers` file.

```html
---
filename: /blog/index.html
---

<html>
  <head>
    <link rel="preload" href="/style.css" as="style" />
    <link rel="stylesheet" href="/style.css" />
  </head>
</html>
```

### Disable automatic `Link` header generation Automatic `Link` header

Remove any automatically generated `Link` headers by adding the following to your `_headers` file:

```txt
---
filename: _headers
---
/*
  ! Link
```

{{<Aside type="warning">}}

Automatic `Link` header generation should not have any negative performance impact on your website. If you need to disable this feature, contact us by letting us know about your circumstance in our [Discord server](https://discord.com/invite/cloudflaredev).

{{</Aside>}}