---
_build:
  publishResources: false
  render: never
  list: never
---

Operators are the way Gateway matches traffic to a selector.  When you choose a **Selector** in the dashboard policy builder, the **Operator** dropdown menu will display the available options for that selector.

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  in list              |  in a pre-defined [list](/cloudflare-one/policies/filtering/lists/) of entries|
|  not in list          |  not in a pre-defined [list](/cloudflare-one/policies/filtering/lists/) of entries |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |
|  greater than         |  exceeds the defined number |
|  greater than or equal to  | exceeds or equals the defined number   |
|  less than            |  below the defined number |
|  less than or equal to  | below or equals the defined number |
