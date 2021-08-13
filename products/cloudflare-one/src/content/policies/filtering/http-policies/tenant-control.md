---
order: 5
pcx-content-type: how-to
---

# Tenant control

Cloudflare for Teams offers IT administrators a way to ensure users have access to SaaS applications for corporate use, while at the same time blocking access to their personal accounts. This helps prevent the loss of sensitive or confidential data from a corporate network.

You can create Gateway HTTP policies to control access to your corporate SaaS applications. When creating an HTTP policy with an Allow action, you will have the option to configure **custom headers**. The policy will use these headers to grant access to an application if a user’s request is headed to your organization’s account for the SaaS application, and to deny access if the request is headed to an account that does not match the information in the header.

Not all SaaS applications support tenant control. Examples of common applications that do support tenant control through the injection of HTTP headers are:

* Microsoft 365
* Slack
* GSuite
* Dropbox
* YouTube

## Add custom headers for a SaaS application (Microsoft 365 example)

This is a walkthrough of how to add custom headers for Microsoft 365. The procedure is the same for other SaaS applications, except for the values you will add for **Custom Header Name**. Values for **Custom Header Value** are specific to your organization; consult the documentation for your SaaS application for more information on where to find them.

1. On the [Teams Dashboard](https://dash.teams.cloudflare.com), navigate to **Gateway** > **Policies** > **HTTP**.
1. Create a policy with the following values:
    * Action: `Allow`
    * Selector: `Application`
    * Operator: `In`
    * Value: select the application you would like to inject custom headers for.
1. Under **Policy Settings**, add a custom header. You can add as many custom headers as needed.
    * Custom Header Name: Restrict-Access-To-Tenants
    * Custom Header Value: contoso.com,fabrikam.onmicrosoft.com,72f988bf-86f1-41af-91ab-2d7cd011db4

1. Click **Create policy**.

Your Allow policy is now displayed in the list of HTTP rules. When an end user attempts to authenticate to an Office 365 application with a personal account, authentication will fail.

## Common policy configurations 

This section covers policy configurations for common SaaS applications. 

## Dropbox

| Selector | Operator | Value | Action | Header name |
| -- | -- | -- | -- | -- |
| Application | In | Dropbox | Allow | `X-Dropbox-allowed-Team-Ids` |

## G Suite

| Selector | Operator | Value | Action | Header name |
| -- | -- | -- | -- | -- |
| Application | In | Google Workspace | Allow | `X-GooGApps-Allowed-Domains` |

## Microsoft 365

| Selector | Operator | Value | Action | Header name |
| -- | -- | -- | -- | -- |
| Application | In | Microsoft Office365 | Allow | `Restrict-Access-To-Tenants`, `Restrict-Access-Context` |

## YouTube

| Selector | Operator | Value | Action | Header name |
| -- | -- | -- | -- | -- |
| Application | In | YouTube | Allow | `YouTube-Restrict` |
