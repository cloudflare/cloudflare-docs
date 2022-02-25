---
pcx-content-type: how-to
title: Administration
weight: 10
---

# Administration

## Overview

Multiple Railguns may be added to a Cloudflare account. Only one registered and activated Railgun may be used per domain.

Railgun can be load-balanced and multiple Railgun daemons can be used per activated public IP and token. There is no need to register each Railgun daemon.

## Adding a Railgun

1.  Navigate to the [Railgun listing page](https://www.cloudflare.com/a/account/my-account/).
2.  Enter the descriptive title of your choosing.
3.  Press the `Add` button.
4.  Within your Railgun configuration file, update `activation.public_ip` to the public IP or a hostname which resolves to the public IP of your Railgun’s server and set the `activation.token` to the activation key displayed on the page.
5.  Start the Railgun daemon so that it can proceed with activation.
6.  If everything went smoothly, the red icon will change to a green check-mark after refreshing the page and the Railgun can then be toggled on.
7.  If the Railgun fails to activate, check your logs for errors and [contact support](https://support.cloudflare.com/hc/articles/200172476) if the issue persists.

## Enabling Railgun

1.  Navigate to the Railgun Settings section of the Speed page for your domain for your domain and select the desired Railgun from the drop-down menu.
2.  Switch the toggle to `On`.

## Collecting and Reporting Statistics

Railgun can report statistics via syslog, JSON via a HTTP POST request, or through its own simple HTTP server when enabled. To enable statistics collection, first set `stats.enabled` to `1` within the main Railgun configuration file (`railgun.conf`). To enable syslog statistics reporting, set `stats.log` to `1`. To enable reporting via an HTTP POST request of JSON data to the specified URL, set `stats.url` to a valid URL. `stats.interval` determines how frequently stats will be logged or POSTed in minutes.

If `stats.listen` is set to a non-empty `host:post` string, Railgun will spawn a local HTTP server and listen on that interface awaiting a `GET /` HTTP request. The response will be JSON-encoded statistics. The statistics returned will change according to `stats.interval`. If the Railgun statistics port is not protected via a firewall, the host portion should be set to a loopback interface (e.g., `127.0.0.1` or `localhost`) to prevent external access. An example response follows:

```sh
$ curl -v http://127.0.0.1:22408/

> GET / HTTP/1.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Length: 1191
< Content-Type: application/json
< Date: Tue, 02 Apr 2013 16:56:57 GMT
{
    "bytes_retrieved": 2794091,
    "conveyor_cleans_chunk": 1,
    "conveyor_cleans_hasher": 1,
    "conveyor_get": 0,
    "conveyor_give": 0,
    "conveyor_queue_chunk": 3,
    "conveyor_queue_hasher": 29,
    "conveyor_removed_chunk": 0,
    "conveyor_removed_hasher": 0,
    "conveyor_retained_chunk": 3212,
    "conveyor_retained_hasher": 19468,
    "conveyor_tuned_chunk": 753,
    "conveyor_tuned_hasher": 1471,
    "delta_compression_ratio": 6890,
    "memstats.Frees": 51773495,
    "memstats.Mallocs": 52696575,
    "memstats.alloc": 128060840,
    "memstats.heap_alloc": 128060840,
    "memstats.heap_idle": 22933504,
    "memstats.heap_in_use": 134352896,
    "memstats.heap_objects": 923080,
    "memstats.heap_released": 0,
    "memstats.heap_sys": 157286400,
    "memstats.lookups": 305636,
    "memstats.num_gc": 133,
    "memstats.pause_ns": 164422,
    "memstats.stack_in_use": 3940352,
    "memstats.stack_sys": 6160384,
    "memstats.sys": 448807352,
    "memstats.total_alloc": 5162978952,
    "no_origin_response": 1,
    "origin_retries": 0,
    "requests_completed": 2455,
    "requests_started": 2295,
    "uncompressed_chunks": 2552,
    "wan_bytes_sent": 2952019,
    "wan_starts": 44
}
```
