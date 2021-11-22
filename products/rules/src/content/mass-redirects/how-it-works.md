---
order: 3
pcx-content-type: concept
---

# How it works

For each incoming request, Cloudflare evaluates all URL redirects of each Mass Redirect List that is enabled by a Mass Redirect Rule.

If there is a match for a URL redirect according to the URL matching algorithm, the redirect action is performed immediately, according to the URL redirect configuration parameters. Cloudflare performs no further processing once a redirect action has been executed.

## URL matching algorithm

The URL matching algorithm is different depending on the value of the _Subpath matching_ option of a URL redirect.

### Exact path matching

The matching algorithm for URL Redirects with _Subpath matching_ disabled is the following:

1. For each Mass Redirect Rule, check if the request URL matches the source URL of any URL Redirect in the Mass Redirect List associated with the rule.

1. Select the first redirect in the list that matches all the following conditions:
    * The URL scheme (for example, `https`) matches.
    * The hostname matches. This match takes subdomains into consideration for URL Redirects with the _Include subdomains_ option enabled.

The first match wins over other possible matches. The precedence will be determined by how the redirects are ordered. The ordering will be done based on the following criteria (in order of decreasing importance):

1. Redirects with the exact hostname.
1. Redirects that include a subdomain:
    1. Longer domains that include a subdomain (that is, cases where there is a more specific match).
    1. Shorter domains that include a subdomain.
1. Scheme of the URL Redirect’s source URL:
    * `https`
    * `http`
    * Any other protocol

Regarding criterion 2 (redirects that include a subdomain), if there are two URL Redirects with source URL hostnames `bar.com` and `foo.bar.com`, an incoming request addressed at `mumble.foo.bar.com` will match the second redirect (`foo.bar.com`) because it is more specific.

### Subpath matching

The matching algorithm for URL Redirects that have _Subpath matching_ enabled is the following:

1. Use the previous algorithm (exact path matching) to find an exact match.

1. If there is no exact match, use the same algorithm but try all subpaths, up to a limit of 32, considering only the URL redirects with _Subpath matching_ enabled.

    For example, if the path is `/my-folder/item/`, the following subpaths will be checked for a match (in this order):

    * `/my-folder/item/`
    * `/my-folder/item`
    * `/my-folder/`
    * `/my-folder`
    * `/`

The first subpath to match wins.
