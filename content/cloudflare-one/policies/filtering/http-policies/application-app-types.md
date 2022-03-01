---
pcx-content-type: how-to
title: Applications and app types
weight: 5
---

# Applications and app types

Cloudflare Gateway’s HTTP policies allow you to filter HTTP traffic on the L7 firewall. To make it easier to manage firewall policies for cloud applications, Gateway allows you to build policies based on applications and app types.

Using these two selectors in the HTTP rule builder, you can have more granular control over how web applications are used on your network.

## Creating rules with applications and app types

1.  On the [Zero Trust dashboard](http://dash.teams.cloudflare.com), navigate to **Gateway > Policies**.

1.  Navigate to the **HTTP tab**.

1.  [Create a new rule](/cloudflare-one/policies/filtering/http-policies/), or edit an existing one.

1.  In the **Selector** drop-down menu, select the _Application_ option.

1.  In the **Operator** drop-down menu, select _in_ or _not in_, depending on whether you want to include or exclude applications or app types from your rule.

1.  In the **Value** drop-down menu, check the applications or app types you would like to control with your rule.

  ![Applications](/cloudflare-one/static/documentation/policies/http-applications-operator.png)

1.  Next, select an [**Action**](#supported-actions-for-applications) for your rule.

1.  Click **Create rule** to finalize your changes.

## Supported applications and app types

### Applications

A full list of supported applications and their respective app types are available to download [here](/cloudflare-one/static/documentation/applications.csv).

### App types

{{<table-wrap>}}

| Application type                               | Definition                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Collaboration & Online Meetings                | Applications used to communicate or collaborate in a business setting.                                                                                                                                                                                                                                                        |
| Development                                    | Applications used for software development and development operations.                                                                                                                                                                                                                                                        |
| Email                                          | Applications used for email.                                                                                                                                                                                                                                                                                                  |
| Encrypted DNS                                  | Applications used for encrypting DNS.                                                                                                                                                                                                                                                                                         |
| File Sharing                                   | Applications used to share files.                                                                                                                                                                                                                                                                                             |
| Finance & Accounting                           | Applications used as finance and accounting tools.                                                                                                                                                                                                                                                                            |
| Human Resources                                | Applications used to manage employees and workforce tools.                                                                                                                                                                                                                                                                    |
| Instant Messaging                              | Applications used for instant messaging.                                                                                                                                                                                                                                                                                      |
| IT Management                                  | Applications used to manage IT deployments.                                                                                                                                                                                                                                                                                   |
| Legal                                          | Applications used as legal tools.                                                                                                                                                                                                                                                                                             |
| Productivity                                   | Applications used as business tools.                                                                                                                                                                                                                                                                                          |
| Public Cloud                                   | Applications used to manage public cloud infrastructure.                                                                                                                                                                                                                                                                      |
| Sales & Marketing                              | Applications used as sales and marketing tools.                                                                                                                                                                                                                                                                               |
| Security                                       | Applications used for information security.                                                                                                                                                                                                                                                                                   |
| Social Networking                              | Applications used for social networking.                                                                                                                                                                                                                                                                                      |
| Streaming                                      | Applications used for streaming video or audio.                                                                                                                                                                                                                                                                               |
| [Do Not Decrypt](#do-not-decrypt-applications) | Applications that are incompatible with the TLS man-in the middle certificate that is required for Cloudflare Gateway's proxy to function. These applications either use certificate pinning or send non-web traffic such as Session Initiation Protocol (SIP) or Extensible Messaging and Presence Protocol (XMPP) over TLS. |

{{</table-wrap>}}

#### Do Not Decrypt applications

Some applications are incompatible with TLS decryption for a variety of reasons, one of which is **certificate pinning**. This is a process used by applications to verify that the TLS certificate presented from the origin server matches a known, specified list of certificates hardcoded in the application.

This is a countermeasure to man-in-the-middle attacks where an attacker presents a trusted, but false, certificate on behalf of the origin in order to decrypt the traffic. This is exactly what TLS interception in a Secure Web Gateway does, although for the purposes of securing a user's web traffic.

Gateway automatically groups applications incompatible with TLS decryption into the _Do Not Decrypt_ app type. To ensure that traffic gets through to these applications, you can create an [HTTP rule](/cloudflare-one/policies/filtering/http-policies/application-app-types/), select _Application_ as a **Selector**, _in_ as an **Operator**, and check the _Do Not Decrypt_ app type in the **Value** field. Then, set the rule action to _Do Not Inspect_.

Gateway periodically updates the _Do Not Decrypt_ app type to include new applications. By creating this _Do Not Inspect_ rule and selecting all applications within the _Do Not Decrypt_ app type, you'll ensure that your rule will apply to any new applications that will be added to the app type.

![Do not decrypt HTTP rule](/cloudflare-one/static/documentation/faq/do-not-decrypt.png)

{{<Aside>}}

<b>Google Drive for Desktop</b> allows you to configure the app to trust the <a href="/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/">
  Cloudflare Root Certificate
</a> Gateway presents. Doing so will allow you to inspect the traffic to and from Google Drive, instead
of setting up a <i>Do Not Inspect</i> rule and lose visibility on that traffic. To trust the Cloudflare
Root Certificate in Google Drive, check out these <a href="https://support.google.com/a/answer/7644837">
  instructions for TrustedRootCertsFile
</a>
.

{{</Aside>}}

## Supported actions for applications

The Applications selector allows you to create rules with the following actions:

- **Allow** allows HTTP traffic to reach selected applications.
- **Block** blocks any HTTP traffic from reaching selected applications.
- **Do Not Inspect** bypasses SSL inspection for selected applications.
