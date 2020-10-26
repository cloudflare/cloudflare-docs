---
title: Understanding the basics
order: 12
---

# Understanding the basics

## Data retention period

You can query for logs starting from 1 minute in the past (relative to the actual time that you're making the query) and going back at least 3 days and up to 7 days.

## Access pattern

The basic access pattern is *give me all the logs for zone Z for minute M* where the minute *M* refers to the time the log entries were written to disk in Cloudflare's log aggregation system.

Try running your query every minute to start. If responses are too small, go up to 5 minutes as this will be appropriate for most zones. If the responses are too large, trying going down to 15 seconds.

If your zone has so many logs that it takes longer than 1 minute to read 1 minute worth of logs, run 2 workers staggered, each requesting 1 minute worth of logs every 2 minutes.

Data returned by the API will not change on repeat calls. The order of messages in the response may be different, but the number and content of the messages will always be the same for a given query as long as the response code is 200 and there is no error reading the response body.

Because our log processing system ingests data in batches, most zones with less than 1 million requests per minute will have "empty" minutes. Queries for such a minute result in responses with status 200 but no data in the body. This does not mean that there were no requests proxied by Cloudflare for that minute. It just means that our system did not process a batch of logs for that zone in that minute.

## Order of the data returned

The `logs/received` API endpoint exposes data by time received, which is the time the event was written to disk in the Cloudflare Logs aggregation system.

Ordering by log aggregation time instead of log generation time results in lower (faster) log pipeline latency and deterministic log pulls. Functionally, it is similar to tailing a log file or reading from *rsyslog* (albeit in chunks).

This means that to obtain logs for a given time range, you can issue one call for each consecutive minute (or other time range). Because log lines are batched by time received and made available, there is no late arriving data. A response for a given minute will never change. You do not have to repeatedly poll a given time range to receive logs as they converge on our aggregation system.

## Format of the data returned

The Logpull API returns data in NDJSON format, whereby each log line is a valid JSON object. Major analysis tools like Google BigQuery and AWS Kinesis require this format.

To turn the resulting log data into a JSON array with one array element per log line, you can use the *jq* tool.  Essentially, you pipe the API response into *jq* using the *slurp* (or simply *s*) flag:

`<API request data> | jq -s`

Below is a sample log with default fields:

```bash
{
    "ClientIP": "89.163.242.206",
    "ClientRequestHost": "www.theburritobot.com",
    "ClientRequestMethod": "GET",
    "ClientRequestURI": "/static/img/testimonial-hipster.png",
    "EdgeEndTimestamp": 1506702504461999900,
    "EdgeResponseBytes": 69045,
    "EdgeResponseStatus": 200,
    "EdgeStartTimestamp": 1506702504433000200,
    "RayID": "3a6050bcbe121a87"
}
```