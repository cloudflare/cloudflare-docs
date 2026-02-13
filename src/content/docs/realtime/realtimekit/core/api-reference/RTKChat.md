---
title: RTKChat
sidebar_position: 2
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKChat"></a>

This is the chat module, which can be used to send and receive messages from the meeting.


* [RTKChat](#module_RTKChat)
    * [module.exports](#exp_module_RTKChat--module.exports) ⏏
        * [new module.exports(context, chatSocketHandler, self, participants)](#new_module_RTKChat--module.exports_new)
        * ~~[.messages](#module_RTKChat--module.exports+messages)~~
        * [.telemetry](#module_RTKChat--module.exports+telemetry)
        * [.pinned](#module_RTKChat--module.exports+pinned)
        * [.setMaxTextLimit(limit)](#module_RTKChat--module.exports+setMaxTextLimit)
        * [.sendMessageInternal(message, [participantIds])](#module_RTKChat--module.exports+sendMessageInternal)
        * [.sendTextMessageInternal(message, [peerIds])](#module_RTKChat--module.exports+sendTextMessageInternal)
        * [.sendImageMessageInternal(image, [peerIds])](#module_RTKChat--module.exports+sendImageMessageInternal)
        * [.sendFileMessageInternal(file, [peerIds])](#module_RTKChat--module.exports+sendFileMessageInternal)
        * [.updateRateLimits(num, period)](#module_RTKChat--module.exports+updateRateLimits)
        * [.sendTextMessage(message, [peerIds])](#module_RTKChat--module.exports+sendTextMessage)
        * [.sendCustomMessage(message, [peerIds])](#module_RTKChat--module.exports+sendCustomMessage)
        * [.sendImageMessage(image, [peerIds])](#module_RTKChat--module.exports+sendImageMessage)
        * [.sendFileMessage(file, [peerIds])](#module_RTKChat--module.exports+sendFileMessage)
        * [.sendMessage(message, [participantIds])](#module_RTKChat--module.exports+sendMessage)
        * [.editTextMessage(messageId, message)](#module_RTKChat--module.exports+editTextMessage)
        * [.editImageMessage(messageId, image)](#module_RTKChat--module.exports+editImageMessage)
        * [.editFileMessage(messageId, file)](#module_RTKChat--module.exports+editFileMessage)
        * [.editMessage(messageId, message)](#module_RTKChat--module.exports+editMessage)
        * [.deleteMessage(messageId)](#module_RTKChat--module.exports+deleteMessage)
        * ~~[.getMessagesByUser(userId)](#module_RTKChat--module.exports+getMessagesByUser)~~
        * ~~[.getMessagesByType(type)](#module_RTKChat--module.exports+getMessagesByType)~~
        * [.pin(id)](#module_RTKChat--module.exports+pin)
        * [.unpin(id)](#module_RTKChat--module.exports+unpin)
        * [.fetchPublicMessages(options)](#module_RTKChat--module.exports+fetchPublicMessages)
        * [.fetchPrivateMessages(options)](#module_RTKChat--module.exports+fetchPrivateMessages)
        * [.fetchPinnedMessages(options)](#module_RTKChat--module.exports+fetchPinnedMessages)
        * ~~[.getMessages(timeStamp, size, reversed, [offset])](#module_RTKChat--module.exports+getMessages)~~
        * ~~[.searchMessages(query, [filters])](#module_RTKChat--module.exports+searchMessages)~~

<a name="exp_module_RTKChat--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKChat--module.exports_new"></a>

#### new module.exports(context, chatSocketHandler, self, participants)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| chatSocketHandler | <code>RTKChatSocketHandler</code> | 
| self | <code>Self</code> | 
| participants | <code>Participants</code> | 

<a name="module_RTKChat--module.exports+messages"></a>

#### ~~module.exports.messages~~
***Deprecated***

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  
<a name="module_RTKChat--module.exports+telemetry"></a>

#### module.exports.telemetry
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  
<a name="module_RTKChat--module.exports+pinned"></a>

#### module.exports.pinned
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  
**Deprecated.**: This property is deprectated. Please use `fetchPinnedMessages()` instead.
Returns an array of pinned messages.  
<a name="module_RTKChat--module.exports+setMaxTextLimit"></a>

#### module.exports.setMaxTextLimit(limit)
Set the max character limit of a text message

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | Max character limit for a text message. |

<a name="module_RTKChat--module.exports+sendMessageInternal"></a>

#### module.exports.sendMessageInternal(message, [participantIds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>MessagePayload</code> | Message payload to send. |
| [participantIds] | <code>Array.&lt;string&gt;</code> | Participant ids to send the message to. |

<a name="module_RTKChat--module.exports+sendTextMessageInternal"></a>

#### module.exports.sendTextMessageInternal(message, [peerIds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Text message to send. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+sendImageMessageInternal"></a>

#### module.exports.sendImageMessageInternal(image, [peerIds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>File</code> \| <code>ReactNativeFile</code> | Image file to send. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+sendFileMessageInternal"></a>

#### module.exports.sendFileMessageInternal(file, [peerIds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>ReactNativeFile</code> | File to send. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+updateRateLimits"></a>

#### module.exports.updateRateLimits(num, period)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| period | <code>number</code> | 

<a name="module_RTKChat--module.exports+sendTextMessage"></a>

#### module.exports.sendTextMessage(message, [peerIds])
Sends a chat text message to the room.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message that must be sent to the room. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+sendCustomMessage"></a>

#### module.exports.sendCustomMessage(message, [peerIds])
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>CustomMessagePayload</code> | Custom message payload. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+sendImageMessage"></a>

#### module.exports.sendImageMessage(image, [peerIds])
Sends an image message to the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>File</code> \| <code>ReactNativeFile</code> | The image that is to be sent. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+sendFileMessage"></a>

#### module.exports.sendFileMessage(file, [peerIds])
Sends a file to the meeting.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>ReactNativeFile</code> | A File object. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat--module.exports+sendMessage"></a>

#### module.exports.sendMessage(message, [participantIds])
Sends a message to the meeting. This method can be used to send text, image,
or file messages. The message type is determined by the key 'type' in `message`
object.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>MessagePayload</code> | An object including the type and content of the message. |
| [participantIds] | <code>Array.&lt;string&gt;</code> | An array including the userIds of the participants. |

<a name="module_RTKChat--module.exports+editTextMessage"></a>

#### module.exports.editTextMessage(messageId, message)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| message | <code>string</code> | Updated text message. |

<a name="module_RTKChat--module.exports+editImageMessage"></a>

#### module.exports.editImageMessage(messageId, image)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| image | <code>File</code> \| <code>ReactNativeFile</code> | Updated image file. |

<a name="module_RTKChat--module.exports+editFileMessage"></a>

#### module.exports.editFileMessage(messageId, file)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| file | <code>File</code> \| <code>ReactNativeFile</code> | Updated file. |

<a name="module_RTKChat--module.exports+editMessage"></a>

#### module.exports.editMessage(messageId, message)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| message | <code>MessagePayload</code> | Updated message payload. |

<a name="module_RTKChat--module.exports+deleteMessage"></a>

#### module.exports.deleteMessage(messageId)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to delete. |

<a name="module_RTKChat--module.exports+getMessagesByUser"></a>

#### ~~module.exports.getMessagesByUser(userId)~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The user id of the user that sent the message. |

<a name="module_RTKChat--module.exports+getMessagesByType"></a>

#### ~~module.exports.getMessagesByType(type)~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;text&#x27;</code> \| <code>&#x27;image&#x27;</code> \| <code>&#x27;file&#x27;</code> \| <code>&#x27;custom&#x27;</code> \| <code>&#x27;poll&#x27;</code> | 'text', 'image', 'file', 'custom', or 'poll'. |

<a name="module_RTKChat--module.exports+pin"></a>

#### module.exports.pin(id)
Pins a chat message

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the message to be pinned |

<a name="module_RTKChat--module.exports+unpin"></a>

#### module.exports.unpin(id)
Unpins a chat message

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the message to be unpinned |

<a name="module_RTKChat--module.exports+fetchPublicMessages"></a>

#### module.exports.fetchPublicMessages(options)
Fetches messages from the chat with pagination.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>FetchMessageOptions</code> | Configuration options for fetching messages, including timestamp, limit, and direction for pagination. |

<a name="module_RTKChat--module.exports+fetchPrivateMessages"></a>

#### module.exports.fetchPrivateMessages(options)
Fetches private messages between the current user and another participant with pagination.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>FetchPrivateMessagesOptions</code> | Configuration options for fetching private messages, including private RTKChat ID (User ID of the participant) and pagination settings. |

<a name="module_RTKChat--module.exports+fetchPinnedMessages"></a>

#### module.exports.fetchPinnedMessages(options)
Fetches pinned messages with pagination.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>FetchMessageOptions</code> | Configuration options for fetching pinned messages, including timestamp, limit, and direction. |

<a name="module_RTKChat--module.exports+getMessages"></a>

#### ~~module.exports.getMessages(timeStamp, size, reversed, [offset])~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type | Default |
| --- | --- | --- |
| timeStamp | <code>number</code> |  | 
| size | <code>number</code> |  | 
| reversed | <code>boolean</code> |  | 
| [offset] | <code>number</code> | <code>0</code> | 

<a name="module_RTKChat--module.exports+searchMessages"></a>

#### ~~module.exports.searchMessages(query, [filters])~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKChat--module.exports)  

| Param | Type |
| --- | --- |
| query | <code>string</code> | 
| [filters] | <code>SearchFilters</code> | 

