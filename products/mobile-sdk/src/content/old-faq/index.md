---
title: FAQ
hidden: true
---

## Introduction ##

This document contains a collection of answers to the most common questions people ask about using the Neumob SDK.

## NeumobBot: I am seeing requests from NeumobBot. What are these? ##

These are normal. Neumob uses real-time measurements from mobile operators and the Internet to find the best path to fetch content. A distributed network of agents with User-Agent = NeumobBot are used to conduct these measurements. The rate of NeumobBot UDP requests is once per pop, per domain, per hour. This rate does not increase with traffic.

## My company uses a CDN, firewall, WAF, or other filter for incoming requests. Can we still integrate Neumob SDK into our app? ##

1. Neumob SDK can integrate into your existing setup. To aid with the integration, we have the following features available:

### Neumob Headers ###

With Neumob SDK version 3.2.4+ (iOS) and 3.2.7+ (Android), the Neumob SDK adds a custom header to all requests sent through the Neumob Acceleration Network. The custom header is called "X-Neumob" with a base-64 encoded hash of the app client key, which can be generated using the following *nix/MacOS command sequence:  echo -n {clientkey} | shasum -a 1 | xxd -r -p | base64.

**Requests with the "X-Neumob" header should be allowed through existing filters.**

An example Neumob custom header can be found below.

    X-Neumob: 7LE++QCMeQmJmxg/eqtZvz/tcDE=

### IP Addresses ###

**PLEASE NOTE THAT OUR IP ADDRESS LIST CHANGES OFTEN!**

It is *strongly* encouraged to filter based on HTTP header as listed above rather than IP address, but it is understood that sometimes this is not possible, so Neumob makes available a real-time list of IP blocks and addresses used at every Point of Presence (PoP) within the Neumob Global Network. These can be found by navigating to the following web address: `https://portal.neumob.com/v2s/developers <https://portal.neumob.com/v2s/developers>`_

## Does Neumob support monitoring of network traffic through a web proxy like Charles Proxy? ##

1. The Neumob SDK uses a UDP-based custom protocol to provide acceleration over the "mobile" mile. Charles Proxy supports http/https over TCP, so traffic that is being accelerated through the Neumob SDK will not be visible within Charles Proxy.

## Is there any way for my origin to know the client IP address that a request was made from? ##

1. As data transmitted through the Neumob SDK is sent via our proxy servers, the source IP address shown when the request arrives at the origin server will be that of a Neumob proxy server. However, within the request the Neumob SDK adds a header, called "X-Forwarded-For", to the request that can be used to determine the client's original IP address.

    X-Forwarded-For: 1.1.1.1

## Your website says that the service takes 2 days to learn, customize, and then accelerate our network calls. Does it also require a certain volume of calls? ##

1. The Neumob Global Acceleration Network relies on machine learning to learn your app domains, types of content, and routing. This process can take up to 2 days depending on traffic volumes. If Neumob hasn't learned the route, it may choose to bypass the Neumob Protocol and go directly to origin.

In cases where Neumob pulls from your existing CDN instead of directly from your origin, this is especially necessary because we have to learn the best CDN location to pull from each of our pops.

## When compiling my Android App with the Neumob SDK integrated, I receive the following error: “java.lang.UnsatisfiedLinkError”. How do I avoid this? ##

When loading native binaries, Android will resolve the binary loaded to the closest architecture found. For example, when building for a 64-bit phone, Android may first look for a 64-bit binary before looking for a 32-bit binary to fall back on. If Android finds the 64-bit folder, it'll only load native binaries contained in the 64-bit folder and throw an UnsatisfiedLinkError otherwise.

If you are using other libraries with native binaries, you may encounter the above exception when Neumob and a 3rd-party library mismatch included architectures. Here are some steps to quickly resolve the issue:

1. Decompile your APK (apktool) or extract the contents (change .apk -> .zip).
2. The resulting directory will contain a lib/ folder containing native binaries for different architectures.
3. Neumob includes a native binary called libcproxy built for arm64-v8a, armeabi, armeabi-v7a, and x86.

3.1) If the lib/ folder for your APK includes more folders than the above (often mips, mips64, x86_64), then the Neumob SDK will not initialize on those machines but the app will continue to run fine. If you are using a 3rd-party library with an x86_64 native binary and testing on a Mac simulator (x86_64), please send a message to support@neumob.com.

3.2) If you are encountering the issue and Neumob is building for additional architectures (often armeabi-v7a and x86), you can modify the Neumob jar file for compatibility with ``zip -d neumob-android-X.X.X.jar lib/arch_to_remove/libcproxy.so lib/arch_to_remove/``
