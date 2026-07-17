---
title: RTKPlugin
sidebar_position: 10
web_core_version: 2.0.1-staging.2
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
    * [.component](#module_RTKPlugin+component)
    * [.telemetry](#module_RTKPlugin+telemetry)
    * [.activeRTKPluginsStore](#module_RTKPlugin+activeRTKPluginsStore)
    * [.activateForSelf()](#module_RTKPlugin+activateForSelf)
    * [.deactivateForSelf()](#module_RTKPlugin+deactivateForSelf)
    * [.activate()](#module_RTKPlugin+activate)
    * [.deactivate()](#module_RTKPlugin+deactivate)

<a name="module_RTKPlugin+component"></a>

### plugin.component
The component for this plugin, as provided in the plugin config.

**Kind**: instance property of [<code>RTKPlugin</code>](#module_RTKPlugin)  
<a name="module_RTKPlugin+telemetry"></a>

### plugin.telemetry
**Kind**: instance property of [<code>RTKPlugin</code>](#module_RTKPlugin)  
<a name="module_RTKPlugin+activeRTKPluginsStore"></a>

### plugin.activeRTKPluginsStore
**Kind**: instance property of [<code>RTKPlugin</code>](#module_RTKPlugin)  

| Param | Type |
| --- | --- |
| context | <code>Context</code> | 
| config | <code>ClientRTKPluginConfig</code> | 
| activeRTKPluginsStore | <code>Store</code> | 
| self | <code>Self</code> | 

<a name="module_RTKPlugin+activateForSelf"></a>

### plugin.activateForSelf()
**Kind**: instance method of [<code>RTKPlugin</code>](#module_RTKPlugin)  
<a name="module_RTKPlugin+deactivateForSelf"></a>

### plugin.deactivateForSelf()
**Kind**: instance method of [<code>RTKPlugin</code>](#module_RTKPlugin)  
<a name="module_RTKPlugin+activate"></a>

### plugin.activate()
Activate this plugin for all participants.

**Kind**: instance method of [<code>RTKPlugin</code>](#module_RTKPlugin)  
<a name="module_RTKPlugin+deactivate"></a>

### plugin.deactivate()
Deactivate this plugin for all participants.

**Kind**: instance method of [<code>RTKPlugin</code>](#module_RTKPlugin)  
