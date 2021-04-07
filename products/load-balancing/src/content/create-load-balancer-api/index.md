---
title: Create via API
order: 30
---

# Create a load balancer via the API

## Overview

In this walkthrough, you will use the Cloudflare API to set up an active-passive failover configuration for your load balancer. An active-passive failover configuration sends traffic to the servers in your active pool until a failure threshold (configurable) occurs. At the point of failure, Cloudflare then redirects traffic to the passive pool.

We will walk through the following steps to create and configure your load balancer via the Cloudflare API:

1. **Creating a monitor** — You’ll start by creating a monitor so that you can configure health checks for your load balancer. When you attach a monitor to a pool of origin servers, Cloudflare will use the monitor configuration to start running health checks on those servers.
2. **Creating pools** — Next you’ll create a couple of pools for your load balancer to manage.
3. **Validating pool health** — Before going further, you’ll attach your monitor to your new pools and run a health check to confirm their availability.
4. **Creating a load balancer** — Next you will create and configure a load balancer to manage traffic for your pools.
5. **Configuring Geo Steering (optional)** — Finally, you will see how to programmatically enable Geo Steering for your load balancer.

---

## Using the Cloudflare API

The Cloudflare API provides a standardized programmatic interface for accessing Cloudflare applications and resources, including Load Balancing. The Cloudflare API is implemented as a RESTful service using HTTPS requests and JSON responses.

Users access the Cloudflare API by making HTTPS requests. The Cloudflare API is only available via SSL-enabled HTTPS connections over port 443.

A valid request includes the following, which define what command to execute:

- A **URL** that identifies a path to a Cloudflare resource
- An **HTTP method** that defines the action to take on the resource
- An **HTTP** **header** that specifies authorization details and the content type for request and response bodies
- An optional **payload** for specifying parameters and values

### Request URL

The request URL is composed of a **base path** and an **endpoint**. The stable base URL for Version 4 of the Cloudflare API is:

```txt
https://api.cloudflare.com/client/v4
```

The endpoint is a URI that represents the path to a given resource, such as a Cloudflare load balancer. For example, the Cloudflare API endpoint for load balancers is:

```txt
/zones/:identifier/load_balancers/:identifier
```

When an endpoint specifies an `:identifier` term, the identifier must be replaced with the Cloudflare ID for an instance of the resource type that precedes it. The load balancer example above requires two Cloudflare IDs: one to identify the zone and one to identify a specific load balancer, respectively. Cloudflare IDs are represented by 32-byte strings.

To form a request URL, append the endpoint to the base path, as in the example below:

```txt
https://api.cloudflare.com/client/v4/zones/cd7d0123e3012345da9420df9514dad0/load_balancers/699d98642c564d2e855e9661899b7252
```

### HTTP methods

Cloudflare API endpoints accept one or more of the following HTTP methods, which typically behave as outlined:

- `GET` **retrieves a representation/information** about a resource or collection of resources without modifying them in any way.
- `POST` **creates a new resource**.
- `PUT` **updates an existing resource**.
- `PATCH` **partially updates an existing resource**.
- `DELETE` **removes an existing resource**.

### HTTP header

The Cloudflare API requires that headers include the following:

- **Authorization**
  - When authorizing via **API Token**, use `"Authorization: Bearer <API token>".`
  - When authorizing via **API Key**, both `"X-Auth-Key: <API key>"` and `"X-Auth-Email:<account_email>"` are required.
- **Content Type**—The Cloudflare API supports JSON-formatted request and response bodies only. Set `"Content-Type:application/json"`in request headers.

### API documentation conventions

Throughout this guide, API references will omit the base path for simplicity.

