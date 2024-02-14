---
pcx_content_type: reference
title: Applications and app types
weight: 8
---

# Applications and app types

Gateway allows you to build DNS, Network, and HTTP policies based on applications and app types. This feature gives you more granular control over how web applications are used on your network.

## Applications

When you choose the _Application_ selector in a Gateway policy builder, the **Value** drop-down menu will show all supported applications and their respective app types. Alternatively, you can use the [Gateway API](/api/operations/zero-trust-gateway-application-and-application-type-mappings-list-application-and-application-type-mappings) to fetch a list of applications, app types, and ID numbers.

## App types

{{<table-wrap>}}

| Value                                          | Definition                                                                                                                               |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Artificial Intelligence                        | AI assistance applications                                                                                                               |
| Audio Streaming                                | Music streaming, podcasts, and other audio applications                                                                                  |
| Collaboration & Online Meetings                | Business communication and collaboration applications                                                                                    |
| Dating                                         | Online dating applications                                                                                                               |
| Development                                    | Software development and development operations applications                                                                             |
| Email                                          | Email applications                                                                                                                       |
| Encrypted DNS                                  | DNS encryption applications                                                                                                              |
| File Sharing                                   | File sharing applications                                                                                                                |
| Finance & Accounting                           | Finance and accounting tools and applications                                                                                            |
| Gaming                                         | Games and gaming applications                                                                                                            |
| Human Resources                                | Employee management applications and workforce tools                                                                                     |
| Instant Messaging                              | Instant messaging applications                                                                                                           |
| IT Management                                  | IT deployment management applications                                                                                                    |
| Legal                                          | Legal tools and applications                                                                                                             |
| News                                           | News applications                                                                                                                        |
| Productivity                                   | Business tools and applications                                                                                                          |
| Public Cloud                                   | Public cloud infrastructure management applications                                                                                      |
| Sales & Marketing                              | Sales and marketing tools and applications                                                                                               |
| Search Engines                                 | Web search engines                                                                                                                       |
| Security                                       | Information security applications, including {{<glossary-tooltip term_id="shadow IT">}}shadow IT{{</glossary-tooltip>}}                  |
| Shopping                                       | Shopping applications                                                                                                                    |
| Social Networking                              | Social networking applications                                                                                                           |
| Sports                                         | Sports and sports news applications                                                                                                      |
| Video Streaming                                | Video streaming applications                                                                                                             |
| [Do Not Inspect](#do-not-inspect-applications) | Applications incompatible with the TLS certificate required for the [Gateway proxy](/cloudflare-one/policies/gateway/proxy/) to function |

{{</table-wrap>}}

### Do Not Inspect applications

#### TLS decryption limitations

Some applications are incompatible with [TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) for various reasons, such as certificate pinning and non-web traffic.

{{<glossary-tooltip term_id="certificate pinning">}}Certificate pinning{{</glossary-tooltip>}} combats man-in-the-middle attacks where an attacker presents a trusted (but false) certificate on behalf of the origin in order to decrypt the traffic. TLS interception in a Secure Web Gateway also presents a trusted certificate to decrypt traffic, although for the purpose of securing a user's web traffic.

Some applications send non-web traffic over TLS, such as Session Initiation Protocol (SIP) or Extensible Messaging and Presence Protocol (XMPP). Gateway cannot inspect these protocols.

#### Application grouping

Gateway automatically groups applications incompatible with TLS decryption into the _Do Not Inspect_ app type. To ensure that traffic gets through to these applications, you can [create an HTTP policy](/cloudflare-one/policies/gateway/initial-setup/http/#bypass-inspection-for-incompatible-applications) for all _Do Not Inspect_ applications.

Gateway periodically updates the _Do Not Inspect_ app type to include new applications. By creating this _Do Not Inspect_ HTTP policy and selecting all applications within the _Do Not Inspect_ app type, you will ensure that your _Do Not Inspect_ policy will apply to any new applications added to the app type.

{{<Aside type="note" header="Install Cloudflare certificate manually to allow TLS decryption">}}
Instead of setting up a _Do Not Inspect_ policy for an application, you may be able to configure the application to [trust the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications). Doing so will allow the application to function without losing visibility into your traffic.
{{</Aside>}}

#### Microsoft 365 integration

To optimize performance for Microsoft 365 applications and services, you can bypass TLS decryption by turning on the Microsoft 365 traffic integration. This will create a [Do Not Inspect policy](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) for all [Microsoft 365 domains and IP addresses](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service) specified by Microsoft. This policy also uses Cloudflare intelligence to identify other Microsoft 365 traffic.

To turn on the integration:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network** > **Integrated experiences**.
2. In **Bypass decryption of Office 365 traffic**, select **Create policy**.
3. To verify the policy was created, go to **Gateway** > **Firewall Policies**, then select **HTTP**. A policy named Office 365 Auto Generated should be enabled in your list.
