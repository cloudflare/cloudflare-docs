---
pcx_content_type: reference
title: Access Audit logs
weight: 6
---

# Access Audit logs

Cloudflare Access generates two types of audit logs:

- **[Authentication audit logs](#authentication-audit-logs)** maintain a record of authentication events.
- **[Per-request audit logs](#per-request-audit-logs)** record HTTP requests to protected URI paths.

## Authentication Audit Logs

Cloudflare logs an Access authentication event whenever a user or service attempts to log in to an application, whether the attempt succeeds or not.

To view authentication logs, navigate to the **Logs** > **Access** section of the Zero Trust dashboard. You can expand each row to view details such as the login method, the IP address of the user, and more. If a login attempt was blocked, click **View** for information about why Access denied the user access. Block policy decisions are retained for a week. Authentication logs are retained for six months.

{{<Aside>}}

Authentication audit logs do not capture actions the user takes once they have authenticated.

{{</Aside>}}

### Explanation of the fields

Access authentication logs contain the following fields:

| Field          | Description                                               |
| -------------- | --------------------------------------------------------- |
| **user_email** | The email address of the authenticating user.             |
| **ip_address** | The IP address of the authenticating user.                |
| **app_uid**    | The unique identifier for the protected application.      |
| **add_domain** | The URL of the protected application.                     |
| **action**     | The event that occurred, such as a login attempt.         |
| **allowed**    | The result of the authentication event.                   |
| **created_at** | The event timestamp.                                      |
| **connection** | The IdP used to authenticate.                             |
| **country**    | The country associated with the user’s IP address.        |
| **ray_id**     | A unique identifier for every request through Cloudflare. |
| **app_type**   | The type specifies if the app is self-hosted or SaaS.     |

### Access Requests Audit API endpoint

The [Access Requests Audit](https://api.cloudflare.com/#access-requests-access-requests-audit) API endpoint provides a custom URL to export audit log events for your account.

    GET accounts/:identifier/access/logs/access_requests

#### Optional fields

| Name /type               | Description/example                                         | Constraints                                        |
| ------------------------ | ----------------------------------------------------------- | -------------------------------------------------- |
| limit (number)           | Limit the number of results `25`.                           | -                                                  |
| direction (string)       | Change the direction of the chronological sorting `"desc"`. | default value: `desc`, valid values: `desc`, `asc` |
| since (date-time string) | The time the query begins `"2020-07-01T05:20:00Z"`.         | read only                                          |
| until (date-time string) | The time the query ends `"2020-10-01T05:20:00Z"`.           | read only                                          |

#### cURL (example)

```curl
curl -X GET "https://api.cloudflare.com/client/v4/accounts/699d98642c564d2e855e9661899b7252/access/logs/access_requests?limit=25&direction=desc&since=2020-07-01T05:20:00Z&until=2020-10-01T05:20:00Z" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: c2547eb745079dac9320b638f5e225cf483cc5cfdda41" \
     -H "Content-Type: application/json"
```

#### Response (example)

```json
{
	"success": true,
	"errors": [],
	"messages": [],
	"result": [
		{
			"user_email": "michelle@example.com",
			"ip_address": "198.41.129.166",
			"app_uid": "df7e2w5f-02b7-4d9d-af26-8d1988fca630",
			"app_domain": "test.example.com/admin",
			"action": "login",
			"connection": "saml",
			"allowed": false,
			"created_at": "2014-01-01T05:20:00.12345Z",
			"ray_id": "187d944c61940c77"
		}
	]
}
```

## Per-Request Audit Logs

Users who have authenticated through Access have access to authorized URL paths for the duration of their session. Cloudflare provides several ways to audit these requests.

A video guide is also available:

<StreamVideo id="19987899aa95453b6bbdb7e6b4431223" />

### Cloudflare logging

Enterprise customers have access to detailed logs of HTTP requests, on their Cloudflare dashboard. Enterprise customers also have access to Cloudflare's Logpush service, which can be configured from the Cloudflare dashboard or API (for more information about Cloudflare HTTP logging, refer to [Cloudflare Logs](/logs/)).

Once a member of your team authenticates to reach a resource behind Access, Cloudflare generates a token for that user that contains their SSO identity. The token is structured as a [JSON Web Token (JWT)](/cloudflare-one/glossary/#json-web-token). Cloudflare relies on an RSA Signature with SHA-256, or RS256, an asymmetric algorithm, to perform that signature. Cloudflare also makes the public key available, so that you can validate their authenticity, as well.

When a user requests a given URL, Access appends the user identity from that token as a request header, which we then log as the request passes through our network. Your team can collect these logs in your preferred third-party Security information and event management (SIEM) software or storage destination by using the [Cloudflare Logpush](/logs/about/) platform.

Cloudflare Logpush can be used to gather and send specific request headers from the requests made to sites behind Access. Once enabled, you can then configure the destination where Cloudflare should send these logs. When enabled with the Access user identity field, the logs will export to your systems as JSON similar to the logs below.

```json
[
	{
		"ClientIP": "198.51.100.206",
		"ClientRequestHost": "jira.widgetcorp.tech",
		"ClientRequestMethod": "GET",
		"ClientRequestURI": "/secure/Dashboard/jspa",
		"ClientRequestUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
		"EdgeEndTimestamp": "2019-11-10T09:51:07Z",
		"EdgeResponseBytes": 4600,
		"EdgeResponseStatus": 200,
		"EdgeStartTimestamp": "2019-11-10T09:51:07Z",
		"RayID": "5y1250bcjd621y99",
		"RequestHeaders": { "cf-access-user": "srhea" }
	},
	{
		"ClientIP": "198.51.100.206",
		"ClientRequestHost": "jira.widgetcorp.tech",
		"ClientRequestMethod": "GET",
		"ClientRequestURI": "/browse/EXP-12",
		"ClientRequestUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
		"EdgeEndTimestamp": "2019-11-10T09:51:27Z",
		"EdgeResponseBytes": 4570,
		"EdgeResponseStatus": 200,
		"EdgeStartTimestamp": "2019-11-10T09:51:27Z",
		"RayID": "yzrCqUhRd6DVz72a",
		"RequestHeaders": { "cf-access-user": "srhea" }
	}
]
```

### Using the `cf-access-user` field

In addition to the HTTP request fields available in Cloudflare Enterprise logging, requests made to applications behind Access include the `cf-access-user` field, which contains the user identity string. This offers another tool for auditing user behavior. To add the `cf-access-user` field to your HTTP request logs, you must add it as a custom field. Refer to [Custom fields](/logs/reference/custom-fields/) for instructions.

Keep in mind that Access does not log all interactions. For example, per-request audit logs can indicate that a specific user visited `domain.com/admin` and then `domain.com/admin/panel`, but the logs can only identify user interactions that result in a new HTTP request.

### Cloudflare logpush integration

Access integrates with the Cloudflare Logpush API, so you can export per-request audit logs to third-party Security Information and Event Management (SIEM) tools.

Cloudflare Logpush pushes Enterprise customers' HTTP request logs, including Access user identity, to a cloud storage provider every five minutes.

For instructions on setting up Logpush, refer to [Enable destinations](/logs/get-started/enable-destinations/).

For more on exporting per-request Access logs, refer to [API configuration](/logs/get-started/api-configuration/).
