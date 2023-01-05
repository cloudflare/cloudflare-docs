---
pcx_content_type: how-to
title: Work with lists
weight: 1
---

# Work with lists

## Create an IP List

To create an IP List, follow these steps:

1. In the **Lists** interface, select **Create new list**.

    ![Entering a name and description for a new IP List in the Create new list page of the Cloudflare dashboard](/firewall/static/lists-create-new.png)

1. Enter a name for your list, observing the following guidelines:

    - Use only lowercase letters, numbers and the underscore (`_`) character in the name. A valid name satisfies this regular expression:

          ^[a-z0-9_]+$

    - The maximum length for a list name is 50 characters.

    - Use a descriptive name for your list so that the list is informative in the context of a firewall rule expression.

2.  Enter a description (optional). The maximum length for the description is 500 characters. There are no character constraints for the description field.

3. For **Content type**, select _IP Address_.

4.  Select **Create**.

The **Add items to list** page displays. To populate your list, refer to [Use IP Lists: Add items to a list](/firewall/cf-dashboard/rules-lists/manage-items/#add-items-to-a-list).

## Delete a list

{{<Aside type="note" header="Note">}}

You can only delete a list when there are no firewall rules (enabled or disabled) that reference the list.

{{</Aside>}}

To delete an IP List, follow these steps:

1. In the Cloudflare dashboard, navigate to **Manage Account** > **Configurations** > **Lists**.

1. Hover your pointer over the **Delete** button associated with the list you want to delete.

    - When the list is used in a firewall rule, a tooltip displays with notification that you cannot delete the list:

      ![The Lists interface displaying an unavailable Delete operation because the corresponding list is still being used in two rule expressions](/firewall/static/lists-cannot-delete.png)

    - When the list is not used in a firewall rule, **Delete** link highlights, indicating you can delete the list.

1. Select **Delete**.

1. In the confirmation dialog, select **Delete** to complete the operation.

The **Lists** card displays the updated collection of lists.

## Edit a list

You can add and remove items from a list, but you cannot change the list name or type.

For more information, refer to [Manage IP List items](/firewall/cf-dashboard/rules-lists/manage-items/).
