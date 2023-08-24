---
pcx_content_type: concept
title: Cron Triggers
layout: single
---

# Cron Triggers

## Background

Cron Triggers allow users to map a cron expression to a Worker using a [`ScheduledEvent`](/workers/runtime-apis/scheduled-event/) listener that enables Workers to be executed on a schedule.

Cron Triggers are ideal for running periodic jobs, such as for maintenance or calling third-party APIs to collect up-to-date data. Workers scheduled by Cron Triggers will run on underutilized machines to make the best use of Cloudflare's capacity and route traffic efficiently.

Cron Triggers execute on UTC time.

## Add a Cron Trigger

### 1. Define a scheduled event listener

To respond to a Cron Trigger, you must add a [`"scheduled"` event](/workers/runtime-apis/scheduled-event/) listener, or export a default `scheduled` handler to your Workers code.

Refer to the following examples to write your code:

* [Setting Cron Triggers](/workers/examples/cron-trigger/)
* [Multiple Cron Triggers](/workers/examples/multiple-cron-triggers/)

### 2. Update configuration

After you have updated your Worker code to include a `"scheduled"` event, you must update your Worker project configuration.

#### Via `wrangler.toml`

If a Worker is managed with Wrangler, Cron Triggers should be exclusively managed through the [`wrangler.toml`](/workers/wrangler/configuration/) file.

Refer to the example below for a sample `wrangler.toml` Cron Triggers configuration:

```toml
[triggers]
# Schedule cron triggers:
# - At every 3rd minute
# - At 3PM on first day of the month
# - At 11:59PM on the last weekday of the month
crons = [ "*/3 * * * *", "0 15 1 * *", "59 23 LW * *" ]
```

You also can set a different Cron Trigger for each [environment](/workers/wrangler/environments/) in your `wrangler.toml`. You need to put the `[triggers]` table under your chosen environment. For example:

```toml
[env.dev.triggers]
crons = ["0 * * * *"]
```

#### Via the dashboard

To add Cron Triggers in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Triggers** > **Cron Triggers**.

## Supported cron expressions

Cloudflare supports cron expressions with five fields, along with most [Quartz scheduler](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html#introduction)-like cron syntax extensions:

{{<table-wrap>}}

| Field         | Values                                                             | Characters   |
| ------------- | ------------------------------------------------------------------ | ------------ |
| Minute        | 0-59                                                               | \* , - /     |
| Hours         | 0-23                                                               | \* , - /     |
| Days of Month | 1-31                                                               | \* , - / L W |
| Months        | 1-12, case-insensitive 3-letter abbreviations ("JAN", "aug", etc.) | \* , - /     |
| Weekdays      | 1-7, case-insensitive 3-letter abbreviations ("MON", "fri", etc.)  | \* , - / L # |

{{</table-wrap>}}

### Examples

Some common time intervals that may be useful for setting up your Cron Trigger:

{{<definitions>}}

- `* * * * *`

  - At every minute

- `*/30 * * * *`

  - At every 30th minute

- `45 * * * *`

  - On the 45th minute of every hour

- `0 17 * * sun` or `0 17 * * 1`

  - 5PM on Sunday

- `10 7 * * mon-fri` or `10 7 * * 2-6`

  - 7:10AM on weekdays

- `0 15 1 * *`

  - 3PM on first day of the month

- `0 18 * * 6L` or `0 18 * * friL`

  - 6PM on the last Friday of the month

- `59 23 LW * *`
  - 11:59PM on the last weekday of the month

{{</definitions>}}

## Test Cron Triggers

The recommended way of testing Cron Triggers is using Wrangler. 

{{<Aside type="note" header="Cron Trigger changes take time to propagate.">}}

Changes such as adding a new Cron Trigger, updating an old Cron Trigger, or deleting a Cron Trigger may take several minutes (up to 15 minutes) to propagate to the Cloudflare global network.

{{</Aside>}}

Test  Cron Triggers using `Wrangler` by passing in the `--test-scheduled` flag to [`wrangler dev`](/workers/wrangler/commands/#dev). This will expose a `/__scheduled` route which can be used to test using a HTTP request. To simulate different cron patterns, a `cron` query parameter can be passed in.

```sh
$ wrangler dev --test-scheduled

$ curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
```

## View past events

Users can review the execution history of their Cron Triggers in **Past Events** under [**Triggers**](https://dash.cloudflare.com/?to=/:account/workers) or through Cloudflare's [GraphQL Analytics API](/analytics/graphql-api).

{{<Aside type="note">}}

It can take up to 30 minutes before events are displayed in **Past Events** when creating a new Worker or changing a Worker's name.

{{</Aside>}}

Refer to [Metrics and Analytics](/workers/observability/metrics-and-analytics/) for more information.

## Remove a Cron Trigger

### Via the dashboard

To delete a Cron Trigger on a deployed Worker via the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Workers & Pages**, and select your Worker.
3. Go to **Triggers** > select the three dot icon next to the Cron Trigger you want to remove > **Delete**.

### Via `wrangler.toml`

To disable a Cron Trigger on a deployed Worker, set `crons = []`. Commenting out the `crons` key will not disable a Cron Trigger.

## Limits

Refer to [Limits](/workers/platform/limits/) to track the maximum number of Cron Triggers per Worker.

## Green Compute

With Green Compute enabled, your Cron Triggers will only run on Cloudflare points of presence that are located in data centers that are powered purely by renewable energy. Organizations may claim that they are powered by 100 percent renewable energy if they have procured sufficient renewable energy to account for their overall energy use.

Renewable energy can be purchased in a number of ways, including through on-site generation (wind turbines, solar panels), directly from renewable energy producers through contractual agreements called Power Purchase Agreements (PPA), or in the form of Renewable Energy Credits (REC, IRECs, GoOs) from an energy credit market.

## Related resources

* [Triggers](/workers/wrangler/configuration/#triggers) - Review `wrangler.toml` syntax for Cron Triggers.
