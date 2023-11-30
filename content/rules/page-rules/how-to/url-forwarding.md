---
pcx_content_type: how-to
source: https://support.cloudflare.com/hc/en-us/articles/4729826525965-Configuring-URL-forwarding-or-redirects-with-Page-Rules
title: URL Forwarding 
meta:
    title: URL Forwarding | Page Rules
weight: 1
---

# URL forwarding or redirects

Page Rules allow you to forward or redirect traffic to a different URL, though they are just one of the [options provided by Cloudflare](/fundamentals/concepts/redirects/).

{{<render file="_page-rule-proxied-dns-warning">}}

---

## Redirect with Page Rules

To configure URL forwarding or redirects using Page Rules:

1.  Log into your Cloudflare account.
2.  Click the appropriate Cloudflare account for the domain where you want to add URL forwarding.
3.  Go to **Rules** > **Page Rules**.
4.  Under **Page Rules,** click **Create Page Rule**. The _Create Page Rule for <your domain>_ dialog opens.
5.  Under **If the URL matches**, enter the URL or URL pattern that should match the rule. 
6.  In **Pick a Setting**, choose **Forwarding URL** from the drop-down menu.
7.  For **Select status code**, choose _301 (Permanent Redirect)_ or _302 (Temporary Redirect)_.
8.  Enter the _destination URL_.
9.  To finish, click **Save and Deploy**.

![Example Page Rule configuration for forwarding URLs with HTTP status code 301 (permanent redirect) or 302 (temporary redirect).](/images/support/hc-import-pagerules_urlforwarding_woptions_edited.png)

___

## Forwarding examples

Imagine you want site visitors to easily reach your website for a variety of URL patterns.  For instance, the Page Rule URL patterns `*www.example.com/products` and `*example.com/products` match:

```
http://example.com/products

http://www.example.com/products

https://www.example.com/products

https://blog.example.com/products

https://www.blog.example.com/products
```

but do not match:

```
http://www.example.com/blog/products (extra directory before the +)  
or
http://www.example.comproducts (no trailing slash)
```

Once you have created the pattern that matches what you want, click the **Forwarding** toggle. That exposes a field where you can enter the address I want requests forwarded to.

```
https://example.com/products
```

If you enter the address above in the forwarding box and click **Add Rule**, within a few seconds any requests that match the pattern I entered will automatically be forwarded with a 302 Redirect to the new URL.

___

## Advanced forwarding options

If you use a basic redirect, such as forwarding the apex domain (`example.com`) to `www.example.com`, then you lose anything else in the URL.

For example, you could set up the pattern:

```
example.com
```

And have it forward to:

```
http://www.example.com
```

However, if someone entered `example.com/some-particular-page.html`, they would be redirected to:

```
www.example.com
```

Instead of:

```
www.example.com/some-particular-page.html
```

The solution is to use variables. Each wildcard corresponds to a variable when can be referenced in the forwarding address. The variables are represented by a `$` followed by a number. To refer to the first wildcard you would use `$1`, to refer to the second wildcard you'd use `$2`, and so on.

To fix the forwarding from the apex to `www` in the above example, you could use the same pattern:

```
example.com/*
```

You would then set up the following URL for traffic to forward to:

```
http://www.example.com/$1
```

In this case, if someone went to:

```
example.com/some-particular-page.html
```

They would be redirected to:

```
http://www.example.com/some-particular-page.html
```
