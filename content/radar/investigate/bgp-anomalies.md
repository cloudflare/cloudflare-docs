---
pcx_content_type: reference
title: BGP anomalies (beta)
weight: 3
---

{{<beta>}}BGP anomalies{{</beta>}}

To access Cloudflare Radar BGP Anomaly Detection results, you will first need to create an API token that includes a `User:User Details` permission. All the following examples should work with a free-tier Cloudflare account.

## Search BGP hijack events

In the following example, we will request the most recent BGP origin hijacks originated by or affecting `AS64512` (example ASN).

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/bgp/hijacks/events?invlovedAsn=64512&format=json&per_page=10" \
     -H "Authorization: Bearer <API_TOKEN>"
```

The result shows the most recent 10 BGP hijack events that affects `AS64512`.

```json
{
  "success": true,
  "errors": [],
  "result": {
    "asn_info": [
      {
        "asn": 64512,
        "org_name": "XXXXX",
        "country_code": "XX"
      },
      ...
    ],
    "events": [
      {
        "duration": 0,
        "event_type": 0,
        "hijack_msgs_count": 1,
        "hijacker_asn": 64512,
        "id": 1234,
        "is_stale": false,
        "max_hijack_ts": "2023-04-27T14:01:55.952",
        "max_msg_ts": "2023-04-27T14:01:55.952",
        "min_hijack_ts": "2023-04-27T14:01:55.952",
        "on_going_count": 1,
        "peer_asns": [
          8455
        ],
        "peer_ip_count": 1,
        "prefixes": [
          "192.0.2.0/24"
        ],
        "tags": [
          {
            "name": "irr_new_origin_invalid",
            "score": 4
          },
          {
            "name": "irr_old_origin_valid",
            "score": 0
          },
          ...
        ],
        "victim_asns": [
          64513
        ],
        "confidence_score": 4
      },
    ],
    "total_monitors": 163
  },
  ...
}
```

In the response we can learn about the following information about each event:
- `hijack_msg_count`: the number of potential BGP hijack messages observed from all peers.
- `peer_asns`: the AS numbers of the route collector peers who observed the hijack messages.
- `prefixes`: the affected prefixes.
- `hijacker_asn` and `victim_asns`: the potential hijacker ASN and victim ASNs.
- `confidence_score`: a quantitative score describing how confident the system is for this event being a hijack:
  - 1-3: low confidence.
  - 4-7: medium confidence.
  - 8-above: high confidence.
- `tags`: the evidence collected for the events. Each `tag` is also associated with a score that affects the overall confidence score:
  - a positive score indicates that the event is *more likely* to be a hijack.
  - a negative score indicates that the event is *less likely* to be a hijack.

Users can further filter out low-confidence events by attaching a `minConfidence=8` parameter, which will return only events with a `confidence_score` of `8` or higher.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/bgp/hijacks/events?invlovedAsn=64512&format=json&per_page=10&minConfidence=8" \
     -H "Authorization: Bearer <API_TOKEN>"
```

## Search BGP route leak events

BGP route leak is another type of BGP anomalies that Cloudflare Radar detects. Currently, we focus on detecting specifically
the `provider-customer-provider` type of route leak. You can learn more about our design and methodology in [our blog post][route-leak-blog-post].

[route-leak-blog-post]: https://blog.cloudflare.com/route-leak-detection-with-cloudflare-radar/

In the following example, we will request the most recent BGP route leak events affecting `AS64512`.

```bash
curl -X GET "https://api.cloudflare.com/client/v4/radar/bgp/leaks/events?invlovedAsn=64512&format=json&per_page=10" \
     -H "Authorization: Bearer <API_TOKEN>"
```

The result shows the most recent 10 BGP route leak events that affects `AS64512`.

```json
{
  "success": true,
  "errors": [],
  "result": {
    "asn_info": [
      {
        "asn": 64512,
        "org_name": "XXXXXXX",
        "country_code": "XX"
      },
      ...
    ],
    "events": [
      {
        "detected_ts": "2023-04-21T23:10:06",
        "finished": false,
        "id": 1234,
        "leak_asn": 64512,
        "leak_count": 14,
        "leak_seg": [
          64514,
          64512,
          64513
        ],
        "leak_type": 1,
        "max_ts": "2023-04-21T23:10:56",
        "min_ts": "2023-04-21T23:09:46",
        "origin_count": 1,
        "peer_count": 13,
        "prefix_count": 1
      },
      ...
    ]
  },
  ...
}
```

