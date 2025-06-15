---
# Code generator. DO NOT EDIT.

title: Workers Trace Events
pcx_content_type: configuration
sidebar:
  order: 21
---

The descriptions below detail the fields available for `workers_trace_events`.

## CPUTimeMs

Type: `int`

The amount of CPU time used by the Worker script, in milliseconds.

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

## WallTimeMs

Type: `int`

The elapsed time in milliseconds between the start of a Worker invocation, and when the Workers Runtime determines that no more JavaScript needs to run. Specifically, this measures the wall-clock time that the JavaScript context remained open. For example, when returning a response with a large body, the Workers runtime can, in some cases, determine that no more JavaScript needs to run, and closes the JS context before all the bytes have passed through and been sent. Alternatively, if you use the `waitUntil()` API to perform work without blocking the return of a response, this work may continue executing after the response has been returned, and will be included in `WallTimeMs`.
