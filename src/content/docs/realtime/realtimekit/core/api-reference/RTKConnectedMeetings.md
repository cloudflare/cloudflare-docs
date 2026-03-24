---
title: RTKConnectedMeetings
sidebar_position: 4
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKConnectedMeetings"></a>

This consists of the methods to faciliate connected meetings


* [RTKConnectedMeetings](#module_RTKConnectedMeetings)
    * [module.exports](#exp_module_RTKConnectedMeetings--module.exports) ⏏
        * [new module.exports(context)](#new_module_RTKConnectedMeetings--module.exports_new)
        * [.getRTKConnectedMeetings()](#module_RTKConnectedMeetings--module.exports+getRTKConnectedMeetings)
        * [.createMeetings(request)](#module_RTKConnectedMeetings--module.exports+createMeetings)
        * [.updateMeetings(request)](#module_RTKConnectedMeetings--module.exports+updateMeetings)
        * [.deleteMeetings(meetingIds)](#module_RTKConnectedMeetings--module.exports+deleteMeetings)
        * [.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)](#module_RTKConnectedMeetings--module.exports+moveParticipants)
        * [.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)](#module_RTKConnectedMeetings--module.exports+moveParticipantsWithCustomPreset)

<a name="exp_module_RTKConnectedMeetings--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKConnectedMeetings--module.exports_new"></a>

#### new module.exports(context)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 

<a name="module_RTKConnectedMeetings--module.exports+getRTKConnectedMeetings"></a>

#### module.exports.getRTKConnectedMeetings()
get connected meeting state

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKConnectedMeetings--module.exports)  
<a name="module_RTKConnectedMeetings--module.exports+createMeetings"></a>

#### module.exports.createMeetings(request)
create connected meetings

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKConnectedMeetings--module.exports)  

| Param | Type |
| --- | --- |
| request | <code>Array.&lt;{title: string}&gt;</code> | 

<a name="module_RTKConnectedMeetings--module.exports+updateMeetings"></a>

#### module.exports.updateMeetings(request)
update meeting title

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKConnectedMeetings--module.exports)  

| Param | Type |
| --- | --- |
| request | <code>Array.&lt;{id: string, title: string}&gt;</code> | 

<a name="module_RTKConnectedMeetings--module.exports+deleteMeetings"></a>

#### module.exports.deleteMeetings(meetingIds)
delete connected meetings

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKConnectedMeetings--module.exports)  

| Param | Type |
| --- | --- |
| meetingIds | <code>Array.&lt;string&gt;</code> | 

<a name="module_RTKConnectedMeetings--module.exports+moveParticipants"></a>

#### module.exports.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)
Trigger event to move participants

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKConnectedMeetings--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| sourceMeetingId | <code>string</code> | id of source meeting |
| destinationMeetingId | <code>string</code> | id of destination meeting |
| participantIds | <code>Array.&lt;string&gt;</code> | list of id of the participants |

<a name="module_RTKConnectedMeetings--module.exports+moveParticipantsWithCustomPreset"></a>

#### module.exports.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)
Trigger event to move participants with custom preset

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKConnectedMeetings--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| sourceMeetingId | <code>string</code> | id of source meeting |
| destinationMeetingId | <code>string</code> | id of destination meeting |
| participants | <code>Array.&lt;{id: string, presetId: string}&gt;</code> |  |

