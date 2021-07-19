---
order: 6
pcx-content-type: concept
---

# Redirects

## Creating redirects

To use redirects on Cloudflare Pages, declare your redirects in a `_redirects` plain text file in the output folder of your project. The [build output folder](https://developers.cloudflare.com/pages/platform/build-configuration) is project-specific so the `_redirects` file should not always be in the root directory of the repo. Changes to redirects will be updated to your website at build time so make sure you commit and push the file to trigger a new build each time you update redirects.

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
```

A project is limited to 100 total redirects. Each redirect declaration has a 1000-character limit. Malformed definitions are ignored. If there are multiple redirects for the same `source` path, the topmost redirect is applied. If the same `source` URL has multiple redirects, the topmost redirect is applied.

We currently offer limited support for advanced redirects. More support will be added in the future.

<TableWrap>

| Feature                         | Support | Example                                                                  |
| ------------------------------- | ------- | ------------------------------------------------------------------------ |
| Redirects (301, 302)            | Yes     | /home / 301                                                              |
| Rewrites (other status codes)   | No      | /blog/* /blog/404.html 404                                               |
| Splats                          | No      | /blog/* /blog/:splat                                                     |
| Placeholders                    | No      | /blog/:year/:month/:date/:slug /news/:year/:month/:date/:slug            |
| Query Parameters                | No      | /shop id=:id /blog/:id 301                                               |
| Force (shadowing)               | No      | /workers/ /workers/index.html 200!                                       |
| Domain-level redirects          | No      | workers.example.com/* workers.example.com/blog/:splat 301 |
| Redirect by country or language | No      | / /us 302 Country=us                                                     |

</TableWrap>


## See also

- [Transform Rules](https://developers.cloudflare.com/rules/transform)
