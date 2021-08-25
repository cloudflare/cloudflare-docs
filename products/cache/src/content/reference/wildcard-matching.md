---
title: Wildcard matching
pcx-content-type: navigation
---

# Wildcard matching and referencing

You can use the asterisk (`*`) in any URL segment to match certain patterns. For example,
example.com/t*st would match:

- `example.com/test`
- `example.com/toast`
- `example.com/trust`

`example.com/foo/* `does not match `example.com/foo` but `example.com/foo*` does match.

## Helpful tips

- To match both `http` and `https`, `write example.com`. Writing `*example.com` is unnecessary.
- To match every page on a domain, write `example.com/*`. Writing `example.com` will not work.
- To match every page on a domain and its subdomains, write `*example.com/*`. Writing `example.com` won’t work.
- A wildcard (`*`) in a Page Rule URL will match even if no characters are present and may include any part of the URL, including the query string.

## Referencing wildcard matches

You can reference a matched wildcard later using the `$X` syntax, where `X` indicates the index of a glob pattern. As a result, `$1` represents the first wildcard match, `$2` represents the second wildcard match, and so on.

The `$X` syntax is especially useful with the Forwarding URL setting. For example, you could forward `http://*.example.com/*` to `http://example.com/images/$1/$2.jpg`.

This rule would match `http://cloud.example.com/flare.jpg` which ends up being forwarded to `http://example.com/images/cloud/flare.jpg`.

To add a $ character in the forwarding URL, escape it by adding a backslash `\` in front like `\$`.

<Aside type="warning" header="Warning">

Avoid creating a redirect where the domain points to itself as the destination. A domain that points to itself can cause an [infinite redirect error](https://support.cloudflare.com/hc/articles/115000219871#h_af6598f6-bc1c-4a4d-ac5f-538230a704b7), which makes your site inaccessible to visitors.

</Aside>
