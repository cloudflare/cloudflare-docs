---
pcx_content_type: how-to
title: Create in the dashboard
weight: 5
---

# Create a list in the dashboard

To create a list, follow these steps:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and select your account.

2. Go to Account Home > **Manage Account** > **Configurations**, and then select **Lists**.

1. Select **Create new list**.

    ![Entering a name and description for a new IP List in the Create new list page of the Cloudflare dashboard](/fundamentals/static/images/lists/lists-create-new.png)

2. Enter a name for your list, observing the [list name guidelines](/fundamentals/global-configurations/lists/#list-names).

3. (Optional) Enter a description for the list, with a maximum length of 500 characters.

4. For **Content type**, select the [type of list](/fundamentals/global-configurations/lists/#list-types) you are creating.

5.  Select **Create**.

6. Follow the instructions in the next section to add items to the list.

## Add items to a list

1. (Optional) If you are adding items to an existing list:

    1. Go to Account Home > **Manage Account** > **Configurations** > **Lists**.
    2. Select **Edit** next to the list you want to edit.

2. Select **Add items**.

3. To [add items to the list manually](#add-items-to-a-list-manually), use the available text inputs on the page.

4. To [add items using a CSV file](#add-items-using-a-csv-file), select **Upload CSV**.

### Add items to a list manually

1. In the **Add items to list** page, enter values for the different fields (the exact fields depend on the list type).

    As you enter information into a text input, a new row of inputs displays below the current one. To delete any of the items that you have entered, select **X**.

2. Select **Add to list**.

### Add items using a CSV file

To add items to a list by uploading a CSV file:

1. In the **Add items to list** page, select **Upload CSV**.

2. Browse to the location of the CSV file, select the file, and then select **Open**. The displayed items in the page will include the items loaded from the CSV file.

    The exact CSV file format depends on the list type. Refer to the [documentation of the specific list type](/fundamentals/global-configurations/lists/#list-types) for details.

3. You can continue to edit the items in the list before adding them:

    - To delete any of the items you have entered, select **X**.
    - To add extra items manually, enter the information in the text inputs.

4. Select **Add to list**.

{{<Aside type="note" header="Notes">}}

- If you need to replace the entire contents of a list, format the data as an array and use the [Update all list items](https://developers.cloudflare.com/api/operations/lists-update-all-list-items) operation in the [Lists API](/fundamentals/global-configurations/lists/lists-api/endpoints/).
- When uploading a CSV file, keep in mind that duplicate data is treated as follows:
  - Items already in the list are updated from the CSV file.
  - Items in the CSV file that were not already in the list are added to the list.
- Uploading a CSV file will not remove existing items from a list.
{{</Aside>}}
