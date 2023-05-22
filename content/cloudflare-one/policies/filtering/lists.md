---
pcx_content_type: how-to
title: Lists
weight: 13
---

# Lists

{{<Aside>}}
Your lists can include up to 1,000 entries for Standard plans and 5,000 for Enterprise plans. An uploaded CSV file must be smaller than 2 MB.
{{</Aside>}}

With Cloudflare Zero Trust, you can create lists of URLs, hostnames, or other entries to reference when creating [Gateway policies](/cloudflare-one/policies/filtering/) or [Access policies](/cloudflare-one/policies/access/). This allows you to quickly create rules that match and take actions against several items at once.

Lists cannot have duplicate entries. Because hostnames are converted to [Punycode](https://www.rfc-editor.org/rfc/rfc3492.txt), multiple list entries that convert to the same string will count as duplicates. For example, `éxàmple.com` converts to `xn—xmple-rqa5d.com`, so including both `éxàmple.com` and `xn—xmple-rqa5d.com` in a list will result in an error.

You can create a list by:

- [Uploading a list of entries](#create-a-list-from-a-csv-file)
- [Manually creating a list of entries](#create-a-manual-list)

## Create a list from a CSV file

If you would like to test how this feature works, here is a [sample CSV file](/cloudflare-one/static/documentation/list-test.csv) of URLs. When formatting the CSV:

- Each line should be a single entry.
- Trailing whitespaces are not allowed.
- CRLF (Windows) and LF (Unix) line endings are valid.

To upload the list to Zero Trust:

1. In [Zero Trust](https://one.dash.cloudflare.com), navigate to **My Team** > **Lists**.
2. Select **Upload CSV**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Drag and drop a file into the **CSV file** window, or select a file.
5. Select **Create**.

Your list will now appear in the **Lists** page.

## Create a manual list

1. In [Zero Trust](https://one.dash.cloudflare.com), navigate to **My Team** > **Lists**.
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
