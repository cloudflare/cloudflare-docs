Suggestion: We could benefit from an example of how to ingests HTTP Logpush events with Cloudflare Workers. 

Scenario: A customer is looking for a way to send logs to Taegis (their SIEM tool); however it does not support the custom HTTP log push as the log push has compression. 
They are therefore thinking of using Log Push to send it to R2 and are then wondering if there is another product that could be used to un-compress the log file and send it further on.

As per CSUP thread:  https://chat.google.com/room/AAAAqoHFg2w/_hzS93WzXO4

They could send to a Worker of their own, ungzip on the fly and send on to their SIEM tool, that way it's basically right to that gzip decompression stream on the body and stream it on:

https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream

