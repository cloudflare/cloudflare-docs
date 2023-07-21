---
pcx_content_type: concept
title: Endpoints
weight: 3

---

# Endpoints

## Purpose

An endpoint is used to make HTTPS requests, and the `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` methods dictate how to interact with the resource.

## Structure

### Required Components

{{<Aside type="note">}}

The required components apply to newly created endpoints. Existing endpoints will **not** be modified.

{{</Aside>}}

**Title**: Title of the endpoint using sentence casing (first word capitalized). The titles do not use punctuation marks at the end of the title. Simple cases usually take one of the following forms:

Endpoints that act on/return a single item: verb + indefinite article + singular resource name.

+ Example: Get a list item

Endpoints that act on/return a collection of items: verb + plural resource name.

+ Example: Get list items

**Description**: Describes what the endpoint does or how it should be used. Use punctuation at the end of the description.

**Plan availability**: Lists the plan required to use the endpoint, such as Free, Pro, Business, or Enterprise.

**Method**: Includes the type of method, such as `GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.

**Endpoint**: Lists the endpoint and should be stylized as code snippet.

When an endpoint will be deprecated in a specified timeframe but is still available, add a note to the endpoint description about the upcoming deprecation ("`<name of endpoint>` will be deprecated on `<full month name, date, year>`. Use the `<alternative endpoint>` instead"). See [Deprecated APIs](/style-guide/api-content-strategy/api-content-types/deprecated-apis/) for more.

### Optional components

**Required permissions**: Additional permissions at the user level that are required to use the endpoint.

## Writing guidelines

When writing the titles and descriptions, keep our voice and tone in mind. Be concise and remember our users come from a variety of technical levels. Also, write in the active voice as much as possible to avoid sounding robotic and to make the information easier to understand.

Below are some examples of endpoint titles and descriptions for reference:

+ **Get domain**: Fetches a single domain.
+ **List workers**: Fetches a list of uploaded workers.
+ **List pools**: Lists configured pools.
+ **Create waiting room**: Creates a new waiting room.
+ **Update health check**: Updates configured health checks.

## Example

**Title**: Get user audit logs

**Description**: Gets a list of audit logs for a user account.

**Plan availability**: Free, Pro, Business, Enterprise

**Method**: GET

**Endpoint**: user/audit_logs
