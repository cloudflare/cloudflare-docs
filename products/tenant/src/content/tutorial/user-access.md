---
title: "2: User access"
order: 1
---

# Step 2: User access

There are two ways to manage how external customers access Cloudflare.

1. By giving them direct Cloudflare dashboard access.
2. By building an interface that they directly interact with.

The first method gives customers control over all aspects of Cloudflare, while the latter allows you to integrate your customer's Cloudflare experience into a dashboard you control and they may already be familiar with.

## 1. Direct Cloudflare dashboard access

If you want to give customers access to their individual accounts then its no different then if you were inviting a teammate to help manage your account. This can be done in our dashboard through the members tab in the account management area or by making the below API call.

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<customer_account_id>/members' -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{ "email": "<customer-email>", "roles": ["<user-role>"] }'
```

In most cases the user-role to use is that of the `Administrator` role which is id `05784afa30c1afe1440e79d9351c7430`. A full list of available roles can be fetched by making a call to `GET https://api.cloudflare.com/client/v4/accounts/<account_id>/roles` in the case of ENT customers whom have access to our full set of user roles.

Once the invite is sent, the user will receive an invite to gain access to the account. If they don't already have a Cloudflare user then we will take them through the process to create one. Once created they will be given access to the acecount and any zones already created.

## 2. Build an interface for customers to use

If you want to have greater control over how customers use Cloudflare or integrate the experience into an existing dashboard of yours that customers use then you can integrate with our API directly to build this experience. In general this will mean that you will be making all the API calls to Cloudflare on behalf of customers. In this case it is still recommended to create accounts and users that match 1:1 with your customers. This means changes made by customer A will go through user A and changes made by customer B will go through user B. This helps to avoid hitting rate limits across all customers if one user is particularly busy.

**Note:** This capability is not enabled by default. Please contact Cloudflare if you need this functionality.

Creating a user works as follows:

```bash
curl -X POST https://api.cloudflare.com/client/v4/users -H 'Content-Type: application/json' -H 'x-auth-email: <x-auth-email>' -H 'x-auth-key: <x-auth-key>' -d '{ "email": "<identifier>@youremaildomain.com>" }'
```

In these cases these users are service users as no one will log into the dashboard with them. If you are planning to use this method we will enable you to see the API key for this user in order to make API calls as this user.

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

--------------------------------

## Continue the tutorial

Now that the customer has access to the account in the next step we will look at how to enable paid services for customers.

<p><Link to="/tutorial/enabling-services" className="Button Button-is-docs-primary">Step 3: Enabling services</Link></p>
