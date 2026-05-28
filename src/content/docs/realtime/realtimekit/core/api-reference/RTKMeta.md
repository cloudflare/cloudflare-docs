---
title: RTKMeta
sidebar_position: 6
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKMeta"></a>

This consists of the metadata of the meeting, such as the room name and the title.


* [RTKMeta](#module_RTKMeta)
    * [module.exports](#exp_module_RTKMeta--module.exports) ⏏
        * [new module.exports(context, self, viewType, roomSocketHandler, meetingTitle)](#new_module_RTKMeta--module.exports_new)
        * [.selfActiveTab](#module_RTKMeta--module.exports+selfActiveTab)
        * [.broadcastTabChanges](#module_RTKMeta--module.exports+broadcastTabChanges)
        * [.viewType](#module_RTKMeta--module.exports+viewType)
        * [.meetingStartedTimestamp](#module_RTKMeta--module.exports+meetingStartedTimestamp)
        * [.meetingTitle](#module_RTKMeta--module.exports+meetingTitle)
        * [.sessionId](#module_RTKMeta--module.exports+sessionId)
        * [.meetingId](#module_RTKMeta--module.exports+meetingId)
        * [.setBroadcastTabChanges(broadcastTabChanges)](#module_RTKMeta--module.exports+setBroadcastTabChanges)
        * [.setSelfActiveTab(spotlightTab, tabChangeSource)](#module_RTKMeta--module.exports+setSelfActiveTab)

<a name="exp_module_RTKMeta--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKMeta--module.exports_new"></a>

#### new module.exports(context, self, viewType, roomSocketHandler, meetingTitle)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| self | <code>Self</code> | 
| viewType | <code>string</code> | 
| roomSocketHandler | <code>RoomSocketHandler</code> | 
| meetingTitle | <code>string</code> | 

<a name="module_RTKMeta--module.exports+selfActiveTab"></a>

#### module.exports.selfActiveTab
Represents the current active tab

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+broadcastTabChanges"></a>

#### module.exports.broadcastTabChanges
Represents whether current user is spotlighted

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+viewType"></a>

#### module.exports.viewType
The `viewType` tells the type of the meeting
possible values are: GROUP_CALL| LIVESTREAM | CHAT | AUDIO_ROOM

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+meetingStartedTimestamp"></a>

#### module.exports.meetingStartedTimestamp
The timestamp of the time when the meeting started.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+meetingTitle"></a>

#### module.exports.meetingTitle
The title of the meeting.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+sessionId"></a>

#### module.exports.sessionId
(Experimental) The sessionId this meeting object is part of.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+meetingId"></a>

#### module.exports.meetingId
The room name of the meeting.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  
<a name="module_RTKMeta--module.exports+setBroadcastTabChanges"></a>

#### module.exports.setBroadcastTabChanges(broadcastTabChanges)
Sets current user as broadcasting tab changes

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  

| Param | Type |
| --- | --- |
| broadcastTabChanges | <code>boolean</code> | 

<a name="module_RTKMeta--module.exports+setSelfActiveTab"></a>

#### module.exports.setSelfActiveTab(spotlightTab, tabChangeSource)
Sets current active tab for user

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKMeta--module.exports)  

| Param | Type |
| --- | --- |
| spotlightTab | <code>ActiveTab</code> | 
| tabChangeSource | <code>TabChangeSource</code> | 

