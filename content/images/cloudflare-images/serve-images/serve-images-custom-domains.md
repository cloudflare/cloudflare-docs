---
pcx_content_type: reference
title: Custom domains and paths
layout: single
meta:
    title: Serve images from custom domains and paths
weight: 2
---

# Serve images from custom domains

Image delivery is supported from all customer domains under the same Cloudflare account. To serve images through custom domains, an image URL should be adjusted to the following format:

```txt
https://example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>
```

Example with a custom domain:

```txt
https://example.com/cdn-cgi/imagedelivery/ZWd9g1K7eljCn_KDTu_MWA/083eb7b2-5392-4565-b69e-aff66acddd00/public
```

In this example, `<ACCOUNT_HASH>`, `<IMAGE_ID>` and `<VARIANT_NAME>` are the same, but the hostname and prefix path is different:

* `example.com`: Cloudflare proxied domain under the same account as the Cloudflare Images.
* `/cdn-cgi/imagedelivery`: Path to trigger `cdn-cgi` image proxy.
* `ZWd9g1K7eljCn_KDTu_MWA`: The Images account hash. This can be found in the Cloudflare Images Dashboard.
* `083eb7b2-5392-4565-b69e-aff66acddd00`: The image ID.
* `public`: The variant name.

## Custom paths

By default, Images are served from the `/cdn-cgi/imagedelivery/` path. You can use Transform Rules to rewrite URLs and serve images from custom paths.

### Basic version

Free and Pro plans only support string matching rules that do not require regular expressions.

This example lets you rewrite a request from `example.com/images` to `example.com/cdn-cgi/imagedelivery/<ACCOUNT HASH>`.

To create a rule:

1. Log in to the Cloudflare dashboard and select your account and website. 
2. Select **Rules** > **Transform Rules**.
3. Select **Create rule**.
4. Under **When incoming requests match...**, select **Edit expression**
4. In the text field, enter `starts_with(http.request.uri.path, "/images")`.
5. Under **Path**, select **Rewrite to**.
6. Select *Dynamic* and enter the following in the text field.

```txt
concat(
  "/cdn-cgi/imagedelivery/<ACCOUNT HASH>",
  substring(http.request.uri.path, 7)
)
```

7. Select **Deploy** when you are done.

### Advanced version

{{<Aside type="note">}}

This feature requires a Business or Enterprise plan to enable regex in Transform Rules. Refer to [Cloudflare Transform Rules Availability](/rules/transform/#availability) for more information.

{{</Aside>}}

This example lets you rewrite a request from `example.com/images/some-image-id/w100,h300` to `example.com/cdn-cgi/imagedelivery/<ACCOUNT HASH>/some-image-id/width=100,height=300` and implies [Flexible variants](/images/cloudflare-images/transform/flexible-variants/) feature is turned on.

To create a rule:

1. Log in to the Cloudflare dashboard and select your account and website. 
2. Select **Rules** > **Transform Rules**.
3. Select **Create rule**.
4. Under **When incoming requests match...**, select **Edit expression**
4. In the text field, enter `(http.request.uri.path matches "^/images/.*$")`.
5. Under **Path**, select **Rewrite to**.
6. Select *Dynamic* and enter the following in the text field.

```txt
regex_replace(
  http.request.uri.path, 
  "^/images/(.*)\\?w([0-9]+)&h([0-9]+)$",
  "/cdn-cgi/imagedelivery/<ACCOUNT HASH>/${1}/width=${2},height=${3}"
)
```

## Limitations
When using a custom domain, it is not possible to directly set up WAF rules that act on requests hitting the `/cdn-cgi/imagedelivery/` path. If you need to set up WAF rules, you can:
* Use a Cloudflare Worker to access your images and a Route using your domain to execute the worker. For an example worker, refer to [Serve private images using signed URL tokens](/images/cloudflare-images/serve-images/serve-private-images-using-signed-url-tokens/).
