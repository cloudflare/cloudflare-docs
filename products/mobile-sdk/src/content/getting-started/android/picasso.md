---
title: Picasso
---

# Picasso integration

If your app is using a custom ``Picasso`` singleton, you must initialize the ``Downloader`` object using an ``OkHttpClient`` instance created through the Cloudflare OkHttp API. Please see Cloudflare's OkHttp integration guide for [OkHttp](https://developers.cloudflare.com/mobile-sdk/getting_started/android/okhttp2/) and [OkHttp3](https://developers.cloudflare.com/mobile-sdk/getting_started/android/okhttp3/) for more details.

``Picasso.setSingletonInstance`` must be called before initializing Cloudflare.

OkHttp2 sample code:

```java
// If you are using OkHttp2, create a custom okhttp2 client through Cloudflare's API.
OkHttpClient okhttp2Client = CFMobile.createOkHttpClient(builder);

// Create a Picasso instance using the downloader with the Cloudflare client
Picasso picasso = new Picasso.Builder(context)
.downloader(new OkHttpDownloader(okhttp2Client))
.build();

// Set the Picasso instance
Picasso.setSingletonInstance(picasso);

// Initialize Cloudflare after setSingletonInstance
CFMobile.initialize(getApplicationContext(), "YOUR CLIENT KEY");
```

OkHttp3 sample code:

```java
// Construct a builder if using a custom OkHttpClient
OkHttpClient.Builder builder = new OkHttpClient.Builder()
.addInterceptor(new CustomLoggingInterceptor())
.cache(new Cache(cacheDir, cacheSize));

// If you are using OkHttp3, create a custom okhttp3 client through Cloudflare's API.
OkHttpClient okhttp3Client = CFMobile.createOkHttp3Client(builder);

// Create a Picasso instance using the downloader with the Cloudflare client
Picasso picasso = new Picasso.Builder(context)
.downloader(new OkHttp3Downloader(okHttp3Client))
.build();

// Set the Picasso instance
Picasso.setSingletonInstance(picasso);

// Initialize Cloudflare after setSingletonInstance
CFMobile.initialize(getApplicationContext(), "YOUR CLIENT KEY");
```
