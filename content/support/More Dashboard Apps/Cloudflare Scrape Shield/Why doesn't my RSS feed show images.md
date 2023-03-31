---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200169316-Why-doesn-t-my-RSS-feed-show-images-
title: Why doesn't my RSS feed show images?
---

# Why doesn't my RSS feed show images?



## Overview

If you cannot see images in your RSS feed, you likely need to disable **Hotlink Protection**.

To do this:

1\. Log into your Cloudflare account and select your domain.

2\. Go to **Scrape Shield**.

3\. For **Hotlink Protection**, select **Off**.

___

## Potential workaround

As a workaround, you could also do the following process:

1\. Make sure your feed sub-domain is not proxied by Cloudflare DNS.

For example, if you were using Feedburner, the CNAME entry would be:

`CNAME feeds is an alias of feeds.feedburner.com`

You would then make sure the cloud is toggled to gray in your Cloudflare DNS settings.

2\. Create a hotlink ok directory on your server.

3\. Use a [Page Rule](https://support.cloudflare.com/hc/articles/200172336) to exclude the URL from Cloudflare.
