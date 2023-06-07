---
title: Query JSON
pcx_content_type: concept
weight: 4
---

# Query JSON

D1 has built-in support for querying and parsing JSON data stored within a database. This enables you to:

* Query paths within a stored JSON object - for example, extracting the value of named key or array index directly, which is especially useful with larger JSON objects.
* Insert and/or replace values within an object or array.
* Expand the contents of a JSON object or array into multiple rows - for example, for use as part of a `WHERE ... IN` predicate.

One of the biggest benefits to parsing JSON within D1 directly is that it can directly reduce the number of round-trips (queries) to your database. It reduces the cases where you have to read a JSON object into your application (1), parse it, and then write it back (2).

This allows you to more precisely query over data and reduce the result set your application needs to additionally parse and filter on.

## Types

JSON data is stored as a `TEXT` column in D1. JSON types follow the same [type conversion rules](/d1/platform/client-api/#type-conversion) as D1 in general, including:

* A JSON null is treated as a D1 `NULL`.
* A JSON number is treated as an `INTEGER` or `REAL`.
* Booleans are treated as `INTEGER` values: `true` as `1` and `false` as `0`.
* Object and array values as `TEXT`.

## Supported functions

The following table outlines the JSON functions built into D1 and example usage.

* The `json` argument placeholder can be a JSON object, array, string, number or a null value.
* The `value` argument accepts string literals (only) and treats input as a string, even if it is well-formed JSON. The exception to this rule is when nesting `json_*` functions: the outer (wrapping) function will interpret the inner (wrapped) functions return value as JSON.
* The `path` argument accepts path-style traversal syntax - for example, `$` to refer to the top-level object/array, `$.key1.key2` to refer to a nested object, and `$.key[2]` to index into an array.

| Function                                  | Description                                         | Example                 |
| ----------------------------------------- | --------------------------------------------------- | ----------------------- |
| `json(json)`                              | Validates the provided string is JSON and returns a minified version of that JSON object. | `json('{"hello":["world" ,"there"] }')` returns `{"hello":["world","there"]}`  |
| `json_array(value1, value2, value3, ...)` | Return a JSON array from the values. | `json_array(1, 2, 3)` returns `[1, 2, 3]` |
| `json_array_length(json)` - `json_array_length(json, path)` | Return the length of the JSON array | `json_array_length('{"data":["x", "y", "z"]}', '$.data')` returns `3` |
| `json_extract(json, path)`                | Extract the value(s) at the given path using `$.path.to.value` syntax. | `json_extract('{"temp":"78.3", "sunset":"20:44"}', '$.temp')` returns `"78.3"` |
| `json -> path`                            | Extract the value(s) at the given path using path syntax and return it as JSON. |                         |
| `json ->> path`                           | Extract the value(s) at the given path using path syntax and return it as a SQL type. |                         |
| `json_insert(json, path, value)`          | Insert a value at the given path. Does not overwrite an existing value. |                         |
| `json_object(label1, value1, ...)`        | Accepts pairs of (keys, values) and returns a JSON object. | `json_object('temp', 45, 'wind_speed_mph', 13)` returns `{"temp":45,"wind_speed_mph":13}` |
| `json_patch(target, patch)`                | Uses a JSON [MergePatch](https://tools.ietf.org/html/rfc7396) approach to merge the provided patch into the target JSON object. |                        |
| `json_remove(json, path, ...)`            | Remove the key and value at the specified path. | `json_remove('[60,70,80,90]', '$[0]')` returns `70,80,90]` |
| `json_replace(json, path, value)`         | Insert a value at the given path. Overwrites an existing value, but does not create a new key if it doesn't exist. |                         |
| `json_set(json, path, value)`             | Insert a value at the given path. Overwrites an existing value. |                        |
| `json_type(json)` - `json_type(json, path)`| Return the type of the provided value or value at the specified path. Returns one of `null`, `true`, `false`, `integer`, `real`, `text`, `array`, or `object`. | `json_type('{"temperatures":[73.6, 77.8, 80.2]}', '$.temperatures')` returns `array` |
| `json_valid(json)`                        | Returns 0 (false) for invalid JSON, and 1 (true) for valid JSON. | `json_valid(`{invalid:json})` returns `0` |
| `json_quote(value)`                       | Converts the provided SQL value into its JSON representation. |  `json_quote('[1, 2, 3]')` returns `[1,2,3]` |
| `json_group_array(value)`                 | Returns the provided value(s) as a JSON array. |              |
| `json_each(value)` - `json_each(value, path)` | Returns each element within the object as an individual row. It will only traverse the top-level object. |               |
| `json_tree(value)` - `json_tree(value, path)` | Returns each element within the object as an individual row. It traverses the full object. |               |
 
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

## Example usage

### Extracting values

There are three ways to extract a value from a JSON object in D1:

* The `json_extract()` function - for example, `json_extract(text_column_containing_json, '$.path.to.value)`.
* The `->` operator, which returns a JSON representation of the value.
* The `->>` operator, which returns an SQL representation of the value.

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
2. By calling `json_array(value, path)` to specify the path to an array within an object or outer array.

For example, given the following JSON object stored in a column called `login_history`, you could get a count of the last logins directly:

```json
{
    "user_id": "abc12345",
    "previous_logins": ["2023-03-31T21:07:14-05:00", "2023-03-28T08:21:02-05:00", "2023-03-28T05:52:11-05:00"]
}
```

```sql
json_array(login_history, '$.previous_logins') --> returns 3 as an INTEGER
```

You can also use `json_array` as a predicate in a more complex query - for example, `WHERE json_array(some_column, '$.path.to.value') >= 5`.

### Insert a value into an existing object

You can insert a value into an existing JSON object or array using `json_insert()`. For example, if you have a `TEXT` column called `login_history` in a `users` table containing the following object:

```json
{"history": ["2023-05-13T15:13:02+00:00", "2023-05-14T07:11:22+00:00", "2023-05-15T15:03:51+00:00"]}
```

To add a new timestamp to the `history` array within our `login_history` column, write a query resembling the following:

```sql
UPDATE users
SET login_history = json_insert(login_history, '$.history[#]', '2023-05-15T20:33:06+00:00')
WHERE user_id = 'aba0e360-1e04-41b3-91a0-1f2263e1e0fb'
```

Provide three arguments to `json_insert`: 

1. The name of our column containing the JSON you want to modify.
2. The path to the key within the object to modify.
3. The JSON value to insert. Using `[#]` tells `json_insert` to append to the end of your array.

To replace an existing value, use `json_replace()`, which will overwrite an existing key-value pair if one already exists. To set a value regardless of whether it already exists, use `json_set()`.

### Expanding arrays for IN queries

Use `json_each` to expand an array into multiple rows. This can be useful when composing a `WHERE column IN (?)` query over several values. For example, if you wanted to update a list of users by their integer `id`, use `json_each` to return a table with each value as a column called `value`:

```sql
UPDATE users 
SET last_audited = '2023-05-16T11:24:08+00:00'
WHERE id IN (SELECT value FROM json_each('[183183, 13913, 94944]'))
```

This would extract only the `value` column from the table returned by `json_each`, with each row representing the user IDs we passed in as an array.

`json_each` effectively returns a table with multiple columns, with the most relevant being:

* `key` - the key (or index).
* `value` - the literal value of each element parsed by `json_each`.
* `type` - the type of the value: one of `null`, `true`, `false`, `integer`, `real`, `text`, `array`, or `object`.
* `fullkey` - the full path to the element: e.g. `$[1]` for the second element in an array, or `$.path.to.key` for a nested object.
* `path` - the top-level path - `$` as the path for an element with a `fullkey` of `$[0]`.

In this example, `SELECT * FROM json_each('[183183, 13913, 94944]')` would return a table resembling the below:

```sql
key|value|type|id|fullkey|path
0|183183|integer|1|$[0]|$
1|13913|integer|2|$[1]|$
2|94944|integer|3|$[2]|$
```

You can use `json_each` with D1's [client API](/d1/platform/client-api/) in a Worker by creating a statement and using `JSON.stringify` to pass an array as a [bound parameter](/d1/platform/client-api/#parameter-binding):

```ts
const stmt = context.env.DB
    .prepare("UPDATE users SET last_audited = ? WHERE id IN (SELECT value FROM json_each(?1))")
const resp = await stmt.bind(
    "2023-05-16T11:24:08+00:00",
    JSON.stringify([183183, 13913, 94944])
    ).run()
```

This would only update rows in your `users` table where the `id` matches one of the three provided.
