---
pcx_content_type: reference
title: Wildcard matching
meta:
    title: Wildcard matching | Page Rules (legacy)
weight: 5
---

# Wildcard matching and referencing

You can use the asterisk (`*`) in any URL segment to match certain patterns. For example, `example.com/t*st` would match:

- `example.com/test`
- `example.com/toast`
- `example.com/trust`

`example.com/foo/* `does not match `example.com/foo`, but `example.com/foo*` does match.

{{<render file="_page-rules-migration.md">}}

## Helpful tips

- To match both `http` and `https`, write `example.com`. Writing `*example.com` is unnecessary.
- To match every page on a domain, write `example.com/*`. Writing `example.com` will not work.
- To match every page on a domain and its subdomains, write `*example.com/*`. Writing `example.com` will not work.
- A wildcard (`*`) in a page rule URL will match even if no characters are present and may include any part of the URL, including the query string.

## Reference wildcard matches

You can reference a matched wildcard later using the `$<X>` syntax, where `<X>` indicates the index of a glob pattern. For example, `$1` represents the first wildcard match and `$2` represents the second wildcard match.

The `$<X>` syntax is especially useful with the _Forwarding URL_ setting. For example, you could forward `http://*.example.com/*` to `http://example.com/images/$1/$2.jpg`.

This rule would match `http://cloud.example.com/flare.jpg`, which would be forwarded to `http://example.com/images/cloud/flare.jpg`.

To add a `$` character in the forwarding URL, escape it by adding a backslash `\` in front like `\$`.

{{<Aside type="warning" header="Warning">}}

Avoid creating a redirect where the domain points to itself as the destination. A domain that points to itself can cause an [infinite redirect error](/ssl/troubleshooting/too-many-redirects/), which makes your site inaccessible to visitors.

{{</Aside>}}




