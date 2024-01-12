---
pcx_content_type: how-to
title: Serve images from custom domains
weight: 9
---

# Serve images from custom domains

By default, Images are served from the `/cdn-cgi/imagedelivery/` path. You can use Transform Rules to rewrite URLs and serve images from custom paths.

## Basic version

Free and Pro plans only support string matching rules that do not require regular expressions.

This example lets you rewrite a request from example.com/images to `example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>`.

To create a rule:

1. Log in to the Cloudflare dashboard and select your account and website.
2. Select **Rules** > **Transform Rules**.
3. Select **Create rule**.
4. Under **When incoming requests match...**, select **Edit expression**.
5. In the text field, enter `starts_with(http.request.uri.path, "/images")`.
6. Under **Path**, select **Rewrite to**.
7. Select *Dynamic* and enter the following in the text field.

```
concat(
  "/cdn-cgi/imagedelivery/<ACCOUNT_HASH>",
  substring(http.request.uri.path, 7)
)
```

8. Select **Deploy** when you are done.

## ​​Advanced version

{{<Aside type="note">}}
This feature requires a Business or Enterprise plan to enable regex in Transform Rules. Refer to Cloudflare Transform Rules Availability for more information.
{{</Aside>}}

This example lets you rewrite a request from `example.com/images/some-image-id/w100,h300` to `example.com/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/some-image-id/width=100,height=300` and implies Flexible variants feature is turned on.

To create a rule:

1. Log in to the Cloudflare dashboard and select your account and website.
2. Select **Rules** > **Transform Rules**.
3. Select **Create rule**.
4. Under **When incoming requests match...**, select **Edit expression**.
5. In the text field, enter `(http.request.uri.path matches "^/images/.*$")`.
6. Under **Path**, select **Rewrite to**.
7. Select *Dynamic* and enter the following in the text field.

```
regex_replace(
  http.request.uri.path,
  "^/images/(.*)\\?w([0-9]+)&h([0-9]+)$",
  "/cdn-cgi/imagedelivery/<ACCOUNT_HASH>/${1}/width=${2},height=${3}"
)
```

## Limitations

When using a custom domain, it is not possible to directly set up WAF rules that act on requests hitting the `/cdn-cgi/imagedelivery/` path. If you need to set up WAF rules, you can:

Use a Cloudflare Worker to access your images and a Route using your domain to execute the worker. For an example worker, refer to [Serve private images using signed URL tokens](/images/serve-image/serve-private-images/).