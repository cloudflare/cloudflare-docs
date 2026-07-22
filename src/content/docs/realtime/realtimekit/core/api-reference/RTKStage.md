---
title: RTKStage
sidebar_position: 17
---

<!-- Auto Generated Below -->

<a name="module_RTKStage"></a>

The RTKStage module represents a class to mange the RTKStage of the meeting
RTKStage refers to a virtual area, where participants stream are visible to other participants.
When a participant is off stage, they are not producing media
but only consuming media from participants who are on RTKStage


* [RTKStage](#module_RTKStage)
    * [.peerId](#module_RTKStage+peerId)
    * [.getAccessRequests()](#module_RTKStage+getAccessRequests)
    * [.requestAccess()](#module_RTKStage+requestAccess)
    * [.cancelRequestAccess()](#module_RTKStage+cancelRequestAccess)
    * [.grantAccess()](#module_RTKStage+grantAccess)
    * [.denyAccess()](#module_RTKStage+denyAccess)
    * [.join()](#module_RTKStage+join)
    * [.leave()](#module_RTKStage+leave)
    * [.kick(userIds)](#module_RTKStage+kick)

<a name="module_RTKStage+peerId"></a>

### meeting.stage.peerId
Returns the peerId of the current user

**Kind**: instance property of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+getAccessRequests"></a>

### meeting.stage.getAccessRequests()
Method to fetch all RTKStage access requests from viewers

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+requestAccess"></a>

### meeting.stage.requestAccess()
Method to send a request to privileged users to join the stage

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+cancelRequestAccess"></a>

### meeting.stage.cancelRequestAccess()
Method to cancel a previous RTKStage join request

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+grantAccess"></a>

### meeting.stage.grantAccess()
Method to grant access to RTKStage.
	This can be in response to a RTKStage Join request but it can be called on other users as well

`permissions.acceptStageRequests` privilege required

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+denyAccess"></a>

### meeting.stage.denyAccess()
Method to deny access to RTKStage.
This should be called in response to a RTKStage Join request

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+join"></a>

### meeting.stage.join()
Method to join the stage
Users either need to have the permission in the preset or must be accepted by a privileged
user to call this method

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+leave"></a>

### meeting.stage.leave()
Method to leave the stage
Users must either be on the stage already or be accepted to join the stage
to call this method

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  
<a name="module_RTKStage+kick"></a>

### meeting.stage.kick(userIds)
Method to kick a user off the stage

`permissions.acceptStageRequests` privilege required

**Kind**: instance method of [<code>RTKStage</code>](#module_RTKStage)  

| Param | Type |
| --- | --- |
| userIds | <code>Array.&lt;string&gt;</code> | 

