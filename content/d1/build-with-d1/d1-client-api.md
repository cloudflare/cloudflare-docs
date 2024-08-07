---
title: Query D1
pcx_content_type: concept
weight: 1
---

# D1 client API

D1 is compatible with most SQLite's SQL convention since it leverages SQLite's query engine. D1 client API allows you to interact with a D1 database from within a [Worker](/workers/). 

## Prepared and static statements

D1 client API supports prepared and static statements. Best practice is to use prepared statements which are precompiled objects used by the database to run the SQL. This is because prepared statements lead to overall faster execution and prevent SQL injection attacks.

Below is an example of a prepared statement:

```js
const stmt = db.prepare('SELECT * FROM users WHERE name = ?1').bind('Joe');
```

However, if you still choose to use a static statement you can use the following as an example:

```js
const stmt = db.prepare('SELECT * FROM users WHERE name = "John Doe"');
```

## Parameter binding

D1 follows the [SQLite convention](https://www.sqlite.org/lang_expr.html#varparam) for prepared statements parameter binding. Currently, D1 only supports Ordered (`?NNNN`) and Anonymous (`?`) parameters. In the future, D1 will support named parameters as well.

| Syntax | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `?NNN` | Ordered   | A question mark followed by a number `NNN` holds a spot for the `NNN`-th parameter. `NNN` must be between `1` and `SQLITE_MAX_VARIABLE_NUMBER`                                                                                                                                                                                                                                                                                                                                                                                                    |
| `?`    | Anonymous | A question mark that is not followed by a number creates a parameter with a number one greater than the largest parameter number already assigned. If this means the parameter number is greater than SQLITE_MAX_VARIABLE_NUMBER, it is an error. This parameter format is provided for compatibility with other database engines. But because it is easy to miscount the question marks, the use of this parameter format is discouraged. Programmers are encouraged to use one of the symbolic formats below or the `?NNN` format above instead |

To bind a parameter, use the `stmt.bind()` method.

### Order and anonymous examples:

```js
const stmt = db.prepare('SELECT * FROM users WHERE name = ?').bind( 'John Doe' );
```

```js
const stmt = db.prepare('SELECT * FROM users WHERE name = ? AND age = ?').bind( 'John Doe', 41 );
```


```js
const stmt = db.prepare('SELECT * FROM users WHERE name = ?2 AND age = ?1').bind( 41, 'John Doe' );
```

## Type conversion

D1 automatically converts supported JavaScript (including TypeScript) types passed as parameters via the client API to their associated D1 types. The type conversion is as follows:

| JavaScript           | D1                                                                           |
| -------------------- | ---------------------------------------------------------------------------- |
| null                 | `NULL`                                                                       |
| Number               | `REAL`                                                                       |
| Number <sup>1</sup>  | `INTEGER`                                                                    |
| String               | `TEXT`                                                                       |
| Boolean <sup>2</sup> | `INTEGER`                                                                    |
| ArrayBuffer          | `BLOB`                                                                       |
| undefined            | Not supported. Queries with `undefined` values will return a `D1_TYPE_ERROR` |

<sup>1</sup> D1 supports 64-bit signed `INTEGER` values internally, however [BigInts](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) are not currently supported in the API yet. JavaScript integers are safe up to [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER).

<sup>2</sup> Booleans will be cast to an `INTEGER` type where `1` is `TRUE` and `0` is `FALSE`.

## Return object

The methods `stmt.all()` and `db.batch()` return a typed `D1Result` object that contains the results (if applicable), the success status, and a meta object with the internal duration of the operation in milliseconds.

```js
{
  results: array | null, // [] if empty, or null if it does not apply
  success: boolean, // true if the operation was successful, false otherwise
  meta: {
    duration: number, // duration of the operation in milliseconds
    rows_read: number, // the number of rows read (scanned) by this query
    rows_written: number // the number of rows written by this query
  }
}
```

Example:
```js
const { duration } = (await db.prepare('INSERT INTO users (name, age) VALUES (?1, ?2)').bind( "John", 42 ).run()).meta;

console.log(duration); // 0.172
```

The `db.exec()` method returns a `D1ExecResult` object:

```js
{
  count: number, // the number of queries executed
  duration: number // duration of the operation in milliseconds
}
```

## Query statement methods

D1 client API supports the following query statement methods for querying against a D1 database:

* [`await stmt.all()`](/d1/build-with-d1/d1-client-api/#await-stmtall)
* [`await stmt.raw()`](/d1/build-with-d1/d1-client-api/#await-stmtraw)
* [`await stmt.first( [column] )`](/d1/build-with-d1/d1-client-api/#await-stmtfirstcolumn)
* [`await stmt.run()`](/d1/build-with-d1/d1-client-api/#await-stmtrun)
* [`await db.dump()`](/d1/build-with-d1/d1-client-api/#await-dbdump)
* [`await db.exec()`](/d1/build-with-d1/d1-client-api/#await-dbexec)

### await stmt.all()

Returns all rows as an array of objects, with each result row represented as an object on the `results` property of the `D1Result` type.

When joining tables with identical column names, only the leftmost column will be included in the row object. Use [`stmt.raw()`](#await-stmtraw) to return all rows as an array of arrays.

```js
const stmt = db.prepare('SELECT name, age FROM users LIMIT 3');
const { results } = await stmt.all();
console.log(results);
/*
[
  {
     name: "John",
     age: 42,
  },
   {
     name: "Anthony",
     age: 37,
  },
    {
     name: "Dave",
     age: 29,
  },
 ]
*/
```

When using TypeScript, you can pass a [type parameter](/d1/build-with-d1/d1-client-api/#typescript-support) to `all()` to return a typed result object.

### await stmt.raw()

Returns results as an array of arrays, with each row represented by an array. The return type is an array of arrays, and does not include query metadata.

Column names are not included in the result set by default. To include column names as the first row of the result array, set `.raw({columnNames: true})`.

```js
const stmt = db.prepare('SELECT name, age FROM users LIMIT 3');
const rows = await stmt.raw();
console.log(rows);

/*
[
  [ "John", 42 ],
  [ "Anthony", 37 ],
  [ "Dave", 29 ],
]
*/

// With columnNames: true
const stmt = db.prepare('SELECT name, age FROM users LIMIT 3');
const [columns, ...rows] = await stmt.raw({columnNames: true});
console.log(columns);

/*
[ "name", age ], // The first result array includes the column names
*/
```

When using TypeScript, you can pass a [type parameter](/d1/build-with-d1/d1-client-api/#typescript-support) to `raw()` to return a typed result array.

### await stmt.first([column])

Returns the first row of the results. This does not return metadata like the other methods. Instead, it returns the object directly.

Get a specific column from the first row:

```js
const stmt = db.prepare('SELECT COUNT(*) AS total FROM users');
const total = await stmt.first('total');
console.log(total); // 50
```

Get all the columns from the first row:
```js
const stmt = db.prepare('SELECT COUNT(*) AS total FROM users');
const values = await stmt.first();
console.log(values); // { total: 50 }
```

If the query returns no rows, then `first()` will return `null`. If the query returns rows, but `column` does not exist, then `first()` will throw the `D1_ERROR` exception. 

`stmt.first()` does not alter the SQL query. To improve performance, consider appending `LIMIT 1` to your statement.

When using TypeScript, you can pass a [type parameter](/d1/build-with-d1/d1-client-api/#typescript-support) to `first()` to return a typed result object.

### await stmt.run()

Runs the query (or queries) and returns results. Returns all rows as an array of objects, with each result row represented as an object on the `results` property of the `D1Result` type. For write operations like UPDATE, DELETE or INSERT, `results` will be empty.

Run is functionally equivalent to `stmt.all()` and can be treated as an alias.

```js
const stmt = await db.prepare('SELECT name, age FROM users LIMIT 3')
const { results } = await stmt.run();
console.log(results);
/*
[
  {
     name: "John",
     age: 42,
  },
   {
     name: "Anthony",
     age: 37,
  },
    {
     name: "Dave",
     age: 29,
  },
 ]
*/
```

When using TypeScript, you can pass a [type parameter](/d1/build-with-d1/d1-client-api/#typescript-support) to `run()` to return a typed result object.

### await db.dump()

{{<Aside type="warning">}}

This API only works on databases created during D1's alpha period. Check which version your database uses with `wrangler d1 info <DATABASE_NAME>`.

{{</Aside>}}

Dumps the entire D1 database to an SQLite compatible file inside an ArrayBuffer.

```js
const dump = await db.dump()
return new Response(dump, {
    status: 200,
    headers: {
        'Content-Type': 'application/octet-stream'
    }
});
```

### await db.exec()

Executes one or more queries directly without prepared statements or parameters binding. This method can have poorer performance (prepared statements can be reused in some cases) and, more importantly, is less safe. Only use this method for maintenance and one-shot tasks (for example, migration jobs). The input can be one or multiple queries separated by `\n`.

If an error occurs, an exception is thrown with the query and error messages, execution stops and further statements are not executed. Refer to [Errors](/d1/build-with-d1/d1-client-api/#errors) to learn more.

```js
const migration = await fetch('/migration.sql');
const out = await db.exec(migration.text());
console.log(out);
/*
{
  count: 80,
  duration: 76
}
*/
```

## TypeScript support

D1 client API is fully-typed via the `@cloudflare/workers-types` package, and also supports [generic types](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types) as part of its TypeScript API. A generic type allows you to provide an optional _type parameter_ so that a function understands the type of the data it is handling.

When using the [query statement methods](#query-statement-methods) `stmt.all()`, `stmt.raw()` and `stmt.first()`, you can provide a type representing each database row. D1's API will [return the result object](#return-object) with the correct type.

For example, providing an `OrderRow` type as a type parameter to `stmt.all()` will return a typed `Array<OrderRow>` object instead of the default `Record<string, unknown>` type:

```ts
// Row definition
type OrderRow = {
  Id: string;
  CustomerName: string;
  OrderDate: number;
}

// Elsewhere in your application
const result = await env.MY_DB.prepare("SELECT Id, CustomerName, OrderDate FROM [Order] ORDER BY ShippedDate DESC LIMIT 100").all<OrderRow>();
```

## Reuse prepared statements

Prepared statements can be reused with new bindings:

```js
const stmt =  db.prepare('SELECT name, age FROM users WHERE age < ?1');
const young = await stmt.bind(20).all();
console.log(young);
/*
{
  results: [...],
  success: true
  meta: {
    duration: 31,
  }
}
*/
 const old = await stmt.bind(80).all();
console.log(old);
/*
{
  results: [...],
  success: true
  meta: {
    duration: 29,
  }
}
*/
```

## Search with LIKE

Perform a search using SQL's `LIKE` operator:

```js
const { results } = await env.DB.prepare(
  "SELECT * FROM Customers WHERE CompanyName LIKE ?"
)
  .bind("%eve%")
  .all();
console.log("results: ", results);
/*
results:  [...]
*/
```

## Batch statements

Batching sends multiple SQL statements inside a single call to the database. This can have a huge performance impact as it reduces latency from network round trips to D1. D1 operates in auto-commit. Our implementation guarantees that each statement in the list will execute and commit, sequentially, non-concurrently.

Batched statements are [SQL transactions](https://www.sqlite.org/lang_transaction.html). If a statement in the sequence fails, then an error is returned for that specific statement, and it aborts or rolls back the entire sequence.

### db.batch()

To send batch statements, provide `batch()` a list of prepared statements and get the results in the same order.

```js
await db.batch([
    db.prepare("UPDATE users SET name = ?1 WHERE id = ?2").bind( "John", 17 ),
    db.prepare("UPDATE users SET age = ?1 WHERE id = ?2").bind( 35, 19 ),
]);
```

You can construct batches reusing the same prepared statement:

```js
const stmt = db.prepare("SELECT * FROM users WHERE name = ?1");

const rows = await db.batch([
    stmt.bind("John"),
    stmt.bind("Anthony"),
]);

console.log(rows[0].results);
/*
[
  {
     name: "John Clemente",
     age: 42,
  },
   {
     name: "John Davis",
     age: 37,
  },
 ]
*/
console.log(rows[1].results);
/*
[
  {
     name: "Anthony Hopkins",
     age: 66,
  },
 ]
*/
```


## PRAGMA statements

D1 supports the following [SQLite PRAGMA](https://www.sqlite.org/pragma.html) statements:

| PRAGMA               | Description                                                                                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `table_list`         | Returns information about the tables and views in the schema, one table per row of output.                                                                                                                 |
| `table_info`         | This pragma returns one row for each column in the named table. Columns in the result set include the column name, data type, whether or not the column can be NULL, and the default value for the column. |
| `defer_foreign_keys` | Query, set, or clear the enforcement of foreign key constraints. For more information, refer to [Define foreign key](/d1/build-with-d1/foreign-keys/)                                                      |



Other PRAGMAs are disabled because of D1 implementation specifics.

```js
const r = await db.batch([
    db.prepare("PRAGMA table_list"),
    db.prepare("PRAGMA table_info(my_table)"),
]);
console.log(r);
/*
[
  {
    "results": [
      {
      "schema": "main",
      "name": "my_table",
      "type": "table",
      "ncol": 3,
      "wr": 0,
      "strict": 0
      },
      ...
    ]
  },
  {
    "results": [
      {
        "cid": 0,
        "name": "cid",
        "type": "INTEGER",
        "notnull": 0,
        "dflt_value": null,
        "pk": 1
      },
      ...
    ]
  }
]

*/
```
## Errors

The `stmt.` and `db.` methods will throw an [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) whenever an error occurs.

{{<Aside type="note">}}

Prior to [`wrangler` 3.1.1](https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%403.1.1), D1 JavaScript errors used the [cause property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) for detailed error messages.

To inspect these errors when using older versions of `wrangler`, you should log `error?.cause?.message`.

{{</Aside>}}

To capture exceptions, log the `Error.message` value. For example, the code below has a query with an invalid keyword - `INSERTZ` instead of `INSERT`:

```js
try {
    // This is an intentional mispelling
    await db.exec("INSERTZ INTO my_table (name, employees) VALUES ()");
} catch (e: any) {
    console.error({
        message: e.message
    });
}
```

The code above would throw the following error message:

```json
{
  "message": "D1_EXEC_ERROR: Error in line 1: INSERTZ INTO my_table (name, employees) VALUES (): sql error: near \"INSERTZ\": syntax error in INSERTZ INTO my_table (name, employees) VALUES () at offset 0"
}
```
## Error list

D1 will return the following error constants, in addition to the extended (detailed) error message:

| Message              | Cause                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `D1_ERROR`           | Generic error.                                                                                                                                                   |
| `D1_TYPE_ERROR`      | Returned when there is a mismatch in the type between a column and a value. A common cause is supplying an `undefined` variable (unsupported) instead of `null`. |
| `D1_COLUMN_NOTFOUND` | Column not found.                                                                                                                                                |
| `D1_DUMP_ERROR`      | Database dump error.                                                                                                                                             |
| `D1_EXEC_ERROR`      | Exec error in line x: y error.                                                                                                                                   |
