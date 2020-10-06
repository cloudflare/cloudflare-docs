---
title: Getting Started with Unity for iOS
---

## Introduction ##

The Neumob Unity plugin implements support for using Neumob, allowing you to accelerate network requests in your Unity-iOS builds.

The Neumob Unity plugin requires Unity 5.0 or newer and iOS 7.0 and up.You can find the plugin on the `Unity Asset store <http://u3d.as/nX8>`_ or you can checkout the GitHub repository `here <https://github.com/neumob/neumob-unity-ios>`_.

## Installation ##

To integrate the Neumob-iOS plugin:

### 1. Import the plugin ###

Grab **Plugins** folder which includes the **Editor** folder and 3 files **libNeumob-3.x.x.2.a**, **NeumobIOS.cs**, and **NeumobIOSInit.cs** and place the it into the **Assets** directory of your Unity project. If you do not have a **Plugins** directory, just copy the **Plugins** directory for Neumob into your **Assets** directory.

If you plan on building a non-bitcode enabled application please grab the latest non-bitcode enabled binary `here <https://storage.googleapis.com/nm-portal-storage/libNeumob-v3.2.3.1.a>`_ and replace the file **libNeumob-v3.x.x.2.a** in the Plugins folder with the **libNeumob-v3.x.x.1.a** file in the link.

### 2. Create an empty GameObject ###

Create an empty GameObject (*GameObject -> Create Empty*) and add the NeumobIOSInit.cs script as a component of your newly created GameObject (Select *GameObject -> Add Component -> Scripts -> Neumob IOS Init*).

Select your newly created game object in the Hierarchy pane and fill in some additional informations inside the Inspector window.

- **Client Key** - the client key provided by Neumob. Your client key can be retrieved on the portal by registering an application.
  

Initialization is the process of modifying your application in order to communicate with Neumob. If you have created a GameObject with the above instructions then Neumob is now integrated with your Unity iOS application.

In order to turn ``ON`` Neumob for your app version you'll go to the portal's app details page where you received your client key. The **State** for the app version will be ``OFF`` and this can be changed by clicking the settings button under ``Action``, toggling the switch in the upper right corner of the following screen, and then the ``Apply`` button at the bottom.

<dl>
  <dt>.. note :  : </dt>
  <dd>Neumob takes about 2 days to learn, customize, and then accelerate you network calls.</dd>
</dl>

### 3. Verifying Initialization ###

To check that Neumob is initialized and whether an app session is being **accelerated**, you can customize the ``Callback`` method in ``NeumobIOSInit.cs``.
#### ``initialized`` returns a boolean indicating Neumob is enabled and ready  ####

<dl>
  <dt>to accelerate your network requests.</dt>
  <dd></dd>
</dl>

``accelerated`` returns a boolean indicating whether Neumob is currently accelerating your requests. You may configure whether or not Neumob is accelerated by adjusting the % accelerated slider through the portal (click the **settings** button for the app version on your app details page). If you plan to A / B test accelerated vs unaccelerated Neumob sessions, we recommend using the ``accelerated`` parameter the ``Callback`` function. Please note that ``accelerated`` is **sticky**- meaning a user who is **accelerated** will remain accelerated until the % accelerated slider value is changed.

<dl>
  <dt>The ``accelerated`` boolean value can be used to populate a property or dimension within your mobile analytics platform.</dt>
  <dd></dd>
</dl>

Here's an example of how you might verify Neumob initialization and check whether a session is accelerated.

<div dangerouslySetInnerHTML={{__html: `<dl>
  <dt>    [MonoPInvokeCallback(typeof(NeumobIOS.CompletionHandler))]</dt>
  <dd>
    <p>[MonoPInvokeCallback(typeof(NeumobIOS.CompletionHandler))]</p>
    <p>private static void Callback(bool initialized, bool accelerated)</p>
    <p>{</p>
    <p>if (initialized)</p>
    <p>{</p>
    <p>// Neumob is ON.</p>
    <p>// ex. Analytics.LogCustomDimension(Dimension.ACCELERATION, accelerated);</p>
    <p>...</p>
    <p>} else</p>
    <p>{</p>
    <p>// Neumob is OFF. Change log settings for more details.</p>
    <p>...</p>
    <p>}</p>
    <p>}</p>
  </dd>
</dl>`}}></div>


### 4. KPI Metrics ###

To track and report any Key Performance Indicators from the app within the Neumob system, use ``Neumob.ReportKPIMetrics`` API.

<dl>
  <dt>    /**</dt>
  <dd>
    <p>/**</p>
    <p>* Report user defined KPI metrics.</p>
    <p>* @param key Name of the KPI key</p>
    <p>* @param value Value of the KPI metric</p>
    <p>*/</p>
    <p>public static void ReportKPIMetrics(String key, String value)</p>
  </dd>
</dl>

#### An example invocation of the KPI metrics API: ####

   NeumobIOS.ReportKPIMetrics("item_purchased", "true");

### 5. Build & Run! ###

You are now ready to build the Xcode project: Select *File -> Build Settings...* and switch to iOS in the platform section. Build & Run... that's it!
