---
# Code generator. DO NOT EDIT.

title: Workers Trace Events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `workers_trace_events`.

## DispatchNamespace

Type: `string`

The Cloudflare Worker dispatch namespace.

## Entrypoint

Type: `string`

The name of the entrypoint class in which the Worker began execution.

## Event

Type: `object`

Details about the source event.

## EventTimestampMs

Type: `int`

The timestamp of when the event was received, in milliseconds.

## EventType

Type: `string`

The event type that triggered the invocation. <br />Possible values are <em>fetch</em>.

## Exceptions

Type: `array[object]`

List of uncaught exceptions during the invocation.

## Logs

Type: `array[object]`

List of console messages emitted during the invocation.

## Outcome

Type: `string`

The outcome of the Worker script invocation. <br />Possible values are <em>ok</em> \| <em>exception</em>.

## ScriptName

Type: `string`

The Cloudflare Worker script name.

## ScriptTags

Type: `array[string]`

A list of user-defined tags used to categorize the Worker.

## ScriptVersion

Type: `object`

The version of the script that was invoked.
