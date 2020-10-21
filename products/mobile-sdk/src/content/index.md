---
title: Home
order: 1
---

# Cloudflare Mobile SDK

Cloudflare Mobile SDK let’s mobile app developers understand how poor network performance on mobile apps can affect end-user engagement. With our Metrics Mode dashboard, developers can identify what carriers, networks and APIs are suffering the most and take actions based on that.

Using Mobile NX Metrics, you can identify top N requests, slow requests, and requests most likely to fail. You’re also able to understand all the third party calls your app is making through included libraries. You always suspected that ad network you’re calling out to kills performance. Now you know.

## Free (as in 🍻) to use

Cloudflare’s Mobile SDK is free for you to use. You don’t need a Cloudflare account to sign up for the Mobile SDK. Log in to the portal, download the SDK and integrate it with your app.

## Gives you actionable insights

Existing mobile app analytics platforms give you visibility into your in-app performance but has no knowledge about outgoing network calls. The dashboard gives you actionable insights into what you can do to improve your app’s network performance.

![Actionable Insights](./images/insights.png)

In this scenario, `/media/JfLdlahamXQ10/200.gif` is taking more than 11 seconds to load. It is probably a good idea to cache this endpoint using a CDN.

## Easy to install

The Cloudflare Mobile SDK is very easy to integrate with your existing app. Once you have imported the SDK, it’s a single line change in your AppDelegate file inside `didFinishLaunchingWithOptions`.

```swift
func application(_ application: UIApplication,
                  didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    //Cloudflare Mobile SDK Setup
    CFMobile.initialize("CLOUDFLARE_CLIENT_KEY");// Substitute this line with: [CFMobile initialize:@"CLOUDFLARE_CLIENT_KEY"]; if you are using Objective C
    ..........
    ..........
    ..........
    return true
}
```

Similarly, on Android, once you have imported the library, initialize Cloudflare Mobile SDK only once on the main thread at the beginning of your `onCreate` activity:

```java
public void onCreate() {
    super.onCreate();
    CFMobile.initialize(getApplicationContext(),“CLOUDFLARE_CLIENT_KEY");
    ................
    ................
}
```

To learn more about how you can integrate the Cloudflare Mobile SDK with your mobile application checkout the platform specific docs:

- [iOS](/getting_started/ios)
- [Android](/getting_started/android)

## Get started

[Sign up](https://mobilesdk.cloudflare.com) for the free Metrics Mode.

<p><Link to="https://mobilesdk.cloudflare.com" className="Button Button-is-docs-primary">Sign up</Link></p>
