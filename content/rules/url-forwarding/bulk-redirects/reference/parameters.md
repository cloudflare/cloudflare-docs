---
pcx_content_type: reference
title: URL redirect parameters
weight: 3
---

# URL redirect parameters

A URL redirect has a source URL, a target URL, a status code, and some additional parameters that affect its URL matching behavior and runtime behavior.

The URL redirect parameters are the following:

{{<definitions>}}

- **Source URL** {{<type>}}String{{</type>}}

    - API field name: `source_url`.
    - The URL string that the incoming request URL must match for the redirect to be applied. This property is mandatory. The maximum length of the source URL is 32 KB.
    - The value must be a valid URL, but the URL scheme is not required (for example, `https`); when the scheme is omitted, the redirect applies to both `http` and `https` URL schemes.
    - A Bulk Redirect List cannot contain several URL redirects with the exact same source URL.
    - The exact behavior of the [URL matching algorithm](/rules/url-forwarding/bulk-redirects/how-it-works/#url-matching-algorithm), which matches an incoming request with the redirect’s source URL, depends on the values of the **Include subdomains** and **Subpath matching** parameters.
    - For more information on the supported URL components, refer to [Supported URL components](/rules/url-forwarding/bulk-redirects/reference/url-components/).

- **Target URL** {{<type>}}String{{</type>}}

    - API field name: `target_url`.
    - The URL where the client will be redirected to when there is a match for the URL redirect. This property is mandatory. The maximum length of the target URL is 32 KB.
    - The value must be a valid URL. The final target URL depends on the values of the **Preserve query string** and **Preserve path suffix** parameters.
    - For more information on the supported URL components, refer to [Supported URL components](/rules/url-forwarding/bulk-redirects/reference/url-components/).

- **Subpath matching** {{<type>}}Boolean{{</type>}}

    - API field name: `subpath_matching`.
    - If true, the current redirect will apply the subpath matching algorithm to the request URL when determining if there is a match for the current URL redirect. The default value is `false`.
    - For example, a URL redirect from `/my-folder/` to `/other-folder/` with **Subpath matching** enabled will also redirect a request from `/my-folder/item` to `/other-folder/item`. However, the redirect will only include the `item` part when **Preserve path suffix** is true. Refer to **Preserve path suffix** for details.
    - For more information, refer to [Matching the source URL of redirects](/rules/url-forwarding/bulk-redirects/how-it-works/#matching-the-source-url-of-redirects).

- **Include subdomains** {{<type>}}Boolean{{</type>}}

    - API field name: `include_subdomains`.
    - If true, the source URL hostname will also apply to any subdomains — the redirect will match for all subdomains to the left of the domain portion of the source URL, as well as the specified domain. The default value is `false`.
    - For example, a redirect with source URL defined as `http://example.com/about` will also apply to requests with source URL `http://a.example.com/about` or `http://a.b.example.com/about`.
    - For more information, refer to [Matching the source URL of redirects](/rules/url-forwarding/bulk-redirects/how-it-works/#matching-the-source-url-of-redirects).

- **Preserve query string** {{<type>}}Boolean{{</type>}}

    - API field name: `preserve_query_string`.
    - If true, the redirect URL will keep the query string of the original request. The default value is `false`.
    - For example, a URL redirect from `/my-folder/` to `/other-folder/` with **Preserve query string** enabled will redirect a request from `/my-folder/?name=value` to `/other-folder/?name=value`. If **Preserve query string** is disabled, the request will be redirected from `/my-folder/?name=value` to `/other-folder/`.

- **Preserve path suffix** {{<type>}}Boolean{{</type>}}

    - API field name: `preserve_path_suffix`.
    - Applicable only when **Subpath matching** is enabled. If true, defines that the redirect URL will include the remaining (non-matched) path elements of the source URL, if any. The default value is `true`.
    - For example, when both **Subpath matching** and **Preserve path suffix** are enabled, a URL redirect from `/my-folder/` to `/another-folder/` will redirect an incoming request from `/my-folder/foo` to `/another-folder/foo`. If **Preserve path suffix** is disabled, the same request would still match the URL redirect, but it would redirect from `/my-folder/foo` to `/another-folder/`.

- **Status code** {{<type>}}Integer{{</type>}}

    - API field name: `status_code`.
    - The HTTP status code returned to the client when redirecting. The default value is `301`.
    - The value must be one of the following: `301` (Moved permanently), `302` (Found, also known as Moved temporarily), `307` (Temporary redirect), or `308` (Permanent redirect).

{{</definitions>}}
