---
order: 1
---

# Logging

By default, Cloudflare logs messages that are useful to verify Cloudflare initialization.
To disable or tune what log messages are printed use the `setLogLevel` API.
To retrieve the current log level use the `logLevel` API.

```java
CFMobile.setLogLevel(CFMobile.LOG_NONE);
Log.d(TAG, "Current Cloudflare log level is none: \(CFMobile.getLogLevel() == CFMobile.LOG_NONE)");
```

The logging levels available in order of verbosity are as follows

1. `LOG_DETAIL` – (Default) Print all messages
2. `LOG_WARNING` – Only print warning and error messages
3. `LOG_ERROR` – Only print error messages
4. `LOG_NONE` – Turn off all Cloudflare log messages
