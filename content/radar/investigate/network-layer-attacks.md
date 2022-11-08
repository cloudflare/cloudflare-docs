---
pcx_content_type: reference
title: Network layer attacks
weight: 3
---

# Network layer attacks

Here we're looking at [DDoS](https://www.cloudflare.com/en-gb/learning/ddos/layer-3-ddos-attacks/) attack trends at the network layer. These attacks can be split by the network protocol they use: [ICMP](https://www.cloudflare.com/en-gb/learning/ddos/glossary/internet-control-message-protocol-icmp/), [TCP](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/), [UDP](https://www.cloudflare.com/en-gb/learning/ddos/glossary/user-datagram-protocol-udp/) and others.

{{<Aside type="note">}}
Unlike in [Application Layer Attacks](/radar/investigate/application-layer-attacks), in network layer attacks, due to [IP spoofing](https://www.cloudflare.com/en-gb/learning/ddos/glossary/ip-spoofing/), location attribution does not use the location associated with the client's IP, but the location of the data center itself.
{{</Aside>}}

When filtering by location or AS, we're filtering by the _source_ location/AS of the attack (which can be very different to the location of the human orchestrator of the attack, see [botnets](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-botnet/) for example).

## Timeseries

### Example: hourly percentage breakdown by attack method

Let's look at the worldwide vs Singapore distribution of mitigated attacks by network protocol:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/attacks/layer3/timeseries_groups?name=global&dateRange=1d&location=&name=singapore&location=SG&dateRange=1d&aggInterval=1h&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

Looking at the abbreviated response below, we see that globally, at those timestamps, UDP and TCP attacks were pretty evenly split.

```json
{
	"success": true,
	"errors": [],
	"result": {
		"global": {
			"timestamps": ["2022-11-06T13:00:00Z", "2022-11-06T14:00:00Z", "..."],
			"udp": ["50.784034", "51.055221", "..."],
			"tcp": ["49.213944", "48.943769", "..."],
			"icmp": ["0.002023", "0.001009", "..."],
			"gre": ["0.0", "0.0", "0.0", "..."]
		},
		"singapore": {
			"timestamps": ["2022-11-06T13:00:00Z", "2022-11-06T14:00:00Z", "..."],
			"tcp": ["79.605287", "83.943885", "..."],
			"udp": ["20.394594", "16.056115", "..."],
			"icmp": ["0.000119", "0.0", "..."],
			"gre": ["0.0", "0.0", "..."]
		},
		"meta": {
			"dateRange": {
				"startTime": "2022-11-06T13:00:00Z",
				"endTime": "2022-11-07T13:00:00Z"
			},
			"normalization": "PERCENTAGE",
		}
	}
}
```

We can also see that the distribution of network layer attacks coming _from_ Singapore or, more accurately, reaching our data center located in Singapore, differs quite a bit from the worldwide distribution, at those times, clearly favoring [TCP](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) attack methods.


## Summary

### Example: Russia - overall percentage breakdown by network protocol

We can also filter by _source_ location and look at attacks coming _from_ Russia:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/attacks/layer3/summary?location=RU&name=attacks_ru&dateRange=1d&format=json" \
     -H "Authorization: Bearer <API_TOKEN>"
```

```json
{
	"success": true,
	"errors": [],
	"result": {
		"attacks_ru": {
			"udp": "86.682356",
			"tcp": "11.928664",
			"gre": "1.381015",
			"icmp": "0.007965"
		},
		"meta": {
			"dateRange": {
				"startTime": "2022-11-06T15:00:00Z",
				"endTime": "2022-11-07T15:00:00Z"
			},
			"normalization": "PERCENTAGE"
		}
	}
}
```

We see that attacks coming from Russia to other locations, at the time above, tend to use the [UDP](https://www.cloudflare.com/en-gb/learning/ddos/glossary/user-datagram-protocol-udp/) network protocol.


## Next steps

{{<button-group>}}
  {{<button type="primary" href="/radar/investigate/dns">}}Investigate DNS queries{{</button>}}
  {{<button type="secondary" href="/radar/investigate">}}Investigate others{{</button>}}
{{</button-group>}}