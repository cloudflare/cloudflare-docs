---
title: How it works
pcx_content_type: concept
weight: 4
meta:
  title: How Bulk Redirects work
---

# How Bulk Redirects work

For each incoming request, Cloudflare evaluates all URL redirects of each Bulk Redirect List that is enabled by a Bulk Redirect Rule.

If there is a match for a URL redirect according to the URL matching algorithm, the redirect action is performed immediately, according to the URL redirect configuration parameters. Cloudflare performs no further processing once a redirect action has been executed.

## Matching the source URL of redirects

The following URL redirect parameters control the matching behavior between the request URL and source URLs of the configured (and enabled) URL redirects:

{{<definitions>}}

- **Subpath matching** {{<prop-meta>}}(default: false){{</prop-meta>}}

    - If true, the URL redirect will apply to all paths under the given source path. For example, consider the following source and target URLs of a URL redirect:

        — Source URL: `https://example.com/foo/`

        — Target URL: `https://example.com/qux/`

    - With this configuration and **Subpath matching** enabled, an incoming request to `example.com/foo/bar` will be redirected to `https://example.com/qux/bar`.

- **Include subdomains** {{<prop-meta>}}(default: false){{</prop-meta>}}

    - If true, the source URL hostname of the URL redirect will also apply to all its subdomains. For example, consider the following source and target URLs of a URL redirect:

        — Source URL: `https://example.com/about`

        — Target URL: `https://example.com/newpage`

    - With this configuration and **Includes subdomains** enabled, incoming requests to `http://a.example.com/about` and `http://a.b.example.com/about` would also match, in addition to the specified domain with no subdomain (`https://example.com/about`).

{{</definitions>}}

For detailed information on these parameters, refer to [URL redirect parameters](/rules/url-forwarding/bulk-redirects/reference/parameters/).

## Configuring the path and query string behavior

The following parameters configure how Cloudflare determines the path and query string of the final target URL:

{{<definitions>}}

- **Preserve query string** {{<prop-meta>}}(default: false){{</prop-meta>}}

    - If true, the final target URL will keep the query string of the original request. For example, consider the following source and target URLs of a URL redirect:

        — Source URL: `https://example.com/about`

        — Target URL: `https://example.com/newpage`

    - With this configuration and **Preserve query string** enabled, an incoming request to `http://example.com/about?q=term` would be redirected to `https://example.com/newpage?q=term`. If **Preserve query string** is disabled, the same incoming request would be redirected to `https://example.com/newpage`.

- **Preserve path suffix** {{<prop-meta>}}(default: true){{</prop-meta>}}

    - Defines if the final target URL will include the parts of the request path that did not match the URL redirect's source URL.

    - When **Subpath matching** is enabled, the path that was not matched is copied over to the final target URL. For example, consider the following source and target URLs of a URL redirect:

        — Source URL: `https://example.com/a/`

        — Target URL: `https://example.com/b/`

    - An incoming request to `https://example.com/a/foo` will be redirected to `https://example.com/b/foo`.

    - If you set **Preserve path suffix** to false, the same request will still match the redirect, but it will be redirected to `https://example.com/b/`.

{{</definitions>}}

For detailed information on these parameters, refer to [URL redirect parameters](/rules/url-forwarding/bulk-redirects/reference/parameters/).

## URL matching algorithm

The URL of an incoming request matches a URL redirect in a list if:

1. The scheme (`http` or `https`) is the same as the source URL of the URL redirect definition. Source URLs with no scheme will match both `http` and `https`.

2. The hostname is the same as the hostname in the source URL of the URL redirect definition. If **Include subdomains** is enabled, the subdomains of the hostname in the redirect definition will also match.

3. The path is the same as the source URL. If **Subpath matching** is enabled, Cloudflare also considers the subpaths of the path in the URL redirect's source URL when determining if there is a match. For example, a URL redirect with its source URL defined as `example.com/blog` will also match requests to `example.com/blog/foo` and `example.com/blog/bar`.

    {{<Aside type="note" header="Note">}}

URL redirects with **Subpath matching** enabled are only considered for request paths with 16 or fewer slashes. For example, if there is a configured URL redirect with source URL set to `example.com/foo` and with **Subpath matching** enabled:

- This URL redirect would be considered for an incoming request with path `/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16` (16 slashes in path).
- This URL redirect would _not_ be considered for an incoming request with path `/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17` (17 slashes in path).

This does not affect URL redirects with **Subpath matching** disabled. Exact path matches are always considered, even for redirects with **Subpath matching** enabled.

    {{</Aside>}}

### Determining the URL redirect to apply

If multiple URL redirects can apply, then the redirect that wins is determined by the following rules:

1. Given two URL redirects with **Subpath matching** enabled, the URL redirect with the most specific path wins over the other URL redirect.<br>
If there are two URL redirects with source URL paths `/folder` and `/folder/subfolder`, an incoming request for the `/folder/subfolder/item` URL path will match the second redirect (`/folder/subfolder`) because it is more specific.

2. URL redirects with the exact hostname win over URL redirects with the **Include subdomains** option enabled.

3. Given two URL redirects with **Include subdomains** enabled, the URL with the most specific domain wins over the other URL redirect.<br>
If there are two URL redirects with source URL hostnames `bar.com` and `foo.bar.com`, an incoming request to `qux.foo.bar.com` will match the second redirect (`foo.bar.com`) because it is more specific.

4. URL redirects with a concrete scheme win over URL redirects that match both `http` and `https` schemes.
