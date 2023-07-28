---
title: Debug D1
weight: 5
pcx_content_type: concept
---

# Debug

D1 allows you to capture exceptions and log errors returned when querying a database. To debug D1, you will use the same tools available when [debugging Workers](/workers/observability/debug-workers/).

## Handle errors

The D1 [client API](/d1/platform/client-api/) returns detailed error messages on the [`cause` property](/d1/platform/client-api/#errors) within an `Error` object. 

To ensure you are capturing the full error message, make sure to log or return `e.cause.message`, as follows:

```ts
try {
    await db.exec("INSERTZ INTO my_table (name, employees) VALUES ()");
} catch (e: any) {
    console.log({
        message: e.message,
        cause: e.cause.message,
    });
}
/*
{
  "message": "D1_EXEC_ERROR",
  "cause": "Error in line 1: INSERTZ INTO my_table (name, employees) VALUES (): sql error: near \"INSERTZ\": syntax error in INSERTZ INTO my_table (name, employees) VALUES () at offset 0"
}
*/
```

## View logs

View a stream of live logs from your Worker by using [`wrangler tail`](/workers/observability/log-from-workers/#view-logs-using-wrangler-tail) or via the [Cloudflare dashboard](/workers/observability/log-from-workers/#view-logs-from-the-dashboard).

## Report issues

{{<Aside type="note" header="Reporting bugs during the open alpha">}}

D1 is in open alpha and we welcome any bug reports or issues.

{{</Aside>}}

* To report bugs or request features, go to the [Cloudflare Community Forums](https://community.cloudflare.com/c/developers/d1/85).
* To give feedback, go to the [D1 Discord channel](https://discord.com/invite/cloudflaredev).
* If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository](https://github.com/cloudflare/workers-sdk/issues/new/choose)."

You should include as much of the following in any bug report:

* The ID of your database: use `wrangler d1 list` to match a database name to its ID.
* The query, or queries, that you ran when you encountered an issue. Ensure you redact any personally identifying information (PII).
* The Worker code that makes the query, including any calls to `.bind()` using the [client API](/d1/platform/client-api/).
* The full error text, including the content of [`error.cause.message`](#handle-errors).

## Related resources

* Learn [how to debug Workers](/workers/observability/debug-workers/).
* Understand how to [access logs](/workers/observability/log-from-workers/) generated from your Worker and D1.
* Use [`wrangler dev`](/workers/wrangler/commands/#dev) to run your Worker and D1 locally and debug issues before deploying.
