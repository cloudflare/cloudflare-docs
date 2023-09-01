---
title: SQL Reference
pcx_content_type: reference
weight: 5
meta:
  title: Workers Analytics Engine SQL Reference
---

# Workers Analytics Engine SQL Reference

## SHOW TABLES statement

`SHOW TABLES` can be used to list the tables on your account. The table name is the name you specified as `dataset` when configuring the workers binding (refer to [Get started with Workers Analytics Engine](/analytics/analytics-engine/get-started/), for more information). The table is automatically created when you write event data in your worker.

```SQL
SHOW TABLES
[FORMAT <format>]
```

Refer to [FORMAT clause](#format-clause) for the available `FORMAT` options.

## SHOW TIMEZONES statement

`SHOW TIMEZONES` can be used to list all of the timezones supported by the SQL API. Most common timezones are supported.

```SQL
SHOW TIMEZONES
[FORMAT <format>]
```

## SHOW TIMEZONE statement

`SHOW TIMEZONE` responds with the current default timezone in use by SQL API. This should always be `Etc/UTC`.

```SQL
SHOW TIMEZONE
[FORMAT <format>]
```

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

Below you can find the syntax of each clause. Refer to the [SQL API docs](/analytics/analytics-engine/sql-api/) for some example queries.

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
    if(double3 <= 0, 'FREEZING', 'NOT FREEZING') AS description -- use of functions

SELECT
    blob2 AS probe_name,
    avg(double3) AS avg_temp -- aggregation function
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
WHERE if(unit = 'f', (temp-32)/1.8, temp) <= 0
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
    avg(double1) AS average_temp
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
    ],
    "rows": 10
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

```txt
column 1 value  column 2 value
column 1 value  column 2 value
...
```

## Supported functions

{{<Aside type="note">}}
Note that function names are not case-sensitive, they can be used both in uppercase or in lowercase.
{{</Aside>}}

### count

Usage:
```SQL
count()
count(DISTINCT column_name)
```

Count is an aggregation function that returns the number of rows in each group or results set.

Count can also be used to count the number of distinct (unique) values in each column:

Example:
```SQL
-- return the total number of rows
count()
-- return the number of different values in the column
count(DISTINCT column_name)
```

### sum

Usage:
```SQL
sum([DISTINCT] column_name)
```

Sum is an aggregation function that returns the sum of column values across all rows in each group or results set. Sum also supports `DISTINCT`, but in this case it will only sum the unique values in the column.

Example:
```SQL
-- return the total cost of all items
sum(item_cost)
-- return the total of all unique item costs
sum(DISTINCT item_cost)
```

### avg

Usage:
```SQL
avg([DISTINCT] column_name)
```

Avg is an aggregation function that returns the mean of column values across all rows in each group or results set. Avg also supports `DISTINCT`, but in this case it will only average the unique values in the column.

Example:
```SQL
-- return the mean item cost
avg(item_cost)
-- return the mean of unique item costs
avg(DISTINCT item_cost)
```

### min

Usage:
```SQL
min(column_name)
```

Min is an aggregation function that returns the minimum value of a column across all rows.

Example:
```SQL
-- return the minimum item cost
min(item_cost)
```

### max

Usage:
```SQL
max(column_name)
```

Max is an aggregation function that returns the maximum value of a column across all rows.

Example:
```SQL
-- return the maximum item cost
max(item_cost)
```

### quantileWeighted

Usage:
```SQL
quantileWeighted(q, column_name, weight_column_name)
```

