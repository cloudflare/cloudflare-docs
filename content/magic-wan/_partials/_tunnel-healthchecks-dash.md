---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productPath
---

The Cloudflare dashboard monitors the health of all Anycast tunnels on your account that route traffic from Cloudflare to your origin network.

The dashboard shows the global view of tunnel health as measured from all Cloudflare locations. If the tunnels are healthy on your side, you will see the majority of servers reporting an **up** status. It is normal for a subset of these locations to show tunnel status as degraded or unhealthy, since the Internet is not homogenous and intermediary path issues between Cloudflare and your network can cause interruptions for specific paths.

Not all data centers will be relevant to you at all times. You can refer to the **Average ingress traffic (last hour)** column to understand if a given data center is receiving traffic for your network, and if its health status is relevant to you.

To check for Anycast tunnel health:

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to $1, and select **View**.
3. In **Cloudflare colos**, you can choose one or more Cloudflare data centers to filter out the traffic that shows up in your Anycast tunnels. For example, if you chose the Lisbon data center, your Anycast tunnels would only show connections to that data center. 
4. Below, you have a list of all your Anycast tunnels, as well as their current health status. Find the tunnel you wish to inspect and select the arrow (**>**) before it to open its details.
5. The details pane shows the connection status between different Cloudflare servers and your tunnel. Select **Traceroute for details** in one of the Cloudflare servers shown to check for issues between Cloudflare and your origin network.