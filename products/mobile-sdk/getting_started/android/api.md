---
title: API Reference
hidden: true
---

## Neumob Class ##

Neumob Accelerator SDK top-level class. Provides APIs to initialize the SDK and accelerate the network requests.

### Public Methods ###

Initialize Neumob Accelerator SDK with the client key. Call this function during app launch typically at
beginning of your onCreate activity or application.

**Parameters**

#### | context    | Application context from getApplicationContext()                              | ####

#### | clientKey  | Application client key generated from Neumob portal. Must not be nil or empty.| ####

---

Initialize Neumob Accelerator SDK with the client key and executes the provided runnable on a background thread
once the SDK is initialized. Call this function during app launch typically at beginning of your onCreate
activity or application.

**Parameters**

#### | context     | Application context from getApplicationContext()                              | ####

#### | clientKey   | Application client key generated from Neumob portal. Must not be nil or empty.| ####

#### | onComplete  | A block that is executed after Neumob Accelerator SDK is initialized.         | ####

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

Creates an instance of OkHttpClient. See `OkHttp3 <http://docs.neumob.com/android/okhttp3.html>`_

**Returns**

Returns an instance of OkHttpClient

Creates an instance of OkHttpClient using the provided Builder. See `OkHttp3 <http://docs.neumob.com/android/okhttp3.html>`_

**Parameters**

#### | builder    | Builder configuration to use for creating OkHttpClient   | ####

---

**Returns**

Returns an instance of OkHttpClient

Creates an instance of OkHttpClient. See `OkHttpClient <http://docs.neumob.com/android/okhttp2.html>`_

**Returns**

Returns an instance of OkHttpClient

Create an instance of Retrofit with the url. See `Retrofit <http://docs.neumob.com/android/retrofit.html>`_

**Parameters**

#### | baseUrl    | API base URL   | ####

---

**Returns**

Returns an instance of Retrofit

Create an instance of Retrofit using the configured values in the builder. See `Retrofit <http://docs.neumob.com/android/retrofit.html>`_

**Parameters**

#### | builder    | Builder configuration to use for creating Retrofit       | ####

---

**Returns**

Returns an instance of Retrofit

Initialize a WebView for collecting metrics. See `WebView <http://docs.neumob.com/android/webview.html>`_

**Parameters**

#### | webView    | A WebView that needs to be initialized        | ####

#### | activity   | An Activity where the WebView is hosted       | ####

---

Initialize a WebView for collecting metrics. See `WebView <http://docs.neumob.com/android/webview.html>`_

**Parameters**

#### | webView    | A WebView that needs to be initialized                                   | ####

#### | activity   | An Activity where the WebView is hosted                                  | ####

#### | client     | WebViewClient instance for handling any events at the application level  | ####

---

Gets the current log level used by the Neumob Acclerator SDK. See `Logging <http://docs.neumob.com/android/logging.html>`_

**Returns**

Returns current log level.

Sends the Key Performance Index (KPI) attributes to metrics endpoint.

**Parameters**

#### | key    | Key name of the KPI metric. | ####

#### | value  | Value of the KPI metric.    | ####

---

Set the log level used by the Neumob Accelerator SDK. See `Logging <http://docs.neumob.com/android/logging.html>`_

#### | logLevel  | Log level to set. | ####

---

