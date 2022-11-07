---
pcx_content_type: reference
title: Application layer attacks
weight: 3
---

# Application layer attacks

While in [HTTP requests](/radar/investigate/http-requests) we were looking at all kinds of web requests, here we're looking at only mitigated requests. These requests can be mitigated by one of several Cloudflare products, e.g. [WAF](/waf), [DDos Protection](/ddos-protection), [Bot Management](/bots) and others.

Since we're looking at attacks, we can look at both sides of an attack, the source location of the attack and the target location of the attack. For the source of the attack, the location associated with the IP, that the attack is coming from, is used (take into account that the human orchestrator of the attack may be in a different location than the computer the attack is originating from). For the target location of the attacks, we're using the billing location associated with the zone under attack.

This ability to filter by both sides of the attack is only available in the `top locations` endpoints. Others, unless otherwise specified, are filtering by _source_ location, i.e. the origin location of the attack.

With regards to attacks magnitude, it's defined by the total number of mitigated requests unless otherwise specified.

Like in [HTTP requests](/radar/investigate/http-requests), these endpoints can be split into the ability to fetch a timeseries, a single value summarizing the entire date range, and a list of top locations.

## Timeseries

### Example: global percentage breakdown by attack mitigation product, per hour

Let's look at the global distribution of mitigated requests by product:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/attacks/layer7/timeseries_groups?aggInterval=1h&dateRange=1d&name=attacks&format=json" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

Looking at the abbreviated response below, we see that DDoS makes up the majority of the requests (which makes sense since by the very nature of this attack type it will perform more requests), followed by WAF and then by IP Reputation.

```json
{
	"success": true,
	"errors": [],
	"result": {
		"attacks": {
			"timestamps": ["2022-11-05T11:00:00Z", ".."],
			"ddos": ["53.824302", "54.305823",  ".."],
			"waf": ["39.760956", "39.31228",  ".."],
			"ip_reputation": ["5.623487", "5.485468",  ".."],
			"access_rules": ["0.648368", "0.676456",  ".."],
			"bot_management": ["0.139733", "0.217155",  ".."],
			"api_shield": ["0.003154", "0.002819",  ".."],
			"data_loss_prevention": ["0.0", "0.0",  ".."]
		},
		"meta": {
			"dateRange": {
				"startTime": "2022-11-05T11:00:00Z",
				"endTime": "2022-11-06T11:00:00Z"
			},
		}
	}
}
```


## Summary

### Example: Great Britain - overall percentage breakdown by attack mitigation product

We can also filter by _source_ location and look at attacks coming _from_ Great Britain:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/attacks/layer7/summary?location=GB&name=attacks_gb&aggInterval=1h&dateRange=1d&format=json" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

```json
"attacks_gb": {
  "waf": "75.012138",
  "ddos": "18.539149",
  "ip_reputation": "5.721021",
  "access_rules": "0.592515",
  "bot_management": "0.131998",
  "api_shield": "0.003178",
  "data_loss_prevention": "0.0"
}
```

This can read as, 75% of all mitigated requests coming from Great Britain were mitigated by the [WAF](/waf) product.


## Top

### Example: Top target locations

Let's look at application layer attacks by target location, in the last 24 hours:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/attacks/layer7/top/locations/target?name=attacks_target&limit=5&dateRange=1d&format=json" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

```json
{
	"success": true,
	"errors": [],
	"result": {
		"attacks_target": [{
			"targetCountryName": "Belgium",
			"targetCountryAlpha2": "BE",
			"value": "18.536740",
			"rank": 1
		}, {
			"targetCountryName": "United States",
			"targetCountryAlpha2": "US",
			"value": "16.116210",
			"rank": 2
		}, {
			"targetCountryName": "China",
			"targetCountryAlpha2": "CN",
			"value": "13.864696",
			"rank": 3
		}, {
			"targetCountryName": "India",
			"targetCountryAlpha2": "IN",
			"value": "4.344139",
			"rank": 4
		}, {
			"targetCountryName": "Germany",
			"targetCountryAlpha2": "DE",
			"value": "4.182777",
			"rank": 5
		}],
		"meta": {
			"dateRange": {
				"startTime": "2022-11-05T12:00:00Z",
				"endTime": "2022-11-06T12:00:00Z"
			},
		}
	}
}
```

Take into account that, as said above, target location comes from the billing location of the zone under attack.



### Example: Top attacks

What source-target location pairs constitute the biggest attacks in the last 24 hours?

How big an attack is, or the attack magnitude, can be defined by the number of mitigated requests (the default) or by the number of total zones affected.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/attacks/layer7/top/attacks?limit=5&dateRange=1d&magnitude=MITIGATED_REQUESTS&format=json" \
     -H "Authorization: Bearer <API_TOKEN>" \
     -H "Content-Type: application/json"
```

```
[{
  "originCountryName": "United States",
  "originCountryAlpha2": "US",
  "targetCountryName": "United States",
  "targetCountryAlpha2": "US",
  "value": "3.790724",
  "rank": 1
}, {
  "originCountryName": "United States",
  "originCountryAlpha2": "US",
  "targetCountryName": "Belgium",
  "targetCountryAlpha2": "BE",
  "value": "3.602177",
  "rank": 2
}, {
  "originCountryName": "China",
  "originCountryAlpha2": "CN",
  "targetCountryName": "Netherlands",
  "targetCountryAlpha2": "NL",
  "value": "3.017341",
  "rank": 3
}, {
  "originCountryName": "China",
  "originCountryAlpha2": "CN",
  "targetCountryName": "China",
  "targetCountryAlpha2": "CN",
  "value": "2.472068",
  "rank": 4
}, {
  "originCountryName": "Indonesia",
  "originCountryAlpha2": "ID",
  "targetCountryName": "China",
  "targetCountryAlpha2": "CN",
  "value": "2.056729",
  "rank": 5
}]
```

This can be read as, 3.79% of all mitigated requests are from and to the US, 3.6% of all mitigated requests are from the US to Belgium, etc. This is using attack magnitude as the sum of mitigated requests, we could instead use another metric, the number of unique zones attacked by using `attack_magnitude=AFFECTED_ZONES`.


## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/network-layer-attacks">}}Investigate network layer attacks{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}