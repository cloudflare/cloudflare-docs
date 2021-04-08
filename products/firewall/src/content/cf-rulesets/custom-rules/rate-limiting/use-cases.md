---
order: 19
title: Common use cases
---

# Common rate limiting use cases
 
<Aside type='warning' header='Important'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

The examples below include sample Rate Limiting Rule configurations that address common rate limiting use cases.
 
## Example 1
 
The following rule performs rate limiting on incoming requests from the US addressed at the login page, except for one allowed IP address.

<Example>

Expression:<br />
`(http.request.uri.path eq "/login" and ip.geoip.country eq "US" and ip.src ne 192.0.0.1)`
 
Rule characteristics:
* _Data center ID_ (included by default when creating the rule in the dashboard)
* _IP Address_

</Example>

## Example 2

The following rule performs rate limiting on incoming requests with a given base URI path, incrementing on the IP address and the provided API key.
 
<Example>

Expression:<br />
`(http.request.uri.path contains "/product*" and http.request.method eq "POST")`
 
Rule characteristics:
* _Data center ID_ (included by default when creating the rule in the dashboard)
* _IP Address_
* _HTTP Header_ > `x-api-key`

</Example>

## Example 3

The following rule performs rate limiting on requests targeting multiple URI paths in two hosts, excluding known bots. The request rate is based on IP address and `User-Agent` values. When the request rate is reached, Cloudflare performs rate limiting on all incoming requests for the two hosts.

<Example>

Expression:<br />
`(http.request.uri.path eq "/store" or http.request.uri.path eq "/prices") and (http.host eq "mystore1.com" or http.host eq "mystore2.com") and not cf.client.bot`

Rule characteristics:
* _Data center ID_ (included by default when creating the rule in the dashboard)
* _IP Address_
* _HTTP Header_ > `user-agent`

Mitigation expression:<br/>
`(http.host eq "mystore1.com" or http.host eq "mystore2.com")`

</Example>

<Aside type='warning' header='Important'>

You can only define a value for the **Mitigation expression** via API. 

</Aside>