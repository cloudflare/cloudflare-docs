---
pcx_content_type: reference
title: Isolation policies
weight: 2
---

# Isolation policies

With Browser Isolation, you can define policies to dynamically isolate websites based on identity, security threats, or content.

## Isolate

When an HTTP policy applies the Isolate action, the user's web browser is transparently served an HTML compatible remote browser client. Isolation policies can be applied to requests that include `Accept: text/html*`. This allows Browser Isolation policies to co-exist with API traffic.

The following example enables isolation for all web traffic:

| Selector            | Operator | Value           | Action         |
| --------------------| ---------| ----------------| -------------- |
| Host          | matches regex  | `.*` | Isolate        |

If instead you need to isolate specific pages, you can list the domains for which you would like to isolate traffic:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Domain | In | `example.com`, `example.net` | Isolate

{{<Aside type="note" header="Isolate identity providers for applications">}}

Existing cookies and sessions from non-isolated browsing are not sent to the remote browser. Websites that implement single sign-on using third-party cookies will also need to be isolated.

For example, if `example.com` authenticates using Google Workspace, you will also need to isolate the top level [Google Workspace URLs](https://support.google.com/a/answer/9012184).

{{</Aside>}}

## Do Not Isolate

You can choose to disable isolation for certain destinations or categories. The following configuration disables isolation for traffic directed to `example.com`:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Host | In | `example.com` | Do Not Isolate |

## Policy settings

These settings are available in the Gateway HTTP policy builder when you select the **Isolate** action.

### Disable copy / paste

*   **Behavior**. Prohibits users from copying and pasting content between a remote web page and their local machine.
*   **Use Case**. [Protect sensitive content in self-hosted or SaaS applications from data loss](https://blog.cloudflare.com/data-protection-browser/).

### Disable printing

*   **Behavior**. Prohibits users from printing remote web pages to their local machine.
*   **Use Case**. [Protect sensitive content in self-hosted or SaaS applications from data loss](https://blog.cloudflare.com/data-protection-browser/).

### Disable keyboard

{{<Aside>}}
Mouse input remains available (to allow users to navigate a website by following hyperlinks and scrolling). This does not prevent user input into third party virtual keyboards within a remote webpage.
{{</Aside>}}

*   **Behavior**. Prohibits users from performing keyboard input into the remote page.
*   **Use Case**. Prevent users inputting sensitive information into unknown/untrusted websites.

### Disable upload

{{<Aside>}}
This option does not prevent files being uploaded to websites from third party cloud file managers or files downloaded into the remote browser download bar from other isolated websites. To prevent files being uploaded from the remote browser into an isolated website use HTTP Policies to block by Upload Mime Type.
{{</Aside>}}

*   **Behavior**. Prohibits users from uploading files from their local machine into a remote web page.
*   **Use Case**. Protect sensitive data from being exfiltrated to unknown/untrusted websites.

### Disable download

{{<Aside>}}
This option does not prevent files from being downloaded into the remote browser. To prevent files being downloaded into the remote browser use HTTP Policies to block by Download Mime Type.
{{</Aside>}}

*   **Behavior**. Prohibits users from exporting files from the remote browser to their local machine.
*   **Use Cases**. Protect users from downloading files from unknown/untrusted sources, and protect sensitive content in self-hosted or SaaS applications from data loss.

## Common policies

### Isolate all security threats

Isolate security threats such as malware and phishing.

| Selector | Operator | Value | Action |
| - | - | - | - |
| Security Risks | In | All security risks | Isolate

### Isolate high risk content

Isolate high risk content categories such as newly registered domains.

| Selector            | Operator | Value           | Action         |
| --------------------| ---------| ----------------| -------------- |
| Content categories  | in       | Security Risks  | Isolate        |

### Isolate news and media

Isolate news and media sites, which are targets for malvertising attacks:

| Selector            | Operator | Value           | Action         |
| --------------------| ---------| ----------------| -------------- |
| Content categories  | in       | News and Media | Isolate         |

### Isolate uncategorized content

Isolate content that has not been categorized by Cloudflare Radar:

| Selector            | Operator | Value           | Action         |
| --------------------| ---------| ----------------| -------------- |
| Content categories  | not in   | All content categories |  Isolate  |