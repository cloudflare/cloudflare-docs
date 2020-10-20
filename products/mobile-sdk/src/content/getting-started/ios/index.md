---
order: 2
---

# iOS

## Requirements

- Xcode 8 and above
- iOS 9.0 and above

## Installing the Cloudflare Mobile SDK

### Bitcode

There is both bitcode enabled and bitcode disabled versions of Cloudflare Mobile SDK. To distinguish whether a version of SDK has bitcode enabled,
check the last digit of the release version.

- `x.x.x.1` → Bitcode Enabled = No
- `x.x.x.2` → Bitcode Enabled = Yes

To determine whether your application has bitcode enabled, navigate to your project and check the **Enable Bitcode** property in your **Build Settings**
under **Build Options**.

If you are unsure whether you should use bitcode enabled or disabled SDK, go ahead and choose bitcode enabled SDK as bitcode is enabled by default in latest Xcode versions.

### Manual installation (drag and drop)

Download and unzip appropriate bitcode enabled/disabled Cloudflare Mobile iOS SDK from portal. You can find the download link under your App settings in portal.

![Drag and drop](../../images/drag-and-drop.gif)

1. Drag **CloudflareMobileSDK.framework** into your Xcode project. Ensure that "Copy items if needed" checkbox is selected when prompted by Xcode.
2. Link following iOS frameworks in your project:
   + **SystemConfiguration.framework**
   + **CoreTelephony.framework**
   + **libresolv.9.tbd** (Xcode 7+).
   + **libz.tbd**

   We use SystemConfiguration and CoreTelephony to optimize configurations for your network and to respond to any changes that may occur. We use libresolv
   for DNS related functions.

### CocoaPods installation

If you use CocoaPods, add the following line to your project’s ``podfile``
and run ``pod install`` or ``pod update``.

   pod 'CloudflareMobileSDK'

The latest version pulled through CocoaPods will be built with ``bitcode enabled``.
If you wish to have a bitcode disabled version, please find the latest Cloudflare
Mobile SDK [release](https://cocoapods.org/pods/CloudflareMobileSDK) and append
``1`` instead of ``2``.

    | Ex.
    | pod 'CloudflareMobileSDK', '3.1.1.1' // Bitcode not enabled
    | pod 'CloudflareMobileSDK', '3.1.1.2' // Bitcode enabled

### Troubleshooting

When you try to do `pod install`, the following error:

    | [!] Unable to find a specification for `CloudflareMobileSDK`

might happen if the local repository for `CloudflareMobileSDK.spec` is not present. Every package in Cocoapods has spec file associated with it. When this spec file is not present in the local repository it throws an error `Unable to find a specification`.

Try running `pod setup`. This should sync the remote repository and now you run `pod install` to install the SDK.

## Initializing Cloudflare Mobile SDK

Initialization is the process of modifying your application in order to communicate with Cloudflare Network. To initialize the SDK, you’ll have to import
**CFMobile** header file into your AppDelegate’s implementation file.

For Swift applications, place this import in your **bridging-header.h** file.

```swift
// AppDelegate.m (Obj-C) or bridging-header.h (Swift)
#import <CloudflareMobileSDK/CFMobile.h>
```

Initialize SDK at the beginning of your AppDelegate's **application:didFinishLaunchingWithOptions:** method.

### Objective-C
```swift
[CFMobile initialize:@"CLOUDFLARE_CLIENT_KEY"];
```

### Swift
```swift
CFMobile.initialize("CLOUDFLARE_CLIENT_KEY");
```

A unique client key is created when you register your application and can be retrieved from the portal.

Cloudflare Mobile SDK is now integrated with your iOS application! The **SDK State** for the app version will be ``ON`` by default and this can be changed by toggling the **SDK** button on top right corner of App details page.

## Verifying Integration

To verify that Cloudflare SDK is initialized you can add a **completionHandler** parameter to initialize selector which
will execute asychronously after SDK initialization is complete.

The **initialized** selector returns a boolean indicating whether SDK is initialized or not.

Here's an example of how you might verify SDK initialization.

### Objective-C

```objective-c
// Objective-C
[CFMobile initialize:@"CLOUDFLARE_CLIENT_KEY" completionHandler:^{
    if ([CFMobile initialized]) {
        // SDK is ON.
        ...
    } else {
        // SDK is OFF. Change log settings for more details.
        ...
    }
}];
```

### Swift

```swift
// Swift
CFMobile.initialize("tCMVTYrTosuMaDSy", completionHandler: {
    if (CFMobile.initialized()) {
        // SDK is ON.
        print("sdk is on")
        ...
    } else {
        // SDK is OFF. Change log settings for more details.
        print("sdk is off")
        ...
    }
})

```

## Disabling Cloudflare Mobile SDK

If for any reason you would like to disable Cloudflare Mobile SDK, navigate to the portal to your app settings and select the combination of application versions and/or
Cloudflare SDK versions that should be disabled. Once disabled, SDK will not initialize on the device.

## React Native

Please refer to document at [React Native](/getting_started/react/).

## Limitations

1. Cloudflare Mobile SDK has a native dependency which causes the Xcode debugger to stop on SIGPIPEs. These SIGPIPEs will not negatively affect your application and you can
   ignore them by adding a breakpoint with the debugger command
   ``process handle SIGPIPE -n false -s false``

2. Cloudflare Mobile SDK does not currently support ``WKWebView`` requests.

## Contact

Please reach out to [support@cloudflare.com](mailto:support@cloudflare.com) for any questions, comments, or concerns.
