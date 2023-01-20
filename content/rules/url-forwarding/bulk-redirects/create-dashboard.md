---
pcx_content_type: how-to
title: Create in the dashboard
weight: 6
meta:
  title: Create Bulk Redirects in the dashboard
---

# Create Bulk Redirects in the dashboard

To create Bulk Redirects in the Cloudflare dashboard you must:

1. Create a Bulk Redirect List.
2. Add URL Redirects to the list created in step 1.
3. Create a Bulk Redirect Rule to enable the URL Redirects in the list.

## 1. Create a Bulk Redirect List

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** > **Configurations**, and then select **Lists**.
4. Select **Create new list**.
5. Enter a list name and description, and select _Redirect_ as the content type.
6. Select **Create**.

## 2. Add URL Redirects to the list

You can enter URL Redirects one at a time in the dashboard, or import a CSV file containing several URL Redirects.

### Add the URL Redirects manually

1. Under **Add items to list**, enter the URL Redirects you wish to add to the list.

    You must enter at least the following three fields: **Source URL**, **Target URL**, and **Status**. To set additional options, expand **Edit Parameters**.

2. Add more URL Redirects, if required.

3. Select **Add to list**.

### Import a CSV file with URL Redirects

Instead of adding URL Redirects manually, you can upload a CSV file with the list of redirects. For more information on the file format, refer to the [CSV file format](/rules/url-forwarding/bulk-redirects/reference/csv-file-format/).

1. Select **Upload CSV** and select the CSV file you wish to upload.
2. The dashboard will display the URL Redirects that were successfully imported from the file. You can manually adjust the displayed records or add/remove URL Redirects before proceeding.
3. Select **Add to list**.

## 3. Create a Bulk Redirect Rule to enable the redirects in the list

1. Go to **Account Home** > **Bulk Redirects**.
2. Select **Create Bulk Redirect Rule**.
3. In **Rule name**, enter a descriptive name for the rule.
4. Select the Bulk Redirect List you previously created.
5. (Optional) If necessary, select **Or use the expression editor** to edit the [rule expression](/rules/url-forwarding/bulk-redirects/concepts/#expression) or the [rule key](/rules/url-forwarding/bulk-redirects/concepts/#key).
6. To save and deploy the Bulk Redirect Rule, select **Save and Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
