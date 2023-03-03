---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

<div class="special-class" markdown="1">

You can use AND and OR logical operators to build complex policies.

The **And** logical operator checks if users match all of the conditions in the group, while the **Or** logical operator checks if users match any of the conditions in the group.

The **Or** operator will only work with conditions of the same expression type. For example, you cannot compare conditions in **Traffic** with conditions in $1.

</div>
