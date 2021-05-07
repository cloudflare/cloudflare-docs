---
title: Filtering
order: 10
---

# Filtering

Filters constrain queries to a particular account or set of zones, requests by date, or those from a specific user agent, for example. Without filters, queries can suffer performance degradation, results can easily exceed supported bounds, and the data returned can be noisy.

### Filter Structure

The GraphQL filter is represented by the [GraphQL Input Object](https://graphql.github.io/graphql-spec/June2018/#sec-Input-Objects), which exposes Boolean algebra on nodes.

You can use filters as an argument on the following resources:

- zones
- accounts
- tables (data sets)

#### Zone filter

Allows querying zone-related data by zone ID (`zoneTag`).

```graphql
zones(filter: {zoneTag: "your Zone ID"}) {
    ...
}
```

The zone filter must conform to the following grammar:

```graphql
filter
    { zoneTag: t }
    { zoneTag_gt: t }
    { zoneTag_in: [t, ...] }
```

Compound filters (comma-separated, `AND`, `OR`) are not supported.

Use the `zoneTag: t` and `zoneTag_in: [t, ...]` forms when you know the zone IDs. Use the `zoneTag_gt: t` form with limits to traverse all zones if the zone IDs are not known. Zones always sort alphanumerically.

Omit the filter to get results for all zones (up to the supported limit).

#### Account filter

The account filter uses the same structure and rules as the zone filter, except that it uses the Account ID (`accountTag`) instead of the Zone ID (`zoneTag`).

You must specify an account filter when making an account-scoped query, and you cannot query multiple accounts simultaneously.

<Aside type="info" header="Info">

Network Analytics queries require an Account ID (`accountTag`) filter.
</Aside>

#### Table (data set) filter

Table filters require that you query at least one node. Use the `AND` operator to create and combine multi-node filters. Table filters also support the `OR` operator, which you must specify explicitly.

The following grammar describes the table filter, where `k` is the GraphQL node on which to filter and `op` is one of the supported operators for that node:

```graphql
filter
  { kvs }
kvs
  kv
  kv, kvs
kv
  k: v
  k_op: v
  AND: [filters]
  OR: [filters]
filters
  filter
  filter, filters
```

#### Operators

Operator support varies, depending on the node type and node name.

##### Common operators

The following operators are supported for all types:

| Operator | Comparison          |
| -------- | ------------------- |
| `gt`     | greater than        |
| `lt`     | less than           |
| `geq`    | greater or equal to |
| `leq`    | less or equal to    |
| `neq`    | not equal           |
| `in`     | in                  |

##### String operators

The `like` operator is available for string comparisons and supports the `%` character as a wildcard.

### Examples

#### General example

```graphql
{
  myQuery(
    filter: {
      clientCountry: "UK" # all objects having client country equal to "UK"
      datetime_gt: "2018-01-01T10:00:00Z" # all object having datetime greater than "2018-01-01T10:00:00Z"
    }
  )
}
```

#### Filter on a specific node

The following GraphQL example shows how to filter a specific node. The SQL equivalent follows.

##### GraphQL {#001}

```graphql
httpRequests1hGroups(filter: {datetime: "2018-01-01T10:00:00Z"}) {
    ...
}
```

##### SQL {#002}

```sql
WHERE datetime="2018-01-01T10:00:00Z"
  AND ((clientCountryName = "UK") OR (clientCountryName = "US"))
```

#### Filter on multiple fields

The following GraphQL example shows how to apply a filter to a multiple fields, in this case 2 datetime fields. The SQL equivalent follows.

##### GraphQL {#003}

```graphql
httpRequests1hGroups(filter: {datetime_gt: "2018-01-01T10:00:00Z", datetime_lt: "2018-01-01T11:00:00Z"}) {
    ...
}
```

##### SQL {#004}

```sql
WHERE (datetime > "2018-01-01T10:00:00Z") AND (datetime < "2018-01-01T10:00:00Z")
```

#### Filter using the `OR` operator

The following GraphQL example demonstrates using the `OR` operator in a filter. This `OR` operator filters for the value `US` or `UK` in the `clientCountryName` field.

##### GraphQL {#005}

```graphql
httpRequests1hGroups(filter: {
    datetime: "2018-01-01T10:00:00Z",
    OR:[{clientCountryName: "US"}, {clientCountryName: "UK"}]) {
    ...
}
```

##### SQL {#006}

```sql
WHERE datetime="2018-01-01T10:00:00Z"
  AND ((clientCountryName = "UK") OR (clientCountryName = "US"))
```

### Subqueries (advanced filters)

Subqueries are not currently supported. You can use two GraphQL queries as a workaround for this limitation.
