---
title: Channel and Alliance Partners
pcx_content_type: navigation
weight: 7
---

# Channel and Alliance Partners

Area 1 Channel and Alliance partners have the option to set up accounts for themselves and their customers.

## Create accounts

Start by creating parent and child accounts.

### Create a parent account

Parent accounts are treated as containers with no services provisioned. User accounts created at the parent level will allow them to access any child account. 

{{<Aside type="note">}}This is only required for administrators that manage multiple accounts. For example, Managed Security Service Providers (MSSP) managing multiple customer accounts.{{</Aside>}}

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Delegated Accounts** > **Accounts**, select **Create new customer**.
4. Enter their information, and make sure you select _Parent_ in **Account Type**.
5. Select **Save**.

Your newly created account should show up in the list. If not, refresh the page.

### Create a child account

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Delegated Accounts** > **Accounts**, select the parent account where you want to create a child account.
4. Select **Create New customer**.
5. Enter their information, and make sure you select _Advantage_ in **Account Type**.
6. Scroll down to the **Email Traffic Related Information** section, and enter the information related to your email provider. The number to enter in **Looback Hops** will depend on your email configuration and where Area 1 is in the chain of events. Refer to [Inline deployment](/email-security/deployment/inline/) and [API deployment](/email-security/deployment/api/) for more information.
7. For **Daily Email Volume** and **Number of Email Users** make sure you enter the appropriate values for your organization.
8. Select **Save**.

## Create users and assign permissions

You can create users at both the parent and child account level. Users created at parent level will have access to all its child accounts. Users created at child level will only have access to the assigned child account.

Child accounts can [limit or disable](/email-security/account-setup/manage-parent-permissions/) the level of access allowed from their parent account.

If you modify the Delegated Access controls, make sure you create an administrator account in the child first.

To create an account at parent level or child level:

{{<render file="_add-user.md" withParameters="with a parent account or child account depending on what you are trying to create">}}

## Escalation contacts

You should add escalation contacts so Area 1 can send notifications regarding detection events and critical service related issues. Area 1 highly recommends that these contacts have both phone and email contacts.

Refer to [Escalation contacts](/email-security/account-setup/escalation-contacts/) for more information.

## Status alerts

Subscribe to incident status alerts [from Area 1](https://status.area1security.com/).

## Domains setup (inline/API)

Refer to the [setup options](/email-security/deployment/) for Area 1 to learn about the best way of deploying Area 1 in your organization. You can choose between two main setup architectures: 

- Inline deployment
- API deployment

With an [inline deployment](/email-security/deployment/inline/), Area 1 evaluates email messages before they reach a user’s inbox. When you choose an [API deployment](/email-security/deployment/api/), email messages only reach Area 1 after they have already reached a user’s inbox.

## Classification actions

Area 1 recommends that you quarantine `Malicious` and `SPAM` dispositions. You can configure this directly in [Office 365](/email-security/deployment/inline/setup/office-365-area1-mx/) and [Gsuite](/email-security/deployment/inline/setup/gsuite-area1-mx/), as well as [Area 1](/email-security/email-configuration/domains-and-routing/domains/).

## Message retraction

You can configure message retraction to take post-delivery actions against suspicious email messages. You can retract messages manually or automatically. Refer to [Retract settings](/email-security/email-configuration/retract-settings/) for more information.

## TLS enforcement for domains

To add additional TLS requirements for emails coming from certain domains, you can enforce higher levels of SSL/TLS inspection. Refer to [Partner Domains TLS](/email-security/email-configuration/domains-and-routing/partner-domains-tls/) for more information.

## Reports

You can subscribe to [daily and weekly email reports](https://horizon.area1security.com/settings/subscriptions/email-subscriptions), as well as [SIEM events](https://horizon.area1security.com/settings/email/routing/webhooks). For SIEM events, you will need to [configure your SIEM tool](/email-security/reporting/siem-integration/) into Area 1 first.

## Whitelisting and blocklisting senders

If you need to whitelist of blocklist senders, refer to [Allow and block lists](/email-security/email-configuration/lists/).

## Submitting false positives and false negatives

There are several ways of dealing with missed phish or messages flagged as such that are not. Refer to [Phish submissions](/email-security/email-configuration/phish-submissions/) to learn more.

## Best practices

Refer to the following pages to learn more:

1. [Business Email compromise (BEC)](/email-security/email-configuration/enhanced-detections/business-email-compromise/)
2. [Text add-ons](/email-security/email-configuration/email-policies/text-addons/)
3. [Search and reports](/email-security/reporting/)