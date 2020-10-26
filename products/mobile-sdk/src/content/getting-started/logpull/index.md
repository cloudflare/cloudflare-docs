---
order: 1
---

# Logpull API

Cloudflare Mobile SDK Logpull is a REST API providing raw logs.

<Aside type="note">

__Note:__ Logpull API is not enabled by default, please contact Cloudflare Support to activate (requires Cloudflare dashboard user, other than Mobile SDK Portal user, to activate).

</Aside>

## Requesting logs

### Endpoint(s)
- `GET /mobilesdk/logs/logpull` - returns Mobile SDK metrics log data based on specified parameters

### Required authentication headers
The following headers are required for all endpoint calls:
- `X-Auth-Email` - the Cloudflare Account __Email Address__
- `X-Auth-Key` - the Cloudflare __Global API Key__
Please note that the __Email Address__ is one that registered in __Cloudflare Dashboard (dash.cloudflare.com)__, not Cloudflare Mobile SDK Portal (mobilesdk.cloudflare.com). The __Global API Key__ can also be obtained from Profile page of __Cloudflare Dashboard__.

### Parameters

<TableWrap>

Parameter | Description | Required
----------|-------------|---------
start | - Inclusive<br />- Accept either RFC3339 (2019-01-01T00:00:00Z) or unix time (1546300800, in seconds)<br />- Must be no more than 7 days earlier than now | yes
end | - Exclusive <br />- Accept either RFC3339 (2019-01-01T00:00:00Z) or unix time (1546300800, in seconds)<br />- Difference between start and end should not exceed 1hr | yes
clientKey | - Your App's Client Key (can be obtained from the Mobile SDK Portal) | yes
count | - Return up to that many records<br />- Do not include if returning all records | no
timestamps | - Format in which timestamp fields will be returned<br />- Value options are: unixnano (default), unix, rfc3339, rfc3339nano<br />- Timestamps retuned as integers for unix and unixnano and as strings for rfc3339 | no

</TableWrap>

### Example

```bash
curl -s \
    -H 'X-Auth-Email: <REDACTED>' \
    -H 'X-Auth-Key: <REDACTED>' \
    'https://api.cloudflare.com/client/v4/mobilesdk/logs/logpull?start=2019-02-19T22:00:00Z&end=2019-02-19T22:01:00Z&clientKey=<REDACTED>&count=10&timestamps=rfc3339nano'
```
- Add `-H 'Accept-Encoding: gzip'` for gzip compressed response

### Fields

<TableWrap>

Field | Value | Type
------|-------|-----
timestamp | unix / unixnano (int) or rfc3339 / rfc3339nano (string) format timestamp | timestamp
clientIP | Country of the client IP address | string
deviceId | Device ID (Cloudflare Mobile SDK Generated ID) | string
model | Client device | string
os | Client OS | string
osVer | Client OS version | string
appVer | App version| string
sdkVer | Cloudflare Mobile SDK version | string
netOp | Client network operator (Carrier) | string
netType | mobile \| wifi \| unknown | string
netSubType | unknown \| gprs \| edge \| umts \| cdma \| evdo_0 \| evdo_a \| 1xrtt \| hsdpa \| hsupa \| hspa \| iden \| evdo_b \| lte \| ehrpd \| hspap \| gsm  \| wcdma | string
sdkErrorCode | Detailed Mobile SDK Error Code, 0 (no error) \| other_values (error)<br />for details, See [iOS Error Codes](/getting_started/ios/error-codes) / [Android Error Codes](/getting_started/android/error-codes)  | int
https | http \| https | string
rayId | ID of the request | string
coloName | Cloudflare edge colo name (airport code) | string
cacheStatus | unknown \| miss \| expired \| updating \| stale \| hit \| ignored \| bypass \| revalidated \| none | string
host | Host requested by the client | string
path | URI path requested by the client | string
rcClient | HTTP status code returned by Cloudflare to the client | int
httpMethod | HTTP method of client request | string
ttfbTimeMs | TTFB in milliseconds | int
totalTimeMs | Total time taken in milliseconds | int
inBytes | Download size in bytes | int
outBytes | Upload size in bytes | int
country | Country of the client IP address | string
asNum | Client AS number | int
viewName | View controller name | string
isAccelerated | accelerated_fallback \| accelerated_tcp \| accelerated_asap \| not_accelerated \| error | string
isError | error \| empty_string (no error) | string

</TableWrap>

### Tips for stats
- Performance
  - Median Total Time can be obtained by calculating median of `sdkErrorCode` = 0 and `rcClient` = 2xx
  - A/B comparison can be done using `isAccelerated` field values, 'accelerated_*' (for accelerated traffic) Vs. 'not_accelerated' (for traffic that are not accelerated)
- Errors
  - Error counts can be obtained by counting `isError` = 'error'
  - A/B comparison can be done using `isAccelerated` field values, 'accelerated_*' (for accelerated traffic) Vs. 'not_accelerated' (for traffic that are not accelerated)

### Limits
- SDK Version: Log data only available with Cloudflare Mobile SDK version 3.0.0 or later installed
- Retention period: 7 days
- Maximum time range (difference between start and end parameters): 1 hour
- Response size: the maximum response size is 10GiB per request
- Timeout: the response will fail with a terminated connection after 10 minutes
- Rate Limits: 60 requests/min per user (email address)
