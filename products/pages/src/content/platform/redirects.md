# Redirects

## Creating redirects
To use redirects on Cloudflare Pages, declare your redirects in a `_redirects` plain text file in the output folder of your project. The [build output folder](https://developers.cloudflare.com/pages/platform/build-configuration) is project-specific so the `_redirects` file should not always be in the root directory of the repo. Changes to redirects will be updated to your website at build time so make sure you commit and push the file to trigger a new build each time you update redirects.

Redirects can be stated as such with one redirect per line in the form: 

[source] [destination] [code]

```
---
filename: _redirects
---
# These are valid:
/home301 / 301
/home302 / 302
/querystrings /?query=string 301
/twitch https://twitch.tv
/trailing /trailing/ 301
/notrailing/ /nottrailing 301

# This is invalid
https://lol.com https://zombo.com
```
 
There is a limit of 100 redirects and a 1000 character limit per redirect line. Incorrectly formatted lines in the file are ignored. The redirects file is parsed top to bottom. If there are multiple redirects for the same source, the topmost redirect is applied. 

We currently offer limited support for advanced redirects. More support will be added in the future.

<TableWrap>

| Feature                         | Support | Example                                                                  |
| ------------------------------- | ------- | ------------------------------------------------------------------------ |
| Redirects (301, 302)            | Yes     | /home / 301                                                              |
| Rewrites (other status codes)   | No      | /blog/* /blog/404.html 404                                               |
| Splats                          | No      | /blog/* /blog/:splat                                                     |
| Placeholders                    | No      | /blog/:year/:month/:date/:slug /news/:year/:month/:date/:slug            |
| Query Parameters                | No      | /shop id=:id /blog/:id 301                                               |
| Force(shadowing)                | No      | /workers/ /workers/index.html 200!                                       |
| Domain-level redirects          | No      | workers.example.com/* workers.example.com/blog/:splat 301 |
| Redirect by country or language | No      | / /us 302 Country=us                                                     |

</TableWrap>

## How do redirects differ from rewrites?

URL redirects send users to a new destination URL address. This means the URL displayed in their browser changes to the new destination URL.

Rewrites serve the content of the new destination but keep the original URL in the browser. Learn more by reading our blog post about how to use [rewrites using transform rules](https://blog.cloudflare.com/introducing-transform-rules-with-url-rewriting-at-the-edge/).
