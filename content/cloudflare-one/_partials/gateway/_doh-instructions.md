---
_build:
  publishResources: false
  render: never
  list: never
---

{{<details header="Mozilla Firefox">}}

1. In Firefox, go to **Settings**.
2. In **Privacy & Security**, go to **DNS over HTTPS**.
3. Under **Enable secure DNS using**, select _Max Protection_.
4. In **Choose provider**, choose _Custom_.
5. In the field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Firefox is now configured to use your DoH endpoint. For more information on configuring DoH settings in Firefox, refer to [Mozilla's documentation](https://support.mozilla.org/kb/dns-over-https).

{{<Aside type="note">}}
If you want to enforce DNS policies through WARP instead of over DoH, you can disable DoH for your organization by blocking the [Firefox DoH canary domain](https://support.mozilla.org/kb/canary-domain-use-application-dnsnet).
{{</Aside>}}

{{</details>}}

{{<details header="Google Chrome">}}

1. In Chrome, go to **Settings** > **Privacy and security** > **Security**.
2. Scroll down and turn on **Use secure DNS**.
3. Select **With Custom**.
4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Read more about [enabling DNS over HTTPS](https://www.chromium.org/developers/dns-over-https) on Chrome.

{{</details>}}

{{<details header="Microsoft Edge">}}

1. In Microsoft Edge, go to **Settings**.
2. Select **Privacy, Search, and Services**, and scroll down to **Security**.
3. Turn on **Use secure DNS**.
4. Select **Choose a service provider**.
5. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

{{</details>}}

{{<details header="Brave">}}

1. In Brave, go to **Settings** > **Security and Privacy** > **Security**.
2. Turn on **Use secure DNS**.
3. Select **With Custom**.
4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

{{</details>}}

{{<details header="Safari">}}
As of today, Safari does not support DNS over HTTPS.
{{</details>}}
