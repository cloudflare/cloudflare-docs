---
pcx_content_type: reference
title: Shadow IT Discovery
weight: 2
---

# Shadow IT Discovery

The Shadow IT Discovery page provides visibility into the SaaS applications and private network origins your end users are visiting. This information enables you to create identity and device-driven Zero Trust policies to secure your users and data.

Shadow IT Discovery is located in [Zero Trust](https://one.dash.cloudflare.com) under **Analytics** > **Access**.

## SaaS applications

To see an overview of SaaS applications your users have visited, go to **Analytics** > **Access** > **SaaS**. This tab displays the following information:

- **Unique application users**: Chart showing the number of different users who accessed SaaS applications over time.
- **Top approved applications**: SaaS applications marked as [**Approved**](#approval-status) which had the greatest number of unique visitors.
- **Top unapproved applications**: SaaS applications marked as [**Unapproved**](#approval-status) which had the greatest number of unique visitors.
- **Zero Trust**: Metrics for your Access applications including the total number of accessed applications, failed logins, and connected users over the selected time period.
- **Logins**: Chart showing the number of logins for an individual Access application over time.
- **Top applications accessed**: Access applications with the greatest number of logins.
- **Top connected users**: Users who logged in to the greatest number of Access applications.

### Review discovered applications

You can view a list of all discovered SaaS applications and mark them as approved or unapproved. To review an application:

1. Go to **Analytics** > **Access** > **SaaS**.
2. In the **Unique application users** chart, select **Review all**. The table displays the following fields:

{{<table-wrap>}}
| Field | Description |
| ------------| ----------- |
| Application | SaaS application's name and logo. |
| Application type |[Application type](/cloudflare-one/policies/gateway/application-app-types/#app-types) assigned by Cloudflare Zero Trust. |
| Status | Application's [approval status](#approval-status). |
| Secured | Whether the application is currently secured behind Cloudflare Access. |
| Users | Number of users who connected to the application over the period of time specified on the Shadow IT Discovery overview page. |
{{</table-wrap>}}

3. Select a specific application to view details.
4. Assign a new [approval status](#approval-status) according to your organization's preferences.

The application's status will now be updated across charts and visualizations on the **SaaS** tab. You can block unapproved applications by creating a [Gateway policy](/cloudflare-one/policies/gateway/).

## Private network origins

To see an overview of the private network origins your users have visited, go to **Analytics** > **Access** > **Private Network**. This tab displays the following information:

- **Unique origin users**: Chart showing the number of different users accessing your private network over time.
- **Top approved origins**: Origins marked as [**Approved**](#approval-status) which had the greatest number of unique visitors.
- **Top unapproved origins**: Origins marked as [**Unapproved**](#approval-status) which had the greatest number of unique visitors.
- **Zero Trust**: Metrics for your Access applications including the total number of accessed applications, failed logins, and connected users over the selected time period.
- **Logins**: Chart showing the number of logins for an individual Access application over time.
- **Top applications accessed**: Access applications with the greatest number of logins.
- **Top connected users**: Users who logged in to the greatest number of Access applications.

### Review discovered origins

You can view a list of all discovered origins and mark them as approved or unapproved. To review a private network origin:

1. Go to **Analytics** > **Access** > **Private Network**.
2. In the **Unique origin users** chart, select **Review all**. The discovered origins that appear on this page are defined by unique combinations of IP address, port, and protocol.

{{<table-wrap>}}
| Field | Description |
| ------------| ----------- |
| IP address | Origin's internal IP address in your private network. |
| Port | Port used to connect to the origin. |
| Protocol | Protocol used to connect to the origin. |
| Hostname | Hostname used to access the origin. |
| Status | Origin's [approval status](#approval-status) |
| Users | Number of users who connected to the origin over the period of time specified on the Shadow IT Discovery overview page. |

{{</table-wrap>}}

3. Select a specific origin to view details.
4. Assign a new [approval status](#approval-status) according to your organization's preferences.

The origin's status will now be updated across charts and visualizations on the **Private Network** tab. You can block unapproved origins by creating a [Gateway policy](/cloudflare-one/policies/gateway/).

## Approval status

Within Shadow IT Discovery, applications are labeled according to their status. The default status for a discovered application is **Unreviewed**. Your organization can determine the status of each application and change their status at any time.

{{<Aside type="note">}}
Approval status does not impact a user's ability to access the application. Users are allowed or blocked according to your Access and Gateway policies.
{{</Aside>}}

{{<table-wrap>}}

| Status     | Description                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| Approved   | Applications that have been marked as sanctioned by your organization.                                 |
| Unapproved | Applications that have been marked as unsanctioned by your organization.                               |
| In review  | Applications in the process of being reviewed by your organization.                                    |
| Unreviewed | Unknown applications that are neither sanctioned nor being reviewed by your organization at this time. |

{{</table-wrap>}}
