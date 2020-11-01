---
order: 350
---

# Manage lists

## Create a Firewall Rules list

To create a list, follow these steps:

1. In the **Lists** interface, click **Create new list**.

  The **Create new list** page displays.

  ![Create new list](../../images/lists-create-new.png)

1. Enter a name for your list, observing the following guidelines:

   - Use only lowercase letters, numbers and the underscore (`_`) character in the name. A valid name satisfies this regular expression:

     `^[a-z0-9_]+$`

   - The maximum length for a list name is 50 characters.
   - Use a descriptive name for your list so that the list is informative in the context of a firewall rule expression.

1. Enter a description (optional). The maximum length for the description is 500 characters. There are no character constraints for the description field.

1. Click **Create**.

The **Add items to list** page displays.
![Add items to list](../../images/lists-add-items-page.png)

To populate your list, see [_Use Rules Lists: Add items to a list_](/cf-dashboard/rules-lists/manage-items/#add-items-to-a-list).

## Delete a list

<Aside type='note' header='Note'>

You can only delete a list when there are no firewall rules (enabled or disabled) that reference the list.

</Aside>

To delete a Firewall Rules list, follow these steps:

1. Navigate to the **Configurations > Lists** page for your Cloudflare account.

1. Hover your pointer over the **Delete** button associated with the list you want to delete.

   - When the list is used in a firewall rule, a tooltip displays with notification that you cannot delete the list:

     ![Cannot Delete lists](../../images/lists-cannot-delete.png)

   - When the list is not used in a firewall rule, **Delete** link highlights, indicating you can delete the list.

1. Click **Delete**.

1. In the confirmation dialog, click **Delete** to confirm the operation.

The **Lists** card displays the updated collection of lists.

## Edit a list

You can add and remove items from a list, but you cannot change the list name or type.

For more, see [_Use Rules Lists: Manage list items (IP addresses)_](/cf-dashboard/rules-lists/manage-items/#delete-items-from-a-list).
