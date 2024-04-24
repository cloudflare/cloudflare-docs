---
pcx_content_type: how-to
title: View the payload content in the dashboard
weight: 3
---

# View the payload content in the dashboard

View the content of the matched rule payload in the dashboard by entering your private key.

1.  Open **Security** > **Events**.

2.  Under **Activity log**, expand the details of an event triggered by a rule whose managed ruleset has payload logging enabled.

3.  Under **Payload match**, select **Decrypt payload log**.

    ![Example of a firewall event with available payload match data (still encrypted)](/images/waf/transform-rules/payload-logging-example.png)

4.  Enter your private key in the pop-up window and select **Decrypt**.

    {{<Aside type="note">}}

The private key is not sent to a Cloudflare server. The decryption occurs entirely in the browser.

     {{</Aside>}}

If the private key you entered decrypts the encrypted payload successfully, the **Payload match** card displays the payload content in clear text.

![Viewing the decrypted payload match data after entering your private key in the dashboard](/images/waf/transform-rules/payload-decrypted.png)
