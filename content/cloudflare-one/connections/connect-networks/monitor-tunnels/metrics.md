---
pcx_content_type: concept
title: Metrics
weight: 7
meta:
    title: Tunnel metrics
---

# Tunnel metrics

Tunnel metrics show a Cloudflare Tunnel's throughput and resource usage over time. When you run a tunnel, you can configure `cloudflared` to spin up a Prometheus metrics endpoint — an HTTP server that exposes metrics in [Prometheus](https://prometheus.io/docs/introduction/overview/) format. You can then use the Prometheus toolkit on a remote machine to scrape metrics data from the `cloudflared` server.

## Start the metrics server

Perform these steps on the `cloudflared` server.

1. Use the [--metrics](/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-run-parameters/#metrics) flag to create a metrics endpoint at the specified IP address and port. Here is an example command for a locally-managed tunnel:
    ```sh
    $ cloudflared tunnel --metrics 127.0.0.1:60123 run my-tunnel
    ```

    To learn how to add the `--metrics` flag to a remotely-managed tunnel, refer to [Configure a remotely-managed tunnel](/cloudflare-one/connections/connect-networks/configure-tunnels/remote-management/#add-tunnel-run-parameters).

{{<Aside type="note">}}
If you plan to fetch metrics from another machine on the local network, replace `127.0.0.1` with the internal IP of the `cloudflared` server (for example, `198.168.x.x`). To serve metrics on all available network interfaces, use `0.0.0.0`.
{{</Aside>}}

2. Verify that the metrics server is running by going to `http://localhost:60123/metrics`. This will only work if you configured a localhost IP (`127.0.0.1` or `0.0.0.0`).

You can now export the metrics to Prometheus and Grafana in order to visualize and query the data. Refer to our [tutorial](/cloudflare-one/tutorials/grafana/) for instructions on getting started with these tools.

## Available metrics

### cloudflared metrics

{{<table-wrap style="font-size: 87%">}}
| Name | Description | Type | Labels |
| ---- | ----------- | ---- | ------ |
| `build_info` | Build and version information. | GAUGE | `goversion`, `revision`, `type`, `version` |
| `cloudflared_config_local_config_pushes` | Number of local configuration pushes to Cloudflare. | COUNTER |  |
| `cloudflared_config_local_config_pushes_errors` | Number of errors that occurred during local configuration pushes. | COUNTER |  |
| `cloudflared_orchestration_config_version` | Configuration version. | GAUGE |  |
| `cloudflared_tcp_active_sessions` | Concurrent number of TCP sessions that are being proxied to any origin. | GAUGE |  |
| `cloudflared_tcp_total_sessions` | Total number of TCP sessions that have been proxied to any origin. | COUNTER |  |
| `cloudflared_tunnel_active_streams` | Total number of active streams. | GAUGE |  |
| `cloudflared_tunnel_concurrent_requests_per_tunnel` | Concurrent number of requests proxied through each tunnel. | GAUGE |  |
| `cloudflared_tunnel_ha_connections` | Number of active HA connections. | GAUGE |  |
| `cloudflared_tunnel_request_errors` | Number of errors proxying to origin. | COUNTER |  |
| `cloudflared_tunnel_server_locations` | Where each tunnel is connected to. `1` means current location, `0` means previous locations. | GAUGE | `connection_id`, `edge_location` |
| `cloudflared_tunnel_timer_retries` | Unacknowledged heart beats count. | GAUGE |  |
| `cloudflared_tunnel_total_requests` | Number of requests proxied through all tunnels. | COUNTER |  |
| `cloudflared_tunnel_tunnel_authenticate_success` | Number of successful tunnel authentication events. | COUNTER |  |
| `cloudflared_tunnel_tunnel_register_success` | Number of successful tunnel registrations. | COUNTER | `rpcName` |
| `cloudflared_udp_active_sessions` | Concurrent number of UDP sessions that are being proxied to any origin.| GAUGE |  |
| `cloudflared_udp_total_sessions` | Total number of UDP sessions that have been proxied to any origin. | GAUGE |  |
| `coredns_panics_total` | Number of panics. | COUNTER |  |
| `quic_client_closed_connections` | Number of connections that have been closed. | COUNTER |  |
| `quic_client_latest_rtt` | Latest round-trip time (RTT) measured on a connection. | GAUGE | `conn_index` |
| `quic_client_lost_packets` | Number of packets that have been lost from a connection. | COUNTER | `conn_index`, `reason` |
| `quic_client_min_rtt` | Lowest RTT measured on a connection in ms. | GAUGE | `conn_index` |
| `quic_client_packet_too_big_dropped` | Number of packets received from origin that are too big to send to Cloudflare and are dropped as a result. | COUNTER |  |
| `quic_client_smoothed_rtt` | Smoothed RTT calculated for a connection in ms. | GAUGE | `conn_index` |
| `quic_client_total_connections` |	Number of connections initiated. For all QUIC metrics, client means the side initiating the connection. |	COUNTER	| |

{{</table-wrap>}}

### Prometheus metrics

{{<table-wrap style="font-size: 87%">}}
| Name | Description | Type | Labels |
| ---- | ----------- | ---- | ------ |
| `promhttp_metric_handler_requests_in_flight` | Current number of scrapes being served. | GAUGE |  |
| `promhttp_metric_handler_requests_total` | Total number of scrapes by HTTP status code. | COUNTER | `code` |
{{</table-wrap>}}

### Go runtime metrics

{{<table-wrap style="font-size: 87%">}}
| Name | Description | Type | Labels |
| ---- | ----------- | ---- | ------ |
| `go_gc_duration_seconds` | A summary of the pause duration of garbage collection cycles. | SUMMARY |  |
| `go_goroutines` | Number of goroutines that currently exist. | GAUGE |  |
| `go_info` | Information about the Go environment. | GAUGE | `version` |
| `go_memstats_alloc_bytes` | Number of bytes allocated and still in use. | GAUGE |  |
| `go_memstats_alloc_bytes_total` | Total number of bytes allocated, even if freed. | COUNTER |  |
| `go_memstats_buck_hash_sys_bytes` | Number of bytes used by the profiling bucket hash table. | GAUGE |  |
| `go_memstats_frees_total` | Total number of frees. | COUNTER |  |
| `go_memstats_gc_sys_bytes` | Number of bytes used for garbage collection system metadata. | GAUGE |  |
| `go_memstats_heap_alloc_bytes` | Number of heap bytes allocated and still in use. | GAUGE |  |
| `go_memstats_heap_idle_bytes` | Number of heap bytes waiting to be used. | GAUGE |  |
| `go_memstats_heap_inuse_bytes` | Number of heap bytes that are in use. | GAUGE |  |
| `go_memstats_heap_objects` | Number of allocated objects. | GAUGE |  |
| `go_memstats_heap_released_bytes` | Number of heap bytes released to OS. | GAUGE |  |
| `go_memstats_heap_sys_bytes` | Number of heap bytes obtained from system. | GAUGE |  |
| `go_memstats_last_gc_time_seconds` | Number of seconds since 1970 of last garbage collection. | GAUGE |  |
| `go_memstats_lookups_total` | Total number of pointer lookups. | COUNTER |  |
| `go_memstats_mallocs_total` | Total number of mallocs. | COUNTER |  |
| `go_memstats_mcache_inuse_bytes`| Number of bytes in use by mcache structures. | GAUGE |  |
| `go_memstats_mcache_sys_bytes` | Number of bytes used for mcache structures obtained from system. | GAUGE |  |
| `go_memstats_mspan_inuse_bytes` | Number of bytes in use by mspan structures. | GAUGE |  |
| `go_memstats_mspan_sys_bytes` | Number of bytes used for mspan structures obtained from system. | GAUGE |  |
| `go_memstats_next_gc_bytes` | Number of heap bytes when next garbage collection will take place. | GAUGE |  |
| `go_memstats_other_sys_bytes` | Number of bytes used for other system allocations. | GAUGE |  |
| `go_memstats_stack_inuse_bytes` | Number of bytes in use by the stack allocator. | GAUGE |  |
{{</table-wrap>}}