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

Microsoft 365 requires two separate policies for tenant control.

| Selector | Operator | Value            | Action | Untrusted certificate action |
| -------- | -------- | ---------------- | ------ | ---------------------------- |
| Domain   | is       | `login.live.com` | Allow  | Block                        |

| Custom header name                  | Custom header value |
| ----------------------------------- | ------------------- |
| `Sec-Restrict-Tenant-Access-Policy` | `restrict-msa`      |

| Selector    | Operator | Value                 | Action | Header name                                             |
| ----------- | -------- | --------------------- | ------ | ------------------------------------------------------- |
| Application | in       | _Microsoft Office365_ | Allow  | `Restrict-Access-To-Tenants`, `Restrict-Access-Context` |

| Custom header name           | Custom header value        |
| ---------------------------- | -------------------------- |
| `Restrict-Access-To-Tenants` | Your organization's domain |

For more information, refer to the [Microsoft Entra ID documentation](https://learn.microsoft.com/entra/identity/enterprise-apps/tenant-restrictions).

### Google Workspace

| Selector    | Operator | Value              | Action | Untrusted certificate action |
| ----------- | -------- | ------------------ | ------ | ---------------------------- |
| Application | in       | _Google Workspace_ | Allow  | Block                        |

| Custom header name           | Custom header value        |
| ---------------------------- | -------------------------- |
| `X-GooGApps-Allowed-Domains` | Your organization's domain |

### Slack

| Selector    | Operator | Value   | Action | Untrusted certificate action |
| ----------- | -------- | ------- | ------ | ---------------------------- |
| Application | in       | _Slack_ | Allow  | Block                        |

| Custom header name                                                   | Custom header value        |
| -------------------------------------------------------------------- | -------------------------- |
| `X-Slack-Allowed-Workspaces-Requester`, `X-Slack-Allowed-Workspaces` | Your organization's domain |

### Dropbox

| Selector    | Operator | Value     | Action | Untrusted certificate action |
| ----------- | -------- | --------- | ------ | ---------------------------- |
| Application | in       | _Dropbox_ | Allow  | Block                        |

| Custom header name           | Custom header value        |
| ---------------------------- | -------------------------- |
| `X-Dropbox-allowed-Team-Ids` | Your organization's domain |

## Use tenant control with Browser Isolation

Browser Isolation may be configured to send custom request headers. This is useful for implementing tenant control for SaaS applications or sending arbitrary custom request headers to Isolated websites.

You can achieve this by implementing two HTTP policies targeting the same domain or application group in Zero Trust.

### Example: Implementing a custom request header for a domain

#### 1. Create an Isolate policy

| Selector | Operator | Value         | Action  |
| -------- | -------- | ------------- | ------- |
| Domain   | in       | `httpbin.org` | Isolate |

![Results that will appear when configuring the example isolation policy.](/images/cloudflare-one/policies/httpbin-policy-1.png)

#### 2. Create an Allow policy with a Custom Header

| Selector | Operator | Value         | Action |
| -------- | -------- | ------------- | ------ |
| Domain   | in       | `httpbin.org` | Allow  |

![Results that will appear when configuring the example allow policy.](/images/cloudflare-one/policies/httpbin-policy.png)

#### 3. Visit `https://httpbin.org/anything`

HTTPBIN is a helpful service to test request headers. Visiting `https://httpbin.org/anything` loads the website in a remote browser and the response body indicates that HTTPBIN received a custom request header from Cloudflare Browser Isolation.

![Custom Cloudflare header displayed in output from HTTPBIN.](/images/cloudflare-one/policies/httpbin.png)
