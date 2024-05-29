---
pcx_content_type: concept
title: System requirements
weight: 3
---

# System requirements

Our connector, `cloudflared`, was designed to be lightweight and flexible enough to be effectively deployed on Raspberry Pi, your laptop or a server in a data center.
{{<render file="tunnel/_tunnel-capacity-intro.md" productFolder="cloudflare-one">}}

## Recommendations

For most use cases, we recommend the following baseline configuration:
- Run a [`cloudflared` replica](/cloudflare-one/connections/connect-networks/deploy-tunnels/deploy-cloudflared-replicas/#cloudflared-replicas) on two dedicated host machines per network location. Using two hosts enables server-side redundancy and traffic balancing.
- Size each host with minimum 4GB of RAM and 4 CPU cores.
- Allocate 50,000 [ports](#number-of-ports) to the `cloudflared` process on each host.

This setup is usually sufficient to handle traffic from 8,000 WARP users (4,000 per host). The actual amount of resources used by `cloudflared` will depend on many variables, including the number of requests per second, bandwidth, network path and hardware. As additional users are onboarded, or if network traffic increases beyond your existing [tunnel capacity](#estimated-throughput), you can scale your tunnel by adding an additional `cloudflared` host in that location.

### Number of ports

When `cloudflared` receives a request from a WARP device, it uses the ports on the host machine to evaluate and forward the request to your origin service. Every machine by system design is hardware-limited to a maximum 65,535 ports. Additionally, each service on the machine has a limited number of ports that it can consume. For this reason, we recommend the following deployment model:

- `cloudflared` should be deployed on a dedicated host machine. This model is typically appropriate, but there may be serverless or clustered workflows where a dedicated host is not possible.
- The host machine should allocate 50,000 ports to be available for use by the `cloudflared` service. The remaining ports are reserved for system administrative processes.

{{<tabs labels="Linux | Windows">}}
{{<tab label="linux" no-code="true">}}

To increase the number of ports available to `cloudflared` on Linux:

If your machine has a `/etc/sysctl.d/` directory:

```sh
$ echo 'net.ipv4.ip_local_port_range = 11000 60999' | sudo tee -a /etc/sysctl.d/99-cloudflared.conf
$ sudo sysctl -p /etc/sysctl.d/99-cloudflared.conf
```

Otherwise:

```sh
$ echo 'net.ipv4.ip_local_port_range = 11000 60999' | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p /etc/sysctl.conf
```

{{</tab>}}
{{<tab label="windows" no-code="true">}}

You can set the dynamic port range separately for each transport (TCP or UDP). To increase the number of ports available to `cloudflared` on  Windows:

```txt
netsh int ipv4 set dynamicport tcp start=11000 num=50000
netsh int ipv4 set dynamicport udp start=11000 num=50000
netsh int ipv6 set dynamicport tcp start=11000 num=50000
netsh int ipv6 set dynamicport udp start=11000 num=50000
```

{{</tab>}}
{{</tabs>}}

### ulimits

On Linux and macOS, `ulimit` settings determine the system resources available to a logged-in user. We recommend configuring the following ulimits on the `cloudflared` server:

| ulimit | Description | Value |
| -------| ----------- | ----------------- |
| `-n`   | Maximum number of open files or file descriptors | ≥ 70,000 |

To view your current ulimits, open a terminal and run:
```sh
$ ulimit -a
```

To set the open files `ulimit`:
```sh
$ ulimit -n 70000
```

## Estimated throughput

Most private network traffic proxied by `cloudflared` falls in one of two categories:

- TCP requests (more common, less resource intensive)
- UDP requests (less common, more resource intensive)

TCP traffic uses and releases ports almost instantaneously. This means that in order to overload a `cloudflared` instance with 50,000 available ports, your organization would need to continuously generate 50,001 TCP requests per second.

UDP traffic is more unique. DNS queries - usually the bulk of UDP traffic - are held by ports in `cloudflared` for five seconds. Non-DNS UDP traffic holds each port for the duration of the connection, which can be any amount of time. This means that in order to overload a `cloudflared` instance with 50,000 available ports, you would need to continuously generate either 10,000 DNS queries to your private resolver per second, or a cumulative 50,000 non-DNS UDP requests over a shorter time than your connection reset rate.

### Calculate your tunnel capacity

Our [baseline recommendations](#recommendations) serve as a starting point for a Cloudflare Tunnel deployment. Once you have a representative population of users engaging with your network for at least a week, you can customize tunnel sizing according to your own traffic patterns.

To calculate your tunnel capacity:

1. Set up a [metrics service](/cloudflare-one/tutorials/grafana/) when you run the tunnel.
2. After a week or so, query the following [tunnel metrics](/cloudflare-one/connections/connect-networks/monitor-tunnels/metrics/#cloudflared-metrics):
    - `cloudflared_tcp_total_sessions`
    - `cloudflared_udp_total_sessions`
3. Compute the average **TCP requests per second** and **Non-DNS UDP requests per second** by dividing total sessions by total time.
4. In your private DNS resolver, obtain the average **Private DNS requests per second**.
5. Input your values into our sizing calculator:

{{<calculation file="tunnel-capacity">}}

You can use these results to determine if your tunnel is appropriately sized. To increase your tunnel capacity, add identical host machines running [`cloudflared` replicas](/cloudflare-one/connections/connect-networks/deploy-tunnels/deploy-cloudflared-replicas/#cloudflared-replicas).
