---
title: Getting Started with Cordova
hidden: true
---

## Introduction ##

The Neumob Cordova plugin implements support for using Neumob, allowing you to accelerate network requests in your Cordova builds.

The Neumob Cordova plugin requires Cordova engine v4.0.0 or higher. For Android you will need Cordova 5.4 or higher. Minimum supported operating systems are iOS 7+ and Android 4.0+.

## Installation ##

To integrate the plugin, run the following command in your project directory:

   `cordova plugin add cordova-plugin-neumob`

## Initializing Neumob ##

Initialization is the process of modifying your application in order to communicate with Neumob. You will need to register your iOS and/or Android application and obtain an ``appID`` from the Neumob portal.

**Initialize** Neumob after the plugins are finished loading. To initialize Neumob use the following API in either your **onDeviceReady** event or whenever your app plugins are loaded.  

### ``Neumob.initWithCallback(appIds, callback)`` ###

- - **appIds** - Your application identifiers. Obtain this id by registering an app at portal.neumob.com. Simply add your appIDs as values corresponding to the platforms. Platforms currently available are iOS and Android.

- - **callback** - The callback is a optional function that can be used to verify initialization. It should accept 2 parameters:
  - ``initialized`` is a boolean indicating Neumob is enabled and ready to accelerate your network requests.
  - ``accelerated`` is a boolean indicating whether Neumob is currently accelerating your requests. You may configure whether or not Neumob is accelerated by adjusting the % accelerated slider through the portal (click the **settings** button for the app version on your app details page). If you plan to A / B test accelerated vs unaccelerated Neumob sessions, we recommend using the ``accelerated`` API in the ``completionHandler``. Please note that ``accelerated`` is **sticky**- meaning a user who is **accelerated** will remain accelerated until the % accelerated slider value is changed. The ``accelerated`` boolean value can be used to populate a property or dimension within your mobile analytics platform.

    Here's an example of how you might verify Neumob initialization and check whether a session is accelerated.

    <dl>
    <dt>  onDeviceReady : function() {`{`}</dt>
    <dd>
      <p>onDeviceReady: function() {`{`}</p>
    <p>Neumob.initWithCallback(</p>
    <p>{`{"ios":"youriOSAppID", "android":"yourAndroidAppID"}`},</p>
    <p>function(initialized, accelerated) {`{`}</p>
    <p>if (initialized) {`{`}</p>
    <p>// Neumob is ON.</p>
    <p>// ex. [Analytics logCustomDimension: Dimension.ACCELERATION value: accelerated];</p>
  </dd>
  </dl>

 > <dl>
 >   <dt>...</dt>
 > <dd>{`}`} else {`{`}</dd>
 > </dl>
 > #### // Neumob is OFF. Change log settings for more details. ####
 >
 >  > <dl>
 >  >   <dt>{`}`}</dt>
 >  > <dd>
 >  >   <p>{`}`});</p>
  <p>{`}`}</p>
  </dd>
 >  > </dl>

### Neumob is now integrated with your Cordova application! ###

## Logging ##

### By default, Neumob logs messages that may to useful to verify Neumob initialization. To disable or tune what log messages are printed use the *setLogLevel* API. To retrieve the current log level use the *logLevel* API. ###

    `Neumob.setLogLevel(Neumob.NONE);`

The logging levels available in order of verbosity are as follows
1. ``Neumob.LOG_DETAIL`` - (Default) Print all messages
2. ``Neumob.LOG_WARNING`` - Only print warning and error messages
3. ``Neumob.LOG_ERROR`` - Only print error messages
4. ``Neumob.LOG_NONE`` - Turn off all Neumob log messages

   ## Considerations ##

5. The Cordova SDK uses allows you to accelerate only certain domains by implementing a blacklist or whitelist in the portal for your SDK Version and App Version. If you use 3rd party APIs like Google Analytics, we recommend adding those hosts to the blacklist.

   iOS

~~~
### 1. If you are building a bitcode NOT enabled application, you will need to replace the Neumob.framework dependency in **platform/ios/NeumobSDK**. You can find a bitcode not enabled framework on the portal by navigating to any iOS application you've created and downloading the SDK with the format x.x.x.1 where 1 indicates bitcode disabled and 2 indicated bitcode enabled. ***

1. The Cordova iOS SDK has a native dependency which causes the Xcode debugger to stop on SIGPIPEs. These SIGPIPEs will not negatively affect your application and you can ignore them by adding a breakpoint with the debugger command ``process handle SIGPIPE -n false -s false``




1. The Cordova iOS SDK does not currently support ``WKWebView``.