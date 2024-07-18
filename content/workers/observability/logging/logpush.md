---
pcx_content_type: concept
title: Logpush
meta:
  description: Send Workers Trace Event Logs to a supported third party, such as a storage or logging provider.
---

# Workers Trace Events Logpush

[Cloudflare Logpush](/logs/about/) supports the ability to send [Workers Trace Event Logs](/logs/reference/log-fields/account/workers_trace_events/) to a [supported destination](/logs/get-started/enable-destinations/). Worker’s Trace Events Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions. This product is available on the Workers Paid plan. For pricing information, refer to [Pricing](/workers/platform/pricing/#workers-trace-events-logpush).

{{<Aside type="warning">}}

Workers Trace Events Logpush is not available for zones on the [Cloudflare China Network](/china-network/).

{{</Aside>}}

## Verify your Logpush access

Workers Logpush requires a Wrangler version of `2.2.0` or higher. Check your version by running `wrangler version`. To update Wrangler, refer to [Install/Update Wrangler](/workers/wrangler/install-and-update/).

To configure a Logpush job, verify that your Cloudflare account role can use Logpush. To check your role:

1. Log in the [Cloudflare dashboard](https://dash.cloudflare.com). 
2. Select your account and scroll down to **Manage Account** > **Members**.
3. Check your account permissions. Roles with Logpush configuration access are different than Workers permissions. Super Administrators, Administrators, and the Log Share roles have full access to Logpush.
 
Alternatively, create a new [API token](/fundamentals/api/get-started/create-token/) scoped at the Account level with Logs Edit permissions. 
 
## Create a Logpush job

### Via the Cloudflare dashboard

To create a Logpush job in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account.
2. Select **Analytics & Logs** > **Logs**.
3. Select **Add Logpush job**.
4. Select **Workers trace events** as the data set > **Next**.
5. If needed, customize your data fields. Otherwise, select **Next**.
6. Follow the instructions on the dashboard to verify ownership of your data's destination and complete job creation.

### Via cURL

The following example sends Workers logs to R2. For more configuration options, refer to [Enable destinations](/logs/get-started/enable-destinations/) and [API configuration](/logs/get-started/api-configuration/) in the Logs documentation.
 
```json
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/jobs' \
-H 'X-Auth-Key: <API_KEY>' \
-H 'X-Auth-Email: <EMAIL>' \
-H 'Content-Type: application/json' \
-d '{
"name": "workers-logpush",
"logpull_options": "fields=Event,EventTimestampMs,Outcome,Exceptions,Logs,ScriptName",
"destination_conf": "r2://<BUCKET_PATH>/{DATE}?account-id=<ACCOUNT_ID>&access-key-id=<R2_ACCESS_KEY_ID>&secret-access-key=<R2_SECRET_ACCESS_KEY>",
"dataset": "workers_trace_events",
"enabled": true
}'| jq .
```

In Logpush, you can configure [filters](/logs/reference/filters/) and a [sampling rate](/logs/get-started/api-configuration/#sampling-rate) to have more control of the volume of data that is sent to your configured destination. For example, if you only want to receive logs for requests that did not result in an exception, add the following `filter` JSON property below `logpull_options`:
 
`"filter":"{\"where\": {\"key\":\"Outcome\",\"operator\":\"!eq\",\"value\":\"exception\"}}"`

## Enable logging on your Worker
 
Enable logging on your Worker by adding a new property, `logpush = true`, to your `wrangler.toml` file. This can be added either in the top-level configuration or under an [environment](/workers/wrangler/environments/). Any new Workers with this property will automatically get picked up by the Logpush job. 
 
```toml
---
filename: wrangler.toml
---

# Top-level configuration

name = "my-worker"
main = "src/index.js"
compatibility_date = "2022-07-12"

workers_dev = false
logpush = true
route = { pattern = "example.org/*", zone_name = "example.org" }
```

Configure via multipart script upload API:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/workers/scripts/<SCRIPT_NAME>" \
-H 'X-Auth-Key: <API_KEY>' \
-H 'X-Auth-Email: <EMAIL>' \
--form 'metadata={"main_module": "my-worker.js", "logpush": true}' \
--form '"my-worker.js"=@./my-worker.js;type=application/javascript+module'
```

## Limits

The `logs` and `exceptions` fields have the following limits in place.

* Message size: Maximum of 2056 characters per log line
* Array limit: 20 elements
* Log message array: A nested array with a limit of 20 elements
