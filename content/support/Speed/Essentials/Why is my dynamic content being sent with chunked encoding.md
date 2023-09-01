---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168386-Why-is-my-dynamic-content-being-sent-with-chunked-encoding-
title: Why is my dynamic content being sent with chunked encoding
---

# Why is my dynamic content being sent with chunked encoding?



## Overview

If you have resources that do not have a file extension that [Cloudflare caches](/cache/concepts/default-cache-behavior/) we treat that resource as dynamic HTML. We don't cache it by default, and Cloudflare's system will send that resource gzipped and with chunked encoding.  

**Note** -- it isn't possible to have chunked encoding and content-length at the same time so this would explain why content-length would not be sent with these dynamic resource passing through Cloudflare.

**Note --** Another reason you would not see a content-length header would be if you are sending HTTP 1.1 from your web server. For version 1.1 of the HTTP protocol, the chunked transfer mechanism is considered to be always acceptable, even if not listed in the TE request header field, and when used with other transfer mechanisms, should always be applied last to the transferred data and never more than one time. (Source: [Wikipedia "Chunked Encoding"](http://en.wikipedia.org/wiki/Chunked_transfer_encoding)).  So in this case you will need to make sure you are sending HTTP 1.0 as the protocol from your web server if you specifically need the content-length header.

___

## The Solution/Workaround

If you add a file extension to the resource so that it matches our list of supported file extensions so `http://example.com/test/dynamicallyimage.php?size=3**` becomes `http://example.com/dynamicallyimage.jpg*` Cloudflare's system will then send it with the content-length header as long as you're also sending HTTP 1.0 as the protocol.

Alternatively, you can create a Page Rule in the Cloudflare dashboard by clicking **Rules** > click **Create Page Rule >** select _Cache Level_ in the _Pick a Setting_ dropdown and select _Cache Everything_ in the S_elect Cache Level_ dropdown. This will force our system to cache `http://example.com/test/dynamicallyimage.php?size=3` even though it doesn't have one of our usual file extensions -- in this case the content-length will also be preserved.

___

## Related Resources

[Customizing Cloudflare's Cache](https://support.cloudflare.com/hc/en-us/articles/202775670-Customizing-Cloudflare-s-cache#3LcXQoq6gZgwis25wO4d2o)
