---
order: 3
---

# React Native

At this time, the Cloudflare SDK only supports React Native for iOS.

## iOS

Please follow the instructions under *Installing The Cloudflare Mobile SDK* in iOS integration [document](/getting_started/ios/) before proceeding with the instructions here.

Initialization requires additional classes to bridge JavaScript to Cloudflare API. In your iOS project or workspace you can use the below files directly or as references to create your own bridge.

### CloudflareJSBridge.h

```swift
---
filename: CloudflareJSBridge.h
---
#import <React/RCTBridgeModule.h>

@interface CloudflareJSBridge : NSObject <RCTBridgeModule>
@end
```

### CloudflareJSBridge.m

```swift
---
filename: CloudflareJSBridge.m
---
#import "CloudflareJSBridge.h"
#import <CloudflareMobileSDK/CFMobile.h>

@implementation CloudflareJSBridge


/**
 RCT_EXPORT_MODULE exports this class to { NativeModules } from 'react-native'

 If you'd like to have a different name, simply input the name as a parameter ex. RCT_EXPORT_MODULE(CFBridge);
 */
RCT_EXPORT_MODULE();


/**
 Initialization is the process of modifying your application in order to communicate with Cloudflare network.
 Initialize CFMobile SDK on the main thread at beginning of index.js file.
 ``
 import { NativeModules } from 'react-native';
 NativeModules.CloudflareJSBridge.initialize('MPcfbXmBunkZJfwU');
 ``
 @param clientKey - application client key
 */
RCT_EXPORT_METHOD(initialize:(NSString *)clientKey) {
  [CFMobile initialize:clientKey];
}


/**
 Initialization is the process of modifying your application in order to communicate with Cloudflare network.
 Initialize CFMobile SDK on the main thread at beginning of index.js file.
 ``
 import { NativeModules } from 'react-native';
 NativeModules.CloudflareJSBridge.initialize('MPcfbXmBunkZJfwU', (error, initState) => {
     if (error || !initState[0]) {
         // CFMobile SDK is OFF. Change log settings for more details.
         ...
     } else {
         //CFMobile SDK is ON.
         ...
     }
 });
 ``
 @param clientKey - application client key
 @param completionHandler - a callback that is run after CFMobile SDK is asynchronously initialized.
 The callback is executed on a background thread. The callback will have two return values
     1) error (always null)
     2) initState - an array where the first value returns a boolean indicating CF Mobile SDK is enabled.

  Please see the 'Verifying Integration' in the iOS docs for more information @ https://developers.cloudflare.com/mobile-sdk/ios/
 */
RCT_EXPORT_METHOD(initialize:(NSString *)clientKey completionHandler:(RCTResponseSenderBlock)callback) {
  [CFMobile initialize:clientKey completionHandler:^{
    if (!callback) {
      return;
    }

    // values[0] will be the initialization value
    // values[1] will be the acceleration value (ignore this for now)
    callback(@[[NSNull null], @[@([CFMobile initialized]), @([CFMobile accelerated])]]);
  }];
}

/**
 Set the log level used by the CF Mobile SDK.
 */
RCT_EXPORT_METHOD(setLogLevel:(int)logLevel) {
  [CFMobile setLogLevel:logLevel];
}

- (NSDictionary *)constantsToExport {
  return @{ @"LogLevelDetail": @(0x1),
            @"LogLevelWarning": @(0x3),
            @"LogLevelError": @(0x4),
            @"LogLevelNone": @(0xF) };
}

@end
```

### index.js

```js
import { NativeModules } from 'react-native';

// ...
NativeModules.CloudflareJSBridge.initialize('MPcfbXmBunkZJfwU', (error, initState) => {
  if (error || !initState[0]) {
    ...
  } else {
    //CFMobile SDK is ON.
  }
});
```

## Android

Cloudflare is currently not compatible with Android React Native.

## Contact

Please reach out to [support@cloudflare.com](mailto:support@cloudflare.com) for any questions, comments, or concerns.
