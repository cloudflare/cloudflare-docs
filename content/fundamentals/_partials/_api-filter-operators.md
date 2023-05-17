---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1;;param2;;param3;;param4
---

{{<table-wrap>}}

| Operator | Name                     | Example                | Description                                                            | URL Encoded |
|----------|--------------------------|------------------------|------------------------------------------------------------------|-------------|
| `==`       | Equals                   | `$1==$2` | Return results where `$1` is exactly `$2`.            | `%3D%3D`      |
| `!=`       | Does not equal           | `$3!=$4`  | Return results where `$3` is different from `$4`.    | `!%3D`        |
| `>`        | Greater than             | `dimension>1000`        | Return results where a dimension is greater than `1000`.             | `%3E`         |
| `<`        | Less than                | `dimension<1000`        | Return results where a dimension is less than `1000`.              | `%3C`         |
| `>=`       | Greater than or equal to | `dimension>=1000`        | Return results where a dimension is greater than or equal to `1000`. | `%3E%3D`      |
| `<=`       | Less than or equal to    | `dimension<=1000`        | Return results where a dimension is less than or equal to `1000`.  | `%3C%3D`      |

{{</table-wrap>}}