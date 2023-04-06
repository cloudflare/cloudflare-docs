---
pcx_content_type: reference
title: Make your first API request
meta:
    title: Make your first Radar API request
weight: 1
---

# Make your first Radar API request

To make your first request to Cloudflare's Radar API, you must obtain your [API token](/fundamentals/api/get-started/create-token/) first. Create a Custom Token, with _User_ > _User Details_ in the **Permissions** group, and select _Edit_ as the access level.

Once you have the token, you are ready to make your first request to Radar's API at `https://api.cloudflare.com/client/v4/radar/`.

## Example using cURL

In the following example, we will access the global percentage distribution of device types (like mobile and desktop traffic) for the last seven days. For more information, refer to [Get a summary of device types](/api/operations/radar_get_SummaryDeviceType) endpoint:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

A successful response will look similar to the following:

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

This response means that 41% of the requests are classified as coming from mobile devices, while 58% are desktop traffic.


{{<Aside type="note">}}Cloudflare Radar attempts to provide trends and insights into general Internet usage, using the traffic that goes through Cloudflare infrastructure. As such, Cloudflare Radar only provides data on traffic coming from end-users, unless otherwise specified (for example, origin fetches are excluded).
{{</Aside>}}

The previous example returns all traffic from bots and humans. However, you can access just the traffic classified as coming from humans (the default in [Cloudflare Radar](https://radar.cloudflare.com)) by adding `botClass=LIKELY_HUMAN`. You can also access traffic coming only from bots with `botClass=LIKELY_AUTOMATED` (refer to [bot classes](/radar/concepts/bot-classes) for more information). For example:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&botClass=LIKELY_AUTOMATED&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

Running the above, can you find any differences between both in the distribution of mobile versus desktop traffic?

{{<Aside type="note" header="The <code>result.meta</code> property">}}
The `result.meta` property in the response includes metadata about the current request. In the example above, `meta.dateRange` returns the date range specified in the query, while `meta.normalization` returns the type of normalization applied to the data (refer to [Normalization methods](/radar/concepts/normalization) for more information).

When querying for time series, `result.meta` will also include the returned [aggregation interval](/radar/concepts/aggregation-intervals) in `meta.aggInterval`.

When present, `meta.confidenceInfo.level` will also provide an indication of how much confidence Cloudflare has in the data. Confidence levels are affected either by internal issues affecting data quality or by Cloudflare not having sufficient data for a given location or Autonomous System (AS). In these cases, confidence level will be below `5` (refer to [Confidence levels](/radar/concepts/confidence-levels) for more information).
{{</Aside>}}

## Use Python

[Python](https://www.python.org/) has become one of the standard languages in data analysis. Here is a quick example on how to chart the same data using [Requests](https://pypi.org/project/requests/) and [Pandas](https://pandas.pydata.org/) libraries. Here, we are using `format=csv` in the parameters to make it easier for Pandas to import.

```python
import io
import requests
import pandas as pd

cf_api_url = "https://api.cloudflare.com/client/v4"
params = "dateRange=7d&format=csv"
my_token = "xxx" # TODO replace
r = requests.get(f"{cf_api_url}/radar/http/summary/device_type?{params}",
                 headers={"Authorization": f"Bearer {my_token}"})
df = pd.read_csv(io.StringIO(r.text))
df.plot(kind="bar", stacked=True)
```

### Notebooks

A [notebook](https://jupyter.org/) is a web-based interactive computing application, where text, code, and code outputs, like charts, can be combined into a single document. Refer to Radar's companion [colaboratory notebook](https://colab.research.google.com/github/cloudflare/radar-notebooks/blob/main/notebooks/example.ipynb) for more examples on how the API can be used in your own projects.


## Next steps

Refer to [Make comparisons](/radar/get-started/making-comparisons/) to learn how to compare data.