---
title: RTKAi
sidebar_position: 1
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKAi"></a>

This module consists of the `ai` object which is used to interface with product's AI features.
You can obtain the live meeting transcript and use other meeting AI
features such as summary, and agenda using this object.


* [RTKAi](#module_RTKAi)
    * _instance_
        * [.telemetry](#module_RTKAi+telemetry)
        * [.onTranscript(transcript)](#module_RTKAi+onTranscript)
    * _static_
        * [.parseTranscript(transcriptData, [isPartialTranscript])](#module_RTKAi.parseTranscript)
        * [.parseTranscripts(transcriptData)](#module_RTKAi.parseTranscripts)

<a name="module_RTKAi+telemetry"></a>

### meeting.ai.telemetry
**Kind**: instance property of [<code>RTKAi</code>](#module_RTKAi)  
<a name="module_RTKAi+onTranscript"></a>

### meeting.ai.onTranscript(transcript)
**Kind**: instance method of [<code>RTKAi</code>](#module_RTKAi)  

| Param | Type | Description |
| --- | --- | --- |
| transcript | <code>TranscriptionData</code> | Transcript data received for a participant. |

<a name="module_RTKAi.parseTranscript"></a>

### meeting.ai.parseTranscript(transcriptData, [isPartialTranscript])
Parse a single line transcript

**Kind**: static method of [<code>RTKAi</code>](#module_RTKAi)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transcriptData | <code>string</code> |  | The transcript data to parse |
| [isPartialTranscript] | <code>boolean</code> | <code>false</code> | Whether the transcript is partial |

<a name="module_RTKAi.parseTranscripts"></a>

### meeting.ai.parseTranscripts(transcriptData)
Parse a multi-line transcript

**Kind**: static method of [<code>RTKAi</code>](#module_RTKAi)  

| Param | Type | Description |
| --- | --- | --- |
| transcriptData | <code>string</code> | The transcript data to parse |

