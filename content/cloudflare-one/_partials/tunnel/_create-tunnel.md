---
_build:
  publishResources: false
  render: never
  list: never
---

1. Log in to [Zero Trust](https://one.dash.cloudflare.com) and go to **Networks** > **Tunnels**. For some users, tunnel creation is located under **Access** > **Tunnels**.

2. Select **Create a tunnel**.

3. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).

4. Select **Save tunnel**.

5. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.

6. Once the command has finished running, your connector will appear in Zero Trust.

   ![Connector appearing in the UI after cloudflared has run](/images/cloudflare-one/connections/connect-apps/connector.png)

7. Select **Next**.
