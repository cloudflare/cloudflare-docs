---
pcx_content_type: how-to
title: Create in the dashboard
weight: 6
meta:
  title: Create Bulk Redirects in the dashboard
---

# Create Bulk Redirects in the dashboard

To create Bulk Redirects in the Cloudflare dashboard you must:

1. Create a Bulk Redirect List with one or more URL redirects.
2. Create a Bulk Redirect Rule to enable the URL redirects in the list.

{{<render file="url-forwarding/_requires-proxied-site.md" withParameters="Bulk Redirects">}}

## 1. Create a Bulk Redirect List

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to Account Home > **Bulk Redirects**.
3. Under **Bulk Redirect Lists**, select **Create Bulk Redirect List**.
4. Enter a list name and description, and select **Next**.

5. You can import a CSV file containing several URL redirects or enter URL redirects one at a time in the dashboard.

    {{<details header="Import a CSV file">}}

1. Drag and drop a CSV file containing URL redirects or select **browse** and select a CSV file. For more information on the file format, refer to [CSV file format](/rules/url-forwarding/bulk-redirects/reference/csv-file-format/).

2. The dashboard will display the URL redirects that were successfully imported from the file. You can manually adjust the displayed records or add/remove URL redirects before proceeding.

3. Select **Next**.

    {{</details>}}

    {{<details header="Add URL redirects manually">}}

1. Select **Or, manually add URL redirects**.

2. Enter the URL redirects you wish to add to the list. You must enter at least the following three fields: **Source URL**, **Target URL**, and **Status**. To set additional options, expand **Edit parameters**.

3. Add more URL redirects, if required.

4. Select **Next**.

    {{</details>}}

6. Review and edit the URL redirects you imported or created, and select **Next**.
7. Select **Continue to Redirect Rules** to go to the rule creation page, and follow the instructions in the next section. You must create a Bulk Redirect Rule to enable the URL redirects you defined.

{{<Aside type="note" header="Notes">}}
{{<render productFolder="fundamentals" file="_lists-import-notes.md">}}
{{</Aside>}}

## 2. Create a Bulk Redirect Rule

1. (Optional) If you are not using the Bulk Redirect List creation wizard according to the instructions in the previous section:
    1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    2. Go to Account Home > **Bulk Redirects**.
    3. Select **Create Bulk Redirect Rule**.

2. In **Rule name**, enter a descriptive name for the rule.
3. Select the Bulk Redirect List you previously created.
4. (Optional) If necessary, select **Or use the expression editor** to edit the [rule expression](/rules/url-forwarding/bulk-redirects/concepts/#expression) or the [rule key](/rules/url-forwarding/bulk-redirects/concepts/#key).
5. To save and deploy the Bulk Redirect Rule, select **Save and Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
