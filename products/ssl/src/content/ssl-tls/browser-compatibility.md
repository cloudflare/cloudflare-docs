---
order: 5
---

# Browser compatibility

Cloudflare attempts to provide compatability for as wide a range of user agents (browsers, API clients, etc.) as possible. The specific set of supported browsers differs by SSL product, however. See below for specific details.

--------

## Universal SSL

Feature/Zone Plan | Free | Pro | Business | Enterprise
------|-------------|---------------|---------------|---------------
Clients using ECDSA key exchange|✅|✅|✅|✅
Clients using RSA key exchange|❌|✅|✅|✅
Clients without SNI [^1]|❌|✅|✅|✅

### Free plan
Universal SSL certificates issued for Free plan zones require user agents that i) send Server Name Indication (SNI) and ii) support the Elliptic Curve Digital Signature Algorithm (ECDSA). SNI and ECDSA certificates work with the following modern browsers: 

**Desktop Browsers installed on Windows Vista or OS X 10.6 or later**:

* Internet Explorer 7
* Firefox 2 
* Opera 8 (with TLS 1.1 enabled)
* Google Chrome v5.0.342.0
* Safari 2.1
* Mobile Browsers

**Mobile Safari for iOS 4.0**:

* Android 3.0 (Honeycomb) and later
* Windows Phone 7

### Paid plans

Paid plans provide additional compatibility with older browsers/operating systems, such as Windows XP and Android 3.0 and earlier.

--------

## Other products

Feature/Product | Custom (Legacy IP) | Custom Certificates | Dedicated Certificates | SSL for SaaS
------|-------------|---------------|---------------|---------------
Clients using ECDSA key exchange [^1]|✅|✅|✅|✅
Clients using RSA key exchange [^1]|✅|✅|✅|✅
Clients without SNI [^1]|✅|❌|❌|❌|❌

[^1]: *Server Name Indication (SNI) is an extension to the TLS protocol that was standardized in 2003. However, some browsers and operating systems waited until TLS 1.1 was released in 2006 to implement this extension (or 2011 for mobile browsers). If your visitors are using devices that have not been updated since 2011, they may not have SNI support.*