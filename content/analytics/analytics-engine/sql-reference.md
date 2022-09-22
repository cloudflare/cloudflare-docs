---
title: SQL Reference
pcx_content_type: reference
weight: 5
meta:
  title: Workers Analytics Engine SQL Reference
---

# Workers Analytics Engine SQL Reference

## SHOW statement

`SHOW` can be used to list the tables on your account. The table name is the name you specified as `dataset` when configuring the workers binding (see [Get started with Workers Analytics Engine](../get-started/#1-configure-your-dataset-and-binding-in-wrangler)). The table is automatically created when you write event data in your worker. 

```SQL
SHOW TABLES
[FORMAT <format>]
```

See [below](#format-clause) for the available `FORMAT` options.

## SELECT statement

`SELECT` is used to query tables.

Usage:
```SQL
SELECT <expression_list>
[FROM <table>|(<subquery>)]
[WHERE <expression>]
[GROUP BY <expression>, ...]
[ORDER BY <expression_list>] 
[LIMIT <n>|ALL]
[FORMAT <format>]
```

See below for the syntax of each clause and see the [SQL API docs](../sql-api/) for some example queries.

### SELECT clause

The `SELECT` clause specifies the list of columns to be included in the result.
Columns can be aliased using the `AS` keyword.

Usage:
```SQL
SELECT <expression> [AS <alias>], ...
```

Examples:
```SQL
-- return the named columns
SELECT blob2, double3

-- return all columns
SELECT *

-- alias columns to more descriptive names
SELECT
    blob2 AS probe_name, 
    double3 AS temperature 
```

Additionally, expressions using supported [functions](#supported-functions) and [operators](#supported-operators) can be used in place of column names:
```SQL
SELECT 
    blob2 AS probe_name,
    double3 AS temp_c,
    double3*1.8+32 AS temp_f -- compute a value

SELECT
    blob2 AS probe_name,
    IF(double3 <= 0, 'FREEZING', 'NOT FREEZING') AS description -- use of functions

SELECT
    blob2 AS probe_name,
    AVG(double3) AS avg_temp -- aggregation function
```

### FROM clause

`FROM` is used to specify the source of the data for the query.

Usage:
```SQL
FROM <table_name>|(subquery)
```

Examples:
```SQL
-- query data written to a workers dataset called "temperatures"
FROM temperatures  

-- use a subquery to manipulate the table
FROM (
    SELECT 
        blob1 AS probe_name,
        count() as num_readings
    FROM
        temperatures
    GROUP BY
        probe_name
)
```

Note that queries can only operate on a single table. `UNION`, `JOIN` etc. are not currently supported.

### WHERE clause

`WHERE` is used to filter the rows returned by a query.

Usage:
```SQL
WHERE <condition>
```

`<condition>` can be any expression that evaluates to a boolean.

[Comparison operators](#comparison-operators) can be used to compare values and [boolean operators](#boolean-operators) can be used to combine conditions.

Expressions containing [functions](#supported-functions) and [operators](#supported-operators) are supported.

Examples:
```SQL
-- simple comparisons
WHERE blob1 = 'test'
WHERE double1 = 4

-- inequalities
WHERE double1 > 4

-- use of operators (see below for supported operator list)
WHERE double1 + double2 > 4
WHERE blob1 = 'test1' OR blob2 = 'test2'

-- expression using inequalities, functions and operators
WHERE IF(unit = 'f', (temp-32)/1.8, temp) <= 0
```

### GROUP BY clause

When using aggregate functions, `GROUP BY` specifies the groups over which the aggregation is run.

Usage:
```SQL
GROUP BY <expression>, ...
```

For example. If you had a table of temperature readings:
```SQL
-- return the average temperature for each probe
SELECT 
    blob1 AS probe_name, 
    AVG(double1) AS average_temp
FROM temperature_readings
GROUP BY probe_name
```

In the usual case the `<expression>` can just be a column name but it is also possible to suppy a complex expression here.
Multiple expressions or column names can be supplied separated by commas.

### ORDER BY clause

`ORDER BY` can be used to control the order in which rows are returned.

Usage:
```SQL
ORDER BY <expression> [ASC|DESC], ...
```

`<expression>` can just be a column name. 

`ASC` or `DESC` determines if the ordering is ascending or descending. `ASC` is the default, and can be omitted.

Examples:
```SQL
-- order by double2 then double3, both in ascending order
ORDER BY double2, double3

-- order by double2 in ascending order then double3 is descending order
ORDER BY double2, double3 DESC
```

### LIMIT clause

`LIMIT` specifies a maximum number of rows to return.

Usage:
```SQL
LIMIT <n>|ALL
```

Supply the maximum number of rows to return or `ALL` for no restriction.

For example:
```SQL
LIMIT 10 -- return at most 10 rows
```

### FORMAT clause

`FORMAT` controls how to the returned data is encoded.

Usage:
```SQL
FORMAT [JSON|JSONEachRow|TabSeparated]
```

If no format clause is included then the default format of `JSON` will be used.

Override the default by setting a format. For example:
```SQL
FORMAT JSONEachRow
```

The following formats are supported:

#### JSON

Data is returned as a single JSON object with schema data included:
```JSON
{
    "meta": [
        {
            "name": "<column 1 name>",
            "type": "<column 1 type>"
        },
        {
            "name": "<column 2 name>",
            "type": "<column 2 type>"
        },
        ...
    ],
    "data": [
        {
            "<column 1 name>": "<column 1 value>",
            "<column 2 name>": "<column 2 value>",
            ...
        },
        {
            "<column 1 name>": "<column 1 value>",
            "<column 2 name>": "<column 2 value>",
            ...
        },
        ...
    ]
}
```

#### JSONEachRow

Data is returned with a separate JSON object per row. Rows are newline separated and there is no header line or schema data:

```JSON
{"<column 1 name>": "<column 1 value>", "<column 2 name>": "<column 2 value>"}
{"<column 1 name>": "<column 1 value>", "<column 2 name>": "<column 2 value>"}
...
```

#### TabSeparated

Data is returned with newline separated rows. Columns are separated with tabs. There is no header.

```TSV
column 1 value  column 2 value
column 1 value  column 2 value
...
```

## Supported functions

### COUNT

Usage:
```SQL
COUNT()
```

Count is an aggregation function that returns the number of rows in each group or results set.

### SUM

Usage:
```SQL
SUM(column_name)
```

Sum is an aggregation function that returns the sum of column values across all rows in each group or results set.

Example:
```SQL
-- return the total cost of all items
SUM(item_cost)
```

### QUANTILEWEIGHTED

Usage:
```SQL
QUANTILEWEIGHTED(q, column_name, weight_column_name) 
```

`QUANTILEWEIGHTED` is an aggregation function that returns the value at the q<sup>th</sup> quantile in the named column across all rows in each group or results set. Each row will be weighted by the value in `weight_column_name`. Typically this would be `_sample_interval` (see (how sampling works)[../sql-api/#sampling]).

Example:
```SQL
-- estimate the median value of <double1>
QUANTILEWEIGHTED(0.5, double1, _sample_interval) 

-- in a table of query times, estimate the 95th centile query time
QUANTILEWEIGHTED(0.95, query_time, _sample_interval)
```

### IF

Usage:
```SQL
IF(<condition>, <true_expression>, <false_expression>)
```

Returns `<true_expression>` if `<condition>` evaluates to true, else returns `<false_expression>`.

Example:
```SQL
IF(temp > 20, "It's warm", "Bring a jumper")
```

### INTDIV

Usage:
```SQL
INTDIV(a, b)
```

Divide a by b rounding the answer down to the nearest whole number.


### TOUINT32

Usage:
```SQL
TOUINT32(<expression>)
```

Converts any numeric expression, or expression resulting in a string representation of a decimal, into an unsigned 32 bit integer.

Behaviour for negative numbers is undefined.

### TODATETIME

Usage:
```SQL
TODATETIME(<expression>)
```

`TODATETIME` converts an expression to a datetime.

Examples:
```SQL
-- double1 contains a unix timestamp in seconds
TODATETIME(double1)

-- blob1 contains an datetime in the format 'YYYY-MM-DD hh:mm:ss'
TODATETIME(blob1)

-- literal values:
TODATETIME(355924804) -- unix timestamp
TODATETIME('355924804') -- string containing unix timestamp
TODATETIME('1981-04-12 12:00:04') -- string with datetime in 'YYYY-MM-DD hh:mm:ss' format
```

### NOW

Usage:
```
NOW()
```

Returns the current time as a DateTime.


## Supported operators

The following operators are supported:

### Arithmetic operators

{{<table-wrap>}}

| Operator  | Description         |
|-----|----------|
| `+` | addition |
| `-` | subtraction |
| `*` | multiplication |
| `/` | division |
| `%` | modulus |

{{</table-wrap>}}


### Comparison operators

{{<table-wrap>}}

| Operator  | Description |
|-----|----------|
| `=` | equals |
| `<` | less than |
| `>` | greater than |
| `<=` | less than or equal to |
| `>=` | greater than or equal to |
| `<>` or `!=` | not equal |

{{</table-wrap>}}

### Boolean operators

{{<table-wrap>}}

| Operator  | Description |
|-----|----------|
| `AND` | boolean "AND" (true if both sides are true) |
| `OR` | boolean "OR" (true if either side or both sides are true) |

{{</table-wrap>}}

### Unary operators

{{<table-wrap>}}

| Operator  | Description |
|-----|----------|
| `-` | negation operator (e.g. `-42`) |
| `~` | bitwise not |

{{</table-wrap>}}


## Literals

{{<table-wrap>}}

| Type | Syntax |
|------|---------------|
| integer | `42`, `-42` |
| double  | `4.2`, `-4.2` |
| string | `'so long and thanks for all the fish'` |
| boolean | `true` or `false` |
| time interval | `INTERVAL '42' DAY`<br>Intervals of `YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE` and `SECOND` are supported |

{{</table-wrap>}}