`quantileWeighted` is an aggregation function that returns the value at the q<sup>th</sup> quantile in the named column across all rows in each group or results set. Each row will be weighted by the value in `weight_column_name`. Typically this would be `_sample_interval` (refer to [how sampling works](/analytics/analytics-engine/sql-api/#sampling), for more information).

Example:
```SQL
-- estimate the median value of <double1>
quantileWeighted(0.5, double1, _sample_interval)

-- in a table of query times, estimate the 95th centile query time
quantileWeighted(0.95, query_time, _sample_interval)
```

### if

Usage:
```SQL
if(<condition>, <true_expression>, <false_expression>)
```

Returns `<true_expression>` if `<condition>` evaluates to true, else returns `<false_expression>`.

Example:
```SQL
if(temp > 20, 'It is warm', 'Bring a jumper')
```

### intDiv

Usage:
```SQL
intDiv(a, b)
```

Divide a by b, rounding the answer down to the nearest whole number.


### toUInt32

Usage:
```SQL
toUInt32(<expression>)
```

Converts any numeric expression, or expression resulting in a string representation of a decimal, into an unsigned 32 bit integer.

Behaviour for negative numbers is undefined.

### length

Usage:
```SQL
length({string})
```

Returns the length of a string. This function is UTF-8 compatible.

Examples:
```SQL
SELECT length('a string') AS s;
SELECT length(blob1) AS s FROM your_dataset;
```

### isEmpty

Usage:
```SQL
isEmpty({string})
```

Returns a boolean saying whether the string was empty. This computation can also be done as a binary operation: `{string} = ''`.

Examples:
```SQL
SELECT isEmpty('a string') AS b;
SELECT isEmpty(blob1) AS b FROM your_dataset;
```

### toLower

Usage:
```SQL
toLower({string})
```

Returns the string converted to lowercase. This function is Unicode compatible. This may not be perfect for all languages and users with stringent needs, should do the operation in their own code.

Examples:
```SQL
SELECT toLower('STRING TO DOWNCASE') AS s;
SELECT toLower(blob1) AS s FROM your_dataset;
```

### toUpper

Usage:
```SQL
toUpper({string})
```

Returns the string converted to uppercase. This function is Unicode compatible. The results may not be perfect for all languages and users with strict needs. These users should do the operation in their own code.

Examples:
```SQL
SELECT toUpper('string to uppercase') AS s;
SELECT toUpper(blob1) AS s FROM your_dataset;
```

### startsWith

Usage:
```SQL
startsWith({string}, {string})
```

Returns a boolean of whether the first string has the second string at its start.

Examples:
```SQL
SELECT startsWith('prefix ...', 'prefix') AS b;
SELECT startsWith(blob1, 'prefix') AS b FROM your_dataset;
```

### endsWith

Usage:
```SQL
endsWith({string}, {string})
```

Returns a boolean of whether the first string contains the second string at its end.

Examples:
```SQL
SELECT endsWith('prefix suffix', 'suffix') AS b;
SELECT endsWith(blob1, 'suffix') AS b FROM your_dataset;
```

### position

Usage:
```SQL
position({needle:string} IN {haystack:string})
```

Returns the position of one string, `needle`, in another, `haystack`. In SQL, indexes are usually 1-based. That means that position returns `1` if your needle is at the start of the haystack. It only returns `0` if your string is not found.

Examples:
```SQL
SELECT position(':' IN 'hello: world') AS p;
SELECT position(':' IN blob1) AS p FROM your_dataset;
```

### substring

Usage:
```SQL
substring({string}, {offset:integer}[. {length:integer}])
```

Extracts part of a string, starting at the Unicode code point indicated by the offset and returning the number of code points requested by the length. As previously mentioned, in SQL, indexes are usually 1-based. That means that the offset provided to substring should be at least `1`.

Examples:
```SQL
SELECT substring('hello world', 6) AS s;
SELECT substring('hello: world', 1, position(':' IN 'hello: world')-1) AS s;
```

### format

Usage:
```SQL
format({string}[, ...])
```

This function supports formatting strings, integers, floats, datetimes, intervals, etc, except `NULL`. The function does not support literal `{` and `}` characters in the format string.

Examples:
```SQL
SELECT format('blob1: {}', blob1) AS s FROM dataset;
```

See also: [formatDateTime](#formatdatetime)

### toDateTime

Usage:
```SQL
toDateTime(<expression>[, 'timezone string'])
```

`toDateTime` converts an expression to a datetime. This function does not support ISO 8601-style timezones; if your time is not in UTC then you must provide the timezone using the second optional argument.

Examples:
```SQL
-- double1 contains a unix timestamp in seconds
toDateTime(double1)

-- blob1 contains an datetime in the format 'YYYY-MM-DD hh:mm:ss'
toDateTime(blob1)

-- literal values:
toDateTime(355924804) -- unix timestamp
toDateTime('355924804') -- string containing unix timestamp
toDateTime('1981-04-12 12:00:04') -- string with datetime in 'YYYY-MM-DD hh:mm:ss' format

-- interpret a date relative to New York time
toDateTime('2022-12-01 16:17:00', 'America/New_York')
```

### now

Usage:
```SQL
now()
```

Returns the current time as a DateTime.

### toUnixTimestamp

Usage:
```SQL
toUnixTimestamp(<datetime>)
```

`toUnixTimestamp` converts a datetime into an integer unix timestamp.

Examples:
```SQL
-- get the current unix timestamp
toUnixTimestamp(now())
```

### formatDateTime

Usage:
```SQL
formatDateTime(<datetime expression>, <format string>[, <timezone string>])
```

`formatDateTime` prints a datetime as a string according to a provided format string. See
[ClickHouse's docs](https://clickhouse.com/docs/en/sql-reference/functions/date-time-functions/#formatdatetime)
for a list of supported formatting options.

Examples:
```SQL
-- prints the current YYYY-MM-DD in UTC
formatDateTime(now(), '%Y-%m-%d')

-- prints YYYY-MM-DD in the datetime's timezone
formatDateTime(<a datetime with a timezone>, '%Y-%m-%d')
formatDateTime(toDateTime('2022-12-01 16:17:00', 'America/New_York'), '%Y-%m-%d')

-- prints YYYY-MM-DD in UTC
formatDateTime(<a datetime with a timezone>, '%Y-%m-%d', 'Etc/UTC')
formatDateTime(toDateTime('2022-12-01 16:17:00', 'America/New_York'), '%Y-%m-%d', 'Etc/UTC')
```

### toStartOfInterval

Usage:
```SQL
toStartOfInterval(<datetime>, INTERVAL '<n>' <unit>[, <timezone string>])
```

`toStartOfInterval` rounds down a datetime to the nearest offset of a provided interval. This can
be useful for grouping data into equal-sized time ranges.

Examples:
```SQL
-- round the current time down to the nearest 15 minutes
toStartOfInterval(now(), INTERVAL '15' MINUTE)

-- round a timestamp down to the day
toStartOfInterval(timestamp, INTERVAL '1' DAY)

-- count the number of datapoints filed in each hourly window
SELECT
  toStartOfInterval(timestamp, INTERVAL '1' HOUR) AS hour,
  sum(_sample_interval) AS count
FROM your_dataset
GROUP BY hour
ORDER BY hour ASC
```

### extract

Usage:
```SQL
extract(<time unit> from <datetime>)
```

`extract` returns an integer number of time units from a datetime. It supports
`YEAR`, `MONTH`, `DAY`, `HOUR`, `MINUTE` and `SECOND`.

Examples:
```SQL
-- extract the number of seconds from a timestamp (returns 15 in this example)
extract(SECOND from toDateTime('2022-06-06 11:30:15'))
```

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
| `IN` | true if the preceding expression's value is in the list<br>`column IN ('a', 'list', 'of', 'values')` |
| `NOT IN` | true if the preceding expression's value is not in the list<br>`column NOT IN ('a', 'list', 'of', 'values')` |

{{</table-wrap>}}

We also support the `BETWEEN` operator for checking a value is in an inclusive range: `a [NOT] BETWEEN b AND c`.

### Boolean operators

{{<table-wrap>}}

| Operator  | Description |
|-----|----------|
| `AND` | boolean "AND" (true if both sides are true) |
| `OR` | boolean "OR" (true if either side or both sides are true) |
| `NOT` | boolean "NOT" (true if following expression is false and visa-versa) |

{{</table-wrap>}}

### Unary operators

{{<table-wrap>}}

| Operator  | Description |
|-----|----------|
| `-` | negation operator (for example, `-42`) |

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



