---
title: RTKPlugin
sidebar_position: 10
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKPlugin"></a>

The RTKPlugin module represents a single plugin in the meeting.
A plugin can be obtained from one of the plugin arrays in `meeting.plugins`.
For example,
```ts
const plugin1 = meeting.plugins.active.get(pluginId);
const plugin2 = meeting.plugins.all.get(pluginId);
```


* [RTKPlugin](#module_RTKPlugin)
    * [module.exports](#exp_module_RTKPlugin--module.exports) ⏏
        * [new module.exports(context, plugin, pluginSocketHandler, self, participants, chat, meetingTitle)](#new_module_RTKPlugin--module.exports_new)
        * [.telemetry](#module_RTKPlugin--module.exports+telemetry)
        * [.sendIframeEvent(message)](#module_RTKPlugin--module.exports+sendIframeEvent)
        * [.handleIframeMessage(iframeMessage)](#module_RTKPlugin--module.exports+handleIframeMessage)
        * [.sendData(payload)](#module_RTKPlugin--module.exports+sendData)
        * [.removeRTKPluginView(viewId)](#module_RTKPlugin--module.exports+removeRTKPluginView)
        * [.addRTKPluginView(iframe, viewId)](#module_RTKPlugin--module.exports+addRTKPluginView)
        * [.setActive(active)](#module_RTKPlugin--module.exports+setActive)
        * [.activateForSelf()](#module_RTKPlugin--module.exports+activateForSelf)
        * [.deactivateForSelf()](#module_RTKPlugin--module.exports+deactivateForSelf)
        * ~~[.enable()](#module_RTKPlugin--module.exports+enable)~~
        * ~~[.disable()](#module_RTKPlugin--module.exports+disable)~~
        * [.activate()](#module_RTKPlugin--module.exports+activate)
        * [.deactivate()](#module_RTKPlugin--module.exports+deactivate)

<a name="exp_module_RTKPlugin--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKPlugin--module.exports_new"></a>

#### new module.exports(context, plugin, pluginSocketHandler, self, participants, chat, meetingTitle)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| plugin | <code>RTKPluginResponse</code> | 
| pluginSocketHandler | <code>RTKPluginSocketHandler</code> | 
| self | <code>Self</code> | 
| participants | <code>Participants</code> | 
| chat | <code>Chat</code> | 
| meetingTitle | <code>string</code> | 

<a name="module_RTKPlugin--module.exports+telemetry"></a>

#### module.exports.telemetry
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+sendIframeEvent"></a>

#### module.exports.sendIframeEvent(message)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>RTKPluginIframeMessage</code> | Socket message forwarded to this plugin. |

<a name="module_RTKPlugin--module.exports+handleIframeMessage"></a>

#### module.exports.handleIframeMessage(iframeMessage)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  

| Param | Type |
| --- | --- |
| iframeMessage | <code>RTKPluginIframeMessage</code> | 

<a name="module_RTKPlugin--module.exports+sendData"></a>

#### module.exports.sendData(payload)
This method is used to send arbitrary data to the plugin.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>SendDataOptions</code> | The payload that you want to send inside the plugin. |
| payload.eventName | <code>string</code> | Name of the event. This is used to listen for the event in plugin SDK. |
| payload.data | <code>any</code> | Data you wish to emit. It can assume any data type. |

<a name="module_RTKPlugin--module.exports+removeRTKPluginView"></a>

#### module.exports.removeRTKPluginView(viewId)
This method is used for cleaning up event listeners attached to an iframe. It must
be used before the iframe is removed from the DOM.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| viewId | <code>string</code> | <code>&quot;default&quot;</code> | ID of the view corresponding to this iframe. Default is 'default'. |

<a name="module_RTKPlugin--module.exports+addRTKPluginView"></a>

#### module.exports.addRTKPluginView(iframe, viewId)
This method adds the communcation layer between the plugin inside the iframe
and the core application (meeting object) in the main window.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| iframe | <code>HTMLIFrameElement</code> \| <code>ReactNativeWebView</code> |  | Iframe element to display this plugin. |
| viewId | <code>string</code> | <code>&quot;default&quot;</code> | ID of the view corresponding to this iframe. Default is 'default'. |

<a name="module_RTKPlugin--module.exports+setActive"></a>

#### module.exports.setActive(active)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  

| Param | Type |
| --- | --- |
| active | <code>boolean</code> | 

<a name="module_RTKPlugin--module.exports+activateForSelf"></a>

#### module.exports.activateForSelf()
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+deactivateForSelf"></a>

#### module.exports.deactivateForSelf()
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+enable"></a>

#### ~~module.exports.enable()~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+disable"></a>

#### ~~module.exports.disable()~~
***Deprecated***

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+activate"></a>

#### module.exports.activate()
Activate this plugin for all participants.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+deactivate"></a>

#### module.exports.deactivate()
Deactivate this plugin for all participants.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
