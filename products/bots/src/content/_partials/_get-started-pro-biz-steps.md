To start using Super Bot Fight Mode:
1. Go to **Firewall** > **Bots**.
1. Select **Configure Super Bot Fight Mode**.
1. Choose how your domain should respond to various types of traffic:
    - For more details on verified bots, refer to [Verified Bots](/concepts/bot#verified-bots).
    - For more details on supported file types, refer to [Static resource protection](/about/static-resources/) 
    - For more details on invisible code injection, refer to [JavaScript detections](/about/javascript-detections).

<Aside type="warning" header='Warning'>

If your organization also uses <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-apps">Cloudflare Tunnel</a>, keep <strong>Definitely Automated</strong> set to <strong>Allow</strong>. Otherwise, tunnels might fail with a <code>websocket: bad handshake</code> error.

</Aside>