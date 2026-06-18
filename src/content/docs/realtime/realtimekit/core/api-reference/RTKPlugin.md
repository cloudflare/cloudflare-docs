---
title: RTKPlugin
sidebar_position: 10
web_core_version: 2.0.0-staging.1
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
        * [new module.exports(context, config, activeRTKPluginsStore, self)](#new_module_RTKPlugin--module.exports_new)
        * [.component](#module_RTKPlugin--module.exports+component)
        * [.telemetry](#module_RTKPlugin--module.exports+telemetry)
        * [.activateForSelf()](#module_RTKPlugin--module.exports+activateForSelf)
        * [.deactivateForSelf()](#module_RTKPlugin--module.exports+deactivateForSelf)
        * [.activate()](#module_RTKPlugin--module.exports+activate)
        * [.deactivate()](#module_RTKPlugin--module.exports+deactivate)

<a name="exp_module_RTKPlugin--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKPlugin--module.exports_new"></a>

#### new module.exports(context, config, activeRTKPluginsStore, self)

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| config | <code>ClientRTKPluginConfig</code> | 
| activeRTKPluginsStore | <code>Store</code> | 
| self | <code>Self</code> | 

<a name="module_RTKPlugin--module.exports+component"></a>

#### module.exports.component
The component for this plugin, as provided in the plugin config.

**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+telemetry"></a>

#### module.exports.telemetry
**Kind**: instance property of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+activateForSelf"></a>

#### module.exports.activateForSelf()
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+deactivateForSelf"></a>

#### module.exports.deactivateForSelf()
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+activate"></a>

#### module.exports.activate()
Activate this plugin for all participants.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
<a name="module_RTKPlugin--module.exports+deactivate"></a>

#### module.exports.deactivate()
Deactivate this plugin for all participants.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKPlugin--module.exports)  
