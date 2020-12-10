---
title: Retrofit
---

# Retrofit integration

To use ``Retrofit`` with Cloudflare SDK, use ``CFMobile.createRetrofit()`` method to create an instance of Retrofit.

To create an instance with default settings and the service base URL, use:

```java
Retrofit retrofit = CFMobile.createRetrofit("https://api.github.com/");
```

instead of calling Retrofit API as below:

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.github.com/")
    .build();
```

If any custom settings is required, a Builder object can be specified while creating the instance. To create the instance with Builder settings, use:

```java
Retrofit.Builder builder = new Retrofit.Builder()
    .baseUrl("https://api.github.com")
    .addConverterFactory(GsonConverterFactory.create());
Retrofit retrofit = CFMobile.createRetrofit(builder);
```

instead of using Retrofit API as below:

```java
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.github.com")
    .addConverterFactory(GsonConverterFactory.create())
    .build();
```
