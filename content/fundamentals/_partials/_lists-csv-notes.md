---
_build:
  publishResources: false
  render: never
  list: never
---

List items uploaded via CSV file are handled in the following way:

- Items already in the list are updated from the CSV file.
- Items in the CSV file that were not already in the list are added to the list.
- Existing list items that are not in the CSV file are not be removed from the list.
