---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

You can use AND and OR conditionals to build complex policies. AND conditionals will check if users meet all of the criteria, while OR conditionals will check if users meet one of the criteria.

The OR operator will only work with conditions of the same expression type. For example, you cannot compare conditions in **Traffic** with conditions in $1.
