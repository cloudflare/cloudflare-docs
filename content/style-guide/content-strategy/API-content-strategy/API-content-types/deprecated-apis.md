---
pcx_content_type: concept
title: Deprecated APIs

---

# Deprecated APIs

## Purpose

The purpose of Deprecated API content is to communicate that Cloudflare no longer supports an endpoint and to provide users with an alternative option.

## Tone

instructional, straightforward

## content_type

reference

## Structure

### Required components

**Deprecated endpoint name**: Must match what existed in the non-deprecated [Endpoint](/style-guide/content-strategy/api-content-strategy/api-content-types/endpoints/).

**Context**:  Brief description of what is happening, why Cloudflare is deprecating this endpoint, and any other important information. Avoid using time-bound descriptors (today, tomorrow, in one week, etc). Instead, be specific when including dates.

**Replacement**: A description of and/or link to the alternative endpoint OR an explanation as to why Cloudflare is removing the capability of that endpoint.

**End of life date**: The date by which users will no longer be able to use that endpoint. Format full month name, date, and year (May 10, 2021).

### Optional components

A complete list of endpoints or related APIs that are being deprecated

## Additional information

Add API deprecation notices to the API deprecations page by deprecation date and not alphabetically by endpoint.

When an endpoint will be deprecated in a specified timeframe but is still available, add a note to the endpoint description about the upcoming deprecation ("`<name of endpoint>` will be deprecated on `<full month name, date, year>`. Use the `<alternative endpoint>` instead.").

Cloudflare's EoL process: Cloudflare API Deprecation and EoL Process

## Examples

Cloudflare Images - Create authenticated direct upload URL v1

End of life date: July 1, 2022

This endpoint is deprecated in favor of using v2, which allows you to control metadata, define an access policy, and get the image ID.

Deprecated API:

POST accounts/:account_identifier/images/v1/direct_upload

Replacement:

POST accounts/:account_identifier/images/v2/direct_upload
