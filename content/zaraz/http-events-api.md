---
pcx_content_type: reference
title: HTTP Events API
meta:
  title: HTTP Events API
weight: 4
---

# HTTP Events API

The Zaraz HTTP Events API allows you to send information to Zaraz from places that cannot run the [Web API](/zaraz/web-api/), such as your server or your mobile app. It is useful for tracking events that are happening outside the browser, like successful transactions, sign-ups and more. The API also allows sending multiple events in batches.

{{<Aside type="note">}}
The HTTP Events API is only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

## Configure the API endpoint

The API is disabled unless you configure an endpoint for it. The endpoint determines under what URL the API will be accessible. For example, if you set the endpoint to be `/zaraz/api`, and your domain is `example.com`, requests to the API will go to `https://example.com/zaraz/api`.

To enable the API endpoint:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Zaraz** > **Settings**.
3. Under **Endpoints** > **HTTP Events API**, set your desired path. Remember the path is relative to your domain, and it must start with a `/`.

{{<Aside type="warning" header="Important">}}To avoid getting the API used by unwanted actors, Cloudflare recommends choosing a unique path.{{</Aside>}}

## Send events

The endpoint you have configured for the API will receive `POST` requests with a JSON payload. Below, there is an example payload:

```json
{
  "events": [
    {
      "client": {
        "__zarazTrack": "transaction successful",
        "value": "200"
      }
    }
  ]
}
```

The payload must contain an `events` array. Each Event Object in this array corresponds to one event you want Zaraz to process. The above example is similar to calling `zaraz.track('transaction successful', { value: "200" })` using the Web API.

The Event Object holds the `client` object, in which you can pass information about the event itself. Every key you include in the Event Object will be available as a _Track Property_ in the Zaraz dashboard.

There are two reserved keys:

* `__zarazTrack`: The value of this key will be available as _Track Name_. This is what you will usually build your triggers around. In the above example, setting this to `transaction successful` is the same as [using the Web API](/zaraz/web-api/track/) and calling `zaraz.track("transaction successful")`.
* `__zarazEcommerce`: This key needs to be set to `true` if you want Zaraz to process the event as an e-commerce event.

### The `system` key

In addition to the `client` key, you can use the `system` key to include information about the device from which the event originated. For example, you can submit the `User-Agent` string, the cookies and the screen resolution. Zaraz will use this information when connecting to different third-party tools. Since some tools depend on certain fields, it is often useful to include all the information you can.

The same payload from before will resemble the following example, when we add the `system` information:

```json
{
  "events": [
    {
      "client": {
        "__zarazTrack": "transaction successful",
        "value": "200"
      },
      "system": {
        "page": {
          "url": "https://example.com",
          "title": "My website"
        },
        "device": {
          "language": "en-US",
          "ip": "192.168.0.1"
        }
      }
    }
  ]
}
```

For all available system keys, refer to the table below:

| Property | Type <div style="width: 70px"> | Description |
| --- | --- | --- |
| `system.cookies` | Object | A key-value object holding cookies from the device associated with the event. |
| `system.device.ip` | String | The IP address of the device associated with the event. |
| `system.device.resolution` | String | The screen resolution of the device associated with the event, in a `WIDTHxHEIGHT` format. |
| `system.device.viewport` | String |  The viewport of the device associated with the event, in a `WIDTHxHEIGHT` format.
| `system.device.language` | String | The language code used by the device associated with the event. |
| `system.device.user-agent` | String | The `User-Agent` string of the device associated with the event. |
| `system.page.title` | String | The title of the page associated with the event. |
| `system.page.url` | String | The URL of the page associated with the event. |
| `system.page.referrer` | String | The URL of the referrer page in the time the event took place.  |
| `system.page.encoding` | String | The encoding of the page associated with the event. |

## Process API responses

For each Event Object in your payload, Zaraz will respond with a Result Object. The Result Objects order matches the order of your Event Objects.

Depending on what tools you are loading using Zaraz, the body of the response coming from the API might include information you will want to process. This is because some tools do not have a complete server-side implementation and still depend on cookies, client-side JavaScript or similar mechanisms. Each Result Object can include the following information:

| Result key | Description |
| --- | --- | --- |
| `fetch` | Fetch requests that tools want to send from the user browser. |
| `execute` | JavaScript code that tools want to execute in the user browser. |
| `return` | Information that tools return. |
| `cookies` | Cookies that tools want to set for the user. |

You do not have to process the information above, but some tools might depend on this to work properly. You can start using the HTTP Events API without processing the information in the table above, and adjust accordingly later.