---
title: Debug D1
weight: 5
pcx_content_type: concept
---

# Debug

D1 allows you to capture exceptions and log errors returned when querying a database. To debug D1, you will use the same tools available when [debugging Workers](/workers/observability/).

## Handle errors

The D1 [client API](/d1/build-with-d1/d1-client-api/) returns detailed [error messages](/d1/build-with-d1/d1-client-api/#errors) within an `Error` object. 

To ensure you are capturing the full error message, log or return `e.message` as follows:

```ts
try {
    await db.exec("INSERTZ INTO my_table (name, employees) VALUES ()");
} catch (e: any) {
    console.error({
        message: e.message
    });
}
/*
{
  "message": "D1_EXEC_ERROR: Error in line 1: INSERTZ INTO my_table (name, employees) VALUES (): sql error: near \"INSERTZ\": syntax error in INSERTZ INTO my_table (name, employees) VALUES () at offset 0"
}
*/
```

## View logs

View a stream of live logs from your Worker by using [`wrangler tail`](/workers/observability/logging/real-time-logs#view-logs-using-wrangler-tail) or via the [Cloudflare dashboard](/workers/observability/logging/real-time-logs#view-logs-from-the-dashboard).

## Report issues

* To report bugs or request features, go to the [Cloudflare Community Forums](https://community.cloudflare.com/c/developers/d1/85).
* To give feedback, go to the [D1 Discord channel](https://discord.com/invite/cloudflaredev).
* If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository](https://github.com/cloudflare/workers-sdk/issues/new/choose).

You should include as much of the following in any bug report:

* The ID of your database. Use `wrangler d1 list` to match a database name to its ID.
* The query (or queries) you ran when you encountered an issue. Ensure you redact any personally identifying information (PII).
* The Worker code that makes the query, including any calls to `bind()` using the [client API](/d1/build-with-d1/d1-client-api/).
* The full error text, including the content of [`error.cause.message`](#handle-errors).

## Related resources

* Learn [how to debug Workers](/workers/observability/).
* Understand how to [access logs](/workers/observability/logging/) generated from your Worker and D1.
* Use [`wrangler dev`](/workers/wrangler/commands/#dev) to run your Worker and D1 locally and [debug issues before deploying](/workers/testing/local-development/).
