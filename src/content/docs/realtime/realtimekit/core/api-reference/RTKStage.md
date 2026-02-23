---
title: RTKStage
sidebar_position: 17
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKStage"></a>

The RTKStage module represents a class to mange the RTKStage of the meeting
RTKStage refers to a virtual area, where participants stream are visible to other participants.
When a participant is off stage, they are not producing media
but only consuming media from participants who are on RTKStage


* [RTKStage](#module_RTKStage)
    * [module.exports](#exp_module_RTKStage--module.exports) ⏏
        * [new module.exports(context, self, participants, stageSocketHandler, roomSocketHandler)](#new_module_RTKStage--module.exports_new)
        * [.telemetry](#module_RTKStage--module.exports+telemetry)
        * [.peerId](#module_RTKStage--module.exports+peerId)
        * [.getAccessRequests()](#module_RTKStage--module.exports+getAccessRequests)
        * [.requestAccess()](#module_RTKStage--module.exports+requestAccess)
        * [.cancelRequestAccess()](#module_RTKStage--module.exports+cancelRequestAccess)
        * [.grantAccess()](#module_RTKStage--module.exports+grantAccess)
        * [.denyAccess()](#module_RTKStage--module.exports+denyAccess)
        * [.join()](#module_RTKStage--module.exports+join)
        * [.leave()](#module_RTKStage--module.exports+leave)
        * [.kick(userIds)](#module_RTKStage--module.exports+kick)

<a name="exp_module_RTKStage--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKStage--module.exports_new"></a>

#### new module.exports(context, self, participants, stageSocketHandler, roomSocketHandler)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| self | <code>Self</code> | 
| participants | <code>Participants</code> | 
| stageSocketHandler | <code>RTKStageSocketHandler</code> | 
| roomSocketHandler | <code>RoomSocketHandler</code> | 

<a name="module_RTKStage--module.exports+telemetry"></a>

#### module.exports.telemetry
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+peerId"></a>

#### module.exports.peerId
Returns the peerId of the current user

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+getAccessRequests"></a>

#### module.exports.getAccessRequests()
Method to fetch all RTKStage access requests from viewers

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+requestAccess"></a>

#### module.exports.requestAccess()
Method to send a request to privileged users to join the stage

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+cancelRequestAccess"></a>

#### module.exports.cancelRequestAccess()
Method to cancel a previous RTKStage join request

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+grantAccess"></a>

#### module.exports.grantAccess()
Method to grant access to RTKStage.
	This can be in response to a RTKStage Join request but it can be called on other users as well

`permissions.acceptRTKStageRequests` privilege required

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+denyAccess"></a>

#### module.exports.denyAccess()
Method to deny access to RTKStage.
This should be called in response to a RTKStage Join request

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+join"></a>

#### module.exports.join()
Method to join the stage
Users either need to have the permission in the preset or must be accepted by a priveleged
user to call this method

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+leave"></a>

#### module.exports.leave()
Method to leave the stage
Users must either be on the stage already or be accepted to join the stage
to call this method

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  
<a name="module_RTKStage--module.exports+kick"></a>

#### module.exports.kick(userIds)
Method to kick a user off the stage

`permissions.acceptRTKStageRequests` privilege required

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStage--module.exports)  

| Param | Type |
| --- | --- |
| userIds | <code>Array.&lt;string&gt;</code> | 

