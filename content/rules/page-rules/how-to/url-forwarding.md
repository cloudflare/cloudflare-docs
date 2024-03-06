---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/4729826525965-Configuring-URL-forwarding-or-redirects-with-Page-Rules
title: URL forwarding
meta:
    title: URL forwarding | Page Rules
weight: 1
---

# URL forwarding or redirects

Page Rules allow you to forward or redirect traffic to a different URL, though they are just one of the [options provided by Cloudflare](/fundamentals/reference/redirects/).

{{<render file="_page-rule-proxied-dns-warning.md">}}

---

## Redirect with Page Rules

To configure URL forwarding or redirects using Page Rules:

1. Log in to your [Cloudflare account](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Rules** > **Page Rules**.
3. Under **Page Rules**, select **Create Page Rule**.
4. Under **If the URL matches**, enter the URL or URL pattern that should match the rule. 
5. In **Pick a Setting**, choose **Forwarding URL** from the drop-down menu.
6. For **Select status code**, choose _301 - Permanent Redirect_ or _302 - Temporary Redirect_.
7. Enter the destination URL.
8. Select **Save and Deploy Page Rule**.

___

## Forwarding examples

Imagine you want site visitors to reach your website for a variety of URL patterns. For instance, the page rule URL patterns `*www.example.com/products` and `*example.com/products` match:

```txt
http://example.com/products

http://www.example.com/products

https://www.example.com/products

https://blog.example.com/products

https://www.blog.example.com/products
```

but do not match:

```txt
http://www.example.com/blog/products (extra directory)
or
http://www.example.comproducts (no trailing slash)
```

Once you have created the pattern that matches what you want, select the **Forwarding** toggle. This will display a field where you can enter the address you want requests forwarded to.

```txt
https://example.com/products
```

If you enter the address above in the forwarding box and select **Add Rule**, within a few seconds any requests that match the pattern you entered will automatically be forwarded with an `HTTP 302` redirect status code to the new URL.

___

## Advanced forwarding options

If you use a basic redirect, such as forwarding the apex domain (`example.com`) to `www.example.com`, then you lose anything else in the URL.

For example, you could set up the pattern:

```txt
example.com
```

And have it forward to:

```txt
http://www.example.com
```

However, if someone entered `example.com/some-particular-page.html`, they would be redirected to:

```txt
www.example.com
```

Instead of:

```txt
www.example.com/some-particular-page.html
```

The solution is to use variables. Each wildcard corresponds to a variable when can be referenced in the forwarding address. The variables are represented by a `$` (dollar sign) followed by a number. To refer to the first wildcard you would use `$1`, to refer to the second wildcard you would use `$2`, and so on.

To fix the forwarding from the apex to `www` in the above example, you could use the same pattern:

```txt
example.com/*
```

You would then set up the following URL for traffic to forward to:

```txt
http://www.example.com/$1
```

In this case, if someone went to:

```txt
example.com/some-particular-page.html
```

They would be redirected to:

```txt
http://www.example.com/some-particular-page.html
```
