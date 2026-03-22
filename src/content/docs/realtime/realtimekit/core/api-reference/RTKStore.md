---
title: RTKStore
sidebar_position: 18
web_core_version: 1.2.4
---

<!-- Auto Generated Below -->

<a name="module_RTKStore"></a>

This module represents a single global store.
The store can be accessed from the `meeting.stores` module.

**Returns**: An instance of RTKStore.  
**Example**  
```js
const handRaiseRTKStore = meeting.stores.stores.get('handRaise');
```

* [RTKStore](#module_RTKStore) ⇒
    * [module.exports](#exp_module_RTKStore--module.exports) ⏏
        * [new module.exports(args)](#new_module_RTKStore--module.exports_new)
        * [.set(key, value, [sync], [emit])](#module_RTKStore--module.exports+set) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.bulkSet(data)](#module_RTKStore--module.exports+bulkSet) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.update(key, value, [sync])](#module_RTKStore--module.exports+update) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.delete(key, [sync], [emit])](#module_RTKStore--module.exports+delete) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.bulkDelete(data)](#module_RTKStore--module.exports+bulkDelete) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.get(key)](#module_RTKStore--module.exports+get) ⇒ <code>any</code>
        * [.getAll()](#module_RTKStore--module.exports+getAll) ⇒ <code>RTKStoreData</code>
        * [.updateRateLimits(num, period)](#module_RTKStore--module.exports+updateRateLimits)
        * [.updateBulkRateLimits(num, period)](#module_RTKStore--module.exports+updateBulkRateLimits)
        * [.subscribe(key, cb)](#module_RTKStore--module.exports+subscribe) ⇒ <code>void</code>
        * [.unsubscribe(key, [cb])](#module_RTKStore--module.exports+unsubscribe) ⇒ <code>void</code>
        * [.populate(data)](#module_RTKStore--module.exports+populate)

<a name="exp_module_RTKStore--module.exports"></a>

### module.exports ⏏
**Kind**: Exported class  
<a name="new_module_RTKStore--module.exports_new"></a>

#### new module.exports(args)

| Param | Type |
| --- | --- |
| args | <code>Object</code> | 
| args.name | <code>string</code> | 
| args.socketHandler | <code>PluginSocketHandler</code> | 
| args.meetingId | <code>string</code> | 

<a name="module_RTKStore--module.exports+set"></a>

#### module.exports.set(key, value, [sync], [emit]) ⇒ <code>Promise.&lt;void&gt;</code>
Sets a value in the store.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Unique identifier used to store value. |
| value | <code>any</code> |  | Data to be set. |
| [sync] | <code>boolean</code> | <code>true</code> | Whether to sync change to remote store. |
| [emit] | <code>boolean</code> | <code>false</code> | Whether to emit to local subscribers. |

<a name="module_RTKStore--module.exports+bulkSet"></a>

#### module.exports.bulkSet(data) ⇒ <code>Promise.&lt;void&gt;</code>
Sets multiple values in the store.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;{key: string, payload: any}&gt;</code> | 

<a name="module_RTKStore--module.exports+update"></a>

#### module.exports.update(key, value, [sync]) ⇒ <code>Promise.&lt;void&gt;</code>
Updates an already existing value in the store.
If the value stored is `['a', 'b']`, the operation
`store.update(key, ['c'])` will modify
the value to `['a','b','c']`.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Unique identifier used to store value. |
| value | <code>any</code> |  | Data to be updated. |
| [sync] | <code>boolean</code> | <code>true</code> | Whether to sync change to remote store. |

<a name="module_RTKStore--module.exports+delete"></a>

#### module.exports.delete(key, [sync], [emit]) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes a key value pair form the store.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Unique identifier used to store value. |
| [sync] | <code>boolean</code> | <code>true</code> | Whether to sync change to remote store. |
| [emit] | <code>boolean</code> | <code>false</code> | Whether to emit to local subscribers. |

<a name="module_RTKStore--module.exports+bulkDelete"></a>

#### module.exports.bulkDelete(data) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes multiple values from the store.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;{key: string}&gt;</code> | 

<a name="module_RTKStore--module.exports+get"></a>

#### module.exports.get(key) ⇒ <code>any</code>
Returns value for the given key.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>any</code> - Value for the given key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier used to store value. |

<a name="module_RTKStore--module.exports+getAll"></a>

#### module.exports.getAll() ⇒ <code>RTKStoreData</code>
Returns the entire store.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>RTKStoreData</code> - An instance of RTKStoreData.  
<a name="module_RTKStore--module.exports+updateRateLimits"></a>

#### module.exports.updateRateLimits(num, period)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| period | <code>number</code> | 

<a name="module_RTKStore--module.exports+updateBulkRateLimits"></a>

#### module.exports.updateBulkRateLimits(num, period)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| period | <code>number</code> | 

<a name="module_RTKStore--module.exports+subscribe"></a>

#### module.exports.subscribe(key, cb) ⇒ <code>void</code>
Listens for data change on a store key.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>void</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier used to store value. |
| cb | <code>function</code> | The callback function that gets executed when data is modified. |

<a name="module_RTKStore--module.exports+unsubscribe"></a>

#### module.exports.unsubscribe(key, [cb]) ⇒ <code>void</code>
Removes all listeners for a key on the store.

**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  
**Returns**: <code>void</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier used to store value. |
| [cb] | <code>function</code> | Callback to be removed. |

<a name="module_RTKStore--module.exports+populate"></a>

#### module.exports.populate(data)
**Kind**: instance method of [<code>module.exports</code>](#exp_module_RTKStore--module.exports)  

| Param | Type |
| --- | --- |
| data | <code>RTKStoreData</code> | 

