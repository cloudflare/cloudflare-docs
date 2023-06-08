---
_build:
  publishResources: false
  render: never
  list: never
---

1. [Create a service token](/cloudflare-one/identity/service-tokens/#create-a-service-token).
2. Copy the token's **Client ID** and **Client Secret**.
3. In your [device enrollment permissions](#set-device-enrollment-permissions), create the following policy:

    | Selector          | Operator | Value        | Action        |
    | ----------------- | -------- | ------------ | ------------- |
    | Service Token     | is       | `<TOKEN-NAME>` | Service Auth  |

4. In your MDM [deployment parameters](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/), add the following fields:
    - `auth_client_id`: The **Client ID** of your service token.
    - `auth_client_secret`: The **Client Secret** of your service token.

When you deploy the WARP client with your MDM provider, WARP will automatically connect the device to your Zero Trust organization. 