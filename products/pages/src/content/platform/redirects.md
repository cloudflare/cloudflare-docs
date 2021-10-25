---
order: 6
pcx-content-type: concept
---

# Redirects

## Creating redirects

To use redirects on Cloudflare Pages, declare your redirects in a `_redirects` plain text file in the output folder of your project. The [build output folder](/platform/build-configuration) is project-specific so the `_redirects` file should not always be in the root directory of the repository. Changes to redirects will be updated to your website at build time so make sure you commit and push the file to trigger a new build each time you update redirects.

Only one redirect can be defined per line and must follow this format:

```
[source] [destination] [code?]
```

<Aside heading="Status Code">
  
  The `[code]` parameter is optional, and when not defined, will default to a `302` status code.
  
</Aside>

A complete example with multiple redirects may look like the following:

```
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

A project is limited to 100 total redirects. Each redirect declaration has a 1000-character limit. Malformed definitions are ignored. If there are multiple redirects for the same `source` path, the topmost redirect is applied.

Cloudflare currently offers limited support for advanced redirects. More support will be added in the future.

<TableWrap>

| Feature                                   | Support | Example                                                         | Notes                                  |
| ----------------------------------------- | ------- | --------------------------------------------------------------- | ---------------------------------------|
| Redirects (301, 302, 303, 307, 308)       | Yes     | /home / 301                                                     | 302 is used as the default status code |
| Rewrites (other status codes)             | No      | /blog/* /blog/404.html 404                                      |                                        |
| Splats                                    | Yes     | /blog/* /blog/:splat                                            | See [Splats](#splats)                  |
| Placeholders                              | Yes     | /blog/:year/:month/:date/:slug /news/:year/:month/:date/:slug   | See [Placeholders](#placeholders)      |
| Query Parameters                          | No      | /shop id=:id /blog/:id 301                                      |                                        |
| Force                                     | Yes     | /workers/ /workers/index.html                                   | Redirects are always followed, regardless of whether or not an asset matches the incoming request | 
|Proxying                                   | No      |/blog/* https://blog.my.domain/:splat 200                        |                                        |
| Domain-level redirects                    | Yes     | workers.example.com/* workers.example.com/blog/:splat 301       | Must use HTTPS protocol                |
| Redirect by country or language           | No      | / /us 302 Country=us                                            |                                        |
| Redirect by cookie                        | No      | /* /preview/:splat 302 Cookie=preview                           |                                        |

</TableWrap>

## Matching
Redirects execute before headers, so in the case of a request matching rules in both files, the redirect will win out.
### Splats
On matching, a splat (asterisk, `*`) will greedily match all characters. You may only include a single splat in the URL.

The matched value can be used in the redirect location with `:splat`.
### Placeholders
A placeholder can be defined with `:placeholder_name`. A colon indicates the start of a placeholder, and the name that follows may be composed of alphanumeric characters and underscores, `:\w+`. A placeholder with any given name can only be used once in the URL. Placeholders match all characters apart from the delimiter, which: when part of the host, is a period or a forward-slash; and when part of the path, is a forward-slash.

Similarly, the matched value can be used in the redirect location with `:placeholder_name`.

## Additional information

- [Transform Rules](https://developers.cloudflare.com/rules/transform)