In the response we can learn about the following information about each event:
- `leak_asn`: the AS who potentially caused the leak
- `leak_seg`: the AS path segment observed and believed to be a leak
- `min_ts` and `max_ts`: the earliest and latest timestamps of the leak announcements
- `leak_count`: the total number of BGP route leak announcements observed
- `peer_count`: the number of route collector peers observed the leak
- `prefix_count` and `origin_count`: the number of prefixes and origin ASes affected by the leak

## Send alerts for BGP hijacks

In this example, we will show you how you can build a simple Cloudflare Workers app that sends out alerts for BGP hijacks
relevant to a given ASN using webhook (works for Google Hangouts, Discord, Telegram, etc) or Emails.

We will use Cloudflare Workers as the platform and use its Cron Triggers to periodically check for new alerts.

For the app, we would like it to do the following things:
1. fetch from Cloudflare API with a given API token
2. check against Cloudflare KV to know what events are new
3. construct messages for new hijacks and send out alerts via webhook triggers

### Worker app setup

We will start with setting up a Cloudflare Worker app using `wrangler`.

Let's first create a new workers app in a local directory
```bash
wrangler init hijack-alerts
```
When prompt to select a type of worker, choose ` Scheduled handler`.

In your `wrangler.toml` file, change the default checking frequency (once per hour) to what you like. Here is an example
of configuring the workers to run the script five minutes.
```toml
name = "hijack-alerts"
main = "src/index.js"
compatibility_date = "2023-04-27"

[triggers]
crons = [ "*/5 * * * *" ]
```

In this example, we will also need to use Cloudflare KV to save the latest checked event IDs which allows us to know what events are new.
Once you have created a KV (it's free!), you can head back to the `wranglers.toml` file and add the following sections in.
```toml
[[kv_namespaces]]
binding = "HIJACKS_KV"
id = "KV_ID_FOR_PRODUCTION"
preview_id = "TEMPORARY_KV_FOR_DEV_ENVIRONMENT"
```

### Fetch for newly detected BGP hijacks

Let's start with the API fetching function.

The following `apiFetch(env, paramsStr)` handles taking in a request parameters string, construct proper headers and
fetch from the Cloudflare API BGP hijacks endpoint.
```javascript
async function apiFetch (env, paramsStr) {
  const config = {
    headers:{
      "Authorization": `Bearer ${env.CF_API_TOKEN}`,
    }
  };
  const res = await fetch(`https://api.cloudflare.com/client/v4/radar/bgp/hijacks/events?${paramsStr}`, config);

  if(!res.ok){
    console.log(JSON.stringify(res))
    return null
  }
  return await (res).json()
}
```
The `env` parameter is passed in from the caller, and we do not need to worry about construct it. The `paramsStr` is a
string variable that holds the query parameters in a query URL.

Now in our main cron trigger function, we will need to construct the query parameters and call the API fetch function.
The default cron trigger worker script is defined as the follows:
```javascript

