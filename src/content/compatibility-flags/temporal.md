---
_build:
  publishResources: false
  render: never
  list: never

name: "Enable the Temporal API"
sort_date: "2026-12-01"
enable_date: "2026-12-01"
enable_flag: "temporal"
disable_flag: "no_temporal"
---

Makes the [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) available in your Worker. Temporal is the modern JavaScript standard for working with dates and times, and replaces many of the uses of `Date` and of date libraries such as Moment.js, Luxon, or date-fns.

With Temporal you can:

- Convert between time zones, with daylight saving time handled for you.
- Work with plain dates and times, such as a birthday or an opening hour, without a time zone getting in the way.
- Add and subtract durations like "1 month and 3 days" and get calendar-correct results.
- Compare and sort dates and times, and format them for any locale.

Temporal objects are immutable, so a value never changes after you create it.

```js
const meeting = Temporal.ZonedDateTime.from(
	"2026-12-15T09:30[America/New_York]",
);

meeting.withTimeZone("Europe/London").toString();
// "2026-12-15T14:30:00+00:00[Europe/London]"

meeting.add({ months: 1 }).toPlainDate().toString();
// "2027-01-15"
```

`Temporal.Now` returns the same time as `Date.now()`. For more information, refer to [Performance and timers](/workers/runtime-apis/performance/).
