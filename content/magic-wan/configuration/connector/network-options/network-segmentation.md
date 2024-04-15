---
pcx_content_type: how-to
title: Network segmentation
---

# Network segmentation

You can define policies in your Connector to allow traffic to flow between your LANs without it leaving your local premises. These policies can be created for specific subnets, and link two LANs.

Creating these policies to segment your network means traffic will flow locally and bypass Cloudflare. As a best practice for security, we recommend sending all traffic through Cloudflare's network for Zero Trust security filtering. Use these policies with care and only for scenarios where you have a hard requirement for LAN to LAN traffic flows.

The following guide assumes you have already created a site and configured your Connector. To learn how to create a site and configure your Connector, refer to [Configure hardware Connector](/magic-wan/configuration/connector/configure-hardware-connector/) or [Configure virtual connector](/magic-wan/configuration/connector/configure-virtual-connector/), depending on the type of Magic WAN Connector you have on your premises.

## Create a policy

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

Follow the steps below to create a new LAN policy to segment your network. Only the fields marked **required** are mandatory.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Network**, and scroll down to **LAN configuration**.
5. Select **LAN policies** > **Create Policy**.
6. In **Policy name**, enter a descriptive name for the policy you are creating.
7. From the drop-down menu **LAN 1**, select your origin LAN.
8. (Optional) Specify a subnet for your first LAN in **Subnets**.
9. (Optional) In **Ports** specify the TCP/UDP ports you want to use. Add a comma to separate each of the ports.
10. In **LAN 2**, select the destination LAN and repeat the above process to configure it.
11. (Optional) Select the type of traffic you want to keep local. You can choose **TCP**, **UDP**, and **ICMP**. You can also select **Any** to choose all types of traffic.
12. Select **Create policy**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a `POST` request [using the API](/api/operations/magic-site-acls-create-site-acl) to create a network policy.

Example:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/acls \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--data '{
  "acl": {
    "description": "<POLICY_DESCRIPTION>",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "<LAN_ID>",
      "lan_name": "<LAN_NAME>",
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "<LAN_ID>",
      "lan_name": "<LAN_NAME",
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "<POLICY_NAME>",
    "protocols": [
      "tcp"
    ]
  }
}'
```

If successful, you will receive a response like the following:

```bash
{
  "errors": [],
  "messages": [],
  "result": {
    "acls": [
      {
        "description": "<POLICY_DESCRIPTION>",
        "forward_locally": true,
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "lan_1": {
          "lan_id": "<LAN_ID>",
          "lan_name": "<LAN_NAME>",
          "ports": [
            1
          ],
          "subnets": [
            "192.0.2.1"
          ]
        },
        "lan_2": {
          "lan_id": "<LAN_ID>",
          "lan_name": "<LAN_NAME>",
          "ports": [
            1
          ],
          "subnets": [
            "192.0.2.1"
          ]
        },
        "name": "<POLICY_NAME>",
        "protocols": [
          "tcp"
        ]
      }
    ]
  },
  "success": true
}
```

Take note of the `id` parameter, as you will need it to edit or delete network policies.

{{</tab>}}
{{</tabs>}}

The new policy will ensure that traffic between the specified LANs flows locally, bypassing Cloudflare.

## Edit a policy

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Network**, and scroll down to **LAN configuration**.
5. Select **LAN policies**.
6. Select the policy you need to edit > **Edit**.
7. Make your changes, and select **Update policy**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a `PUT` request [using the API](/api/operations/magic-site-acls-update-acl) to edit a network policy.

Example:

```bash
curl --request PUT \
--url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id} \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
--data '{
  "acl": {
    "description": "<POLICY_DESCRIPTION>",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "<LAN_ID>",
      "lan_name": "<LAN_NAME>",
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "<LAN_ID>",
      "lan_name": "<LAN_NAME>",
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "<POLICY_NAME>",
    "protocols": [
      "tcp"
    ]
  }
}'
```

{{</tab>}}
{{</tabs>}}

## Delete a policy

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Magic WAN** > **Sites**.
3. Select the site you want to configure > **Edit**.
4. Go to **Network**, and scroll down to **LAN configuration**.
5. Select **LAN policies**.
6. Select the policy you need to edit > **Edit**.
7. Select **Delete**.
8. Select **I understand that deleting a policy is permanent** in the dialog box > **Delete**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="connector/_account-id-api-key" >}}

Create a `DELETE` request [using the API](/api/operations/magic-site-acls-delete-acl) to delete a network policy.

Example:

```bash
curl --request DELETE \
--url https://api.cloudflare.com/client/v4/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_identifier} \
--header 'Content-Type: application/json' \
--header 'X-Auth-Email: <EMAIL>' \
--header 'X-Auth-Key: <API_KEY>' \
```

{{</tab>}}
{{</tabs>}}