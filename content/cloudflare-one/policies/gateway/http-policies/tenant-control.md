---
pcx_content_type: how-to
title: Tenant control
weight: 7
---

# Tenant control

Cloudflare Zero Trust offers IT administrators a way to ensure users have access to SaaS applications for corporate use, while at the same time blocking access to their personal accounts. This helps prevent the loss of sensitive or confidential data from a corporate network.

You can create Gateway HTTP policies to control access to your corporate SaaS applications. When creating an HTTP policy with an Allow action, you will have the option to configure **custom headers**. The policy will use these headers to grant access to an application if a user’s request is headed to your organization’s account for the SaaS application, and to deny access if the request is headed to an account that does not match the information in the header.

Not all SaaS applications support tenant control. Examples of common applications that do support tenant control through the injection of HTTP headers are:

- Microsoft 365
- Slack
- GSuite
- Dropbox

## Add custom headers for a SaaS application (Microsoft 365 example)

This is a walkthrough of how to add custom headers for Microsoft 365. The procedure is the same for other SaaS applications, except for the values you will add for **Custom Header Name**. Values for **Custom Header Value** are specific to your organization; consult the documentation for your SaaS application for more information on where to find them.

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies** > **HTTP**.

2. Add a policy with the following values:

    - Action: `Allow`
    - Selector: `Application`
    - Operator: `In`
    - Value: select the application you would like to inject custom headers for.

3. Under **Policy Settings**, add a custom header. You can add as many custom headers as needed.

    - Custom Header Name: Restrict-Access-To-Tenants
    - Custom Header Value: contoso.com,fabrikam.onmicrosoft.com,72f988bf-86f1-41af-91ab-2d7cd011db4

4. Select **Create policy**.

Your Allow policy is now displayed in the list of HTTP rules. When an end user attempts to authenticate to an Office 365 application with a personal account, authentication will fail.

## Common policy configurations

This section covers policy configurations for common SaaS applications.

### Microsoft 365

{{<table-wrap>}}

| Selector    | Operator | Value               | Action | Header name                                             |
| ----------- | -------- | ------------------- | ------ | ------------------------------------------------------- |
| Application | In       | Microsoft Office365 | Allow  | `Restrict-Access-To-Tenants`, `Restrict-Access-Context` |

{{</table-wrap>}}

### Slack

{{<table-wrap>}}

| Selector    | Operator | Value | Action | Header name                                                          |
| ----------- | -------- | ----- | ------ | -------------------------------------------------------------------- |
| Application | In       | Slack | Allow  | `X-Slack-Allowed-Workspaces-Requester`, `X-Slack-Allowed-Workspaces` |

{{</table-wrap>}}

### G Suite

{{<table-wrap>}}

| Selector    | Operator | Value            | Action | Header name                  |
| ----------- | -------- | ---------------- | ------ | ---------------------------- |
| Application | In       | Google Workspace | Allow  | `X-GooGApps-Allowed-Domains` |

{{</table-wrap>}}

### Dropbox

{{<table-wrap>}}

| Selector    | Operator | Value   | Action | Header name                  |
| ----------- | -------- | ------- | ------ | ---------------------------- |
| Application | In       | Dropbox | Allow  | `X-Dropbox-allowed-Team-Ids` |

{{</table-wrap>}}

## Using Tenant Control with Browser Isolation

Browser Isolation may be configured to send custom request headers. This is useful for implementing Tenant Control for SaaS applications or sending arbitrary custom request headers to Isolated websites.

You can achieve this by implementing two HTTP policies targeting the same domain or application group in Zero Trust.

### Example: Implementing a custom request header for a domain

#### 1. Create an Isolate policy

- **Name**: Isolate HTTPBIN
- **Description**: Isolates the `httpbin.org` website.
- **Action**: Isolate

| Selector | Operator | Value       |
| -------- | -------- | ----------- |
| Domain   | in       | httpbin.org |

![Results that will appear when configuring the example isolation policy.](/images/cloudflare-one/policies/httpbin-policy-1.png)

#### 2. Create an Allow policy with a Custom Header

- **Name**: Inject custom request header for HTTPBIN
- **Description**: Adds a custom request header for all traffic to the `httpbin.org` website.
- **Action**: Allow

| Selector | Operator | Value       |
| -------- | -------- | ----------- |
| Domain   | in       | httpbin.org |

![Results that will appear when configuring the example allow policy.](/images/cloudflare-one/policies/httpbin-policy.png)

#### 3. Visit `https://httpbin.org/anything`

HTTPBIN is a helpful service to test request headers. Visiting `https://httpbin.org/anything` loads the website in a remote browser and the response body indicates that HTTPBIN received a custom request header from Cloudflare Browser Isolation.

![Custom Cloudflare header displayed in output from HTTPBIN.](/images/cloudflare-one/policies/httpbin.png)
