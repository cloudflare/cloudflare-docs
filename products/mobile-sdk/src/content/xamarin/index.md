---
title: Getting Started with Xamarin
hidden: true
---

## Introduction ##

The Neumob Xamarin plugin implements support for using Neumob, allowing you to accelerate network requests in your Xamarin application.

## Installation ##

To integrate the plugin, download Neumob from the Xamarin component `store <https://components.xamarin.com/view/neumob>`_. Once you've downloaded the component, add the ``NeumobIOS.dll`` and/or the ``NeumobAndroid.dll`` file(s) to your respective ``iOS`` and/or ``Android`` projects as ``References``.

## Neumob iOS ##

In your AppDelegate.cs:

<div dangerouslySetInnerHTML={{__html: `<dl>
  <dt>    using NeumobIOS;</dt>
  <dd>
    <p>using NeumobIOS;</p>
    <p>public override bool FinishedLaunching (UIApplication application, NSDictionary launchOptions)</p>
    <p>{</p>
    <p>// By default, Neumob logs messages that are useful to verify</p>
    <p>// Neumob initialization. To disable or tune what log messages</p>
    <p>// are printed use the LogLevel API.</p>
    <p>//</p>
    <p>// NMLogLevel.None    - Turn off all Neumob log messages</p>
    <p>// NMLogLevel.Error   - Only print error messages</p>
    <p>// NMLogLevel.Warning - Only print warning and error messages</p>
    <p>// NMLogLevel.Detail  - (Default) Print all messages</p>
    <p>Neumob.LogLevel = (int) NMLogLevel.None;</p>
    <p>//Initialize Neumob with your client key from portal.neumob.com</p>
    <p>Neumob.Initialize("YOU CLIENT KEY", completionHandler);</p>
    <p>return true;</p>
    <p>}</p>
    <p>// The completionHandler is executed when Neumob is finished</p>
    <p>// initialization. It is not executed on the main thread.</p>
    <p>public void completionHandler()</p>
    <p>{</p>
    <p>// <b>Initialized</b> returns a boolean indicating Neumob is enabled</p>
    <p>// and ready to accelerate your network requests.</p>
    <p>bool neumobInitialized = Neumob.Initialized;</p>
    <p>// <b>Accelerated</b> returns a boolean indicating whether Neumob is</p>
    <p>// currently accelerating your requests.</p>
    <p>bool neumobAccelerated = Neumob.Accelerated;</p>
    <p>// You may configure whether or not Neumob is accelerated by</p>
    <p>// adjusting the passthrough parameter on the portal. If you plan</p>
    <p>// to A / B test accelerated vs unaccelerated Neumob sessions, we</p>
    <p>// recommend using the <b>Accelerated</b> API in the completionHandler.</p>
    <p>// ex. Analytics.LogCustomDimension(Dimension.Accelerated, neumobAccelerated);</p>
    <p>}</p>
  </dd>
</dl>` }}></div>

### At this time the Neumob Xamarin iOS SDK supports ``NSUrlSession``, ``NSUrlConnection``, ``UIWebView``, and ``ModernHttpClient``. ###

## Neumob Android ##

In your main activity class:

<div dangerouslySetInnerHTML={{__html: `<dl>
  <dt>    using NeumobAndroid;</dt>
  <dd>
    <p>using NeumobAndroid;</p>
    <p>protected override void OnCreate (Bundle bundle)</p>
    <p>{</p>
    <p>// By default, Neumob logs messages that are useful to verify</p>
    <p>// Neumob initialization. To disable or tune what log messages</p>
    <p>// are printed use the LogLevel API.</p>
    <p>//</p>
    <p>// Neumob.LOG_NONE    - Turn off all Neumob log messages</p>
    <p>// Neumob.LOG_ERROR   - Only print error messages</p>
    <p>// Neumob.LOG_WARNING - Only print warning and error messages</p>
    <p>// Neumob.LOG_DETAIL  - (Default) Print all messages</p>
    <p>Neumob.SetLogLevel(Neumob.LOG_NONE);</p>
    <p>//Initialize Neumob with your client key from portal.neumob.com</p>
    <p>Neumob.Initialize(ApplicationContext, "YOUR CLIENT KEY", completionHandler);</p>
    <p>}</p>
    <p>// The completionHandler is executed when Neumob is finished</p>
    <p>// initialization. It is not executed on the main thread. To write</p>
    <p>// the appropriate delegate, you'll need to pass in a function</p>
    <p>// returning void with 2 boolean parameters.</p>
    <p>//</p>
    <p>// @param initialized - boolean indicating Neumob is enabled and ready</p>
    <p>// @param accelerated - boolean indicating whether Neumob is accelerating your requests</p>
    <p>public void completionHandler(bool initialized, bool accelerated)</p>
    <p>{</p>
    <p>// You may configure whether or not Neumob is accelerated by</p>
    <p>// adjusting the passthrough parameter on the portal. If you plan</p>
    <p>// to A / B test accelerated vs unaccelerated Neumob sessions, we</p>
    <p>// recommend using the <b>Accelerated</b> API in the completionHandler.</p>
    <p>// ex. Analytics.LogCustomDimension(Dimension.Accelerated, accelerated);</p>
    <p>}</p>
  </dd>
</dl>`}}></div>

At this time the Neumob Xamarin Android SDK supports ``WebClient``, ``HttpWebRequest``, and ``Java.Net.HttpURLConnection``.
