---
order: 5
pcx-content-type: how-to
---

# Create Bulk Redirects in the dashboard

To create Bulk Redirects in the Cloudflare dashboard you must:

1. Create a Bulk Redirect List.
1. Add URL Redirects to the list created in step 1.
1. Create a Bulk Redirect Rule to enable the URL Redirects in the list.

## 1. Create a Bulk Redirect List

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
1. Go to **Account Home** > **Bulk Redirects**.
1. Click **Create a new Bulk Redirects list**. Your browser will navigate to the **Lists** page.
1. Click **Create new list**.
1. Enter a list name and description, and select _Redirect_ as the content type.
1. Click **Create**.

## 2. Add URL Redirects to the list

You can enter URL Redirects one at a time in the dashboard, or import a CSV file containing several URL Redirects.

### Add the URL Redirects manually

1. Under **Add items to list**, enter the URL Redirects you wish to add to the list.

    You must enter at least the following three fields: **Source URL**, **Target URL**, and **Status**. To set additional options, expand **Edit Parameters**.

1. Add additional URL Redirects, if required.
1. Click **Add to list**.

### Import a CSV file with URL Redirects

Instead of adding URL Redirects manually, you can upload a CSV file with the list of redirects. For more information on the file format, refer to the [CSV file format](/bulk-redirects/reference/csv-file-format).

1. Click **Upload CSV** and select the CSV file you wish to upload.

1. The dashboard will display the URL Redirects that were successfully imported from the file. You can manually adjust the displayed records or add/remove URL Redirects before proceeding.

1. Click **Add to list**.

## 3. Create a Bulk Redirect Rule to enable the redirects in the list

1. Go to **Account Home** > **Bulk Redirects**.
1. Click **Create Bulk Redirects**.
1. Enter a rule description.
1. Select the Bulk Redirect List you previously created.
1. (Optional) If necessary, edit the rule expression or the list key.
1. To save and deploy the Bulk Redirect Rule, click **Save and Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.
