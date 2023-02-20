---
pcx_content_type: how-to
title: Lists
weight: 11
---

# Lists

{{<Aside>}}
Your lists can include up to 5,000 entries for Enterprise subscriptions and 1,000 for Standard subscriptions. An uploaded CSV file must be smaller than 2 MB.
{{</Aside>}}

With Cloudflare Zero Trust, you can create lists of URLs, hostnames, or other entries to reference when creating [Gateway policies](/cloudflare-one/policies/filtering/) or [Access policies](/cloudflare-one/policies/access/). This allows you to quickly create rules that match and take actions against several items at once.

You can create a list by:

- [Uploading a list of entries](#creating-a-list-from-a-csv-file)
- [Manually creating a list of entries](#creating-a-manual-list)

## Create a list from a CSV file

If you would like to test how this feature works, here is a [sample CSV file](/cloudflare-one/static/documentation/list-test.csv) of URLs. When formatting the CSV:

- Each line should be a single entry.
- Trailing whitespaces are not allowed.
- CRLF (Windows) and LF (Unix) line endings are valid.

To upload the list to the Zero Trust dashboard:

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Lists**.
2. Select **Upload CSV**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Drag and drop a file into the **CSV file** window, or select a file.
5. Select **Create**.

Your list will now appear in the **Lists** page.

## Create a manual list

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Lists**.
2. Select **Create manual list**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Enter your list element manually into the **Add entry** field and select **Add**.
5. Select **Save**.

## Edit a list

1. In the **Lists** page, locate the list you want to edit.

2. Select **Edit**. This will allow you to:

    - Edit list name and description by selecting on the three-dots menu to the right of your list's name.
    - Delete the list by selecting the three-dots menu to the right of your list's name.
    - Delete individual entries.
    - Manually add entries to your list.

3. Once you have edited your list, select **Save**.
