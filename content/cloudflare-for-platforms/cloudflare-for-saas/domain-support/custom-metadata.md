---
pcx_content_type: concept
title: Custom metadata
weight: 3
---

# Custom metadata

You may wish to configure per-hostname (customer) settings beyond the scale of Page Rules or Rate Limiting, which have a maximum of 125 rules each.

To do this, you will first need to reach out to your account team to enable access to Custom Metadata. After configuring custom metadata, you can use it in the following ways:

* Read the metadata JSON from [Cloudflare Workers](/workers/) (requires access to Workers) to define per-hostname behavior.
* Use custom metadata values in [rule expressions](/ruleset-engine/rules-language/expressions/) of different Cloudflare security products to define the rule scope.

{{<render file="_ssl-for-saas-plan-limitation.md">}}

---

## Examples

- Per-customer URL rewriting — for example, customers 1-10,000 fetch assets from server A, 10,001-20,000 from server B, etc.
- Adding custom headers — for example, `X-Customer-ID: $number` based on the metadata you provided
- Setting HTTP Strict Transport Security (“HSTS”) headers on a per-customer basis

Please speak with your Solutions Engineer to discuss additional logic and requirements.

## Submitting custom metadata

You may add custom metadata to Cloudflare via the Custom Hostnames API. This data can be added via a `PATCH` request to the specific hostname ID to set metadata for that hostname, for example:

```bash
$ curl -sXPATCH \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/custom_hostnames/<HOSTNAME_ID>" \
-H "X-Auth-Email: {email}" \
-H "X-Auth-Key: {key}" \
-H "Content-Type: application/json" \
-d '{
  "ssl": {
    "method": "http",
    "type":"dv"
  },
  "custom_metadata": {
    "customer_id": "12345",
    "redirect_to_https": true,
    "security_tag": "low"
  }
}'
```

Changes to metadata will propagate across Cloudflare’s edge within 30 seconds.

---

## Accessing custom metadata from a Cloudflare Worker

The metadata object will be accessible on each request using the `request.cf.hostMetadata` property. You can then read the data, and customize any behavior on it using the Worker.

In the example below we will use the user_id in the Worker that was submitted using the API call above `"custom_metadata":{"customer_id":"12345","redirect_to_https": true,"security_tag":"low"}`, and set a request header to send the `customer_id` to the origin:

```js
addEventListener('fetch', event => {
  event.respondWith(fetchAndAddHeader(event.request));
});
/**
 * Fetch and add a X-Customer-Id header to the origin based on hostname
 * @param {Request} request
 */ async function fetchAndAddHeader(request) {
  let customer_id = request.cf.hostMetadata.customer_id;
  let newHeaders = new Headers(request.headers);
  newHeaders.append('X-Customer-Id', customer_id);
  let init = {
    headers: newHeaders,
    method: request.method,
  };
  let response = await fetch(request.url, init);
  return response;
}
```

## Accessing custom metadata in a rule expression

Use the [`cf.hostname.metadata`](/ruleset-engine/rules-language/fields/#field-cf-hostname-metadata) field to access the metadata object in rule expressions. To obtain the different values from the JSON object, use the [`lookup_json_string`](/ruleset-engine/rules-language/functions/#function-lookup_json_string) function.

The following rule expression defines that there will be a rule match if the `security_tag` value in custom metadata contains the value `low`:

```txt
lookup_json_string(cf.hostname.metadata, "security_tag") eq "low"
```

---

## Best practices

- Ensure that the JSON schema used is fixed: changes to the schema without corresponding Cloudflare Workers changes will potentially break websites, or fall back to any defined “default” behavior
- Prefer a flat JSON structure
- Use string keys in snake_case (rather than camelCase or PascalCase)
- Use proper booleans (true/false rather than `true` or `1` or `0`)
- Use numbers to represent integers instead of strings (`1` or `2` instead of `"1"` or `"2"`)
- Define fallback behaviour in the non-presence of metadata
- Define fallback behaviour if a key or value in the metadata are unknown

General guidance is to follow [Google’s JSON Style guide](https://google.github.io/styleguide/jsoncstyleguide.xml) where appropriate.

---

## Limitations

There are some limitations to the metadata that can be provided to Cloudflare:

- It must be valid JSON.
- Any origin resolution — for example, directing requests for a given hostname to a specific backend — must be provided as a hostname that exists within Cloudflare’s DNS (even for non-authoritative setups). Providing an IP address directly will cause requests to error.
- The total payload must not exceed 4 KB.
- It requires a Cloudflare Worker that knows how to process the schema and trigger logic based on the contents.
- Custom metadata cannot be set on custom hostnames that contain wildcards.

You should not modify the schema — which includes adding/removing keys or changing possible values — without notifying Cloudflare. Changing the shape of the data will typically cause the Cloudflare Worker to either ignore the data or return an error for requests that trigger it.
  
### Terraform support
  
[Terraform](/terraform/) only allows maps of a single type, so Cloudflare's Terraform support for custom metadata for custom hostnames is limited to string keys and values.
