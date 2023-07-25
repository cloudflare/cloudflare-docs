---
pcx_content_type: reference
title: Applications and app types
weight: 7
---

# Applications and app types

Gateway allows you to build DNS, Network, and HTTP policies based on applications and app types. This feature gives you more granular control over how web applications are used on your network.

## Applications

When you choose the _Application_ selector in a Gateway policy builder, the **Value** drop-down menu will show all supported applications and their respective app types. Alternatively, you can use the [Gateway API](/api/operations/zero-trust-gateway-application-and-application-type-mappings-list-application-and-application-type-mappings) to fetch a list of applications, app types, and ID numbers.

## App types

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
| [Do Not Inspect](#do-not-inspect-applications) | Applications that are incompatible with the TLS man-in the middle certificate that is required for Cloudflare Gateway's proxy to function. These applications either use certificate pinning or send non-web traffic such as Session Initiation Protocol (SIP) or Extensible Messaging and Presence Protocol (XMPP) over TLS. |

{{</table-wrap>}}

### Do Not Inspect applications

Some applications are incompatible with [TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) for a variety of reasons, one of which is certificate pinning. This is a process used by applications to verify that the TLS certificate presented from the origin server matches a known, specified list of certificates hardcoded in the application.

This is a countermeasure to man-in-the-middle attacks where an attacker presents a trusted, but false, certificate on behalf of the origin in order to decrypt the traffic. This is exactly what TLS interception in a Secure Web Gateway does, although for the purposes of securing a user's web traffic.

Gateway automatically groups applications incompatible with TLS decryption into the _Do Not Inspect_ app type. To ensure that traffic gets through to these applications, you can [create an HTTP policy](/cloudflare-one/policies/gateway/initial-setup/http/#bypass-inspection-for-incompatible-applications) for all _Do Not Inspect_ applications.

Gateway periodically updates the _Do Not Inspect_ app type to include new applications. By creating this _Do Not Inspect_ HTTP policy and selecting all applications within the _Do Not Inspect_ app type, you will ensure that your _Do Not Inspect_ policy will apply to any new applications added to the app type.

{{<Aside type="note">}}
Instead of setting up a _Do Not Inspect_ policy for an application, you may be able to configure the application to [trust the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications). Doing so will allow the application to function without losing visibility into your traffic.
{{</Aside>}}

## Office 365 integration

You can perform a one-click action to bypass TLS decryption for all Office 365 traffic. To enable, go to **Settings** > **Network** > **Bypass decryption of Office 365 traffic** and select **Create policy**. This will create a [Do Not Inspect policy](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) for all [Office 365 domains and IP addresses specified by Microsoft](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service). This policy also uses our own Cloudflare intelligence to determine which traffic belongs to Office 365.
