---
order: 1
pcx-content-type: concept
hidden: true
---

# Shadow IT

The Cloudflare for Teams Shadow IT Analytics page gives you visibility into which SaaS applications your end users are using. This enables you to set the appropriate Zero Trust or Secure Web Gateway policies in Cloudflare for Teams, so that you can have control over the security of your users and data. In this report, you will get a high-level overview of user activity per application. You will also be able to check an [application’s status](#application-status).

You can find Shadow IT Report under **Analytics > Access**.

## Shadow IT view

Click on **View more** next to *Shadow IT Discovery* to see an in-depth breakdown of SaaS applications which have been visited by your users.

### Application type

For a list of application types and their definitions, see the [application types documentation](/policies/filtering/http-policies/application-app-types#app-types).

### Application status

Within Shadow IT Report, applications are labeled according to their status:

| Status | Description |
| -------- | --------------- |
| Approved | Applications that have been marked as sanctioned by your organization. |
| Unapproved | Applications that have been marked as unsanctioned by your organization. |
| In review | Applications in the process of being reviewed by your organization. |
| Unreviewed | Unknown applications that are neither sanctioned nor being reviewed by your organization at this time. |

## Application profile

To view details about a specific application, or to change that application’s status, click **View** in the Shadow IT application table. This will open up the application’s profile, where you can check whether the application has been secured by Access, as well as its application type and other data.

To change an application’s status, click on the status right underneath the application name, and choose the status you would like to assign to the application.

