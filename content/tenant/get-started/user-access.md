---
title: '2: User access'
pcx-content-type: get-started
weight: 3
meta:
  title: 'Step 2: User access'
---

# Step 2: User access

There are two ways to manage how external customers access Cloudflare:

1.  By giving them direct Cloudflare dashboard access.
2.  By building an interface that they directly interact with.

The first method gives customers control over all aspects of Cloudflare, while the latter allows you to integrate your customer's Cloudflare experience into a dashboard that you control and that they may already be familiar with.

## 1. Direct Cloudflare dashboard access

### Grant access using the dashboard

If you want to give customers access to their individual accounts, it is not different than if you were inviting a teammate to help manage your account. This can be done via dashboard.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account.
3.  Click **Manage Account** > **Members**.
4.  In the **Invite Members** panel, enter the email address requiring account access.

### Grant access using the API

Another way to grant access is by making the below API call.

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<customer_account_id>/members' -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{ "email": "<customer-email>", "roles": ["<user-role>"] }'
```

In most cases, the user role to use is that of `Administrator` which has the id `05784afa30c1afe1440e79d9351c7430`. A full list of available roles can be fetched by making a call to `GET https://api.cloudflare.com/client/v4/accounts/<account_id>/roles`. Only ENT customers have access to our full set of user roles. For more details about roles, refer to [Manage account access](/fundamentals/account-and-billing/account-setup/manage-account-members/).

Once the invite is sent, the user will receive an invitation to gain access to the account. If they do not already have a Cloudflare user, we will take them through the process of creating one. Once created, they will be given access to the account and any zones already created.

## 2. Build an interface for customers to use

If you want to have greater control over how customers use Cloudflare or if you want your customers to use an existing dashboard of yours that they already know, you can directly use our API to build this experience.

In general, this means that you will be making all the API calls to Cloudflare on behalf of customers. In this case, it is still recommended to create accounts and users that match 1:1 with your customers. This means changes made by customer `A` will go through user `A` and changes made by customer `B` will go through user `B`. This helps to avoid hitting rate limits across all customers if one user is particularly busy.

{{<Aside type="note">}}

This capability is not enabled by default. Please contacct [Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476) if you need this functionality.

{{</Aside>}}

Creating a user works as follows:

```bash
curl -X POST https://api.cloudflare.com/client/v4/users -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{ "email": "<identifier>@youremaildomain.com>" }'
```

These type of users are service users, as no one will log in to the dashboard with them. If you are planning to use this method, we will enable you to see the API key in order to make API calls as this user.

An example response for a successful creation:

```json
{
  "result": {
    "id": "60758bd48392a06215ae817bc35084b6",
    "email": "<identifier>@youremaildomain.com>",
    "first_name": null,
    "last_name": null,
    "username": "17bd2796b374cec14976ac3bced85c05",
    "telephone": null,
    "country": null,
    "created_on": "2019-02-21T23:20:28.645256Z",
    "modified_on": "2019-02-21T23:20:28.645256Z",
    "two_factor_authentication": {
      "enabled": false,
      "locked": false
    },
    "api_key": "xxx"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

---

## Next step

Now that the customer has access to the account, in the next step we will look at how to enable paid services for customers.

<p>{{<button type="primary" href="/tenant/get-started/enabling-services/">}}Step 3: Enabling services{{</button>}}</p>
