---
title: Proguard
---

# Using Proguard

To use ``Proguard`` with the Cloudflare SDK, please add

    -dontwarn com.cloudflare.**
    -dontnote com.cloudflare.**

to your ``proguard-rules.pro`` file.

When you use Android SDK 3.0.0 and later, you may need the following
proguard configuration depending on libraries you are using.

## okhttp3 and picasso

    -dontwarn com.squareup.okhttp.**
    -dontwarn com.squareup.picasso.**
    -dontwarn com.jakewharton.picasso.**
    -dontnote okhttp3.**
    -dontnote okio.**

    # https://github.com/krschultz/android-proguard-snippets/blob/master/libraries/proguard-square-okhttp3.pro
    # OkHttp
    -keepattributes Signature
    -keepattributes *Annotation*
    -keep class okhttp3.** { *; }
    -keep interface okhttp3.** { *; }
    -dontwarn okhttp3.**

    # https://github.com/square/okhttp/blob/master/okhttp/src/main/resources/META-INF/proguard/okhttp3.pro
    # JSR 305 annotations are for embedding nullability information.
    -dontwarn javax.annotation.**

    # A resource is loaded with a relative path so the package of this class must be preserved.
    -keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase

    # Animal Sniffer compileOnly dependency to ensure APIs are compatible with older versions of Java.
    -dontwarn org.codehaus.mojo.animal_sniffer.*

    # OkHttp platform used only on JVM and when Conscrypt dependency is available.
    -dontwarn okhttp3.internal.platform.ConscryptPlatform

## retrofit

    # https://github.com/krschultz/android-proguard-snippets/blob/master/libraries/proguard-square-retrofit2.pro

    -dontwarn retrofit2.**
    -keep,includedescriptorclasses class retrofit2.** { *; }
    -keepattributes Signature
    -keepattributes Exceptions

    -keepclasseswithmembers class * {
        @retrofit2.http.* <methods>;
    }

    -dontnote com.google.gson.internal.UnsafeAllocator
    -dontnote retrofit2.converter.gson.*
