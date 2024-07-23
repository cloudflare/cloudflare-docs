---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2
---

Next, we will create a Cloudflare Tunnel in Zero Trust and run the tunnel on the $1.

1. Log in to [Zero Trust](https://one.dash.cloudflare.com) and go to **Networks** > **Tunnels**.

2. Select **Create a tunnel**.

3. Choose **Cloudflared** for the connector type and select **Next**.

4. Enter a name for your tunnel (for example, `$2-tunnel`).

5. Select **Save tunnel**.

6. Under **Choose your environment**, select **Debian**. Copy the command shown in the dashboard and run it on your $1.

7. Once the command has finished running, your connector will appear in Zero Trust.

8. Select **Next**.
