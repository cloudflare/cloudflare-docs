---
title: Date and Time
pcx_content_type: concept
weight: 1
---

# Date and Time datatypes in D1
D1 is using SQLite storage model and does not have a specific datatype for Date or Time values, instead providing 
standard utility functions that are capable of interpreting and working with Date and Time values. 

## Storing Date and Time

One can choose to store Date and Time values in any of the following formats, and converts them from one to another
using the Date and Time utility functions.  

### As ISO8601 TEXT strings

With TEXT values must be stored as ISO8601 compatible strings ("YYY-MM-DD HH:MM:SS.SSS")

```sql
CREATE TABLE tbl (created_at TEXT); 
INSERT INTO tbl(created_at) VALUES ("2024-01-01 01:01:01.000");
```

### As Julian day numbers with REAL

With REAL, values must be stored as Julian day numbers, the number of days since noon in Greenwich on November 24, 4714 B.C. according to the proleptic Gregorian calendar.

```sql
CREATE TABLE tbl (created_at REAL);
INSERT INTO tbl(created_at) VALUES (2460468.547477);
```

### As Unix timestamp with INTEGER
With INTEGER, values must be stored as a valid Unix timestamp, the number of seconds since 1970-01-01 00:00:00 UTC

```sql
CREATE TABLE tbl (created_at INTEGER); 
INSERT INTO tbl(created_at) VALUES (1718369707);
```

### Automatically set value to current time

Using either the CURRENT_DATE, CURRENT_TIME or CURRENT_TIMESTAMP in the DEFAULT clause will make D1
automatically feed the column with the date, time or timestamp respectively as of now.  

```sql
CREATE TABLE tbl (id INTEGER PRIMARY KEY, created_at TEXT DEFAULT CURRENT_DATE); 
INSERT INTO tbl(id) VALUES (1);

SELECT * FROM tbl
--- ----------------------
--- | id  |  created_at  |
--- |  1  |  2024-06-14  |
--- ----------------------
```

## Querying Date and Time

In Cloudflare D1, you can leverage the SQLite native Date and Time utility functions to query and manipulate date and time values in your database. These functions provide a wide range of capabilities for working with dates and times.

Here are some commonly used SQLite Date and Time utility functions:

- `date`: This function returns the date part of a given date and time value.
- `time`: This function returns the time part of a given date and time value.
- `datetime`: This function returns the date and time value in the format 'YYYY-MM-DD HH:MM:SS'.
- `strftime`: This function allows you to format a date and time value based on a specified format string. It supports a wide range of format specifiers to customize the output.

To query date and time values, you can use these utility functions in your SQL queries. For example, to retrieve all records that were created on a specific date, you can use the `date` function in the `WHERE` clause:

```sql
SELECT * FROM tbl WHERE date(created_at) = '2024-06-07';
```

Similarly, you can perform various operations like comparing dates, extracting specific components (year, month, day, etc.), and performing date arithmetic using these utility functions.

Make sure to refer to the [SQLite documentation](https://www.sqlite.org/lang_datefunc.html) for a complete list of available Date and Time utility functions and their usage.
