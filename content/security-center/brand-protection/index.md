---
pcx_content_type: concept
title: Brand Protection (beta)
weight: 7
---

{{<heading-pill style="beta">}} Brand Protection {{</heading-pill>}}

{{<Aside type="note">}}

While the Brand Protection tool is in beta, you will need to request access by filling in the [sign-up form](http://cloudflare.com/lp/brandprotection).

{{</Aside>}}

{{<render file="_brand-protection-definition.md">}}

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

## Logo queries

To set up a new logo query:

1. Go to **Security Center** > **Monitor Images** and select **Add logo**.
2. Add a name for your query and upload your logo. Only the `.png`, `.jpeg`, and `.jpg` file extensions are supported.
3. Select **Save logo**.

The browser will return to the **Monitor Images** overview page, where you can access your query and configure notifications.


## Investigate a query

To investigate a query:

1. Go to the **Monitored strings** or **Monitor Logos** section to view all your queries.
2. Select a monitored query to inspect all the domains that matched your query.
3. Next to the domain, select **Domain** or **URL**. This will trigger a search on the [**Investigate**](/security-center/investigate/) section in a separate tab. 
4. In this section, you have the **Domain overview**, the **WHOIS** section that provides details about the date the domain was created, registrant and nameservers, and the **Domain history** that provides information on the domain category and when it was last changed. Refer to [Investigate threats](/security-center/investigate/investigate-threats/) for more details.

## Brand Protection Alerts

{{<render file="_brand-protection-alerts.md">}}

To set a Brand Protection Alert:

1. Go to the **Monitored queries** section and select the three dots in front of the query for which you would like to create notifications.
2. From the dropdown, select _Create notification_ to receive an immediate notification once Cloudflare detects that a newly registered domain matches your query, or _Create digest notification_ to run your query every 24 hours.
3. You will be taken to the **Notifications** section in the sidebar, to configure your Brand Protection Alert.

    {{<Aside type="note">}}
You can also set up the alerts from your [Notifications](/notifications/) menu.
    {{</Aside>}}

4. Create a notification name, add a description (optional), add a Webhook, and enter a notification email. You can add multiple email addresses.
5. Select **Save**.

Manage your notifications in the **All notifications** tab. You can disable, edit, delete, or test them. 

## Limitations

- While this product is in beta, all Enterprise customers and Cloudforce One subscribers have access to Brand Protection. Enterprise customers are entitled to one saved query per Enterprise zone on their account.
- You may only use the Brand Protection search tools to search for domains that may be attempting to impersonate your brand or a brand that has authorized you to conduct such search on its behalf.