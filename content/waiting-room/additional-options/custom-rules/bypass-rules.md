---
pcx_content_type: reference
title: Waiting Room Bypass Rules
weight: 10
---

# Waiting Room Bypass Rules

A Waiting Room Bypass Rule is a type of Waiting Room Rule built on Cloudflare’s Ruleset Engine and managed via the Waiting Room API. A Waiting Room Bypass Rule allows you to indicate specific traffic or areas of your site or application that you do not want a waiting room to apply to. Each bypass rule is created and managed at the individual waiting room level for precise control over your waiting room traffic.

To indicate where you want your bypass rules to apply, write [custom logic](/ruleset-engine/rules-language/) using the [fields](/ruleset-engine/rules-language/fields/) available via the Cloudflare Ruleset Engine from the following fields categories:

- [Standard fields](/ruleset-engine/rules-language/fields/#standard-fields)
- [Dynamic fields](/ruleset-engine/rules-language/fields/#dynamic-fields) except `cf.threat_score` and fields starting with `cf.bot_management` 
- [URI and argument value fields](/ruleset-engine/rules-language/fields/#uri-argument-and-value-fields)
- [HTTP request header fields](/ruleset-engine/rules-language/fields/#http-request-header-fields)
- [HTTP request body fields](/ruleset-engine/rules-language/fields/#http-request-body-fields)

Please be aware that the waiting room will not be applied to the traffic that matches the expression written for this rule. This traffic will not count toward any waiting room limits or be counted in Waiting Room Analytics. No waiting room features, including but not limited to, Event pre-queuing, Reject queueing method, or Queue-all will apply to this traffic. Please be mindful of this when creating and enabling Bypass Waiting Room rules. Only use bypass rules for traffic you are confident will not overwhelm your origin or cause significant traffic surges.

## Common Use Cases

- **Path/URL Exclusion**: Bypass specific paths or urls under the path you have configured for your waiting room, if you do not want your waiting room to apply to these paths. 
- **Administrative Bypass**: Allow internal site administrators to always bypass the waiting room, commonly identified by IP addresses. 
- **Geo-targeting**: Exclude certain countries from being queued.
- **Query String Exclusion**: Exclude specific query strings under the path you have configured for your waiting room. 
- **Exclude file extensions**: Prevent waiting room from applying to certain file extensions such as .js that you utilize on your waiting room html template so that they render properly.

### A note on subrequests

Along with the query string(s) or paths you would like to exclude, make sure to include in your expression any paths or file types that subrequests may be hitting so that these assets or paths do not have waiting room applied as well. Otherwise, these subrequests will be getting the waiting room cookie since they are still covered by the waiting room.

These could include anything like images, JavaScript files, CSS files, etc. You can also configure the rule to bypass the waiting room for any paths of a file type by bypassing if a request ends with `.js`, `.css`, `.png`, etc., so you do not have to manually configure each path those assets may be stored under.

Example condition: `ends_with(http.request.uri.path, ".js")`

## Create Waiting Room Bypass Rules in the dashboard

To create a new bypass rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Within your application, go to **Traffic** > **Waiting Rooms**.
3. Expand a Waiting Room and select **Go to rules**.
4. Select **Create new Bypass rule**.
5. Enter a descriptive name for the rule in **Rule name**.
6. Under **When incoming requests match**, define the rule expression. Use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
7. Under **Then**, the Bypass Waiting Room action is automatically selected. Before saving, review your expression and ensure that the traffic that matches your expression is the traffic that you do not want the waiting room to apply to.
8. To save and deploy your rule, select **Save and deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

### Operators and grouping symbols

- Comparison operators specify how values defined in an expression must relate to the actual HTTP request value for the expression to return true.
- Logical operators combine two expressions to form a compound expression and use order of precedence to determine how an expression is evaluated.
- Grouping symbols allow you to organize expressions, enforce operator precedence, and nest expressions.

For examples and usage, refer to [Operators and grouping symbols](/ruleset-engine/rules-language/operators/) in the Rules language documentation.

## Manage Rules via the Waiting Room API

You can manage, delete, and create bypass rules for your waiting room via the Waiting Room API’s. A bypass rule is a Waiting Room Rule that utilizes the `bypass_waiting_room` action.

When creating a Bypass Waiting Room Rule via API, make sure you:

- Have already created and saved a waiting room you want the rule to apply to.
- Define the expression to indicate which traffic you would like to bypass your waiting room.
- Set the rule action to `bypass_waiting_room`.

Create a waiting room rule by appending the following endpoint in the Waiting Room API to the Cloudflare API base URL.

```txt
POST zones/:zone_identifier/waiting_rooms/:waiting_room_id/rules
```

Configure your bypass rule with the following required and optional parameters:

- **Description** (optional) - Give your rule a description to help keep a record of the purpose of this bypass rule.  
- **Expression** (required) - Define the rule expression indicating which traffic to apply the bypass rule to.
- **Action** (required) - Define the action to take when expression evaluates to true. Set this to `bypass_waiting_room`.
- **Enabled** (optional) - This will default to true. If you do not wish to deploy your rule, you must set this to false.

### ​​API Examples

<details>
<summary>Bypass a path under your waiting room and all of its subpaths</summary>
<div>

If your waiting room is configured at `example.com/` and you would like all traffic visiting `example.com/bypassme` and all of its subpaths. In this example, we also want to prevent any subrequests on this path of `js`, `css`, or `png` to bypass the waiting room.

```json
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/waiting_rooms/<ROOM_ID>/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
        "description": "subpath bypass",
        "expression": "starts_with(http.request.uri.path, \"/bypassme\") and not (ends_with(http.request.uri.path, ".js") or ends_with(http.request.uri.path, ".css") or ends_with(http.request.uri.path, ".png"))",
        "action": "bypass_waiting_room"
}' 
```

</div>
</details>

<details>
<summary>Allow a defined list of IPs to bypass the waiting room</summary>
<div>

```json
curl -X POST \
"https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/waiting_rooms/<ROOM_ID>/rules" \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{
        "description": "ip list bypass",
        "expression": "ip.src in $bypass_ip_list",
        "action": "bypass_waiting_room"
}'  
```

</div>
</details>

### Other API options for managing bypass rules

Through the Waiting Room API, you can also do the following to manage bypass rule by using the waiting room custom rules api calls:

- **List Custom Rules**: Lists custom rules for a waiting room.
- **Replace Custom Rules**: Replaces all custom rules for a waiting room.
- **Patch Custom Rules**: Update a custom rule for a waiting room.
- **Delete Custom Rules**: Delete a custom rule for a waiting room.
