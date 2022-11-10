---
pcx_content_type: reference
title: Make your first API request
weight: 3
---

# Make your first Radar API request

To make your first request to Cloudflare's Radar API, you must obtain your [API token](/fundamentals/api/get-started/create-token/). You can create a `Custom Token`, with the `User - User Details` permissions group, and an `Edit` access level.

Once you have the token, you are ready to make your first request to Radar's API hosted at `https://api.cloudflare.com/client/v4/radar/`.

## Using curl

In the following example, let's look at the global percentage distribution of device types, e.g. mobile and desktop traffic, for the last 7 days (for more information refer to this [endpoint's reference](https://api.cloudflare.com/#radar-http-get-a-summary-of-device-types)):

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

You should get something like this:

```json
{
	"success": true,
	"errors": [],
	"result": {
		"summary_0": {
			"desktop": "58.223483",
			"mobile": "41.725833",
			"other": "0.050684"
		},
		"meta": {
			"dateRange": {
				"startTime": "2022-10-26T14:00:00Z",
				"endTime": "2022-11-02T14:00:00Z"
			},
			"normalization": "PERCENTAGE",
			...
		}
	}
}
```

Out of all requests, 41% are classified as coming from mobile devices.


{{<Aside type="note" >}} Cloudflare Radar attempts to provide trends and insights into general Internet usage, using the traffic that Cloudflare sees. As such, it only provides data on _eyeball_ traffic, i.e. traffic coming from end-users, unless otherwise specified (for example, origin fetches are excluded).
{{</Aside>}}

Above, you are looking at _all_ traffic but you can also look at just traffic classified as coming from humans (the default in [Cloudflare Radar](https://radar.cloudflare.com)) by adding `botClass=LIKELY_HUMAN`, or only at traffic coming from bots `botClass=LIKELY_AUTOMATED` (more on [bot classes](/radar/concepts/bot-classes)). For example:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&botClass=LIKELY_AUTOMATED&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

Running the above, do you see any differences between both in the distribution of mobile vs desktop traffic?

{{<Aside type="note" header="The result.meta property">}}
The `result.meta` property in the response will include metadata about the current request. In the example above, it returns the actual date range that was looked at in `meta.dateRange`, and what the number values represent (more on [normalization methods](/radar/concepts/normalization)) in `meta.normalization`.

When we're looking at a timeseries, it will also include the returned [aggregation interval](/radar/concepts/aggregation-intervals) in `meta.aggInterval`.

The `meta.confidenceInfo.level`, when present, will also provide an indication of how much confidence we have in the data, either due to internal issues affecting data quality or due to not having a lot of data for a given location or Autonomous System (AS). In these cases, the level will be below 5 (see [here](/radar/concepts/confidence-levels) for more information).
{{</Aside>}}


## Using Python

[Python](https://www.python.org/) has become one of the standard languages in data analysis so here's quick example on how to chart the same data using [Requests](https://pypi.org/project/requests/) and [Pandas](https://pandas.pydata.org/) libraries. Here we're using `format=csv` in the parameters to make it easier for Pandas to import.

```python
import io
import requests
import pandas as pd

cf_api_url = "https://api.cloudflare.com/client/v4"
params = "dateRange=7d&format=csv"
my_token = "xxx" # TODO replace
r = requests.get(f"{cf_api_url}/radar/http/summary/device_type?{params}",
  headers={ "Authorization": f"Bearer {my_token}"})
df = pd.read_csv(io.StringIO(r.text))
df.plot(kind="bar", stacked=True)
```


## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/get-started/making-comparisons">}}Making comparisons{{</button>}}
{{</button-group>}}