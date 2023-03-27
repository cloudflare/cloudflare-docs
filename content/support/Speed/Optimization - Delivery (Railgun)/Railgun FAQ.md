---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168406-Railgun-FAQ
title: Railgun FAQ
---

# Railgun FAQ



## What is Railgun?

[Railgun](https://www.cloudflare.com/railgun/) is a web proxy system built for Cloudflare, that allows dynamic content for a website (such as the HTML) to be cached, while also allowing changes to the site to appear instantly. Railgun is currently available to customers with the Business and Enterprise plan, or via one of Cloudflare’s [Optimised Partners](https://www.cloudflare.com/hosting-partners/).

Railgun can especially help in the following situations:

-   A lot of the visitors to the website are long way geographically from the website’s hosting.
-   Your web hosts charge a lot by the GB for bandwidth. (i.e. you would like to minimise the amount you spend on that).
-   You have a website with a lot of dynamic content, such as a very active blog or news source.

Unlike other Cloudflare features, it does require a program to be installed on or near the origin web server. The system requirements of Railgun can be found [here](/railgun/user-guide/requirements/). Full instructions for installing and configuring Railgun can be found [here](/railgun/user-guide/set-up). If you are the customer of an Optimized Partner of Cloudflare, you do not need to install Railgun. Your hosts will have done that for you.

___

## How do I enable Railgun?

You can enable [Railgun](https://www.cloudflare.com/railgun) by following the directions [here](/railgun/user-guide/administration#enabling-railgun).

Railgun is available to Business customers as well as through our Optimized Partners.

If you are signed up through a hosting partner and not using a Business plan, check our [Railgun Optimized Hosting Partners](https://www.cloudflare.com/hosting-partners) to see if you can use Railgun today.

___

## Is Railgun running on my site?

When a request is handled by [Railgun](https://www.cloudflare.com/railgun), Cloudflare inserts a header with diagnostic information to track the protocol.

To view the following Railgun headers, use a browser that allows you to examine header information.

**Google Chrome:** View > Developer > Developer Tools menu. You can also install [Cloudflare's Claire extension](https://chrome.google.com/webstore/detail/claire/fgbpcgddpmjmamlibbaobboigaijnmkl).

**Safari:** Develop > Show Web Inspector menu

**Firefox:** [Install Firebug](http://getfirebug.com/)

**Microsoft Internet Explorer:** You can use a tool like [Fiddler](http://www.fiddler2.com/fiddler2/)

When looking for the header information, you should see Cloudflare headers similar to the following response:

**cf-railgun**:   e95b1c46e0 0.02 0.037872 0030 9878

**cf-ray:**   478149ad1570291

The CF-Railgun header has up to five codes separated by a space. In order, these codes and their corresponding values from the example of **cf-railgun**: e95b1c46e0 0.02 0.037872 0030 9878 listed above are:

-   Railgun Request ID: e95b1c46e0 (internal process number that allows us to track what connection handled a request )
-   Compression Ratio: 0.02 (the size of the response after Railgun's delta compression expressed as a percentage)
-   Origin Processing Time: 0.037872 (that Railgun waits for the origin web server to generate the page)
-   Railgun Flags: 0030 (how a request was processed)
-   Version Number: 9878 (indicates the version of the Railgun Listener software on the origin server's network)

___

## How do I enable Railgun stats?

Enabling Railgun stats will record global statistics for the Railgun listener and setup a listening endpoint for HTTP connections. To enable statistics reporting set `stats.log` to `1`.

To enable reporting by use of an HTTP POST request of JSON data to the specified URL, set `stats.url` to a valid `URL.stats.interval` determines how frequently stats will be logged or POSTed in minutes.

Here is an example output from viewing stats:

`{ "delta_compression_ratio": 4552, "memstats.Frees": 78483728, "memstats.Mallocs": 80708595, "memstats.alloc": 2235213408, "memstats.heap_alloc": 2235213408, "memstats.heap_idle": 1157988352, "memstats.heap_in_use": 2562883584, "memstats.heap_objects": 2224867, "memstats.heap_released": 1157890048, "memstats.heap_sys": 3720871936, "memstats.lookups": 1313043, "memstats.num_gc": 92, "memstats.pause_ns": 185276, "memstats.stack_in_use": 46768128, "memstats.stack_sys": 47841280, "memstats.sys": 4026019808, "memstats.total_alloc": 12652595080, "recycler_cleans_chunk": 1, "recycler_cleans_hasher": 1, "recycler_give": 0, "recycler_queue_chunk": 9815, "recycler_queue_hasher": 2, "recycler_removed_chunk": 0, "recycler_removed_hasher": 0, "recycler_retained_chunk": 96621416, "recycler_retained_hasher": 173178, "recycler_tuned_chunk": 11957, "recycler_tuned_hasher": 81986, "requests_completed": 17487, "requests_started": 17589, "time": 1416343217, "uncompressed_chunks": 32601, "wan_bytes_sent": 624557633, "wan_starts": 667, "wan_stops": 23 }`

The `memstats` fields derived from Golang recorded statistics from the memory allocator. The recycler statistics are from Railgun's memory recycler, which frees up memory for reuse.

Conveyor is no longer an option in the current version of Railgun.

___

## Why are Railgun requests showing as Stream?

The presence of `stream` in place of a compression ratio indicates that the response from the origin was greater than the value set in the `stream.size` parameter within the `railgun.conf` file (default value is 250000 bytes).

This status results in the request not being compressed and served in a streaming fashion.

{{<Aside type="note">}}
Please refer to our [Reading and Interpreting the \'Cf-Railgun\'
Header](https://support.cloudflare.com/hc/en-us/articles/202963724-Reading-and-Interpreting-the-Cf-Railgun-Header)
article for additional technical information on the Cf-Railgun header.
{{</Aside>}}

### Troubleshooting

If a continual/repeated `stream` status is occurring for requests, please check for the following conditions that are common causes:

#### Memcached isn't running, or the Listener is having trouble connecting to it.

Please run the following command to confirm memcached is running:

`ps aux | grep memcached`

If you are connecting Railgun to memcached using a loopback inet connection to localhost, confirm there are not any firewall rules that would prevent connections. If using a unix socket, make sure the permissions and ownerships on the sock file are set correctly.

#### Memcached wasn't given enough memory.

By default, memcached is configured to only use 64MB of memory. We generally recommend Railgun be configured to have between 512MB and 2GB of memory allocated.

#### The file the visitor is trying to access is larger than 250KB.

By default, rg-listener will stream files larger than 250KB, rather than try to compress them. This is because we decided that it would be faster/less computationally expensive for them to be streamed. This can be increased using the stream.size setting in the Railgun configuration settings. \`Please note this can't be increased beyond 1MB\`.

#### When the response body is zero bytes, or the request is simply too small to compress.

If the request is served with a response body of zero bytes (common for 301/302 redirects for example), then the request will be served without compression. The same case would apply if the response was only several KB in size, as that would be more computationally expensive to compress, then simply serving the data uncompressed to the client.

#### The MIME type of the response was not of a type that Railgun supports.

If the response doesn't match one of these content types, it will not be compressed:

-   Anything beginning with `"text/"`
-   Any `"application/"` type that ends with the string `"+xml"`
-   `"application/json"`
-   `"application/ecmascript"`
-   `"application/javascript"`
-   `"application/x-javascript"`
-   `"application/xml"`
-   `"application/dart"`

The MIME type is determined by the `Content-Type` header sent by the origin.

If you require further assistance, please [contact Cloudflare support](https://support.cloudflare.com/hc/en-us/articles/200172476) with your `railgun.conf` and `memcached.conf` file for review so that Cloudflare Support is able to troubleshoot further.

___

## Why are Railgun requests showing as Direct?

If `Cf-Railgun` header contains the status `direct` (and a possible field description), this indicates that Railgun Listener did not handle the request but went directly to the origin web server.

If a `direct` status is seen repeatedly, there are two common reasons why this would occur:

1.  For a site with low traffic, this typically indicates that Railgun was starting a new connection to the remote rg-listener and that connection wasn't ready yet. Running a second request to test will usually succeed and show compression. 
2.  For a site with a large amount traffic, this usually indicates that the Listener is not working or cannot be contacted.

### Troubleshooting Repeated `direct` Status for Requests

When requests are seen as going `direct` continuously, it is recommended to check the Listener configuration for the following:

1.  The Railgun service is running on the server hosting the Listener.
2.  Port 2408 is open.
3.  Cloudflare IPs are allowed to connect to the Listener server. A list of Cloudflare's IP ranges can be found [here](https://www.cloudflare.com/ips/).

### `direct` Status Header Descriptions

Here are the possible field descriptions, when a request has a Railgun status of direct:

`all WAN connections are busy`

This status occurs when it is not possible to open any more WAN connection between the Sender and Listener due to the maximum number of WAN connections has been reached and all the WAN connections are busy. The maximum number of WAN connections is set by the rg-sender `wan.lanes` parameter. In production, this is set to 1,000 connections.

`starting new WAN connection`

There was no free WAN connection between the Sender and Listener so rather than wait for it to come up the request goes direct. When this happens it's often on a lightly used site and is an optimization to prevent us for waiting for a WAN connection. While this is happening Railgun makes a WAN connection to the remote rg-listener.

`waiting for pending WAN connection`

Very similar to to 'starting new WAN connection', but indicates that the new connection has already happened, but the Railgun Sender is waiting on rg-listener for the WAN connection that has not been established.

`internal error or Internal channel failure`

This occurs when there is an internal error with the Railgun Sender at Cloudflare's edge. If this error is being observed in the request headers, please [please submit a Support ticket](https://support.cloudflare.com/requests/new) for additional assistance. 

### Intended Behavior

Here is a typical sequence of requests where the initial connection establishes the WAN, then subsequent requests are optimized while the WAN is open between the Railgun Sender and Listener:

`Cf-Railgun: direct (starting new WAN connection) Cf-Railgun: 6a622d1e98 0.02 0.001751 0030 3350 Cf-Railgun: c562e934d3 0.02 0.002268 0030 3350 Cf-Railgun: 342a904d9c 0.02 0.002070 0030 3350 Cf-Railgun: c3f365ab80 0.02 0.004062 0030 3350`

The above pattern in the request stream is normal when using Railgun. If this pattern is being reproduced when testing/debugging, then this means that Railgun is optimizing the site's traffic as intended.

___

## What is the 'Cf-Railgun' Header?

Refer to the `Cf-Railgun` header to confirm Railgun is working properly and to troubleshoot Railgun for your site.

Here is the formatting for the `Cf-Railgun` header:

`connection-id compression-ratio origin-time flags version`

Using the example above for testing Railgun, here is what the header looks like when showing compression:

`Cf-Railgun: 4fd1682b12 0.06 0.050570 0031 5360`

Connection ID

The first variable is the connection-id (labeled `4fd1682b12`), which is the unique ID of the connection between Cloudflare's rg-sender and the customer's rg-listener. Multiple requests share the same ID as it identifies the TLS connection over which the Railgun request was sent.

### Compression Ratio

The second variable is the `compression-ratio`, which indicates that the content for the request was compressed.

In this example the resource request was compressed to 0.06% of its original size (99.94% compression achieved for the request).

If there is an error of some sort, the Compression Ratio is likely to be listed as "normal" or "direct." This means that Railgun's compression was bypassed for one reason or another.

The presence of the word _`stream`_ in place of the compression ratio indicates that compression did not happen but that the request proceeded normally.

### Origin Time

The third variable is the `origin-time`. This measure represents time in seconds of how long Railgun waits for the origin web server to generate the page. In this example, the origin server took 0.050570 seconds from when the Railgun listener sends the request to the origin to when it responds. If this number is large, then this implies that the web server or database may be hitting a bottleneck that is slowing down its time to render the page.

### Header Flags

The fourth variable in the header are `flags` that are a word length bitfield that indicates aspects of the Railgun request/response handling. This value can be used to troubleshoot why a request's `Cf-Railgun` status was `normal` or `direct`.

Typically it is recommend to interpret these flags using the `rg-diag` utility, which is included with the [Railgun packages](https://www.cloudflare.com/resources-downloads).

### Version

The final variable `version` is the first four characters of the hash value of the version of the rg-listener in use.

Railgun's diagnostic tool, rg-diag

When using the `rg-diag` tool from the command line, be sure to include the `-decode` switch to interpret the flag in a request. Here is an example using the header above:

`rg-diag -decode 0031`

Without using the `rg-diag` tool, you can look at the flag field as a 4-digit sequence as zzXz. Ignore the z's and focus on the number or letter in the X position. If it is 3,7, B or F then it means Railgun Compression is working correctly.

___

## Can I use Railgun with an Amazon EC2 setup?

Yes. Customers that are on a [Business or Enterprise plan](https://www.cloudflare.com/plans) can get [Railgun from the AWS Marketplace](https://aws.amazon.com/marketplace/pp/B00S201BNK?qid=1505833099827&sr=0-1&ref_=srh_res_product_title).

___

## What does 'Activation Failed: Invalid or missing railgun token or tag' mean when starting Railgun?

When starting the Railgun service for the first time, you may see the following error:

`Starting railgun Error starting Railgun as a daemon. Running in foreground... Error activating: Activation Failed: Invalid or missing railgun token or tag. [fail]`

There are two possible causes for this error:

-   The [railgun.conf](/railgun/user-guide/set-up/configuration-activation/) file does not have the proper public IP (`activation.public_ip` or `activation.railgun_host` in recent versions of Railgun) and/or the activation token (`activation.token)` configured.
-   There's a chance the Railgun created for the domain [in your account](https://www.cloudflare.com/a/account/railgun) was not created properly. Delete it, create a new one, and try again.

If the issue persists after trying both of these steps, please contact support.
