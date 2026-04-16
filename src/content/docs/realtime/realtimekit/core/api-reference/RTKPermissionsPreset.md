---
title: RTKPermissionsPreset
sidebar_position: 9
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_PermissionPreset"></a>

The PermissionPreset class represents the meeting permissions for the current participant


* [PermissionPreset](#module_PermissionPreset)
    * _instance_
        * [.stageEnabled](#module_PermissionPreset+stageEnabled)
        * [.stageAccess](#module_PermissionPreset+stageAccess)
        * [.acceptWaitingRequests](#module_PermissionPreset+acceptWaitingRequests)
        * [.requestProduceVideo](#module_PermissionPreset+requestProduceVideo)
        * [.requestProduceAudio](#module_PermissionPreset+requestProduceAudio)
        * [.requestProduceScreenshare](#module_PermissionPreset+requestProduceScreenshare)
        * [.canAllowParticipantAudio](#module_PermissionPreset+canAllowParticipantAudio)
        * [.canAllowParticipantScreensharing](#module_PermissionPreset+canAllowParticipantScreensharing)
        * [.canAllowParticipantVideo](#module_PermissionPreset+canAllowParticipantVideo)
        * [.canDisableParticipantAudio](#module_PermissionPreset+canDisableParticipantAudio)
        * [.canDisableParticipantVideo](#module_PermissionPreset+canDisableParticipantVideo)
        * [.kickParticipant](#module_PermissionPreset+kickParticipant)
        * [.pinParticipant](#module_PermissionPreset+pinParticipant)
        * [.canRecord](#module_PermissionPreset+canRecord)
        * ~~[.waitingRoomType](#module_PermissionPreset+waitingRoomType)~~
        * [.waitingRoomBehaviour](#module_PermissionPreset+waitingRoomBehaviour)
        * [.plugins](#module_PermissionPreset+plugins)
        * [.polls](#module_PermissionPreset+polls)
        * ~~[.produceVideo](#module_PermissionPreset+produceVideo)~~
        * ~~[.requestProduce](#module_PermissionPreset+requestProduce)~~
        * [.canProduceVideo](#module_PermissionPreset+canProduceVideo)
        * ~~[.produceScreenshare](#module_PermissionPreset+produceScreenshare)~~
        * [.canProduceScreenshare](#module_PermissionPreset+canProduceScreenshare)
        * ~~[.produceAudio](#module_PermissionPreset+produceAudio)~~
        * [.canProduceAudio](#module_PermissionPreset+canProduceAudio)
        * [.chatPublic](#module_PermissionPreset+chatPublic)
        * [.chatPrivate](#module_PermissionPreset+chatPrivate)
        * [.hiddenParticipant](#module_PermissionPreset+hiddenParticipant)
        * [.showParticipantList](#module_PermissionPreset+showParticipantList)
        * ~~[.canChangeParticipantRole](#module_PermissionPreset+canChangeParticipantRole)~~
        * [.canChangeParticipantPermissions](#module_PermissionPreset+canChangeParticipantPermissions)
        * ~~[.canChangeTheme](#module_PermissionPreset+canChangeTheme)~~
        * ~~[.canPresent](#module_PermissionPreset+canPresent)~~
        * ~~[.acceptPresentRequests](#module_PermissionPreset+acceptPresentRequests)~~
        * ~~[.maxScreenShareCount](#module_PermissionPreset+maxScreenShareCount)~~
        * [.canLivestream](#module_PermissionPreset+canLivestream)
    * _static_
        * [.fromResponse()](#module_PermissionPreset.fromResponse)
        * [.default()](#module_PermissionPreset.default)

<a name="module_PermissionPreset+stageEnabled"></a>

### meeting.self.permissions.stageEnabled
The `stageEnabled` property returns a boolean value.
If `true`, stage management is available for the participant.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+stageAccess"></a>

### meeting.self.permissions.stageAccess
The `stageAccess` property dictactes how a user interacts with the stage.
There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`;

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+acceptWaitingRequests"></a>

### meeting.self.permissions.acceptWaitingRequests
The `acceptWaitingRequests` returns boolean value.
If `true`, participant can accept the request of waiting participant.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+requestProduceVideo"></a>

### meeting.self.permissions.requestProduceVideo
The `requestProduceVideo` returns boolean value.
If `true`, participant can send request to participants
about producing video.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+requestProduceAudio"></a>

### meeting.self.permissions.requestProduceAudio
The `requestProduceAudio` returns boolean value.
If `true`, participant can send request to participants
about producing audio.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+requestProduceScreenshare"></a>

### meeting.self.permissions.requestProduceScreenshare
The `requestProduceScreenshare` returns boolean value.
If `true`, participant can send request to participants
about sharing screen.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canAllowParticipantAudio"></a>

### meeting.self.permissions.canAllowParticipantAudio
The `canAllowParticipantAudio` returns boolean value.
If `true`, participant can enable other participants` audio.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canAllowParticipantScreensharing"></a>

### meeting.self.permissions.canAllowParticipantScreensharing
The `canAllowParticipantScreensharing` returns boolean value.
If `true`, participant can enable other participants` screen share.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canAllowParticipantVideo"></a>

### meeting.self.permissions.canAllowParticipantVideo
The `canAllowParticipantVideo` returns boolean value.
If `true`, participant can enable other participants` video.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canDisableParticipantAudio"></a>

### meeting.self.permissions.canDisableParticipantAudio
If `true`, a participant can disable other participants` audio.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canDisableParticipantVideo"></a>

### meeting.self.permissions.canDisableParticipantVideo
If `true`, a participant can disable other participants` video.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+kickParticipant"></a>

### meeting.self.permissions.kickParticipant
The `kickParticipant` returns boolean value.
If `true`, participant can remove other participants from the meeting.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+pinParticipant"></a>

### meeting.self.permissions.pinParticipant
The `pinParticipant` returns boolean value.
If `true`, participant can pin a participant in the meeting.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canRecord"></a>

### meeting.self.permissions.canRecord
The `canRecord` returns boolean value.
If `true`, participant can record the meeting.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+waitingRoomType"></a>

### ~~meeting.self.permissions.waitingRoomType~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+waitingRoomBehaviour"></a>

### meeting.self.permissions.waitingRoomBehaviour
The `waitingRoomType` returns string value.
type of waiting room behavior
possible values are `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT`

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+plugins"></a>

### meeting.self.permissions.plugins
The `plugins` tells if the participant can act on plugins
there are 2 permissions with boolean values, `canStart` and `canClose`.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+polls"></a>

### meeting.self.permissions.polls
The `polls` tells if the participant can use polls.
There are 3 permissions with boolean values, `canCreate`, `canVote`, `canViewResults`

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+produceVideo"></a>

### ~~meeting.self.permissions.produceVideo~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+requestProduce"></a>

### ~~meeting.self.permissions.requestProduce~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canProduceVideo"></a>

### meeting.self.permissions.canProduceVideo
The `canProduceVideo` shows permissions for enabling video.
There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+produceScreenshare"></a>

### ~~meeting.self.permissions.produceScreenshare~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canProduceScreenshare"></a>

### meeting.self.permissions.canProduceScreenshare
The `canProduceScreenshare` shows permissions for sharing screen.
There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+produceAudio"></a>

### ~~meeting.self.permissions.produceAudio~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canProduceAudio"></a>

### meeting.self.permissions.canProduceAudio
The `canProduceAudio` shows permissions for enabling audio.
There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+chatPublic"></a>

### meeting.self.permissions.chatPublic
The `chatPublic` shows permissions for public chat
there are 4 permissions
`canSend` - if true, the participant can send chat
`text` - if true, the participant can send text
`files` - if true, the participant can send files

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+chatPrivate"></a>

### meeting.self.permissions.chatPrivate
The `chatPrivate` shows permissions for public chat
there are 4 permissions
`canSend` - if true, the participant can send private chat
`text` - if true, the participant can send text as private chat
`files` - if true, the participant can send files as private chat
`canReceive` - (optional) if true, the participant can receive private chat

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+hiddenParticipant"></a>

### meeting.self.permissions.hiddenParticipant
The `hiddenParticipant` returns boolean value.
If `true`, participant is hidden.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+showParticipantList"></a>

### meeting.self.permissions.showParticipantList
The `showParticipantList` returns boolean value.
If `true`, participant list can be shown to the participant.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canChangeParticipantRole"></a>

### ~~meeting.self.permissions.canChangeParticipantRole~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canChangeParticipantPermissions"></a>

### meeting.self.permissions.canChangeParticipantPermissions
The `canChangeParticipantPermissions` returns boolean value.
If `true`, allow changing the participants' permissions.

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canChangeTheme"></a>

### ~~meeting.self.permissions.canChangeTheme~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canPresent"></a>

### ~~meeting.self.permissions.canPresent~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+acceptPresentRequests"></a>

### ~~meeting.self.permissions.acceptPresentRequests~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+maxScreenShareCount"></a>

### ~~meeting.self.permissions.maxScreenShareCount~~
***Deprecated***

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset+canLivestream"></a>

### meeting.self.permissions.canLivestream
Livestream

**Kind**: instance property of [<code>PermissionPreset</code>](#module_PermissionPreset)  
<a name="module_PermissionPreset.fromResponse"></a>

### meeting.self.permissions.fromResponse()
**Kind**: static method of [<code>PermissionPreset</code>](#module_PermissionPreset)  
**Deprecated.**: Use init()  
<a name="module_PermissionPreset.default"></a>

### meeting.self.permissions.default()
**Kind**: static method of [<code>PermissionPreset</code>](#module_PermissionPreset)  
**Deprecated.**: Use init()  
