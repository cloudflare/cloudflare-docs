---
_build:
  publishResources: false
  render: never
  list: never
---

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To edit member permissions using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Members**.
3. Select a member record, then select **Edit**.
4. Update the scope and roles of their permissions.
5. Select **Continue to summary**.
6. Review the information, then select **Update**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To edit member permissions using the API, get a [list of roles](/api/operations/account-roles-list-roles) available for an account.

Then, send a [`PUT` request](/api/operations/account-members-update-member) to edit their permissions.
 
{{</tab>}}
{{</tabs>}}
