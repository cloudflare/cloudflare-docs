---
pcx_content_type: concept
title: Private Network Discovery
weight: 2
---
# Private Network Discovery
The Private Network Discovery report gives you visibility over the users and applications that live on you private network. This information enables you to create identity and device-driven Zero Trust policies in Cloudflare Zero Trust, so that you can have control over the security of your private network.

On the Private Network Discovery report, you can gather information on what applications are accessed in your private network and who accessed it. You can also change an application's status according to your organization’s preferences. The default status for discovered origins is Unreviewed. The page also gives you overview metrics of the data it collects.

Private Network Discovery can be found under **Analytics > Access** in the **Cloudflare Zero Trust** dashboard.

![Private Newtork Discovery](/cloudflare-one/static/documentation/private-net-discovery/private-network-discovery.png)

## Private Network View
To see an in-depth breakdown of private network origins your users have visited, select **Review all** in the **Private Network Discovery** chart. The discovered origins that appear on this page are defined is unique combinations of IP address, port, protocol, and virtual network. From this page, you can search for a specific origin, search using filters ,or you can select **View** to see a full profile for that application.

![Private Newtork Report](/cloudflare-one/static/documentation/private-net-discovery/private-network-report.png)

- **IP address**. This field shows each IP address in your private network.
- **Port**. This field shows the port that the origin uses.
Protocol. This field shows what Internet Protocol is used for this address.
- **Hostname**. This field shows the host name used to access this application.
- **Access**. This field shows whether the application is currently assigned to an Access application and if so which one.
Status. This field shows an application's status.
- **Users**. This field shows how many users have connected to the origin over the period of time you have specified in the Private Network Discovery overview page. 

## Application Status
Within Shadow IT Discovery, applications are labeled according to their status. Your organization can determine the status of each application, and decide to change it at any point in time. This is a list of possible values for the status field:

{{<table-wrap>}}

| Status         | Description                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| **Approved**   | Applications that have been marked as sanctioned by your organization.                                 |
| **Unapproved** | Applications that have been marked as unsanctioned by your organization.                               |
| **In review**  | Applications in the process of being reviewed by your organization.                                    |
| **Unreviewed** | Unknown applications that are neither sanctioned nor being reviewed by your organization at this time. |

{{</table-wrap>}}

### Change an application's status
You may need to update an application’s status based on your organization’s preferences. To change an application’s status:

1. From the **Application profile view**, select the status button under the application IP address.
![Private Newtork app status](/cloudflare-one/static/documentation/private-net-discovery/change-app-status.png)
1. Select the desired status to assign to your application.

The application’s status will now be updated across charts and visualizations within Private Network Discovery.

### Change the status for multiple applications
To change the status of multiple applications to Approved, Unapproved, In review or Unreviewed at the same time:

1. From the **Private Network view**, select the checkboxes of all applications for which you would like to change the status.

1. Click **Update Status**.

1. Select the status you want to assign to your applications.

Each application’s status will now be updated across charts and visualizations within Shadow IT Discovery.