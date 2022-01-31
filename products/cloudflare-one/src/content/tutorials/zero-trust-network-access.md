---
updated: 2021-06-11
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
---

# Configure Zero Trust Network Access in Cloudflare Zero Trust

In this tutorial we will cover how to configure a Zero Trust Private Network in Cloudflare Zero Trust by combining device enrollment rules, Cloudflare Tunnels, and identity-based network policies.

**🗺️ This tutorial covers how to:**

* Create device enrollment rules and connect a device to Zero Trust
* Connect your private network server to Cloudflare's edge using Cloudflare Tunnels
* Create identity-aware network policies

**⏲️Time to complete:**

45 minutes

<Aside header="Prerequisites">

* A Zero Trust account setup
* The [WARP client](/connections/connect-devices/warp) installed on a device and enrolled in a Zero Trust instance
* Admin access to server with Internet access

</Aside>

---

## Device enrollment

The first step is to enroll your devices into the WARP client. The WARP client is responsible for forwarding your traffic to Cloudflare and eventually to your private network.

1. Define [device enrollment rules](/connections/connect-devices/warp/warp-settings#device-enrollment-permissions) under **Settings > Devices > Device enrollment permissions > Manage**.

 In this example, we require that users have a hard key inserted and are connecting from the United States.

 ![Device enrollment rules](../static/zero-trust-security/ztna/device-enrollment-rules.png)
 
1. Enroll your device into your Zero Trust account. To do that, click the WARP icon in your navigation bar, open **Settings** and select **Account > Login** with Cloudflare Zero Trust.

  ![WARP preferences](../static/zero-trust-security/ztna/warp-preferences.png)

1. Enable the WARP client on the device to forward traffic to Cloudflare.


## Server configuration

Next, you will need to configure your private network server to connect to Cloudflare’s edge using Cloudflare Tunnel. This will establish a secure outbound connection to Cloudflare.

1. Identify the server you want to use to securely make your private network available to users. This can be the origin server directly, a jumphost, or load balancer.

1. If your server or network has a firewall, follow [this guide](/connections/connect-devices/warp/deployment/firewall) to open up the correct ports and IP addresses. Only outbound openings are required. You do not need to open any inbound holes in your firewall.

1. [Install `cloudflared`](/connections/connect-apps/install-and-setup/installation) on the server.

1. Authenticate `cloudflared` on the server by running the following command, then follow the prompt to authenticate via URL provided.
 
 ```sh
 $ cloudflared tunnel login
 ```

1. Next, create a tunnel for the device:

 ```sh
 $ cloudflared tunnel create <TUNNEL NAME>
 ```

1. Create a YAML config file for the tunnel with the following configuration:

 ```txt
 tunnel: <YOUR TUNNEL ID>
 credentials-file: /root/.cloudflared/<YOUR TUNNEL ID>.json
 warp-routing:
   enabled: true
 ```
 
 <Aside>
 Tunnel ID can be found by running <code>cloudflared tunnel list</code>.

   ![Tunnel ID](../static/zero-trust-security/ztna/tunnel-id.png)
 
 </Aside>

1. Now run the tunnel:

 ```sh
 $ cloudflared tunnel run <TUNNEL NAME>
 ```

   ![Run the Tunnel](../static/zero-trust-security/ztna/run-tunnel.png)


## Network configuration

Finally, you will need to establish the private RFC 1918 IP address or range that you would like to advertise to Cloudflare, as well as set the identity policies determining which users can access that particular IP or range.

1. Route the private IP addresses of your server’s network to Cloudflare, where:

  * `10.0.0.0/8` is the IP or CIDR range of your server
  * `8e343b13-a087-48ea-825f-9783931ff2a5` is your tunnel ID
 
 ```sh
 $ cloudflared tunnel route ip add 10.0.0.0/8 8e343b13-a087-48ea-825f-9783931ff2a5
 ```

1. Open your Zero Trust dashboard to the **Gateway > Policies** tab.

   ![First network policy](../static/zero-trust-security/ztna/first-network-policy.png)

1. [Create a network policy](/policies/filtering/network-policies) to allow traffic from specific users to reach that application.

   ![Second network policy](../static/zero-trust-security/ztna/second-network-policy.png)

1. Create a second network policy to block all traffic to the IP range that was routed.

   ![Create network policy](../static/zero-trust-security/ztna/create-network-policy.png)

1. Verify that you do not have the desired target private IP range in the Split Tunnel configuration menu. This menu can be found at **Settings > Network > Split Tunnels**.

Your setup is now complete. For more in-depth information on how identity-aware network policies work, read our [dedicated documentation page](/policies/filtering/network-policies).


