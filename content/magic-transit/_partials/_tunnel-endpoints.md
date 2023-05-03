---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: ipRange;;productName;;productPathDash;;ipSecProductPath;;staticRoutespath;;tunnelsPath
---

#  Configure tunnel endpoints

Cloudflare recommends two tunnels for each ISP and network location router combination, one per Cloudflare endpoint. Cloudflare will assign two Cloudflare endpoint addresses shortly after your onboarding kickoff call that you can use as the tunnel destinations on your network location's routers/endpoints.

To configure the tunnels between Cloudflare and your locations, you must provide the following data for each tunnel:

- **Tunnel name**: A name with 15 or fewer characters that does not contain spaces or special characters. The name cannot be shared with other tunnels.
- **Cloudflare endpoint address**: The public IP address of the Cloudflare side of the tunnel.
- **Customer endpoint**: A public Internet routable IP address outside of the prefixes Cloudflare will advertise on your behalf. These are generally IP addresses provided by your ISP. If you intend to use a physical or virtual connection like [Cloudflare Network Interconnect](/network-interconnect/), you do not need to provide endpoints because Cloudflare will provide them.
  - This value is not required for IPsec tunnels, unless your router is using an IKE ID of type `ID_IPV4_ADDR`.
- **Interface address**: A 31-bit (recommended) or 30-bit subnet (`/31` or `/30` in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space:
  - `10.0.0.0/8`
  - `172.16.0.0/12`
  - `192.168.0.0/16`
  - $1
- **TTL**: Time to Live (TTL) in number of hops for the GRE tunnel. The default value is 64.
- **MTU**: Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The default value is 1476.

## IPsec tunnels

You can use [IPsec]($4) as an on-ramp to connect with your entire virtual network. With an IPsec tunnel, you can route traffic from your network to Cloudflare's global network and define static routes to direct traffic down the correct tunnel.

You can set up IPsec tunnels through the Cloudflare dashboard or via the API. However, if you want to use the API make sure you already have an [Account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/) and [API Key](/fundamentals/api/get-started/keys/#view-your-global-api-key) before you begin.

{{<Aside type="note" header="Note">}}$2 only supports Internet Key Exchange version 2 (IKEv2).{{</Aside>}}

## Add tunnels

### Dashboard instructions

1. Log in to your Cloudflare dashboard, and select your account.
2. Select $3.
3. From the **Tunnels** tab, select **Create**.
4. On the **Add tunnels** page, choose either a **GRE tunnel** or **IPsec tunnel**.

<details>
<summary>GRE tunnel</summary>
<div>
 
5. In **Tunnel name**, give your tunnel a descriptive name. This name must be unique, must not contain spaces or special characters, and must be 15 or fewer characters. Hover the mouse over `i` in the dashboard for more information.
6. Give your tunnel a description in **Description**. You do not have character restrictions here.
7. In **Interface address**, enter the internal IP address for your tunnel along with the interface’s prefix length (either `31` or `30`).
8. In **Customer GRE endpoint**, enter your router’s public IP address.
9. In **Cloudflare GRE endpoint**, enter the Anycast address you received from your account team.
10. Leave the default values for **TTL** and **MTU**.
11. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, select **Test tunnels.**
12. To add multiple tunnels, select **Add GRE tunnel** for each new tunnel.
13. After adding your tunnel information, select **Add tunnels** to save your changes.
 
</div>
</details>

<details>
<summary>IPsec tunnel</summary>
<div>

5. In **Tunnel name**, give your tunnel a descriptive name. This name must be unique, must not contain spaces or special characters, and must be 15 or fewer characters. Hover the mouse over `i` in the dashboard for more information.
6. Give your tunnel a description in **Description**. You do not have character restrictions here.
7. In **Interface address**, enter the internal IP address for your tunnel along with the interface’s prefix length (either `31` or `30`).
8. In **Customer endpoint**, enter your router’s public IP address.
9. In **Cloudflare endpoint**, enter the Anycast address you received from your account team.

{{<Aside type="note">}}IPsec tunnels will not function without a pre-shared key (PSK).{{</Aside>}}

10. If you do not have a pre-shared key yet: 
    1. Select **Add pre-shared key later**.
    2. _(Optional)_ We recommend you test your tunnel configuration before officially adding it. To test the tunnel, select **Test tunnels.**
    3. Select **Add tunnels**.
    4. Your tunnel will be listed with a warning in the form of a triangle to let you know it is not yet functional. Select **Edit**.
    5. Choose **Generate a new pre-shared key** > **Done**.
11. If you already have a pre-shared key:
    1. Select **Use my own pre-shared key**.
    2. Paste your key in **Your pre-shared key**.
    3. _(Optional)_ We recommend you test your tunnel before officially adding it. To test the tunnel, select **Test tunnels.**
    4. Select **Add tunnels**.

</div>
</details>

### API instructions

<details>
<summary>GRE tunnel</summary>
<div>

Create a `POST` request [using the API](/api/operations/magic-gre-tunnels-create-gre-tunnels) to create a GRE tunnel. You will need your [API Key](/fundamentals/api/get-started/keys/#view-your-global-api-key).

Example:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/gre_tunnels \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <EMAIL>' \
  --header 'X-Auth-Key: <API_KEY>' \
  --data '{
    "gre_tunnels": [
      {
        "name": "<TUNNEL_NAME>",
        "description": "<TUNNEL_DESCRIPTION>",
        "interface_address": "<INTERFACE_ADDRESS>",
        "cloudflare_gre_endpoint": "<CLOUDFLARE_ENDPOINT>",
        "customer_gre_endpoint": "<CUSTOMER_ENDPOINT>"
      }
    ]
  }'
```

</div>
</details>

<details>
<summary>IPsec tunnel</summary>
<div>

Create a `POST` request [using the API](/api/operations/magic-i-psec-tunnels-create-i-psec-tunnels) to create an IPsec tunnel. You will need your [API Key](/fundamentals/api/get-started/keys/#view-your-global-api-key).

Example:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/ipsec_tunnels \
  --header 'Content-Type: application/json' \
  --header 'X-Auth-Email: <EMAIL>' \
  --header 'X-Auth-Key: <API_KEY>' \
  --data '{
    "ipsec_tunnels": [
      {
        "name": "<TUNNEL_NAME>", 
        "description": "<TUNNEL_DESCRIPTION>", 
        "interface_address": "<INTERFACE_ADDRESS>", 
        "cloudflare_endpoint": "<CLOUDFLARE_ENDPOINT>",
        "customer_endpoint": "<CUSTOMER_ENDPOINT>"
      }
    ]
  }'
```

This will generate a response like the following:

```json
{
  "result": {
    "ipsec_tunnels": [
      {
        "id": "<YOUR_TUNNEL_ID>",
        "interface_address": "<INTERFACE_ADDRESS>",
        "created_on": "2023-04-21T10:42:22.138586Z",
        "modified_on": "2023-04-21T10:42:22.138586Z",
        "name": "<TUNNEL_NAME>",
        "cloudflare_endpoint": "<CLOUDFLARE_ENDPOINT>",
        "customer_endpoint": "<CUSTOMER_ENDPOINT>",
        "remote_identities": {
          "hex_id": "<HEX_ID>",
          "fqdn_id": "<FQDN_ID>.ipsec.cloudflare.com",
          "user_id": "ipsec@<USER_ID>.ipsec.cloudflare.com"
        },
        "description": " test",
        "health_check": {
          "enabled": true,
          "target": "<TARGET>",
          "type": "reply",
          "rate": "mid"
        }
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

2. Create a `POST` request to generate a PSK. Use the tunnel `id` you received from the previous command (exemplified by `<YOUR_TUNNEL_ID>` above):

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/ipsec_tunnels/<YOUR_TUNNEL_ID>/psk_generate \
  --header 'X-Auth-Email: <EMAIL>' 
  --header 'X-Auth-Key: <API_KEY>'
```

You will receive a response like the following:

```json
{
  "result": {
    "ipsec_id": "IPSEC_ID",
    "ipsec_tunnel_id": "IPSEC_TUNNEL",
    "psk": "YOUR_PSK_KEY",
    "psk_metadata": {
      "last_generated_on": "2023-04-21T10:48:15.953887008Z"
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

3. Use the above `psk` value to configure the IPsec tunnel on your equipment. You do not need to take further action to use the PSK on Cloudflare’s side, as this value is automatically set.

</div>
</details>

## Next steps

Now that you have set up your tunnel endpoints, you need to configure [static routes]($5) to route your traffic through Cloudflare.

Refer to [Tunnels]($6) for more information on $2 tunnels.