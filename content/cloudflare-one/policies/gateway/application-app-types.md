---
pcx_content_type: reference
title: Applications and app types
weight: 8
---

# Applications and app types

Gateway allows you to create DNS, Network, and HTTP policies based on applications and app types. You can select individual applications or groups of app types to filter specific traffic on your network.

## Applications

When you choose the _Application_ selector in a Gateway policy builder, the **Value** field will include all supported applications and their respective app types. Alternatively, you can use the [Gateway API](/api/operations/zero-trust-gateway-application-and-application-type-mappings-list-application-and-application-type-mappings) to fetch a list of applications, app types, and ID numbers.

## App types

{{<table-wrap>}}

| Value                                          | Definition                                                                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Artificial Intelligence                        | AI assistance applications                                                                                                  |
| Audio Streaming                                | Music streaming, podcasts, and other audio applications                                                                     |
| Collaboration & Online Meetings                | Business communication and collaboration applications                                                                       |
| Dating                                         | Online dating applications                                                                                                  |
| Development                                    | Software development and development operations applications                                                                |
| Email                                          | Email applications                                                                                                          |
| Encrypted DNS                                  | DNS encryption applications                                                                                                 |
| File Sharing                                   | File sharing applications                                                                                                   |
| Finance & Accounting                           | Financial and accounting applications                                                                                       |
| Gaming                                         | Games and gaming applications                                                                                               |
| Human Resources                                | Employee management applications and workforce tools                                                                        |
| Instant Messaging                              | Instant messaging applications                                                                                              |
| IT Management                                  | IT deployment management applications                                                                                       |
| Legal                                          | Legal tools and applications                                                                                                |
| News                                           | News applications                                                                                                           |
| Productivity                                   | Business and productivity applications                                                                                      |
| Public Cloud                                   | Public cloud infrastructure management applications                                                                         |
| Sales & Marketing                              | Sales and marketing applications                                                                                            |
| Search Engines                                 | Web search engines and applications                                                                                         |
| Security                                       | Information security applications, including {{<glossary-tooltip term_id="shadow IT">}}shadow IT{{</glossary-tooltip>}}     |
| Shopping                                       | Online shopping applications                                                                                                |
| Social Networking                              | Social networking applications                                                                                              |
| Sports                                         | Sports streaming and news applications                                                                                      |
| Video Streaming                                | Video streaming applications                                                                                                |
| [Do Not Inspect](#do-not-inspect-applications) | Applications incompatible with the TLS certificate required by the [Gateway proxy](/cloudflare-one/policies/gateway/proxy/) |

{{</table-wrap>}}

### Do Not Inspect applications

#### TLS decryption limitations

Applicatons can be incompatible with [TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) for various reasons:

{{<glossary-definition term_id="certificate pinning" prepend="- **Certificate pinning**: Certificate pinning is ">}}

- **Non-web traffic**: Some applications send non-web traffic, such as Session Initiation Protocol (SIP) and Extensible Messaging and Presence Protocol (XMPP), over TLS. Gateway cannot inspect these protocols.

#### Application grouping

Gateway automatically groups applications incompatible with TLS decryption into the _Do Not Inspect_ app type. As Cloudflare identifies incompatible applications, Gateway will periodically update this app type to add new applications. To ensure Gateway does not intercept any current or future incompatible traffic, you can [create a Do Not Inspect HTTP policy](/cloudflare-one/policies/gateway/initial-setup/http/#bypass-inspection-for-incompatible-applications) with the entire _Do Not Inspect_ app type selected.

{{<Aside type="note" header="Install Cloudflare certificate manually to allow TLS decryption">}}
Instead of creating a Do Not Inspect policy for an application, you may be able to configure the application to [trust the Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications). Doing so will allow the application to function without losing visibility into your traffic.
{{</Aside>}}

#### Microsoft 365 integration

To optimize performance for Microsoft 365 applications and services, you can bypass TLS decryption by turning on the Microsoft 365 traffic integration. This will create a [Do Not Inspect policy](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) for all [Microsoft 365 domains and IP addresses](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service) specified by Microsoft. This policy also uses Cloudflare intelligence to identify other Microsoft 365 traffic not explicity defined.

To turn on the Microsoft 365 integration:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network** > **Integrated experiences**.
2. In **Bypass decryption of Microsoft 365 traffic**, select **Create policy**.
3. To verify the policy was created, select **View policy**. Alternatively, go to **Gateway** > **Firewall Policies** > **HTTP**. A policy named Microsoft 365 Auto Generated will be enabled in your list.

All future Microsoft 365 traffic will bypass Gateway logging and filtering. To disable this behavior, turn off or delete the policy.
