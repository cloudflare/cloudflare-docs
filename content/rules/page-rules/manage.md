---
pcx_content_type: how-to
title: Manage
meta:
    title: Manage | Page Rules
weight: 1
---

# Manage Page Rules

You can manage Page Rules in the Cloudflare dashboard or via API.

{{<render file="_page-rules-migration.md">}}

## Create a page rule

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a page rule in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Rules** > **Page Rules**.
3. Select **Create Page Rule**.
4. For **URL**, enter the URL or URL pattern that should match the rule ([more details about wildcard matching](/rules/page-rules/reference/wildcard-matching/)).
5. For **Pick a Setting**, select a [Cloudflare setting](/rules/page-rules/reference/settings/) to adjust. If desired, select **Add a Setting** to adjust multiple Cloudflare settings with the same rule.
6. In the **Order** dropdown, specify the desired order: _First, Last_ or _Custom_.
7. To save, select one of the following options:

    -   **Save as Draft** to save the rule and leave it disabled.
    -   **Save and Deploy Page Rule** to save the rule and enable it immediately.

For ideas about what rules you can create, refer to [recommended rules](/rules/page-rules/reference/recommended-rules/).

{{</tab>}}
{{<tab label="api" no-code="true">}}

To create a page rule using the API, send a [`POST` request](/api/operations/page-rules-create-a-page-rule).

You may also want to review the documentation on [wildcard matching](/rules/page-rules/reference/wildcard-matching/), [available settings](/rules/page-rules/reference/settings/), and [recommended rules](/rules/page-rules/reference/recommended-rules/).

{{</tab>}}
{{</tabs>}}

{{<Aside type="note" header="Notes">}}
- Page Rules require a [proxied DNS record](/dns/manage-dns-records/reference/proxied-dns-records) to work. Page Rules will not apply to subdomains that do not exist in DNS or are not being directed to Cloudflare.

- Cloudflare does not support non-ASCII characters — such as punycode/unicode domain — in Page Rules. Instead, you could URL-encode the string using [Punycode converter](https://www.punycoder.com/).
{{</Aside>}}

## Edit a page rule

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To edit a page rule in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Rules** > **Page Rules**.
3. For a specific rule:

    - To enable or disable the rule, select the on/off toggle.
    - To modify the URL pattern, settings, and order, select **Edit** (wrench icon). Then, enter the information you want to change.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To update one or more fields using the API, send a [`PATCH` request](/api/operations/page-rules-edit-a-page-rule).

To entirely replace the configuration of a page rule, send a [`PUT` request](/api/operations/page-rules-update-a-page-rule).

{{</tab>}}
{{</tabs>}}

## Delete a page rule

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To delete a page rule in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Rules** > **Page Rules**.
3. For a specific rule, select **X**. Then, select **Delete**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To delete a page rule using the API, send a [`DELETE` request](/api/operations/page-rules-delete-a-page-rule).

{{</tab>}}
{{</tabs>}}