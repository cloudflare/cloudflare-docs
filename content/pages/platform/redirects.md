---
pcx_content_type: concept
title: Redirects
---

# Redirects

## Creating redirects

To use redirects on Cloudflare Pages, declare your redirects in a plain text file called `_redirects` without a file extension, in the output folder of your project. The [build output folder](/pages/platform/build-configuration/) is project-specific, so the `_redirects` file should not always be in the root directory of the repository. Changes to redirects will be updated to your website at build time so make sure you commit and push the file to trigger a new build each time you update redirects.

Only one redirect can be defined per line and must follow this format:

```txt
[source] [destination] [code?]
```

{{<Aside heading="Status Code">}}
The `[code]` parameter is optional, and when not defined, will default to a `302` status code.
{{</Aside>}}

A complete example with multiple redirects may look like the following:

```txt
---
filename: _redirects
---
/home301 / 301
/home302 / 302
/querystrings /?query=string 301
/twitch https://twitch.tv
/trailing /trailing/ 301
/notrailing/ /nottrailing 301
/blog/* https://blog.my.domain/:splat
/products/:code/:name /products?code=:code&name=:name
```
{{<Aside type= "note">}}

In the case of some frameworks, such as Jekyll, you may need to manually copy and paste your `_redirects` file to the build output directory. To do this:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Pages** > your Pages project > **Settings** > **Builds & deployments**.
3. Go to **Build configurations** > **Edit configurations** > change the build command to `jekyll build && cp _redirects _site/_redirects` and select **Save**.

{{</Aside>}}

A project is limited to 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. Each redirect declaration has a 1,000-character limit. Malformed definitions are ignored. If there are multiple redirects for the same `source` path, the topmost redirect is applied.

{{<Aside type= "note">}}

Make sure that static redirects are before dynamic redirects in your `_redirects` file.

{{</Aside>}}

Cloudflare currently offers limited support for advanced redirects. More support will be added in the future.

{{<table-wrap>}}

| Feature                             | Support | Example                                                         | Notes                                                                                             |
| ----------------------------------- | ------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Redirects (301, 302, 303, 307, 308) | Yes     | `/home / 301`                                                   | 302 is used as the default status code.                                                            |
| Rewrites (other status codes)       | No      | `/blog/* /blog/404.html 404`                                    |                                                                                                   |
| Splats                              | Yes     | `/blog/* /blog/:splat`                                          | Refer to [Splats](#splats).                                                                             |
| Placeholders                        | Yes     | `/blog/:year/:month/:date/:slug /news/:year/:month/:date/:slug` | See [Placeholders](#placeholders)                                                                 |
| Query Parameters                    | No      | `/shop id=:id /blog/:id 301`                                    |                                                                                                   |
| Force                               | Yes     | `/pagethatexists /otherpage`                                    | Redirects are always followed, regardless of whether or not an asset matches the incoming request. |
| Proxying                            | Yes     | `/blog/* /news/:splat 200`                                      | Refer to [Proxying](#proxying)                                                                    |
| Domain-level redirects              | No      | `workers.example.com/* workers.example.com/blog/:splat 301`     |                                                                                                   |
| Redirect by country or language     | No      | `/ /us 302 Country=us`                                          |                                                                                                   |
| Redirect by cookie                  | No      | `/\* /preview/:splat 302 Cookie=preview`                        |                                                                                                   |

{{</table-wrap>}}

### Matching

Redirects execute before headers, so in the case of a request matching rules in both files, the redirect will win out.

#### Splats

On matching, a splat (asterisk, `*`) will greedily match all characters. You may only include a single splat in the URL.

The matched value can be used in the redirect location with `:splat`.

#### Placeholders

A placeholder can be defined with `:placeholder_name`. A colon indicates the start of a placeholder, and the name that follows may be composed of alphanumeric characters and underscores, `:\w+`. A placeholder with any given name can only be used once in the URL. Placeholders match all characters apart from the delimiter, which: when part of the host, is a period or a forward-slash; and when part of the path, is a forward-slash.

Similarly, the matched value can be used in the redirect location with `:placeholder_name`.

#### Proxying

Proxying will only support relative URLs on your site - i.e. you can't proxy external domains.

Only the first redirect will apply, for example, in the following scenario, a request to `/a` will render `/b`, and a request to `/b` will render `/c`, but `/a` will not render `/c`.

```
/a /b 200
/b /c 200
```

Be aware that proxying pages can have an adverse effect on SEO. Search engines often penalize websites that serve duplicate content, so consider adding a Link HTTP header which informs search engines of the canonical source of content.

For example, if you have added `/about/faq/* /about/faqs 200` to your _redirects file, you will likely also want to add the following to your _headers file:

```
/about/faq/*
  Link: </about/faqs>; rel="canonical"
```

## Related resources

- [Transform Rules](/rules/transform/)
