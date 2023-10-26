---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To revoke a member's access to your account:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Members**.
3. Locate an account member and expand their record.
4. Click **Revoke**.
5. Click **Yes, revoke access**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To revoke a member's access to your account using the API, send a [`DELETE` request](/api/operations/account-members-remove-member).
 
{{</tab>}}
{{</tabs>}}
