---
order: 3
---

# Android

## Requirements

Minimum version is Android 4.0 (Ice Cream Sandwich). Full feature support only available for 4.3+ (Jelly Bean MR2).

## Installing the SDK

The Cloudflare Mobile SDK is available through **EITHER** of the two ways below. Please choose the most convenient option to you. You can add the SDK as a `gradle` dependency **OR** you can manually add the `JAR` file to your Android project.

Please choose between the options provided.

### Setup permission

Add the following permission to your ``AndroidManifest.xml`` file:

```xml
// Allows Cloudflare to determine optimal mobile configurations
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### Installation via Gradle

Add the following code between *ADD START* and *ADD END* to your root-level build.gradle file:

```java
allprojects {
    repositories {
        // ...

        // ADD START
        maven { url "https://storage.googleapis.com/cloudflare-maven/public/" }
        // ADD END
    }
}
```

Don't put it under `buildscript { repositories { ... } }`.

In your module Gradle file (ex. app/build.gradle), add the Cloudflare SDK dependency:

```java
android {
    // ...
}

dependencies {
    // ...

    // ADD START
    implementation "com.cloudflare:cloudflare-mobile-sdk:2.1.0@aar"
    // ADD END
}
```

### Installation via JAR

[Download the `JAR`](https://storage.googleapis.com/cf-neumob-storage/cloudflare-mobile-sdk-2.1.0.jar)

In Android Studio,

1. Download the Cloudflare Mobile SDK JAR file on the portal page. You can find under a download
link under your App settings.

2. Copy the Cloudflare JAR file to your libs folder

3. Right click the JAR file and click **Add as library**.

## Third party library support

If you are using `OkHttp` you'll need to follow the integration setup documents below. For other libraries, please see the `Compatibility` section at the bottom. 3rd party library support is available through **EITHER** of the 2 ways below.

You can instrument 3rd party objects through APIs available in the Cloudflare SDK **OR** use the `cfandroid` gradle plugin.

The Cloudflare gradle plugin is currently a **beta** product. It is designed to instrument networking libraries. In addition to convenience, another advantage of using the gradle plugin is visibility over requests from 3rd party dependencies using OkHttp. Using the gradle plugin results in a slight increase in build time dependent on the size of your application.

### Instrumentation via APIs

To manually connect Cloudflare with the below 3rd party libraries, please follow the documents below.

- [okhttp2](okhttp2/)
- [okhttp3](okhttp3/)
- [retrofit](retrofit/)
- [picasso](picasso/)

### Instrumentation via Gradle (BETA)

Add the following code between *ADD START* and *ADD END* to your root-level build.gradle file:

```java
buildscript {
    repositories {
        // ...

        // ADD START
        maven { url "https://storage.googleapis.com/cloudflare-maven/public/" }
        // ADD END
    }

    dependencies {
        // ...

        // ADD START
        classpath "com.cloudflare.cfandroidservices:cfandroid-perf:1.0.4-beta"
        // ADD END
    }
}
```

In your module Gradle file (ex. app/build.gradle), add *apply plugin* line to the bottom of the file:

```java
apply plugin: "com.android.application"

android {
    // ...
}

dependencies {
    // ...
}

// ADD START
apply plugin: "com.cloudflare.cfandroid"
// ADD END
```

Clean the project, then build!

## Initializing Cloudflare

Initialization is the process of modifying your application in order to
communicate with Cloudflare. Initialize Cloudflare Mobile SDK only once on the main thread
at the beginning of your ``onCreate`` activity.

```java
CFMobile.initialize(getApplicationContext(),“CLOUDFLARE_CLIENT_KEY");
```

If you are adding the Cloudflare import manually, use

```java
import com.cloudflare.api.CFMobile;
```

Cloudflare is now integrated with your Android application! The **State** for the app version will be `ON` and this can be changed by clicking the
settings button under **Action**, toggling the switch in the upper right corner of the
following screen, and then the **Apply** button at the bottom.

<!-- #### Cloudflare takes about 2 days to learn, customize, and then accelerate your network calls. #### -->

## Verifying integration

To check that Cloudflare is **initialized** you can add a Runnable parameter that will execute after `initialize` is completed.

`isInitialized` returns a boolean indicating Cloudflare is enabled.

<!-- You may configure whether or not Cloudflare is accelerated by adjusting the % accelerated slider through the portal (click the **settings** button for the app version on your app details page). If you plan to A / B test accelerated vs unaccelerated Cloudflare users, we recommend using the ``isAccelerated`` API in the ``Runnable``. Please note that ``isAccelerated`` is **sticky**- meaning a user who is **accelerated** will remain accelerated until the % accelerated slider value is changed. -->

<!-- The ``isAccelerated`` boolean value can be used to populate a property or dimension within your mobile analytics platform. -->

### Here’s an example of how you might verify Cloudflare initialization

```java
CFMobile.initialize(getApplicationContext(),"CLOUDFLARE_CLIENT_KEY", new Runnable() {
    @Override
    public void run() {
        if (CFMobile.isInitialized()) {
            // Cloudflare is ON.
            ...
        } else {
            // Cloudflare is OFF. Change log settings for more details.
            ...
        }
    }
});
```

We do not recommend executing your own initialization code inside the runnable block. Also note that the runnable is not executed on the UI thread.

## Disabling Cloudflare

If for any reason you are looking to disable Cloudflare, navigate to the portal
to your app settings and select the combination of application versions
and/or Cloudflare SDK versions that should be enabled. Once disabled, Cloudflare will
not initialize on the client device.

## Compatibility

The Cloudflare Android SDK has been verified with the following Android libraries:

- OkHttp
- Volley
- VolleyPlus
- Retrofit2
- Glide
- Universal Image Loader
- Picasso
- Fresco

The Cloudflare Android SDK does not currently support:

- React Native
- Cordova

## Considerations

1. For applications using `proguard`, please [follow the instructions](proguard/).

2. The Cloudflare Android SDK does not currently support webviews.

3. The Cloudflare Android SDK will not initialize on certain architectures like mips. This does not prevent an application from running normally on devices of those architectures despite possible warnings about platform limitations. Support for architectures include arm64-v8a, armeabi, armeabi-v7a, x86, x86_64 (fallback to x86). [See hardware stats](https://web.archive.org/web/20171113032047/https://hwstats.unity3d.com/mobile/cpu-android.html).

## Contact

Please reach out to [support@cloudflare.com](mailto:support@cloudflare.com) for any questions, comments, or concerns.
