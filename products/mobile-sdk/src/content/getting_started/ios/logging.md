---
title: Logging
weight: 1
---

By default, SDK logs messages that are useful to verify SDK functionality. To disable or tune what log messages are printed,
use the ``setLogLevel`` API. To retrieve the current log level, use the `logLevel` API.
   

    // Objective C
    [CFMobile setLogLevel:CFLogLevelNone];
    NSLog(@"Current SDK log level is none: %@", [CFMobile logLevel] == CFLogLevelNone ? @"true" : @"false");

    // Swift
    CFMobile.setLogLevel(CFLogLevel.None);
    print("Current SDK log level is none: \(CFMobile.logLevel() == CFLogLevel.None)");

The logging levels available in order of verbosity are as follows:

1. ``CFLogLevelDetail`` - Print all SDK log messages (Default).
2. ``CFLogLevelWarning`` - Only print warning and error messages.
3. ``CFLogLevelError`` - Only print error messages.
4. ``CFLogLevelNone`` - Turn off all SDK log messages.

