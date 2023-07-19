---
title: How it works
pcx_content_type: concept
weight: 3
meta:
  title: How URL normalization works
---

# How URL normalization works

URL normalization modifies separators, encoded elements, and literal bytes in incoming URLs so that they conform to a consistent formatting standard.

For example, consider a firewall rule that blocks requests whose URLs match `www.example.com/hello`. The rule would not block a request containing an encoded element — `www.example.com/%68ello`. Normalizing incoming URLs on the Cloudflare global network helps simplify firewall rules expressions that use URLs.

The URL normalization performed according to [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt) is as follows:

* The following unreserved characters are [percent decoded](https://tools.ietf.org/html/rfc3986#section-2.1):
    * Alphabetical characters: `a`-`z`, `A`-`Z` (decoded from `%41`-`%5A` and `%61`-`%7A`)
    * Digit characters: `0`-`9` (decoded from `%30`-`%39`)
    * hyphen `-` (`%2D`), period `.` (`%2E`), underscore `_` (`%5F`), and tilde `~` (`%7E`)
* These reserved characters are not encoded or decoded: `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`
* Other characters, for example literal byte values, are percent encoded.
* Percent encoded representations are converted to upper case.
* URL paths are normalized according to the [Remove Dot Segments](https://tools.ietf.org/html/rfc3986#section-5.2.4) protocol.

In addition to the rules defined in RFC 3986, Cloudflare can apply the following extra normalization techniques:

* Normalize back slashes (`\`) into forward slashes (`/`).
* Merge successive forward slashes (for example, `//` will be normalized to `/`).

The performed URL normalization varies according to the configured settings. For more information, refer to [URL normalization settings](/rules/normalization/settings/).

## URL normalization examples

The following table shows some examples of URL normalization when using the _Cloudflare_ [normalization type](/rules/normalization/settings/):

{{<table-wrap>}}

URL                            | Normalized URL
-------------------------------|------------------------------
`example.com/en/hello/`        | `example.com/en/hello/`
`example.com/en//%68ello\path` | `example.com/en/hello/path`
`example.com\hello`            | `example.com/hello`
`example.com/./en//hello./`    | `example.com/en/hello./`

{{</table-wrap>}}