---
title: RTKMeta
sidebar_position: 6
---

<!-- Auto Generated Below -->

<a name="module_RTKMeta"></a>

This consists of the metadata of the meeting, such as the room name and the title.


* [RTKMeta](#module_RTKMeta)
    * [.selfActiveTab](#module_RTKMeta+selfActiveTab)
    * [.broadcastTabChanges](#module_RTKMeta+broadcastTabChanges)
    * [.viewType](#module_RTKMeta+viewType)
    * [.meetingStartedTimestamp](#module_RTKMeta+meetingStartedTimestamp)
    * [.meetingTitle](#module_RTKMeta+meetingTitle)
    * [.sessionId](#module_RTKMeta+sessionId)
    * [.meetingId](#module_RTKMeta+meetingId)
    * [.setBroadcastTabChanges(broadcastTabChanges)](#module_RTKMeta+setBroadcastTabChanges)
    * [.setSelfActiveTab(spotlightTab, tabChangeSource)](#module_RTKMeta+setSelfActiveTab)

<a name="module_RTKMeta+selfActiveTab"></a>

### meeting.meta.selfActiveTab
Represents the current active tab

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+broadcastTabChanges"></a>

### meeting.meta.broadcastTabChanges
Represents whether current user is spotlighted

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+viewType"></a>

### meeting.meta.viewType
The `viewType` tells the type of the meeting
possible values are: GROUP_CALL| LIVESTREAM | CHAT | AUDIO_ROOM

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+meetingStartedTimestamp"></a>

### meeting.meta.meetingStartedTimestamp
The timestamp of the time when the meeting started.

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+meetingTitle"></a>

### meeting.meta.meetingTitle
The title of the meeting.

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+sessionId"></a>

### meeting.meta.sessionId
(Experimental) The sessionId this meeting object is part of.

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+meetingId"></a>

### meeting.meta.meetingId
The room name of the meeting.

**Kind**: instance property of [<code>RTKMeta</code>](#module_RTKMeta)  
<a name="module_RTKMeta+setBroadcastTabChanges"></a>

### meeting.meta.setBroadcastTabChanges(broadcastTabChanges)
Sets current user as broadcasting tab changes

**Kind**: instance method of [<code>RTKMeta</code>](#module_RTKMeta)  

| Param | Type |
| --- | --- |
| broadcastTabChanges | <code>boolean</code> | 

<a name="module_RTKMeta+setSelfActiveTab"></a>

### meeting.meta.setSelfActiveTab(spotlightTab, tabChangeSource)
Sets current active tab for user

**Kind**: instance method of [<code>RTKMeta</code>](#module_RTKMeta)  

| Param | Type |
| --- | --- |
| spotlightTab | <code>ActiveTab</code> | 
| tabChangeSource | <code>TabChangeSource</code> | 

