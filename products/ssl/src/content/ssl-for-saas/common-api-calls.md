---
order: 9
---

# Common API calls

--------

## Listing all certificates

View all certificates on a zone using a GET to the *custom_hostnames* endpoint.  Large numbers of results are paginated.  Change the _page_ parameter in your API call to pull additional pages.

```bash
$ curl -sX GET https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames?page=1\
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
    -H 'Content-Type: application/json'
{
  "result": [
    {
      "id": "5f2f35ef-b34f-4dd0-a71a-9762248cbcc3",
      "hostname": "app.example.com",
      "ssl": {
        "id": "343eee9f-fe7c-47f7-b5cc-3298c4f623e5",
        "type": "dv",
        "method": "http",
        "status": "active",
        "hosts": [
          "app.example.com"
        ],
        "bundle_method": "ubiquitous",
        "certificates": [
      #...
      "status": "active",
      "created_at": "2020-03-04T18:50:37.223836Z"
    }
  ],
  "result_info": {
    "page": 1,
    "per_page": 20,
    "count": 2,
    "total_count": 2,
    "total_pages": 1
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

--------

## Searching for a certificate by hostname

To search for a certificate by *hostname*, add the hostname parameter to your query.  This is useful if you are unsure of the ID for a particular certificate or maintain many certificates.

```bash
$ curl -sX GET https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames?hostname=app.example.com\
    -H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}" -H 'Content-Type: application/json'

{
  "result": [
    {
      "id": "5f2f35ef-b34f-4dd0-a71a-9762248cbcc3",
      "hostname": "app.example.com",
      "ssl": {
        "id": "343eee9f-fe7c-47f7-b5cc-3298c4f623e5",
        "type": "dv",
        "method": "http",
        "status": "active",
        "hosts": [
          "app.example.com"
        ],
        "bundle_method": "ubiquitous",
        "certificates": [
   	  #...
      "status": "active",
      "created_at": "2020-03-04T18:50:37.223836Z"
    }
  ],
  "result_info": {
    "page": 1,
    "per_page": 20,
    "count": 2,
    "total_count": 2,
    "total_pages": 1
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

--------

## Fallback origin configuration

The “fallback origin” of a zone is the origin hostname to which all custom hostnames requests are sent (unless the hostname is overriden with a *custom_origin_server*). All users may retrieve the fallback origin value, but setting it via API requires additional account permissions.

### 1. Error codes

HTTP Status|JSON Response Error Code|JSON Response Error Message
-----------|------------------------|---------------------------
400|1414|Cannot update/delete resource while in pending deletion state
400|1400|Unable to decode the JSON request body. Please check your input and try again
400|1413|Origin hostname is required in the request payload. Please check your input and try again
401|1456|Access to configure this resource has not been granted for this zone. This feature is available with SSL for SaaS.
404|1551|Resource not found
500|1600|Internal Server Error

### 2. GET the fallback origin

Standard response structure, with the following result value:

```txt
{
    "origin": <null or string containing hostname>
}
```

```bash
$ curl --location --request GET 'https://api.cloudflare.com/client/v4/zones/:zone_id/custom_hostnames/fallback_origin' \
--header 'X-Auth-Email: EMAIL' \
--header 'X-Auth-Key: APIKEY' \
--header 'Content-Type: application/json' \

{
    "success": true,
    "errors": [],
    "messages": [],
    "result": {
        "origin": "fallback.ssl.example.com",
        "status": "active",
        "created_at": "2020-03-04T19:01:34.007122Z",
        "updated_at": "2020-03-11T18:29:56.047245Z"
    }
}
```

### 3. Set the fallback origin

Request schema:

```txt
{
    "origin": <string, a hostname to fallback to in case request Host headers do not match zone name>
}
```

Response schema: same as GET response for success. If the request failed, includes errors and messages values.

```bash
$ curl -X PUT "https://api.cloudflare.com/client/v4/zones/:zone_id/custom_hostnames/fallback_origin"\
-H "X-Auth-Email: {email}" -H "X-Auth-Key: {key}"\
-H "Content-Type: application/json"\
-d '{"origin":"proxy-fallback.saasprovider.com"}'

{
    "success": true,
    "errors": [],
    "messages": [],
    "result": {
        "origin": "fallback.ssl.example.com",
        "status": "initializing",
        "created_at": "2020-03-04T19:01:34.007122Z",
        "updated_at": "2020-03-11T18:29:55.931297Z"
    }
}
```
