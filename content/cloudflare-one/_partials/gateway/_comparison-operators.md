---
_build:
  publishResources: false
  render: never
  list: never
---

Comparison operators are the way Gateway matches traffic to a selector. When you choose a **Selector** in the dashboard policy builder, the **Operator** dropdown menu will display the available options for that selector.

| Operator                 | Meaning                                                                          |
| ------------------------ | -------------------------------------------------------------------------------- |
| is                       | equals the defined value                                                         |
| is not                   | does not equal the defined value                                                 |
| in                       | matches at least one of the defined values                                       |
| not in                   | does not match any of the defined values                                         |
| in list                  | in a pre-defined [list](/cloudflare-one/policies/filtering/lists/) of values     |
| not in list              | not in a pre-defined [list](/cloudflare-one/policies/filtering/lists/) of values |
| matches regex            | regex evaluates to true                                                          |
| does not match regex     | regex evaluates to false                                                         |
| greater than             | exceeds the defined number                                                       |
| greater than or equal to | exceeds or equals the defined number                                             |
| less than                | below the defined number                                                         |
| less than or equal to    | below or equals the defined number                                               |
