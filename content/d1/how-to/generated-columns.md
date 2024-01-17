---
title: Generated columns
pcx_content_type: concept
weight: 10
---

# Generated columns

D1 allows you to define generated columns based on the values of one or more other columns, SQL functions, or even [extracted JSON values](/d1/how-to/querying-json).

This allows you to normalize your data as you write to it or read it from a table, making it easier to query and reducing the need for complex application logic.

Generated columns can also have [indexes defined](/d1/how-to/using-indexes/) against them, which can dramatically increase query performance over frequently queried fields.

## Types of generated columns

There are two types of generated columns:

* `VIRTUAL` (default): the column is generated when read. This has the benefit of not consuming storage, but can increase compute time (and thus reduce query performance), especially for larger queries.
* `STORED`: the column is generated when the row is written. The column takes up storage space just as a regular column would, but the column does not need to be generated on every read, which can improve read query performance.

When omitted from a generated column expression, generated columns default to the `VIRTUAL` type. The `STORED` type is recommended when the generated column is compute intensive. For example, when parsing large JSON structures.

## Define a generated column

Generated columns can be defined during table creation in a `CREATE TABLE` statement or afterwards via the `ALTER TABLE` statement. 

To create a table that defines a generated column, you use the `AS` keyword:

```sql
CREATE TABLE some_table (
    -- other columns omitted
    some_generated_column AS <function_that_generates_the_column_data>
)
```

As a concrete example, to automatically extract the `location` value from the following JSON sensor data, you can define a generated column called `location` (of type `TEXT`), based on a `raw_data` column that stores the raw representation of our JSON data.

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

To define a generated column with the value of `$.measurement.location`, you can use the [`json_extract`](/d1/how-to/querying-json/#extracting-values) function to extract the value from the `raw_data` column each time you write to that row:

```sql
CREATE TABLE sensor_readings (
    event_id INTEGER PRIMARY KEY,
    timestamp INTEGER NOT NULL,
    raw_data TEXT,
    location as (json_extract(raw_data, '$.measurement.location')) STORED
);
```

Generated columns can optionally be specified with the `column_name GENERATED ALWAYS AS <function> [STORED|VIRTUAL]` syntax. The `GENERATED ALWAYS` syntax is optional and does not change the behavior of the generated column when omitted.

## Add a generated column to an existing table

A generated column can also be added to an existing table. If the `sensor_readings` table did not have the generated `location` column, you could add it by running an `ALTER TABLE` statement:

```sql
ALTER TABLE sensor_readings
ADD COLUMN location as (json_extract(raw_data, '$.measurement.location'));
```

This defines a `VIRTUAL` generated column that runs `json_extract` on each read query.

Generated column definitions cannot be directly modified. To change how a generated column generates its data, you can use `ALTER TABLE table_name REMOVE COLUMN` and then `ADD COLUMN` to re-define the generated column, or `ALTER TABLE table_name RENAME COLUMN current_name TO new_name` to rename the existing column before calling `ADD COLUMN` with a new definition.

## Examples

Generated columns are not just limited to JSON functions like `json_extract`: you can use almost any available function to define how a generated column is generated.

For example, you could generate a `date` column based on a `timestamp` column, automatically converting a Unix timestamp into a `YYYY-MM-dd` format within your database:

```sql
ALTER TABLE your_table
-- date(timestamp, 'unixepoch') converts a Unix timestamp to a YYYY-MM-dd formatted date
ADD COLUMN formatted_date AS (date(timestamp, 'unixepoch'))
```

Alternatively, you could define an `expires_at` column that calculates a future date, and filter on that date in your queries:

```sql
-- Filter out "expired" results based on your generated column:
-- SELECT * FROM your_table WHERE current_date() > expires_at
ALTER TABLE your_table
-- calculates a date (YYYY-MM-dd) 30 days from the current date.
ADD COLUMN expires_at AS (date('now', '+30 days');
```

## Additional considerations

* Tables must have at least one non-generated column. You cannot define a table with only generated column(s).
* Expressions can only reference other columns in the same table and row, and must only use [deterministic functions](https://www.sqlite.org/deterministic.html). Functions like `random()`, sub-queries or aggregation functions cannot be used to define a generated column.
* Columns added to an existing table via `ALTER TABLE ... ADD COLUMN` must be `VIRTUAL`. You cannot add a `STORED` column to an existing table.