See _[Cloudflare API Documentation v4](https://api.cloudflare.com)_ for a complete reference to the latest version of the API.

---

## Before you begin

Be sure that you have the following:

- **Access to Load Balancing** via one of the following:
  - An Enterprise account with Load Balancing enabled.
  - An existing Free, Pro, or Business account with a Load Balancing subscription. (Enable Load Balancing in the Traffic app.)
- **Load balancer hostname**: The hostname for which the Cloudflare Load Balancer will manage traffic. The default hostname is the root hostname.
- **Origin servers (2):** You will need access to at least two origin servers (_origin-server-1_ and _origin-server-2_, for example).
- **Location:** Initially, we will configure only a single geographic region.

---

## Step 1: Create a monitor

Monitors are configurations that describe how to run health checks on your origin servers. When a monitor is attached to a pool, Cloudflare will run health checks on that pool’s origin servers from our data centers around the world. Because monitors exist independently, you can attach them to multiple pools. This way you can make a change to a single monitor and automatically update the health check policy for every pool that uses it.

Use the Create Monitor command to create a new monitor, as in the example below. If you are using virtual hosting, it is important to define a `host` value for the `header` property so that your web server knows which virtual host to serve. In most cases, this will be the same hostname as the one you intend the load balancer to manage—the same one you will use to name the load balancer. (See _[Monitors](/understand-basics/monitors/)_ for a full list of monitor properties and available commands.)

**Request example**

```json
# POST https://api.cloudflare.com/client/v4/user/load_balancers/monitors
{
  "type": "https",
  "description": "www.example.com Health Check",
  "method": "GET",
  "path": "/health",
  "header": {
    "Host": [
      "example.com"
    ],
    "X-App-ID": [
      "abc123"
    ]
  },
  "port": 8080,
  "timeout": 3,
  "retries": 0,
  "interval": 90,
  "expected_body": "alive",
  "expected_codes": "2xx",
  "follow_redirects": true,
  "allow_insecure": true
}
```

**Response**

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "type": "https",
    "description": "www.example.com Health Check",
    "method": "GET",
    "path": "/health",
    "header": {
      "Host": [
        "example.com"
      ],
      "X-App-ID": [
        "abc123"
      ]
    },
    "port": 8080,
    "timeout": 3,
    "retries": 0,
    "interval": 90,
    "expected_body": "alive",
    "expected_codes": "2xx",
    "follow_redirects": true,
    "allow_insecure": true
  }
}
```

**Locate the Monitor ID in the response** and record it. Your new monitor won’t trigger any health checks until we attach the monitor to a pool, and to do that we will need the Monitor ID.

---

## Step 2: Create pools

A Cloudflare pool represents a group of origin servers, each identified by their IP address or hostname. If you're familiar with DNS terminology, think of a pool as a _record set_, except we only return addresses that are considered healthy.

Before you continue, gather the following:

- The IP addresses or hostnames of your origin servers
- The ID of the monitor you just created. (Use the List Monitors command, `GET /load_balancers/monitors`, to fetch the Monitor ID.)
- An email address for receiving health check notifications

### Create Pool 1

Use the Create Pool command on the Cloudflare API to create a new pool, as in the example below. Set the `origins` array to supply a list of origin server objects. In this example, use the two origin servers you reserved for this exercise. (See _[Pools](/understand-basics/pools/)_ for a list of pool properties and available commands.)

Setting the pool’s `monitor` property will attach your monitor to the pool and enable health checks. For this example, use the Monitor ID you generated in the previous step.

**Request**

```js
// POST https://api.cloudflare.com/client/v4/user/load_balancers/pools
{
  "name": "primary-dc-1",
  "description": "Primary data center - Provider XYZ",
  "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",
  "origins": [
    {
      "name": "app-server-1",
      "address": "0.0.0.0",
    },
    {
      "name": "app-server-2",
      "address": "0.0.2.0",
      "enabled": true
    }
  ],
  "notification_email": "someone@example.com"
}
```

**Response**

```json
{
  "result": {
    "id": "17b5962d775c646f3f9725cbc7a53df4",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "description": "Primary data center - Provider XYZ",
    "name": "primary-dc-1",
    "enabled": true,
    "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "origins": [
      {
        "name": "app-server-1",
        "address": "0.0.1.0",
        "enabled": true
      },
      {
        "name": "app-server-2",
        "address": "0.0.2.0",
        "enabled": true
      }
    ],
    "notification_email": "someone@example.com",
    "healthy": true
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

If the response is an error, check the error message for a suggestion. If you’re using _curl_ to make requests, check that any shell escaping isn’t breaking your JSON request body.

### Create Pool 2

To create a second pool, use the same command you did to create Pool 1, but give Pool 2 a different `name` and add a [per origin hostname override](/understand-basics/pools#per-origin-host-header-override) to `backup-server-4`.

**Request**

```js
// POST https://api.cloudflare.com/client/v4/user/load_balancers/pools"
{
  "name": "secondary-dc-1",
  "description": "Secondary data center - Provider QRS",
  "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",
  "origins": [
    {
      "name": "backup-server-3",
      "address": "0.0.3.0",
    },
    {
      "name": "backup-server-4",
      "address": "0.0.4.0",
      "header": {
        "Host": [
          "example.com"
        ]
      }
    }
  ],
  "notification_email": "someone@example.com"
}
```

**Response**

The response will be similar as for Pool 1, but the ID and timestamps will be different.

Now that you’ve created your pools and attached a monitor, Cloudflare will initiate health checks from each of our data centers. (See _[Monitors](/understand-basics/monitors/)_ for more on how health checks work.)

---

## Step 3: Validate pool health

Use the List Pools command to verify you have configured your monitor and pools correctly. The value for the `healthy` property should be `true`, indicating that health checks are configured and the pool is available.

**Request**

```js
// /load_balancers/pools *OR* GET /load_balancers/pools/:pool_id
{
  // ...
  "healthy": true
  // ...
}
```

**Response**

```js
{
  "result": {
    "pool_id": "ff02c959d17f7bb2b1184a202e3c0af7",
    "pop_health": {
      "Newark, NJ": {
        "healthy": true,
        "origins": [
          {
            "52.22.68.195": {
              "healthy": true,
              "rtt": "161.1ms",
              "failure_reason": "No failures",
              "response_code": 200
            }
          },
          // Each origin will appear in this array
        ]
      }
    },
    // Each Cloudflare Point-of-Presence will be listed here.
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

The response breaks down results for each Cloudflare PoP, as well as the origin servers associated with them.

For most use cases, using the List Pools command—`GET /load_balancers/pools`—is sufficient. Responses from the Pool Health Details command—`GET pools/:pool_id/health`—can be verbose, so it’s a better tool for drilling into isolated failures.

---

## Step 4: Create a load balancer

To start delivering traffic to your pools, you must attach them to a load balancer. Load balancers are identified by the DNS hostname whose traffic you want to balance (_www.example.com_, for example). The load balancer defines which origin server pools to use, the order in which they should be used, and how to geographically distribute traffic among them.

### Important load balancer properties

The following load balancer properties are important for this step. (See _[Load Balancers](/understand-basics/load-balancers)_ for a complete list of properties.)

<TableWrap>

| Property | Description | Constraints |
| -------- | ----------- | ----------- |
| <strong>`name`</strong><br/><Type>string</Type> | The public DNS hostname of your Cloudflare load balancer.<br/><br/>If you have an existing DNS record with the same name as your load balancer, the load balancer will have precedence. The pre-existing DNS record is not used unless you delete the Cloudflare Load Balancer.<br/><br/>`"www.example.com"` | |
| <strong>`default_pools`</strong><br/><Type>array</Type> | A list of pool IDs ordered by failover priority. Cloudflare steers traffic to the first pool in the list, failing over to the next healthy pool, and so on down the list.<br/><br/>Pools defined here are used by default, or when region_pools are not configured for a given region.<br/><br/>`["17b5962d775c646f3f9725cbc7a53df4",  "9290f38c5d07c2e2f4df57b1f61d4196", "00920f38ce07c2e2f4df50b1f61d4194"]` | |
| <strong>`fallback_pool`</strong><br/><Type>string</Type> | The pool ID for the “pool of last resort,” the pool the load balancer should direct traffic to if all other pools are unhealthy. In most configurations, this is the secondary/passive pool.<br/><br/>`"17b5962d775c646f3f9725cbc7a53df4"` | <span style="white-space: nowrap"><PropMeta>max-length: 32</PropMeta></span><br/><PropMeta>read-only</PropMeta> |

</TableWrap>

### Cloudflare Zone IDs

Notice that the Create Load Balancer command requires a `zone_id`:

```txt
POST /zones/:zone_id/load_balancers
```

This represents the Cloudflare ID of the DNS zone associated with your load balancer.

A DNS zone is a portion of the DNS namespace that is managed by a specific organization or administrator. The domain name space is a hierarchical tree, with the DNS root domain at the top. A DNS zone starts at a domain within the tree and can also extend down into subdomains so that multiple subdomains can be managed by one entity.

You can get the Cloudflare Zone ID for your hostname by using the List Zones command:

```txt
GET /zones
```

This command returns a list of zones, each with an associated hostname and Cloudflare Zone ID. You can filter the list by setting values for properties, as in the following _curl_ example, which queries for the zone associated with the hostname _example.com_.

**Request example (curl)**

```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones?name=example.com&status=active&account.id=01a7362d577a6c3019a474fd6f485823&account.name=Demo Account&page=1&per_page=20&order=status&direction=desc&match=all" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json"

```

**Response**

Notice that the response includes data not only for example.com but also for each of its subdomains:

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "example.com",
      "development_mode": 7200,
      "original_name_servers": [
        "ns1.originaldnshost.com",
        "ns2.originaldnshost.com"
      ],
      "original_registrar": "GoDaddy",
      "original_dnshost": "NameCheap",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "activated_on": "2014-01-02T00:01:00.12345Z",
      "owner": {
        "id": {},
        "email": {},
        "type": "user"
      },
      "account": {
        "id": "01a7362d577a6c3019a474fd6f485823",
        "name": "Demo Account"
      },
      "permissions": [
        "#zone:read",
        "#zone:edit"
      ],
      "plan": {
        "id": "e592fd9519420ba7405e1307bff33214",
        "name": "Pro Plan",
        "price": 20,
        "currency": "USD",
        "frequency": "monthly",
        "legacy_id": "pro",
        "is_subscribed": true,
        "can_subscribe": true
      },
      "plan_pending": {
        "id": "e592fd9519420ba7405e1307bff33214",
        "name": "Pro Plan",
        "price": 20,
        "currency": "USD",
        "frequency": "monthly",
        "legacy_id": "pro",
        "is_subscribed": true,
        "can_subscribe": true
      },
      "status": "active",
      "paused": false,
      "type": "full",
      "name_servers": [
        "tony.ns.cloudflare.com",
        "woz.ns.cloudflare.com"
      ]
    }
  ]
}
```

Use the List Zones command to retrieve the zone for the DNS hostname you want to use to create a load balancer. Review the response and record the zone’s ID`.`

### Create your load balancer

Use the Create Load Balancer command to create your new load balancer, as in the example below. Remember to set `zone_id` to the value you found in the previous section.

**Request example**

```js
// POST /zones/:zone_id/load_balancers
{
  "description": "Load Balancer for www.example.com",
  "name": "www.example.com",
  "ttl": 30,
  "proxied": true,
  "fallback_pool": "ff02c959d17f7bb2b1184a202e3c0af7",
  "default_pools": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"]
  "region_pools": {}
}
```

**Response**

```json
{
  "success": true,
  "errors": [],
  "messages": [],
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "description": "Load Balancer for www.example.com",
    "name": "www.example.com",
    "enabled": true,
    "ttl": 30,
    "fallback_pool": "17b5962d775c646f3f9725cbc7a53df4",
    "default_pools": [
      "17b5962d775c646f3f9725cbc7a53df4",
      "9290f38c5d07c2e2f4df57b1f61d4196",
      "00920f38ce07c2e2f4df50b1f61d4194"
    ],
    "region_pools": {}
  }
}
```

<Aside type="note">

Deleting a Load Balancer does not delete associated pools and monitors.  Delete pools and monitors via the respective **Manage Pools** and **Manage Monitors** buttons within the **Load Balancing** tab under the **Traffic** app of the Cloudflare dashboard.

</Aside>

---

## Step 5: Configuring Geo Steering (optional)

If you have servers in different geographic regions, you may want to steer traffic to pools based on the region from which visitors are connecting. For example, your European visitors should land on your European pool first, and then on your US pool if the European pool is down. Your North American users would have the reverse configuration.

Cloudflare Geo Steering directs traffic to pools based on the client’s region or PoP (Enterprise accounts only). You can configure Geo Steering to implement this use case as follows:

- Direct EU users to the pool in Europe first, followed by the US pool.
- Direct North American clients to the US pool first and the EU pool second.
- All other regions will use the default pools.

Use the regions_pool property of the Update Load Balancers command—`PUT /zones/:zone_id/load_balancers`— to specify an array of regions. Specify each region using the appropriate region code followed by a list of origin servers to use for that region. In the example below, `WNAM` and `ENAM` represent the West and East Coasts of North America, respectively.

**Request example**

```js
// PUT /zones/:zone_id/load_balancers
{
  "description": "Load Balancer for www.example.com",
  "name": "www.example.com",
  "ttl": 30,
  "proxied": true,
  "fallback_pool": "ff02c959d17f7bb2b1184a202e3c0af7",
  "default_pools": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"]
  "region_pools": {
  "WNAM": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"],
  "ENAM": ["17b5962d775c646f3f9725cbc7a53df4", "ff02c959d17f7bb2b1184a202e3c0af7"],
  "EU": ["ff02c959d17f7bb2b1184a202e3c0af7", "17b5962d775c646f3f9725cbc7a53df4"]}
}
```

If you only define `WNAM`, then traffic from the East Coast will be routed to the `default_pools`. You can test this using a client in each of those locations.
