---
title: Logpush job object schema
order: 62
---

# Logpush job object schema

Below is the JSON schema for a Logpush job object.

```json
{
  "id": "https://api.cloudflare.com/schemas/v4/client/zone/logpush.json",
  "$schema": "http://json-schema.org/draft-04/hyper-schema#",
  "title": "Logpush Jobs",
  "description": "Logpush jobs",
  "type": "object",
  "definitions": {
    "zone_identifier": {
      "$ref": "../../common/zone.json#/definitions/identifier"
    },
    "job_identifier": {
      "$ref": "#/definitions/id"
    },
    "id": {
      "description": "Unique id of the job.",
      "type": "integer",
      "minimum": 1,
      "example": 1
    },
    "enabled": {
      "description": "",
      "type": "boolean",
      "example": false
    },
    "name": {
      "description": "Human readable job name. Not unique. Makes it easier for humans to identify a job. Suggest that it include the domain name. Cannot be changed.",
      "type": "string",
      "pattern": "^[a-zA-Z0-9\\-\\.]*$",
      "maxLength": 512,
      "example": "example.com"
    },
    "dataset": {
      "description": "Data set to be pulled.",
      "type": "string",
      "pattern": "^[a-zA-Z0-9_\\-]*$",
      "maxLength": 256,
      "example": "http_requests"
    },
    "logpull_options": {
      "description": "Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.",
      "type": "string",
      "format": "uri",
      "maxLength": 4096,
      "example": "fields=RayID,ClientIP,EdgeStartTimestamp&timestamps=rfc3339"
    },
    "destination_conf": {
      "description": "Uniquely identifies a resource (such as an s3 bucket) where data will be pushed. Additional configuration parameters supported by the destination may be included.",
      "type": "string",
      "format": "uri",
      "maxLength": 4096,
      "example": "s3://mybucket/logs?region=us-west-2"
    },
    "last_complete": {
      "description": "Records the last time for which logs have been successfully pushed. If the last successful push was for logs range 2018-07-23T10:00:00Z to 2018-07-23T10:01:00Z then the value of this field will be 2018-07-23T10:01:00Z. If the job has never run or has just been enabled and hasn't run yet then the field will be empty.",
      "type": "string",
      "format": "date-time",
      "example": null
    },
    "last_error": {
      "description": "Records the last time the job failed. If not null, the job is currently failing. If null, the job has either never failed or has run successfully at least once since last failure. See also the error_message field.",
      "type": "string",
      "format": "date-time",
      "example": null
    },
    "error_message": {
      "description": "If not null, the job is currently failing. Failures are usually repetitive (example: no permissions to write to destination bucket). Only the last failure is recorded. On successful execution of a job the error_message and last_error are set to null.",
      "type": "string",
      "format": "date-time",
      "example": null
    },
    "ownership_challenge": {
      "description": "Ownership challenge token to prove destination ownership.",
      "type": "string",
      "pattern": "^[a-zA-Z0-9/\\+\\.\\-_]*$",
      "maxLength": 4096,
      "example": "00000000000000000000"
    }
  }
}
```