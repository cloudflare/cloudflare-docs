---
order: 3
---

# Updating your Website for IPFS

It's not required, but it is strongly recommended that websites hosted on IPFS
use only relative links, unless linking to a different domain. This is because
data can be accessed in many different (but ultimately equivalent) ways:

- From your custom domain: https://ipfs.io/index.html
- From a gateway: https://cloudflare-ipfs.com/ipns/ipfs.io/index.html
- By immutable hash: https://cloudflare-ipfs.com/ipfs/QmNksJqvwHzNtAtYZVqFZFfdCVciY4ojTU2oFZQSFG9U7B/index.html

Using only relative links within a web application supports all of these at
once, and gives the most flexibility to the user. The exact method for switching
to relative links, if you don't use them already, depends on the framework you
use.

## Angular, React, Vue

These popular javascript frameworks are covered in a [blog
post](https://medium.com/pinata/how-to-easily-host-a-website-on-ipfs-9d842b5d6a01)
from [Pinata](https://pinata.cloud/). They're fixed with minor config changes.

## Gatsby

Gatsby is a javascript framework based on React. There is a
[plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-ipfs/) for it that
ensures links are relative.

## Jekyll

Add a file `_includes/base.html` with the contents:

```
{% assign base = '' %}
{% assign depth = page.url | split: '/' | size | minus: 1 %}
{% if    depth <= 1 %}{% assign base = '.' %}
{% elsif depth == 2 %}{% assign base = '..' %}
{% elsif depth == 3 %}{% assign base = '../..' %}
{% elsif depth == 4 %}{% assign base = '../../..' %}{% endif %}
```

This snippet computes the relative path back to the root of the website from the
current page. Update any pages that need to link to the root by adding this at
the top:

```
{%- include base.html -%}
```

and prefixing any links with `{{base}}`. So for example, we'd change
`href="/css/main.css"` to be `href="{{base}}/css/main.css"`

## Generic

For other frameworks, or if a framework was not used, there's a script called
[make-relative](https://github.com/tmcw/make-relative) that will parse the HTML
of a website and automatically rewrite links and images to be relative.
