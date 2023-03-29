---
pcx_content_type: concept
title: Shadow IT Discovery
weight: 2
---

# Shadow IT Discovery

The Shadow IT Discovery page provides visibility into the SaaS applications and private network applications your end users are visiting. This information enables you to create identity and device-driven Zero Trust policies, so that you can have control over the security of your users and data.

To view Shadow IT Discovery, go to **Analytics > Access**. You will see information on what applications are accessed and who accessed them. The page also displays metrics such as who your top connected users are, how many applications have been accessed, and how many application logins have failed over a certain period of time.

## SaaS applications

To see an in-depth breakdown of SaaS applications your users have visited, go to **Access** > **Analytics** > **SaaS** and select **Review all**.

{{<table-wrap>}}
| Field       | Description |
| ------------| ----------- |
| Application | SaaS application's name and logo.   |
| Application type |[Application type](/cloudflare-one/policies/filtering/application-app-types/#app-types) assigned by Cloudflare Zero Trust. |
| Status | Application's [review status](#application-status). |
| Secured | Whether the application is currently secured behind Cloudflare Access. |
| Users  |  Number of users who have connected to the application over the period of time specified on the Shadow IT Discovery overview page. |
{{</table-wrap>}}

## Private network applications

To see an in-depth breakdown of private network applications your users have visited, go to **Access** > **Analytics** > **Private Network** and select **Review all**. The discovered applications that appear on this page are defined by unique combinations of the origin's IP address, port, protocol, and virtual network.

![Private Newtork Report](/cloudflare-one/static/documentation/private-net-discovery/private-network-report.png)

{{<table-wrap>}}
| Field       | Description |
| ------------| ----------- |
| IP address | Origin's IP address in your private network.   |
| Port       | Port that the origin uses.           |
| Protocol   | Protocol used to connect to the TCP or UDP. |
| Hostname   | Hostname used to access the application.           |
| Access     | Whether the origin is currently assigned to an Access application and if so which one.           |
| Status     | Application's [review status](#application-status).        |
| Users      | Number of users who have connected to the application over the period of time specified on the Shadow IT Discovery overview page.            |

{{</table-wrap>}}

## Application status

Within Shadow IT Discovery, applications are labeled according to their status. The default status for discovered origins is **Unreviewed**. Your organization can determine the status of each application, and decide to change it at any point in time.

{{<table-wrap>}}

| Status         | Description   |
| -------------- | ------------- |
| Approved  | Applications that have been marked as sanctioned by your organization.                                 |
| Unapproved | Applications that have been marked as unsanctioned by your organization.                               |
| In review  | Applications in the process of being reviewed by your organization.                                    |
| Unreviewed | Unknown applications that are neither sanctioned nor being reviewed by your organization at this time. |

{{</table-wrap>}}

### Change an application's status

You may need to update an application's status based on your organization's preferences. To change an application's status:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Analytics** > **Access**.
2. Select either **Private Network** or **SaaS** depending on the type of application.
3. In the **Unique application users** card, select **Review all**.
4. Select the checkbox for the application you want to update.
5. Select **Action** and choose a new status.

The application's status will now be updated across charts and visualizations within Shadow IT Discovery.
