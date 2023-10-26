---
title: How it works
pcx_content_type: concept
weight: 3
meta:
  title: How URL normalization works
  description: Examples of the impact of different URL normalization settings in the URLs of incoming requests.
---

# How URL normalization works

URL normalization modifies separators, encoded elements, and literal bytes in incoming URLs so that they conform to a consistent formatting standard.

For example, consider a WAF custom rule that blocks requests whose URLs match `www.example.com/hello`. The rule would not block a request containing an encoded element — `www.example.com/%68ello`. Normalizing incoming URLs on the Cloudflare global network helps simplify rules expressions containing URLs.

The two available types of URL normalization are:

* [RFC 3986 normalization](rfc-3986-normalization)
* [Cloudflare normalization](#cloudflare-normalization)

The location where URL normalization will occur depends on the [configured settings](/rules/normalization/settings/).

For examples of the different settings and their impact on request URLs, refer to [URL normalization examples](/rules/normalization/examples/).

## RFC 3986 normalization

The URL normalization performed according to [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt) is as follows:

* The following unreserved characters are [percent decoded](https://tools.ietf.org/html/rfc3986#section-2.1):
    * Alphabetical characters: `a`-`z`, `A`-`Z` (decoded from `%41`-`%5A` and `%61`-`%7A`)
    * Digit characters: `0`-`9` (decoded from `%30`-`%39`)
    * hyphen `-` (`%2D`), period `.` (`%2E`), underscore `_` (`%5F`), and tilde `~` (`%7E`)
* These reserved characters are not encoded or decoded: `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`
* Other characters, for example literal byte values, are percent encoded.
* Percent encoded representations are converted to upper case.
* URL paths are normalized according to the [Remove Dot Segments](https://tools.ietf.org/html/rfc3986#section-5.2.4) protocol.

## Cloudflare normalization

When using the Cloudflare URL normalization, some extra normalization techniques will be applied to URLs of incoming requests, in the following execution order:

1. Normalize back slashes (`\`) into forward slashes (`/`).
2. Merge successive forward slashes (for example, `//` will be normalized to `/`).
3. Perform the URL normalization according to RFC 3986 (described in the previous section).
