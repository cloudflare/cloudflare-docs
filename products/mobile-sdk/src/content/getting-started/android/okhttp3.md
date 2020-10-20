---
title: OkHttp 3
---

# OkHttp 3 integration

To use `OkHttp3` with Cloudflare SDK, use `CFMobile.createOkHttp3Client()` method to create an instance of OkHttpClient.

OkHttp3 version 3.9.x and above will be supported from the Android Mobile SDK 3.0.0.

To create an instance with default settings, use:

```java
OkHttpClient client = CFMobile.createOkHttp3Client();
```

instead of calling OkHttp API as below:

```java
OkHttpClient client = new OkHttpClient();
```

To create an instance with custom settings use a Builder object as below:

```java
OkHttpClient.Builder builder = new OkHttpClient.Builder()
    .addInterceptor(new HttpLoggingInterceptor())
    .cache(new Cache(cacheDir, cacheSize));
OkHttpClient client = CFMobile.createOkHttp3Client(builder);</p>
```

instead of calling OkHttp API as below:

```java
OkHttpClient.Builder builder = new OkHttpClient.Builder()
    .addInterceptor(new HttpLoggingInterceptor())
    .cache(new Cache(cacheDir, cacheSize));
OkHttpClient client = builder.build();</p>
```
