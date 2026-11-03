---
title: RTKConnectedMeetings
sidebar_position: 4
---

<!-- Auto Generated Below -->

<a name="module_RTKConnectedMeetings"></a>

This consists of the methods to facilitate connected meetings


* [RTKConnectedMeetings](#module_RTKConnectedMeetings)
    * [.getConnectedMeetings()](#module_RTKConnectedMeetings+getConnectedMeetings)
    * [.createMeetings(request)](#module_RTKConnectedMeetings+createMeetings)
    * [.updateMeetings(request)](#module_RTKConnectedMeetings+updateMeetings)
    * [.deleteMeetings(meetingIds)](#module_RTKConnectedMeetings+deleteMeetings)
    * [.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)](#module_RTKConnectedMeetings+moveParticipants)
    * [.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)](#module_RTKConnectedMeetings+moveParticipantsWithCustomPreset)

<a name="module_RTKConnectedMeetings+getConnectedMeetings"></a>

### meeting.connectedMeetings.getConnectedMeetings()
get connected meeting state

**Kind**: instance method of [<code>RTKConnectedMeetings</code>](#module_RTKConnectedMeetings)  
<a name="module_RTKConnectedMeetings+createMeetings"></a>

### meeting.connectedMeetings.createMeetings(request)
create connected meetings

**Kind**: instance method of [<code>RTKConnectedMeetings</code>](#module_RTKConnectedMeetings)  

| Param | Type |
| --- | --- |
| request | <code>Array.&lt;{title: string}&gt;</code> | 

<a name="module_RTKConnectedMeetings+updateMeetings"></a>

### meeting.connectedMeetings.updateMeetings(request)
update meeting title

**Kind**: instance method of [<code>RTKConnectedMeetings</code>](#module_RTKConnectedMeetings)  

| Param | Type |
| --- | --- |
| request | <code>Array.&lt;{id: string, title: string}&gt;</code> | 

<a name="module_RTKConnectedMeetings+deleteMeetings"></a>

### meeting.connectedMeetings.deleteMeetings(meetingIds)
delete connected meetings

**Kind**: instance method of [<code>RTKConnectedMeetings</code>](#module_RTKConnectedMeetings)  

| Param | Type |
| --- | --- |
| meetingIds | <code>Array.&lt;string&gt;</code> | 

<a name="module_RTKConnectedMeetings+moveParticipants"></a>

### meeting.connectedMeetings.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)
Trigger event to move participants

**Kind**: instance method of [<code>RTKConnectedMeetings</code>](#module_RTKConnectedMeetings)  

| Param | Type | Description |
| --- | --- | --- |
| sourceMeetingId | <code>string</code> | id of source meeting |
| destinationMeetingId | <code>string</code> | id of destination meeting |
| participantIds | <code>Array.&lt;string&gt;</code> | list of id of the participants |

<a name="module_RTKConnectedMeetings+moveParticipantsWithCustomPreset"></a>

### meeting.connectedMeetings.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)
Trigger event to move participants with custom preset

**Kind**: instance method of [<code>RTKConnectedMeetings</code>](#module_RTKConnectedMeetings)  

| Param | Type | Description |
| --- | --- | --- |
| sourceMeetingId | <code>string</code> | id of source meeting |
| destinationMeetingId | <code>string</code> | id of destination meeting |
| participants | <code>Array.&lt;{id: string, presetId: string}&gt;</code> |  |

