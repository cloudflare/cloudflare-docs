---
pcx_content_type: concept
title: Brand Protection (beta)
weight: 7
---

{{<beta>}} Brand Protection {{</beta>}}

{{<Aside type="note">}}

While the Brand Protection tool is in beta, you will need to request access by filling in the [sign-up form](http://cloudflare.com/lp/brandprotection).

{{</Aside>}}

Common misspellings (`cloudfalre.com`) and concatenation of services (`cloudflare-okta.com`) are often registered by attackers to trick unsuspecting victims into submitting private information such as passwords. Brand Protection gives you the ability to search for new domains that may be attempting to impersonate your brand. Our system allows you to save search queries that run continuously and alert you if any new domains match those queries.

## Domain search

To start searching for new domains that might be trying to impersonate your brand:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Security Center** > **Brand Protection**.
3. Provide a name for your query.
4. In **Match against**, write the name of the domain that you want the query to match. You have the ability to add multiple brand phrases on the same query, and the results will generate matches for all of those.
5. In the **Max distance** dropdown, select from `0-3` the number of characters the results can differ from your domain.

    {{<Aside type="note">}}
If a brand phrase or search term has less than five characters, you can only choose a max distance of `0` (zero).
    {{</Aside>}}

6. Select **Apply**. This will create a preview of the most recent results matching your query.
7. You can select **Save query** to monitor it in the future and perform other actions, such as delete, clone and set up alerts, according to your paid plan limits.

In the section **Monitored queries**, you can check all the queries that you selected to monitor. You can delete, clone, or create notifications for a query. Refer to [Brand Protection Alerts](#brand-protection-alerts) to set up notifications.

## Investigate a query

To investigate a query:

1. Go to the **Monitored queries** section to view all your queries.
2. Select a monitored query to inspect all the domains that matched your query.
3. Next to the domain, select **Investigate**. This will take you to the **Investigate** section in the sidebar.
4. In this section, you have the **Domain overview**, the **WHOIS** section that provides details about the date the domain was created, registrant and nameservers, and the **Domain history** that provides information on the domain category and when it was last changed. Refer to [Domain categories](/cloudflare-one/policies/gateway/domain-categories/#security-risk-subcategories) for more details.

## Brand Protection Alerts

Brand Protection works with Cloudflare’s ANS (Alerts Notification Service) to provide configurable alerts when new domains are detected. 

Any matches that are found during the new domain search are then inserted into an internal alerts table which triggers an alert for the user. This allows you to receive real-time notifications and take immediate action to investigate and potentially block any suspicious domains that may be attempting to impersonate your brand.

To set a Brand Protection Alert:

1. Go to the **Monitored queries** section and select the three dots in front of the query for which you would like to create notifications.
2. From the dropdown, select _Create notification_ to receive an immediate notification once Cloudflare detects that a newly registered domain matches your query, or _Create digest notification_ to run your query every 24 hours.
3. You will be taken to the **Notifications** section in the sidebar, to configure your Brand Protection Alert.

    {{<Aside type="note">}}
You can also set up the alerts from your [Notifications](/fundamentals/notifications/) menu.
    {{</Aside>}}

4. Create a notification name, add a description (optional), add a Webhook, and enter a notification email. You can add multiple email addresses.
5. Select **Save**.

Manage your notifications in the **All notifications** tab. You can disable, edit, delete, or test them. 

## Limitations

While this product is in beta, all Cloudflare paid plans have access to the functionality with limits according to the plans. Professional and Business customers have access to a limited number of private scans and on-demand searches, while Enterprise customers and Cloudforce One subscribers will have higher limits and the ability to save queries and create notifications for when there are new domain matches.
