---
order: 12
---

# Audit Logs

Cloudflare Access generates two types of audit logs:

* **Authentication audit logs** maintain a record of authentication events.
* **Per-request audit logs** record HTTP requests to protected URI paths.

## Authentication audit logs

Cloudflare logs an Access authentication event whenever a user or service attempts to log in to an application, whether the attempt succeeds or not. Authentication events do not capture actions the user takes once they've authenticated.

Access audit logs are available from the Cloudflare for Teams dashboard in the **Logs** section. The **API Export** feature provides a custom URL to export audit log events for your account.

Access retains authentication logs for 6 months.

**Access** provides the following views of the logs:

|Type|Description|
|---|---|
|**User**|All unique users with at least one successful login during the current calendar month.|
|**Access Audit Log**|Changes made to Access policies across the account.|
|**Access Requests**|All authentication attempts. Details include the identity provider or login method and the IP address of the user.|

Access authentication logs are also available using **API Export**. Results are grouped by application, and are available at the following URL, where `account_id` identifies the account ID of your protected application:

```
https://api.cloudflare.com/client/v4/accounts/<account_id>/access/logs/access_requests?direction=desc&limit=15&page=1
```

Access authentication logs contain the following fields:

| Field | Description |
|---|---|
| _user_email_ | The email address of the authenticating user. |
| _ip_address_ | The IP address of the authenticating user. |
| _app_uid_ | The unique identifier for the protected application. |
| _add_domain_ | The URL of the protected application. |
| _action_ | The event that occurred, such as a login attempt. |
| _allowed_ | The result of the authentication event. |
| _created_at_ | The event timestamp. |

## Per-request audit logs

Users who have authenticated through the Access gateway have access to authorized URL paths for the duration of their session. Cloudflare provides several ways to audit these requests.

A video guide is [also available](/videos/configuring-access/).

### Cloudflare logging

Enterprise customers have access to detailed logs of HTTP requests. Enterprise customers also have access to Cloudflare's Logpush service, which can be configured from the Cloudflare Dashboard or API (see [_Cloudflare Logs_](https://developers.cloudflare.com/logs/)).

Cloudflare secures both external-facing sites and internal resources by triaging each request in our network before we ever send it to your origin. Products like our WAF enforce rules to protect your site from attacks like SQL injection or cross-site scripting. Likewise, Access identifies the principal behind each request by evaluating each connection that passes through the gateway.

Once a member of your team authenticates to reach a resource behind Access, we generate a token for that user that contains their SSO identity. The token is structured as JSON Web Token (JWT). JWT security is an open standard for signing and encrypting sensitive information. These tokens provide a secure and information-dense mechanism that Access can use to verify individual users. Cloudflare signs the JWT using a public and private key pair that we control. We rely on RSA Signature with SHA-256, or RS256, an asymmetric algorithm, to perform that signature. We make the public key available so that you can validate their authenticity, as well.

When a user requests a given URL, Access appends the user identity from that token as a request header, which we then log as the request passes through our network. Your team can collect these logs in your preferred third-party SIEM or storage destination by using the Cloudflare Logpush platform.

Cloudflare Logpush can be used to gather and send specific request headers from the requests made to sites behind Access. Once enabled, you can then configure the destination where Cloudflare should send these logs. When enabled with the Access user identity field, the logs will export to your systems as JSON similar to the logs below.

``` json
{
   "ClientIP": "198.51.100.206",
   "ClientRequestHost": "jira.widgetcorp.tech",
   "ClientRequestMethod": "GET",
   "ClientRequestURI": "/secure/Dashboard/jspa",
   "ClientRequestUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
   "EdgeEndTimestamp": "2019-11-10T09:51:07Z",
   "EdgeResponseBytes": 4600,
   "EdgeResponseStatus": 200,
   "EdgeStartTimestamp": "2019-11-10T09:51:07Z",
   "RayID": "5y1250bcjd621y99"
   "RequestHeaders":{"cf-access-user":"srhea"},
}

{
   "ClientIP": "198.51.100.206",
   "ClientRequestHost": "jira.widgetcorp.tech",
   "ClientRequestMethod": "GET",
   "ClientRequestURI": "/browse/EXP-12",
   "ClientRequestUserAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36",
   "EdgeEndTimestamp": "2019-11-10T09:51:27Z",
   "EdgeResponseBytes": 4570,
   "EdgeResponseStatus": 200,
   "EdgeStartTimestamp": "2019-11-10T09:51:27Z",
   "RayID": "yzrCqUhRd6DVz72a"
   "RequestHeaders":{"cf-access-user":"srhea"},
}
```

### Using the cf-access-user field

In addition to the HTTP request fields available in Cloudflare Enterprise logging, requests made to applications behind Access include the `cf-access-user` field, which contains the user identity string. This offers another tool for auditing user behavior.

Keep in mind that Access does not log all interactions. For example, per-request audit logs can indicate that a specific user visited `domain.com/admin` and then `domain.com/admin/panel`, but the logs can only identify user interactions that result in a new HTTP request.

### Cloudflare Logpush integration

Access integrates with the Cloudflare Logpush API, so you can export per-request audit logs to third-party Security Information and Event Management (SIEM) tools.

Cloudflare Logpush pushes Enterprise customers' HTTP request logs, including Access user identity, to a cloud storage provider every 5 minutes.

For instructions on setting up Logpush, see [_Manage the Logpush API_](https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/).

For more on exporting per-request Access logs, see [_Understanding the Logpush API_](https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api/).

## Video guide

Use Logpush to automatically export logs from Cloudflare Access to cloud providers like Google Cloud and Microsoft Azure, and SIEMs like Sumo Logic.

<StreamVideo id="19987899aa95453b6bbdb7e6b4431223"/>
