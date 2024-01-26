---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

To evaluate multiple conditions in an expression, select the **And** logical operator. These expressions can be compared further with the **Or** logical operator.

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

The **Or** operator will only work with conditions in the same expression group. For example, you cannot compare conditions in **Traffic** with conditions in $1.
