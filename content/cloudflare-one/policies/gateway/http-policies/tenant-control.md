---
pcx_content_type: how-to
title: Tenant control
weight: 7
---

# Tenant control

With Gateway tenant control, you can allow your users access to corporate SaaS applications while blocking access to personal applications. This helps prevent the loss of sensitive or confidential data from a corporate network.

When creating an HTTP policy with an Allow action, you will have the option to configure custom headers. Gateway can use custom headers to control SaaS application access. If a user’s HTTP request is headed to your organization’s account for the SaaS application, Gateway will approve the request. If the request does not match the information in the header, Gateway will block the request.

## Add custom headers for a SaaS application

To create an HTTP policy with custom headers:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies**. Select **HTTP**.
2. Select **Add a policy**.
3. Build an expression to match the SaaS traffic you want to control.
4. In **Action**, select _Allow_. In **Untrusted certificate action**, select _Block_.
5. Under **Add headers to matched requests**, select **Add a header**.
6. Add any custom header names and values corresponding to your [SaaS application](#common-policy-configurations).
7. Select **Create policy**.

Your policy is now displayed in your list of HTTP policies. When your users attempt to authenticate your configured SaaS application with a personal account, authentication will fail.

## Common policy configurations

Depending on which SaaS application your organization needs access to, different tenant control policies are required.

### Microsoft 365

Microsoft 365 tenant control requires two policies. When you order your policies, make sure they follow [order of precedence](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence).

| Precedence | Selector | Operator | Value            | Action | Untrusted certificate action |
| ---------- | -------- | -------- | ---------------- | ------ | ---------------------------- |
| 1          | Domain   | is       | `login.live.com` | Allow  | Block                        |

| Custom header name                  | Custom header value |
| ----------------------------------- | ------------------- |
| `Sec-Restrict-Tenant-Access-Policy` | `restrict-msa`      |

| Precedence | Selector    | Operator | Value                 | Action | Untrusted certificate action |
| ---------- | ----------- | -------- | --------------------- | ------ | ---------------------------- |
| 2          | Application | in       | _Microsoft Office365_ | Allow  | Block                        |

| Custom header name                                      | Custom header value        |
| ------------------------------------------------------- | -------------------------- |
| `Restrict-Access-To-Tenants`, `Restrict-Access-Context` | Your organization's domain |

For more information, refer to the [Microsoft Entra ID documentation](https://learn.microsoft.com/entra/identity/enterprise-apps/tenant-restrictions).

### Google Workspace

| Selector    | Operator | Value              | Action | Untrusted certificate action |
| ----------- | -------- | ------------------ | ------ | ---------------------------- |
| Application | in       | _Google Workspace_ | Allow  | Block                        |

| Custom header name           | Custom header value        |
| ---------------------------- | -------------------------- |
| `X-GooGApps-Allowed-Domains` | Your organization's domain |

For more information, refer to the [Google Workspace documentation](https://support.google.com/a/answer/1668854).

### Slack

| Selector    | Operator | Value   | Action | Untrusted certificate action |
| ----------- | -------- | ------- | ------ | ---------------------------- |
| Application | in       | _Slack_ | Allow  | Block                        |

| Custom header name                                                   | Custom header value           |
| -------------------------------------------------------------------- | ----------------------------- |
| `X-Slack-Allowed-Workspaces-Requester`, `X-Slack-Allowed-Workspaces` | Your organization's workspace |

For more information, refer to the [Slack documentation](https://slack.com/help/articles/360024821873-Approve-Slack-workspaces-for-your-network).

### Dropbox

| Selector    | Operator | Value     | Action | Untrusted certificate action |
| ----------- | -------- | --------- | ------ | ---------------------------- |
| Application | in       | _Dropbox_ | Allow  | Block                        |

| Custom header name           | Custom header value    |
| ---------------------------- | ---------------------- |
| `X-Dropbox-allowed-Team-Ids` | Your organization's ID |

For more information, refer to the [Dropbox documentation](https://help.dropbox.com/security/network-control).

## Use tenant control with Browser Isolation

You can configure [Browser Isolation](/cloudflare-one/policies/browser-isolation/) to send custom headers. This is useful for implementing tenant control for isolated SaaS applications or sending arbitrary custom request headers to isolated websites.

To use custom headers with Browser Isolation, create two HTTP policies targeting the same domain or application group. For example, you can create policies for [httpbin](https://httpbin.org/), an open-source site for testing HTTP requests:

1. Create an Isolate policy for `httpbin.org`.

   | Selector | Operator | Value         | Action  |
   | -------- | -------- | ------------- | ------- |
   | Domain   | in       | `httpbin.org` | Isolate |

2. Create an Allow policy for `httpbin.org` with a custom header.

   | Selector | Operator | Value         | Action |
   | -------- | -------- | ------------- | ------ |
   | Domain   | in       | `httpbin.org` | Allow  |

   | Custom header name | Custom header value |
   | ------------------ | ------------------- |
   | `Example-Header`   | `example-value`     |

3. Go to [`httpbin.org/anything`](https://httpbin.org/anything). Cloudflare will render the site in an isolated browser. Your custom header will appear in the list of headers.
