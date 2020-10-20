---
title: API Reference
hidden: true
---

## Neumob Class ##

Neumob Accelerator SDK top-level class. Provides APIs to initialize the SDK and accelerate the network requests.

Inherits NSObject.

### Class Methods ###

Initialize Neumob Accelerator SDK with the client key.

**Parameters**

#### | clientKey          | Application client key generated from Neumob portal. Must not be nil or empty.| ####

---

Initialize Neumob Accelerator SDK with the client key and executes the provided block on a background thread
once the SDK is initialized.

**Parameters**

#### | clientKey          | Application client key generated from Neumob portal. Must not be nil or empty.| ####

#### | completionHandler  | A block that is executed after Neumob Accelerator SDK is initialized.         | ####

---

Gets the authentication status of Neumob Accelerator SDK

**Returns**

Returns boolean value that determines if SDK is authenticated.

Gets the initialization status of Neumob Accelerator SDK

**Returns**

Returns a boolean value indicating SDK is enabled and ready to accelerate network requests.

Gets the curent acceleration status of Neumob Accelerator SDK. You may configure whether or
not Neumob SDK is accelerating requests by adjusting the % accelerated slider through the
1. Note that `accelerated` status is sticky meaning a user who is accelerated will
   remain accelerated until the % accelerated slider value is changed.
   

**Returns**

Returns a boolean value indicating if SDK is accelerating network requests.

Gets the current log level used by the Neumob Acclerator SDK. See `Logging <http://docs.neumob.com/ios/logging.html>`_

**Returns**

Returns current log level.

Sends the Key Performance Index (KPI) attributes to metrics endpoint.

**Parameters**

#### | key    | NSString object representing KPI key.   | ####

#### | value  | NSString object representing KPI value. | ####

---

Set the log level used by the Neumob Accelerator SDK. See `Logging <http://docs.neumob.com/ios/logging.html>`_

**Parameters**

#### | logLevel  | Log level to set. | ####

---

