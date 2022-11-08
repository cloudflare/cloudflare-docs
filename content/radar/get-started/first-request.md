---
pcx_content_type: reference
title: Make your first API request
weight: 3
---

# Make your first API request

To make your first request to Cloudflare's Radar API, you must obtain your global API key or API token:

<details>
<summary>Your API Token</summary>
<div>

You need to create a custom token with the correct `Read` and `Update` permissions:

1. In the Cloudflare dashboard, locate [API Tokens](https://dash.cloudflare.com/profile/api-tokens) under **My Profile** > **API Tokens**.
2. Select **Create Token**.
3. In Custom token, select **Get started**.
4. Give your custom token a name.
5. Scroll to **Permissions**.
6. On the _Account_ drop-down menu, choose _User_.
6. On the _Select item..._ drop-down menu, choose _User Details_.
7. In the next drop-down menu, choose _Edit_.

![How to create a custom token for Cloudflare images](/radar/static/radar-api-token-permissions.png)

8. Select **Continue to summary** > **Create Token**.

Your token for Cloudflare Radar API is now created. Copy it and keep it in a safe place.

Refer to [Creating API tokens](/fundamentals/api/get-started/create-token/) for more details about API tokens.

</div>
</details>

Once you have this information, you are ready to make your first request using the API, hosted at `https://api.cloudflare.com/client/v4/radar/`.

## Using curl

In the following example, let's look at the percentage distribution of device types, e.g. mobile and desktop, traffic, for the last 7 days:

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

Above, you are looking at all traffic but you can look at only traffic classified as coming from humans (ie. excluding bots, the default in the Radar website) by adding `botClass=LIKELY_HUMAN` (more on [bot classes](/radar/concepts/bot-classes)):

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&botClass=LIKELY_HUMAN&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

The `meta` property in the response will include metadata about the current request. In the example above, it returns the actual date range that was looked at, and what the number values represent (more on [normalization methods](/radar/concepts/normalization)).

The request was made with the parameter `format=json` but we could also ask for a `csv` instead.


## Using Python

[Python](https://www.python.org/) has become one of the standard languages in data analysis so here's quick example on how to chart the same data using [Requests](https://pypi.org/project/requests/) and [Pandas](https://pandas.pydata.org/) libraries. Here we're using the `csv` format to make it easier for Pandas to import.

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