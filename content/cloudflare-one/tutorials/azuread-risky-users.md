---
updated: 2023-01-06
category: 🔐 Zero Trust
difficulty: Advanced
pcx_content_type: tutorial
title: Isolate Azure AD risky users
---

# Isolate Azure AD risky users

Azure Active Directory (AD) calculates a user's [risk level](https://learn.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-investigate-risk) based on the probability that their account has been compromised. With Cloudflare Zero Trust, you can synchronize the Azure AD risky users list with Cloudflare Access and apply more stringent Zero Trust policies to users at higher risk.

This tutorial demonstrates how to automatically redirect users to a remote browser when they are deemed risky by Azure.

**Time to complete:**

1 hour

## Prerequisites

- Azure AD Premium P2 license
- [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/) add-on
- [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/) enabled on your devices
- (Recommended) [`wrangler`](/workers/wrangler/install-and-update/) installation

## 1. Set up Azure AD as an identity provider

Refer to [our IdP setup instructions](/cloudflare-one/identity/idp-integration/azuread/#set-up-azure-ad-as-an-identity-provider) for Azure AD.

{{<Aside type="note">}}

- When you configure the IdP in Zero Trust, be sure to select **Enable group membership change reauthentication**.
- Save the **Application (client) ID**, **Directory (tenant) ID**, and **Client secret** as you will need them again in a later step.
  {{</Aside>}}

## 2. Add Azure AD API permissions

Once the base IdP integration is tested and working, enable additional permissions that will allow a script to create and update risky user groups in Azure AD:

1. In Azure Active Directory, go to **App registrations**.

2. Select the application you created for the IdP integration.

3. Navigate to **API permissions** and select **Add a permission**.

4. Select **Microsoft Graph**.

5. Select **Application permissions** and add the following [permissions](https://learn.microsoft.com/en-us/graph/permissions-reference):

   - `IdentityRiskyUser.ReadAll`
   - `Directory.ReadWriteAll`
   - `Group.Create`
   - `Group.ReadAll`
   - `GroupMember.ReadAll`
   - `GroupMember.ReadWriteAll`

6. Select **Grant admin consent**.

You will see the list of enabled permissions.

![API permissions in Azure AD](/cloudflare-one/static/documentation/identity/azure/risky-users-permissions.png)

## 3. Add risky users to Azure AD group

Next, configure an automated script that will populate an Azure AD security group with risky users.

To get started quickly, deploy our example Cloudflare Workers script by following the step-by-step instructions below. Alternatively, you can implement the script using [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) or any other tool.

1. Authenticate `wrangler`.

   ```sh
   $ wrangler login
   ```

2. Open a terminal and clone our example project.

   ```sh
   $ wrangler generate risky-users https://github.com/cloudflare/msft-risky-user-ad-sync
   ```

3. Navigate to the project directory.

   ```sh
   $ cd risky-users
   ```

4. Modify `wrangler.toml` to include the following values:

   - `<ACCOUNT_ID>`: your Cloudflare account ID, shown in the [Cloudflare dashboard](https://dash.cloudflare.com/) in the **Workers** tab.
   - `<TENANT_ID>`: your Azure AD **Directory (tenant) ID**, obtained when [setting up Azure AD as an identity provider](#1-set-up-azure-ad-as-an-identity-provider).
   - `<CLIENT_ID>`: your Azure AD **Application (client) ID**, obtained when [setting up Azure AD as an identity provider](#1-set-up-azure-ad-as-an-identity-provider).

   ```toml
   ---
   filename: wrangler.toml
   ---
   name = "risky-users"
   compatibility_date = "2023-01-04"
   main = "src/index.js"
   workers_dev = false

   account_id = "<ACCOUNT-ID>"

   [vars]
   AZURE_AD_TENANT_ID = "<TENANT-ID>"
   AZURE_AD_CLIENT_ID = "<CLIENT-ID>"

   [triggers]
   crons = ["* * * * *"]
   ```

{{<Aside type="note">}}
The [Cron Trigger](/workers/platform/triggers/cron-triggers/) in this example schedules the script to run every minute. [Learn more](/workers/platform/triggers/cron-triggers/#supported-cron-expressions) about supported cron expressions.
{{</Aside>}}

5. Publish the Worker to your Workers account.

   ```sh
   $ wrangler publish
   ```

6. Create a secret variable named `AZURE_AD_CLIENT_SECRET`.

   ```sh
   $ wrangler secret put AZURE_AD_CLIENT_SECRET
   ```

   You will be prompted to input the secret’s value. Enter the **Client secret** obtained when [setting up AzureAD as an identity provider](#1-set-up-azure-ad-as-an-identity-provider).

The Worker script will begin executing once per minute. To view realtime logs, run the following command and wait for the script to execute:

```sh
$ wrangler tail --format pretty
```

After the initial run, the auto-generated groups will appear in the Azure AD dashboard.

![Risky user groups in the Azure AD dashboard](/cloudflare-one/static/documentation/identity/azure/risky-users-groups.png)

## 4. Synchronize risky user groups

Next, synchronize Azure AD risky user groups with Cloudflare Access:

1. [Enable SCIM synchronization](/cloudflare-one/identity/idp-integration/azuread/#synchronize-users-and-groups).

2. In Azure AD, assign the following groups to your SCIM enterprise application:
   - `IdentityProtection-RiskyUser-RiskLevel-high`
   - `IdentityProtection-RiskyUser-RiskLevel-medium`
   - `IdentityProtection-RiskyUser-RiskLevel-low`

Cloudflare Access will now synchronize changes in group membership with Azure AD. You can verify the synchronization status on the SCIM application's **Provisioning** page.

## 5. Create a browser isolation policy

Finally, create a [Gateway HTTP policy](/cloudflare-one/policies/filtering/http-policies/) to isolate traffic for risky user groups.

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies** > **HTTP**.

2. Select **Create a policy**.

3. Build an [Isolate policy](/cloudflare-one/policies/browser-isolation/isolation-policies/) that contains a _User Group Names_ rule. For example, the following policy serves `app1.example.com` and `app2.example.com` in a remote browser for all members flagged as high risk:

   | Policy name         |
   | ------------------- |
   | Isolate risky users |

   | Selector         | Operator | Value                                         |
   | ---------------- | -------- | --------------------------------------------- |
   | Domain           | In       | `app1.example.com`, `app2.example.com`        |
   | User Group Names | in       | `IdentityProtection-RiskyUser-RiskLevel-high` |

   | Action  |
   | ------- |
   | Isolate |

To test the policy, refer to the Microsoft documentation for [simulating risky detections](https://learn.microsoft.com/en-us/azure/active-directory/identity-protection/howto-identity-protection-simulate-risk).
