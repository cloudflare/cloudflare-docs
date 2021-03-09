---
order: 4
---

# Applications and app types

Cloudflare Gateway’s HTTP policies allow you to filter HTTP traffic on the L7 firewall. To make it easier to manage firewall policies for cloud applications, Gateway allows you to build policies based on applications and application types. 

Using these two selectors in the HTTP rule builder, you can have more granular control over how web applications are used on your network.

## Creating rules with applications and app types

1. On the [Teams dashboard](http://dash.teams.cloudflare.com), navigate to **Gateway > Policies**.
1. Navigate to the **HTTP tab**.
1. [Create a new rule](/policies/filtering/http-policies/policy-management#create-your-first-http-policy), or edit an existing one.
1. In the **Selector** drop-down menu, select the *Application* option. 
1. In the **Operator** drop-down menu, select *in* or *not in*, depending on whether you want to include or exclude applications or app types from your rule.
1. In the **Value** drop-down menu, check the applications or app types you would like to control with your rule.

  ![Applications](../../../static/documentation/policies/http-applications-operator-value.png)

1. Next, select an **[Action](#supported-actions-for-applications)** for your rule.
1. Click **Create rule** to finalize your changes.


## Supported Applications and App Types

### Applications
A full list of supported applications and their respective application types are available to download [here](../../../static/documentation/applications.csv).

### Application Types

<TableWrap>

| Application Type | Definition |
| ---------------- | ---------- |
| Collaboration & Online Meetings | Applications used to communicate or collaborate in a business setting. |
| Development | Applications used for software development and development operations. |
| Email | Applications used for email. |
| Encrypted DNS | Applications used for encrypting DNS.| 
| File Sharing | Applications used to share files. |
| Finance & Accounting | Applications used as finance and accounting tools. |
| Human Resources |Applications used to manage employees and workforce tools.|
| Instant Messaging |Applications used for instant messaging. |
| IT Management |Applications used to manage IT deployments.|
| Legal | Applications used as legal tools.|
| Productivity | Applications used as business tools.|
| Public Cloud | Applications used to manage public cloud infrastructure.|
| Sales & Marketing| Applications used as sales and marketing tools. |
| Security | Applications used for information security. |
| Social Networking | Applications used for social networking. |
| Streaming |Applications used for streaming video or audio. |
| Do Not Decrypt | Applications that either send non-web traffic such as Session Initiation Protocol (SIP) or Extensible Messaging and Presence Protocol (XMPP) over TLS, utilize certificate pinning, or are incompatible with the TLS man-in the middle certificate that is required for Cloudflare Gateway's proxy to function. |

</TableWrap>

## Supported actions for Applications

The Applications selector allows you to create rules with the following actions:

* **Allow** allows HTTP traffic to reach selected applications.
* **Block** blocks any HTTP traffic from reaching selected applications.
* **Do Not Inspect** bypasses SSL inspection for selected applications.