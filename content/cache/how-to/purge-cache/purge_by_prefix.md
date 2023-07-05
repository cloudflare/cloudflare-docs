---
title: ​Purge cache by prefix (URL)
pcx_content_type: how-to
weight: 5
---

# Purge cache by prefix (Enterprise only)

Enterprise customers can purge their cache by URL prefix or path separators in their URL. For an example URL like `https://www.example.com/foo/bar/baz/qux.jpg`, valid purge requests include:

- `www.example.com/`
- `www.example.com/foo/`
- `www.example.com/foo/bar/`
- `www.example.com/foo/bar/baz/`
- `www.example.com/foo/bar/baz/qux.jpg`

Purging by prefix is useful in different scenarios, such as:

- Purging everything within a directory.
- Increasing control over cached objects in a path.
- Simplifying the number of purge calls sent.

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select the appropriate domain.
3. Select **Caching** > **Configuration**.
4. Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
5. Under **Purge by**, select **Prefix**.
6. Follow the syntax instructions.
    - One prefix per line.
    - Maximum 30 prefixes per API call.
7. Enter the appropriate value(s) in the text field using the format shown in the example.
8  Select **Purge**.

{{<Aside type="note" header="API">}}

You can purge prefixes via the Cloudflare API. For more information, refer to the [API documentation](/api/operations/zone-purge). You can use up to 30 prefixes per API call and make up to 30,000 purge API calls in a 24-hour period.

{{</Aside>}}

## Limitations

There are several limitations regarding purge by prefix:

- Path separators are limited to 31 for a prefix `(example.com/a/b/c/d/e/f/g/h/i/j/k/l/m…)`.
- Purge requests are limited to 30 prefixes per request.
- [Purge rate-limits apply](/api/operations/zone-purge).
- URI query strings & fragments cannot purge by prefix:
  - `www.example.com/foo?a=b` (query string)
  - `www.example.com/foo#bar` (fragment)

{{<Aside type="warning" header="Warning">}}

Because purge by prefix purges a directory, any URI for a resource within the purged directory is purged regardless of query string or fragment (though fragments are not generally sent by browsers). Purge by prefix rules do not accept fragments and query strings.

Example: If you purge `foo.com/bar`, any asset that starts with `foo.com/bar` will be purged, for example, `foo.com/bar/baz`, `foo.com/bar?good=bad`, etc. and purging `foo.com/bar?good=bad` itself will not work.

{{</Aside>}}

## Purge by prefix normalization

Using purge by prefix normalization, when a purge by prefix request comes into Cloudflare for a normalized URL path, the purge service respects the [URL normalization](/rules/normalization/) and purges the normalized URL.

### How does URL Normalization work

Take the following website as an example: `https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg`. The table below shows you how Cloudflare’s cache views these paths with [normalization on/off](/rules/normalization/).

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Request from visitor to EDGE
    </th>
    <th colspan="5" rowspan="1">
      What Cloudflare cache sees with Normalize Incoming URLs ON
    </th>
    <th colspan="5" rowspan="1">
      What Cloudflare cache sees with Normalize Incoming URLs OFF
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg</code>
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/hello/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/hello/img_1.jpg</code>
      </td>
      <td colspan="5" rowspan="1">
        <code>https://cloudflare.com/hello/img_1.jpg</code>
      </td>
    </tr>
  </tbody>
</table>

As shown above, with URL normalization **ON**, visitors to the two URLs, `https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg` and `https://cloudflare.com/انشاء-موقع-الكتروني/img_1.jpg`, will be served the same cached asset. Purging `https://cloudflare.com/%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%85%D9%88%D9%82%D8%B9-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A/img_1.jpg` will purge that asset for both visitors.