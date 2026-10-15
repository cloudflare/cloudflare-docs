---
title: RTKChat
sidebar_position: 2
---

<!-- Auto Generated Below -->

<a name="module_RTKChat"></a>

This is the chat module, which can be used to send and receive messages from the meeting.


* [RTKChat](#module_RTKChat)
    * ~~[.messages](#module_RTKChat+messages)~~
    * [.setMaxTextLimit(limit)](#module_RTKChat+setMaxTextLimit)
    * [.updateRateLimits(num, period)](#module_RTKChat+updateRateLimits)
    * [.sendTextMessage(message, [peerIds])](#module_RTKChat+sendTextMessage)
    * [.sendCustomMessage(message, [peerIds])](#module_RTKChat+sendCustomMessage)
    * [.sendImageMessage(image, [peerIds])](#module_RTKChat+sendImageMessage)
    * [.sendFileMessage(file, [peerIds])](#module_RTKChat+sendFileMessage)
    * [.sendMessage(message, [participantIds])](#module_RTKChat+sendMessage)
    * [.editTextMessage(messageId, message)](#module_RTKChat+editTextMessage)
    * [.editImageMessage(messageId, image)](#module_RTKChat+editImageMessage)
    * [.editFileMessage(messageId, file)](#module_RTKChat+editFileMessage)
    * [.editMessage(messageId, message)](#module_RTKChat+editMessage)
    * [.deleteMessage(messageId)](#module_RTKChat+deleteMessage)
    * [.pin(id)](#module_RTKChat+pin)
    * [.unpin(id)](#module_RTKChat+unpin)
    * [.fetchPublicMessages(options)](#module_RTKChat+fetchPublicMessages)
    * [.fetchPrivateMessages(options)](#module_RTKChat+fetchPrivateMessages)
    * [.fetchPinnedMessages(options)](#module_RTKChat+fetchPinnedMessages)

<a name="module_RTKChat+messages"></a>

### ~~meeting.chat.messages~~
***Deprecated***

**Kind**: instance property of [<code>RTKChat</code>](#module_RTKChat)  
<a name="module_RTKChat+setMaxTextLimit"></a>

### meeting.chat.setMaxTextLimit(limit)
Set the max character limit of a text message

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| limit | <code>number</code> | Max character limit for a text message. |

<a name="module_RTKChat+updateRateLimits"></a>

### meeting.chat.updateRateLimits(num, period)
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| period | <code>number</code> | 

<a name="module_RTKChat+sendTextMessage"></a>

### meeting.chat.sendTextMessage(message, [peerIds])
Sends a chat text message to the room.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | The message that must be sent to the room. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat+sendCustomMessage"></a>

### meeting.chat.sendCustomMessage(message, [peerIds])
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>CustomMessagePayload</code> | Custom message payload. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat+sendImageMessage"></a>

### meeting.chat.sendImageMessage(image, [peerIds])
Sends an image message to the meeting.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>File</code> \| <code>ReactNativeFile</code> | The image that is to be sent. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat+sendFileMessage"></a>

### meeting.chat.sendFileMessage(file, [peerIds])
Sends a file to the meeting.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>ReactNativeFile</code> | A File object. |
| [peerIds] | <code>Array.&lt;string&gt;</code> | Peer ids to send the message to. |

<a name="module_RTKChat+sendMessage"></a>

### meeting.chat.sendMessage(message, [participantIds])
Sends a message to the meeting. This method can be used to send text, image,
or file messages. The message type is determined by the key 'type' in `message`
object.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>MessagePayload</code> | An object including the type and content of the message. |
| [participantIds] | <code>Array.&lt;string&gt;</code> | An array including the userIds of the participants. |

<a name="module_RTKChat+editTextMessage"></a>

### meeting.chat.editTextMessage(messageId, message)
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| message | <code>string</code> | Updated text message. |

<a name="module_RTKChat+editImageMessage"></a>

### meeting.chat.editImageMessage(messageId, image)
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| image | <code>File</code> \| <code>ReactNativeFile</code> | Updated image file. |

<a name="module_RTKChat+editFileMessage"></a>

### meeting.chat.editFileMessage(messageId, file)
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| file | <code>File</code> \| <code>ReactNativeFile</code> | Updated file. |

<a name="module_RTKChat+editMessage"></a>

### meeting.chat.editMessage(messageId, message)
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to edit. |
| message | <code>MessagePayload</code> | Updated message payload. |

<a name="module_RTKChat+deleteMessage"></a>

### meeting.chat.deleteMessage(messageId)
**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>string</code> | Id of the message to delete. |

<a name="module_RTKChat+pin"></a>

### meeting.chat.pin(id)
Pins a chat message

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the message to be pinned |

<a name="module_RTKChat+unpin"></a>

### meeting.chat.unpin(id)
Unpins a chat message

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | ID of the message to be unpinned |

<a name="module_RTKChat+fetchPublicMessages"></a>

### meeting.chat.fetchPublicMessages(options)
Fetches messages from the chat with pagination.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>FetchMessageOptions</code> | Configuration options for fetching messages, including timestamp, limit, and direction for pagination. |

<a name="module_RTKChat+fetchPrivateMessages"></a>

### meeting.chat.fetchPrivateMessages(options)
Fetches private messages between the current user and another participant with pagination.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>FetchPrivateMessagesOptions</code> | Configuration options for fetching private messages, including private RTKChat ID (User ID of the participant) and pagination settings. |

<a name="module_RTKChat+fetchPinnedMessages"></a>

### meeting.chat.fetchPinnedMessages(options)
Fetches pinned messages with pagination.

**Kind**: instance method of [<code>RTKChat</code>](#module_RTKChat)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>FetchMessageOptions</code> | Configuration options for fetching pinned messages, including timestamp, limit, and direction. |

