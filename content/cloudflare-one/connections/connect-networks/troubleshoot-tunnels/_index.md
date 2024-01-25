---
pcx_content_type: how-to
title: Troubleshoot tunnels
weight: 6
---

# Troubleshoot Cloudflare Tunnel

Follow this troubleshooting procedure when users have issues connecting to your Cloudflare Tunnel applications.

## 1. Is WARP connected to Cloudflare?

1. Verify that the device can connect to the [WARP IPs and domains](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
2. Check if there are other proxies or VPN clients on the device. If so, review our [WARP with legacy VPN](/cloudflare-one/connections/connect-devices/warp/deployment/vpn/) guide to ensure compatibility.
3. Review [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#unable-to-connect-warp) to identify the root cause of connectivity issues.

## 2. Is the user's traffic going through WARP?

On the user's device, [search the routing table](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#routing-table) for the IP address of your application. Make sure that traffic to your application routes through the Cloudflare WARP interface.

## 3. Is the user blocked by a Gateway policy?

To check if a Gateway block event occurred:
  1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Logs** > **Gateway**.
  2. Select the **DNS**, **Network**, or **HTTP** tab.
  3. Apply the following filters:
      - **Email**: User’s email address
      - **Event**: _Blocked_
      - **Date Time Range**: Time period when the user accessed the application

## 4. Is the user matching the correct Gateway policy?

1. To determine the actual policy that was applied:
    1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Logs** > **Gateway**.
    2. Select the **DNS**, **Network**, or **HTTP** tab.
    3. Apply the following filters:
        - **Email**: User’s email address
        - **Date Time Range**: Time period when the user accessed the application
    4. In the search box, filter by the destination IP or FQDN.
    5. In the results, select a log and note its **Policy Name** value.
2. In **Gateway** > **Firewall Policies**, compare the [order of enforcement](/cloudflare-one/policies/gateway/order-of-enforcement/) of the matched policy versus the intended policy.
3. Compare the values shown in the Gateway log with the criteria in the intended policy.

### Verify user identity values

If the mismatched log field is related to identity, [check the user registry](/cloudflare-one/policies/gateway/identity-selectors/#view-a-users-identity) and verify the values that are passed to Gateway from your IdP. Cloudflare updates the registry when the user enrolls in the WARP client. If the user's identity is outdated, ask the user to re-authenticate WARP (**Preferences** > **Account** > **Re-Authenticate Session**).

### Verify device posture values

If the mismatched log field is related to device posture, [view posture check results](/cloudflare-one/identity/devices/#2-verify-device-posture-checks) for the user's device. Verify that the device passes the posture checks configured in the policy.

## 5. Is the Gateway proxy enabled?

Under **Settings** > **Network**, ensure that **Proxy** is enabled for TCP, UDP, and ICMP traffic.

## 6. Is the user's traffic reaching the tunnel?

[Review your tunnel log stream](/cloudflare-one/connections/connect-networks/monitor-tunnels/logs/#view-logs-on-your-local-machine). If you do not see any requests to your application, ensure that you have added the appropriate static routes to your Cloudflare Tunnel.

## 7. Is the tunnel forwarding requests to your application?

Verify that you can connect to the application directly from the `cloudflared` host machine:

{{<tabs labels="macOS and Linux | Windows">}}
{{<tab label="macos and linux" no-code="true">}}

Open Terminal and run the following command:

```sh
$ telnet test.example.com 443
```

If `telnet` fails to open the connection, check your infrastructure for firewalls, load balancers, or other network devices that may be interfering with the connection between `cloudflared` and the application server.

{{</tab>}}
{{<tab label="windows" no-code="true">}}

Open Powershell and run the following command:

```bash
PS C:\Users\JohnDoe> Test-NetConnection test.example.com -port 443
```

If the output shows `TcpTestSucceeded : False`, check your infrastructure for firewalls, load balancers, or other network devices that may be interfering with the connection between `cloudflared` and the application server.

{{</tab>}}
{{</tabs>}}

You can also use a packet capture tool such as `tcpdump` or Wireshark to trace whether traffic from the user device successfully reaches `cloudflared` and routes to the application. Traffic to the application will use the source IP of the `cloudflared` host.

## 8. How is your application handling requests?

1. Check if the application server has a local firewall in place that is blocking requests from the `cloudflared` host machine.

2. Check if the application server needs to initiate any connection towards the user's device. If so, this is a limitation of `cloudflared` and you should instead [deploy WARP Connector](/cloudflare-one/connections/connect-networks/private-net/warp-connector/) to enable bidirectional traffic.

## 9. Is TLS inspection affecting the connection to your application?

If there is a problem with [TLS inspection](/cloudflare-one/policies/gateway/http-policies/tls-decryption/), the user will see an `Insecure Upstream` error when they access the application in a browser. They will probably not see error if they access the application outside of a browser.

Customers who have [Logpush](/cloudflare-one/insights/logs/logpush/) enabled can check the [Gateway HTTP dataset](/logs/reference/log-fields/account/gateway_http/) for any hostnames which have an elevated rate of `526` HTTP status codes.

To troubleshoot TLS inspection:

1. Create a temporary Gateway HTTP policy that disables TLS inspection for all traffic to the application. For example:

    | Selector    | Operator | Value          | Action         |
    | ----------- | -------- | -------------- | -------------- |
    | Destination IP | in       | `10.0.0.0/8` | Do Not Inspect |

2. If the `Do Not Inspect` policy enables the user to connect, verify that the TLS certificate used by your application is trusted by a public CA. If the certificate is not trusted self-signed, you must either replace the certificate or create a permanent `Do Not Inspect` HTTP policy for this application. For more information, refer to [TLS inspection limitations](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#limitations).
