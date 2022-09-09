---
pcx_content_type: how-to
title: Lists
weight: 11
---

# Lists

{{<Aside>}}
Your lists can include up to 5,000 entries for Enterprise subscriptions and 1,000 for Standard subscriptions. A CSV file containing a list of URLs or hostnames must be smaller than 2 MB.
{{</Aside>}}

With Cloudflare Zero Trust, you can create lists of URLs, hostnames, or other entries to reference when creating [Secure Web Gateway policies](/cloudflare-one/policies/filtering/). This allows you to quickly create rules that match and take actions against several items at once.

You can create a list by:

- [Uploading a list of entries](#creating-a-list-from-a-csv-file)
- [Manually creating a list of entries](#creating-a-manual-list)

## Create a list from a CSV file

If you would like to test how this feature works, here is a [sample CSV file](/cloudflare-one/static/documentation/list-test.csv) of URLs. 
Each line should be a single entry, no trailing whitespace is allowed, CRLF (Windows) and LF (Unix) line endings are valid.
You can upload it to the Zero Trust dashboard by following the instructions below:

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Lists**.
2. Click **Upload CSV**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Drag and drop a file into the **CSV file** window, or click **Select a file**.
5. Click **Create**.

Your list will now appear in the **Lists** page.

## Create a manual list

1. On the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **My Team** > **Lists**.
2. Click **Create manual list**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Enter your list element manually into the **Add entry** field and click **Add**.
5. Click **Save**.

## Edit a list

1. In the **Lists** page, locate the list you want to edit.

2. Click **Edit**. This will allow you to:

    - Edit list name and description by clicking on the three-dots menu to the right of your list's name.
    - Delete the list by clicking on the three-dots menu to the right of your list's name.
    - Delete individual entries.
    - Manually add entries to your list.

3. Once you have edited your list, click **Save**.
