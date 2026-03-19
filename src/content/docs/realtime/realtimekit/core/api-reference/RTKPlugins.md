---
title: RTKPlugins
sidebar_position: 12
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKPlugins"></a>

The RTKPlugins module consists of all the plugins in the meeting. It has 2 maps:
- `all`: Consists of all the plugins in the meeting.
- `active`: Consists of the plugins that are currently in use.


* [RTKPlugins](#module_RTKPlugins)
    * [module.exports](#exp_module_RTKPlugins--module.exports) ⏏
        * [new module.exports(logger)](#new_module_RTKPlugins--module.exports_new)
        * [.all](#module_RTKPlugins--module.exports+all)
        * [.active](#module_RTKPlugins--module.exports+active)

<a name="exp_module_RTKPlugins--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKPlugins--module.exports_new"></a>

#### new module.exports(logger)

| Param | Type |
| --- | --- |
| logger | <code>Logger</code> | 

<a name="module_RTKPlugins--module.exports+all"></a>

#### module.exports.all
All plugins accessible by the current user.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKPlugins--module.exports)  
<a name="module_RTKPlugins--module.exports+active"></a>

#### module.exports.active
All plugins that are currently enabled in the room.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKPlugins--module.exports)  
