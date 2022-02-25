---
title: How it works
pcx-content-type: concept
weight: 4
meta:
  title: How Bulk Redirects work
---

# How Bulk Redirects work

For each incoming request, Cloudflare evaluates all URL Redirects of each Bulk Redirect List that is enabled by a Bulk Redirect Rule.

If there is a match for a URL Redirect according to the URL matching algorithm, the redirect action is performed immediately, according to the URL Redirect configuration parameters. Cloudflare performs no further processing once a redirect action has been executed.

## Matching the source URL of redirects

The following URL Redirect parameters control the matching behavior between the request URL and source URLs of the configured (and enabled) URL Redirects:

<Definitions>

*   **Subpath matching** <PropMeta>(default: false)</PropMeta>

    *   If true, the URL Redirect will apply to all paths under the given source path. For example, consider the following source and target URLs of a URL Redirect:

        *   Source URL: `https://example.com/foo/`
        *   Target URL: `https://example.com/qux/`

    *   With this configuration and **Subpath matching** enabled, an incoming request to `example.com/foo/bar` will be redirected to `https://example.com/qux/bar`.

*   **Include subdomains** <PropMeta>(default: false)</PropMeta>

    *   If true, the source URL hostname of the URL Redirect will also apply to all its subdomains. For example, consider the following source and target URLs of a URL Redirect:

        *   Source URL: `https://example.com/about`
        *   Target URL: `https://example.com/newpage`

    *   With this configuration and **Includes subdomains** enabled, incoming requests to `http://a.example.com/about` and `http://a.b.example.com/about` would also match, in addition to the specified domain with no subdomain (`https://example.com/about`).

</Definitions>

For detailed information on these parameters, refer to [URL Redirect parameters](/rules/bulk-redirects/reference/parameters/).

## Configuring the path and query string behavior

The following parameters configure how Cloudflare determines the path and query string of the final target URL:

<Definitions>

*   **Preserve query string** <PropMeta>(default: false)</PropMeta>

    *   If true, the final target URL will keep the query string of the original request. For example, consider the following source and target URLs of a URL Redirect:

        *   Source URL: `https://example.com/about`
        *   Target URL: `https://example.com/newpage`

    *   With this configuration and **Preserve query string** enabled, an incoming request to `http://example.com/about?q=term` would be redirected to `https://example.com/newpage?q=term`. If **Preserve query string** is disabled, the same incoming request would be redirected to `https://example.com/newpage`.

*   **Preserve path suffix** <PropMeta>(default: true)</PropMeta>

    *   Defines if the final target URL will include the parts of the request path that did not match the URL Redirect's source URL.

    *   When **Subpath matching** is enabled, the path that was not matched is copied over to the final target URL. For example, consider the following source and target URLs of a URL Redirect:

        *   Source URL: `https://example.com/a/`
        *   Target URL: `https://example.com/b/`

    *   An incoming request to `https://example.com/a/foo` will be redirected to `https://example.com/b/foo`.

    *   If you set **Preserve path suffix** to false, the same request will still match the redirect, but it will be redirected to `https://example.com/b/`.

</Definitions>

For detailed information on these parameters, refer to [URL Redirect parameters](/rules/bulk-redirects/reference/parameters/).

## URL matching algorithm

The URL of an incoming request matches a URL Redirect in a list if:

1.  The scheme (`http` or `https`) is the same as the source URL of the URL Redirect definition. Source URLs with no scheme will match both `http` and `https`.

2.  The hostname is the same as the hostname in the source URL of the URL Redirect definition. If **Include subdomains** is enabled, the subdomains of the hostname in the redirect definition will also match.

3.  The path is the same as the source URL. If **Subpath matching** is enabled, Cloudflare also considers the subpaths of the path in the URL Redirect's source URL when determining if there is a match. For example, a URL Redirect with its source URL defined as `example.com/blog` will also match requests to `example.com/blog/foo` and `example.com/blog/bar`.

     <Aside type="note" header="Note">

    URL Redirects with **Subpath matching** enabled are only considered for request paths with 16 or fewer slashes. For example, if there is a configured URL Redirect with source URL set to `example.com/foo` and with **Subpath matching** enabled:

    *   This URL Redirect would be considered for an incoming request with path `/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16` (16 slashes in path).
    *   This URL Redirect would *not* be considered for an incoming request with path `/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17` (17 slashes in path).

    This does not affect URL Redirects with **Subpath matching** disabled. Exact path matches are always considered, even for redirects with **Subpath matching** enabled.

     </Aside>

### Determining the URL Redirect to apply

If multiple URL Redirects can apply, then the redirect that wins is determined by the following rules:

1.  URL Redirects with the exact hostname win over URL Redirects with the **Include subdomains** option enabled.
2.  URL Redirects with **Include subdomains** enabled win over other URL Redirects with **Include subdomains** enabled if their domain is more specific.
3.  URL Redirects with a concrete scheme win over URL Redirects that match both `http` and `https` schemes.

Regarding ordering rule 2 (more specific domains win over less specific domains), if there are two URL Redirects with source URL hostnames `bar.com` and `foo.bar.com`, an incoming request to `qux.foo.bar.com` will match the second redirect (`foo.bar.com`) because it is more specific.
