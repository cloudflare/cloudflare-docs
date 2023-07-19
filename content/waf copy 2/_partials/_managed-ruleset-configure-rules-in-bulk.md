---
_build:
  publishResources: false
  render: never
  list: never
---

To configure several rules at once in the Browse Managed Ruleset interface:

1. Enter search terms in the available input to find the rules you want to configure. You can search for tags.

    ![Example of filtering rules by the wordpress tag in the Browse rules page](/images/waf/waf-selected-tag.png)

2. In the results list, select the checkboxes for all the rules you want to configure.

    Alternatively, select a tag name under the search input to filter the rules with that tag, and then select the checkboxes for the rules you want to configure.

3. Update one or more fields for the selected rules using the drop-down lists displayed in the top right corner of the table.

    ![Selecting all rules in a page displays additional drop-down lists above the table to override the behavior of several rules at once.](/images/waf/waf-modify-selected-rules.png)

4. Select **Next**.

5. If you selected a tag, a dialog appears asking you if any new rules with the selected tag should be configured with the field values you selected.

    * Select **Do not apply to new rules** to apply your configurations to the selected rules only.
    * Select **Apply to new rules** if you want to apply your configurations to any new rules with the select tag.

6. Select **Save**.
