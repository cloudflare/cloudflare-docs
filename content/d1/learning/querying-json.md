---
title: Querying JSON
pcx_content_type: concept
weight: 4
---

# Querying JSON

D1 has built-in support for querying and parsing JSON data stored within a database. This enables you to:

* Query paths within a stored JSON object - e.g. extracting the value of named key or array index directly, which is especially useful with larger JSON objects.
* Insert and/or replace values within an object or array,
* Expand the contents of a JSON object or array into multiple rows - e.g. for use as part of a `WHERE ... IN` predicate.

One of the biggest benefits to parsing JSON within D1 directly is that it can directly reduce the number of round-trips (queries) to your database. It reduces the cases where you have to read a JSON object into your application (1), parse it, and then write it back (2).

This allows you to more precisely query over data and reduce the result set your application needs to additionally parse and filter on.

## Types

JSON data is stored as a `TEXT` column in D1. JSON types follow the same [type conversion rules](/d1/platform/client-api/#type-conversion) as D1 in general, including:

* A JSON null is treated as a D1 `NULL`
* A JSON number is treated as an `INTEGER` or `REAL`
* Booleans are treated as `INTEGER` values: `true` as `1` and `false` as `0`
* Object and array values as `TEXT`

## Supported Functions

The following table outlines the JSON functions built into D1, as well as example usage.

* The `json` argument placeholder can be a JSON object, array, string, number or a null value.
* The `value` argument accepts string literals (only) and treats input as a string, even if it is well-formed JSON. The exception to this rule is when nesting `json_*` functions: the outer (wrapping) function will interpret the inner (wrapped) functions return value as JSON.
* The `path` argument accepts path-style traversal syntax - e.g. `$` to refer to the top-level object/array, `$.key1.key2` to refer to a nested object, and `$.key[2]` to index into an array.

| Function                                  | Description                                         | Example                 |
| ----------------------------------------- | --------------------------------------------------- | ----------------------- |
| `json(json)`                              | Validates the provided string is JSON and returns a minified version of that JSON object. | `json('{"hello":["world" ,"there"] }')` returns `{"hello":["world","there"]}`  |
| `json_array(value1, value2, value3, ...)` |                                                     |                         |
| `json_array_length(json)` - `json_array_length(json, path)` | 
| `json_extract(json, path)`                | Extract the value(s) at the given path using `$.path.to.value` syntax. | `json_extract('{"temp":"78.3", "sunset":"20:44"}', '$.temp')` returns `"78.3"` |
| `json -> path`                            | Extract the value(s) at the given path using path syntax and return it as JSON. |                         |
| `json ->> path`                           | Extract the value(s) at the given path using path syntax and return it as a SQL type. |                         |
| `json_insert(json, path, value)`          | Insert a value at the given path. Does not overwrite an existing value. |                         |
| `json_object(label1, value1, ...)`        | Accepts pairs of (keys, values) and returns a JSON object. | `json_object('temp', 45, 'wind_speed_mph', 13)` returns `{"temp":45,"wind_speed_mph":13}` |
| `json_patch(json1, json2)`                |                                                     |                         |
| `json_remove(json, path, ...)`            | Remove the key and value at the specified path. | `json_remove('[60,70,80,90]', '$[0]')` returns `70,80,90]` |
| `json_replace(json, path, value)`         | Insert a value at the given path. Overwrites an existing value, but does not create a new key if it doesn't exist. |                         |
| `json_set(json, path, value)`             | Insert a value at the given path. Overwrites an existing value. |                        |
| `json_type(json)` - `json_type(json, path)`|                                                    |                         |
| `json_valid(json)`                        | Returns 0 (false) for invalid JSON, and 1 (true) for valid JSON. | `json_valid(`{invalid:json})` returns `0` |
| `json_quote(value)`                       |                                                     |                         |
| `json_group_array(value)`                 |                                                     |                         |
| `json_group_object(value)`                |                                                     |                         |
| `json_each(json)` - `json_each(json, path)`|                                                     |                         |
| `json_tree(json)` - `json_tree(json, path)`|                                                     |                         |
 
The SQLite [JSON extension](https://www.sqlite.org/json1.html), on which D1 builds on, has additional usage examples.

## Error Handling

JSON functions will return a `malformed JSON` error when operating over data that isn't JSON and/or is not valid JSON. D1 considers valid JSON to be [RFC 7159](https://www.rfc-editor.org/rfc/rfc7159.txt) conformant.

In the following example, calling `json_extract` over a string (not valid JSON) will cause the query to return a `malformed JSON` error:

```sql
SELECT json_extract('not valid JSON: just a string', '$')
```
This will return an error:
```sh
ERROR 9015: SQL engine error: query error: Error code 1: SQL error or missing database (malformed
  JSON)`
```

## Example Usage

### Extracting values

There are three ways to extract a value from a JSON object in D1:

* The `json_extract()` function - e.g. `json_extract(text_column_containing_json, '$.path.to.value)`
* The `->` operator, which returns a JSON representation of the value
* The `->>` operator, which returns an SQL representation of the value

The `->` and `->>` operators functions both operate similarly to the same operators in PostgreSQL and MySQL/MariaDB.

Given the following JSON object in a column named `sensor_reading`, you can extract values from it directly.

```json
{
    "measurement": {
        "temp_f": "77.4",
        "aqi": [21, 42, 58],
        "o3": [18, 500],
        "wind_mph": "13",
        "location": "US-NY"
    }
}
```

```sql
-- Extract the temperature value
json_extract(sensor_reading, '$.measurement.temp_f')-- returns "77.4" as TEXT
```
```sql
-- Extract the maximum PM2.5 air quality reading
sensor_reading -> '$.measurement.aqi[3]' -- returns 58 as a JSON number
```
```sql
-- Extract the o3 (ozone) array in full
sensor_reading -\-> '$.measurement.o3' -- returns '[18, 500]' as TEXT
```

### Get the length of an array

You can get the length of a JSON array in two ways:

1. By calling `json_array(value)` directly
2. By calling `json_array(value, path)` to specify the array size of a 

For example, given the following JSON object stored in a column called `login_history`, I could get a count of the last logins directly:

```json
{
    "user_id": "abc12345",
    "previous_logins": ["2023-03-31T21:07:14-05:00", "2023-03-28T08:21:02-05:00", "2023-03-28T05:52:11-05:00"]
}
```

```sql
json_array(login_history, '$.previous_logins') --> returns 3 as an INTEGER
```

You can also use `json_array` as a predicate in a more complex query - e.g. `WHERE json_array(some_column, '$.path.to.value') >= 5`.
