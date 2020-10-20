---
title: OkHttp 2.2.x
---

# OkHttp 2.2.x integration

## OkHttpClient

The Cloudflare SDK 2.x supports ``OkHttp v2.2`` and above. To use ``OkHttp2`` with the Cloudflare SDK, use ``Cloudflare.createOkHttpClient()`` method. To create an instance of OkHttpClient, use

```java
OkHttpClient client = CFMobile.createOkHttpClient();
```

instead of using OkHttp as below:
```java
OkHttpClient client = new com.squareup.okhttp.OkHttpClient();
```

Note that OkHttp 2.2.x is not supported in Android SDK 3.0.0 and above.

## OkHttp UrlConnection

To use Cloudflare SDK with OkHttp UrlConnection, use ``CFOkUrlFactory`` to open a connection to an URL.
Example:

```java
// Create the URL factory</dt>
CFOkUrlFactory factory = new CFOkUrlFactory();</p>

// Open the URL connection</p>
HttpURLConnection conn = factory.open(new URL("https://img.host.com/img1.jpg"));
```
