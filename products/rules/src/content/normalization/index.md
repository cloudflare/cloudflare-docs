---
order: 3
---

# URL Normalization

Cloudflare provides a URL Normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard.

When you enable URL Normalization, all incoming URLs are normalized before they pass to subsequent Cloudflare edge features that accept a URL input, such as Page Rules, Firewall Rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL Normalization is disabled, Cloudflare forwards the URL to origin in its original form.

## How it works

Cloudflare URL Normalization is similar to [rfc3986](https://www.ietf.org/rfc/rfc3986.txt), and modifies separators, encoded elements, and literal bytes in incoming URLs as follows:

* The following unreserved characters are [percent decoded](https://tools.ietf.org/html/rfc3986#section-2.1):
    * Alphabetical characters: `a`-`z`, `A`-`Z` (decoded from `%41`-`%5A` and `%61`-`%7A`)
    * Digit characters: `0`-`9` (decoded from `%30`-`%39`)
    * hyphen `-` (`%2D`), period `.` (`%2E`), underscore `_` (`%5F`), and tilde `~` (`%7E`)
* These reserved characters are not encoded or decoded: `: / ? # [ ] @ ! $ & ' ( ) * + , ; =`
* Other characters, for example literal byte values, are percent encoded.
* Percent encoded representations are converted to upper case.
* URL paths are normalized according to the [Remove Dot Segments](https://tools.ietf.org/html/rfc3986#section-5.2.4) protocol. Deviations from this protocol include modifications to the following separators:
    * `\` becomes `/`
    * `//` becomes `/` 

## Examples

The table below shows some examples of Cloudflare URL Normalization.

<TableWrap>

URL                                  | Normalized URL
-------------------------------------|--------------------------------
`www.example.com/hello/`             | `www.example.com/hello/`
`www.example.com/%68ello`            | `www.example.com/hello`
`www.example.com\hello`              | `www.example.com/hello`
`www.example.com/./lang//en/hello./` | `www.example.com/lang/en/hello./`

</TableWrap>

Consider a firewall rule that blocks requests whose URLs match `www.example.com/hello`. The rule would not block a request containing an encoded element `www.example.com/%68ello`. Normalizing incoming URLs at the edge helps simplify Cloudflare Firewall Rules expressions that use URLs.

## Availability

URL Normalization is available in all Cloudflare plans.

## Get started 

You can [Manage URL Normalization](/normalization/manage) in the Cloudflare dashboard.