export default {
    async scheduled(controller, env, ctx) {
    ...
    }
}
```
In our example, we use the `env` variables to get the runtime variables like the TOKEN and ASN of interest, and Cloudflare
KV bindings. We do not use of the `contorller` and `ctx` variables in this example.

First, we will need to learn about what are the new events. We define new events as the events the app has not yet processed.
We use the Cloudflare KV bucket previously created and defined (`HIJACKS_KV`) to save and retrieve the most recent
processed event ID.
```javascript
let kv_latest_id = parseInt(await env.HIJACKS_KV.get("latest_id"));
const first_batch = isNaN(kv_latest_id);
```

The main loop that checks for the most recent events looks like this. (Some of the validation code is skipped.)
```javascript
let new_events = [];
let page = 1;
while(true) {
    // query for events
    const query_params = `per_page=10&page=${page}&involvedAsn=${env.TARGET_ASN}&sortBy=ID&sortOrder=DESC`
    const data = await apiFetch(env, query_params);

    // first batch, save KV value only
    if(first_batch) {
      await env.HIJACKS_KV.put("latest_id", (events[0].id).toString());
      return
    }

    // some validation skipped
    // ...

    let reached_last = false;
    for(const event of data.result.events){
      if(event.id <= kv_latest_id) {
        // reached the latest events
        reached_last = true;
        break
      }
      new_events.push(event)
    }
    if(reached_last){
      break
    }
    page += 1;
}
```


Now that we have all the newly detected events saved in `new_events` variable, we can then send out alerts:

```javascript
// sort events by increasing ID order
new_events.sort((a,b)=>a.id - b.id);
const kv_latest_id = new_events[new_events.length-1].id
// push new events
for(const event of new_events) {
  await send_alert(env, event);
}
// update latest_id KV value
await env.HIJACKS_KV.put("latest_id", kv_latest_id.toString());
```

### Send alerts using webhook

The function `send_alert` handles constructing alert message and sending out alerts using webhook. Here we provide a
very simple example plain-text message template using Google Hangouts webhook. Users can customize the message and the use of webhook based on their
platform of choice and needs.

```javascript
async function send_hangout_alert(env, event) {
	const webhook_url = `${env.WEBHOOK_URL}&threadKey=bgp-hijacks-event-${event.id}`;

	const data = JSON.stringify({
		'text':
			`Detected BGP hijack event (${event.id}):
Detected time: *${event.min_hijack_ts} UTC*
Detected ASN: *${event.hijacker_asn}*
Expected ASN(s): *${event.victim_asns.join(" ")}*
Prefixes: *${event.prefixes.join(" ")}*
Tags: *${event.tags.map((tag)=>tag.name).join(" ")}*
Peer Count: *${event.peer_ip_count}*
`,
	});
	await fetch(webhook_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: data,
	});
}
```

Note that the webhook is considered secret and should be set to the environment via `wrangler secret put WEBHOOK_URL` command.

The last step is to publish the app with command `wrangler publish` and the app should be up and running on your Cloudflare
account, and will be triggered to execute every five minutes.

### Send email alerts from Workers

If your app's domain has enabled [Email Routing][email-routing] feature, you can also send email alerts directly from
your Workers app. You can learn more about the email-sending feature following [this tutorial][email-workers-tutorial].

For this alerter app, you will need to add the `Emails binding` to the [`wrangler.toml`][wrangler-send-email] file.

```toml
send_email = [
    {type = "send_email", name = "SEND_EMAIL_BINDING", destination_address = "<YOUR_EMAIL>@example.com"},
]
```

Then you can create an email sending function like the follows to send alert emails to your configured destination address.
```javascript
async function send_email_alert(hijacker, prefixes, victims) {
  const msg = createMimeMessage();
  msg.setSender({ name: "BGP Hijack Alerter", addr: "<YOUR_APP>@<YOUR_APP_DOMAIN>" });
  msg.setRecipient("<YOUR_EMAIL>@example.com");
  msg.setSubject("BGP hijack alert");
  msg.addMessage({
    contentType: 'text/plain',
    data: `BGP hijack detected:
    Detected origin: ${hijacker}
    Expected origins: ${victims.join(" ")}
    Prefixes: ${prefixes.join(" ")}
    `
  })

  var message = new EmailMessage(
    "<YOUR_APP>@<YOUR_APP_DOMAIN>",
    "<YOUR_EMAIL>@example.com",
    msg.asRaw()
  );
  try {
    await env.SEND_EMAIL_BINDING.send(message);
  } catch (e) {
    return new Response(e.message);
  }
}
```

[email-routing]: https://developers.cloudflare.com/email-routing/
[email-workers-tutorial]: https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/
[wrangler-send-email]: https://developers.cloudflare.com/workers/wrangler/configuration/#email-bindings


## Next steps

Refer to our [API documentation][api-portal] for more information on these topics.

[api-portal]: https://developers.cloudflare.com/api/operations/radar_get_js