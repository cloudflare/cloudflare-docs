---
title: RTKStore
sidebar_position: 18
---

<!-- Auto Generated Below -->

<a name="module_RTKStore"></a>

This module represents a single global store.
The store can be accessed from the `meeting.stores` module.

**Returns**: An instance of RTKStore.  
**Example**  
```js
const handRaiseStore = meeting.stores.stores.get('handRaise');
```

* [RTKStore](#module_RTKStore) ⇒
    * [.set(key, value, [sync], [emit])](#module_RTKStore+set) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.bulkSet(data)](#module_RTKStore+bulkSet) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.update(key, value, [sync])](#module_RTKStore+update) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.delete(key, [sync], [emit])](#module_RTKStore+delete) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.bulkDelete(data)](#module_RTKStore+bulkDelete) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.get(key)](#module_RTKStore+get) ⇒ <code>any</code>
    * [.getAll()](#module_RTKStore+getAll) ⇒ <code>RTKStoreData</code>
    * [.clear()](#module_RTKStore+clear)
    * [.updateRateLimits(num, period)](#module_RTKStore+updateRateLimits)
    * [.updateBulkRateLimits(num, period)](#module_RTKStore+updateBulkRateLimits)
    * [.subscribe(key, cb)](#module_RTKStore+subscribe) ⇒ <code>void</code>
    * [.unsubscribe(key, [cb])](#module_RTKStore+unsubscribe) ⇒ <code>void</code>
    * [.populate(data)](#module_RTKStore+populate)

<a name="module_RTKStore+set"></a>

### store.set(key, value, [sync], [emit]) ⇒ <code>Promise.&lt;void&gt;</code>
Sets a value in the store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Unique identifier used to store value. |
| value | <code>any</code> |  | Data to be set. |
| [sync] | <code>boolean</code> | <code>true</code> | Whether to sync change to remote store. |
| [emit] | <code>boolean</code> | <code>false</code> | Whether to emit to local subscribers. |

<a name="module_RTKStore+bulkSet"></a>

### store.bulkSet(data) ⇒ <code>Promise.&lt;void&gt;</code>
Sets multiple values in the store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;{key: string, payload: any}&gt;</code> | 

<a name="module_RTKStore+update"></a>

### store.update(key, value, [sync]) ⇒ <code>Promise.&lt;void&gt;</code>
Updates an already existing value in the store.
If the value stored is `['a', 'b']`, the operation
`store.update(key, ['c'])` will modify
the value to `['a','b','c']`.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Unique identifier used to store value. |
| value | <code>any</code> |  | Data to be updated. |
| [sync] | <code>boolean</code> | <code>true</code> | Whether to sync change to remote store. |

<a name="module_RTKStore+delete"></a>

### store.delete(key, [sync], [emit]) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes a key value pair form the store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | <code>string</code> |  | Unique identifier used to store value. |
| [sync] | <code>boolean</code> | <code>true</code> | Whether to sync change to remote store. |
| [emit] | <code>boolean</code> | <code>false</code> | Whether to emit to local subscribers. |

<a name="module_RTKStore+bulkDelete"></a>

### store.bulkDelete(data) ⇒ <code>Promise.&lt;void&gt;</code>
Deletes multiple values from the store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise.  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;{key: string}&gt;</code> | 

<a name="module_RTKStore+get"></a>

### store.get(key) ⇒ <code>any</code>
Returns value for the given key.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>any</code> - Value for the given key.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier used to store value. |

<a name="module_RTKStore+getAll"></a>

### store.getAll() ⇒ <code>RTKStoreData</code>
Returns the entire store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>RTKStoreData</code> - An instance of RTKStoreData.  
<a name="module_RTKStore+clear"></a>

### store.clear()
Clears all data in the store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
<a name="module_RTKStore+updateRateLimits"></a>

### store.updateRateLimits(num, period)
**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| period | <code>number</code> | 

<a name="module_RTKStore+updateBulkRateLimits"></a>

### store.updateBulkRateLimits(num, period)
**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 
| period | <code>number</code> | 

<a name="module_RTKStore+subscribe"></a>

### store.subscribe(key, cb) ⇒ <code>void</code>
Listens for data change on a store key.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>void</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier used to store value. |
| cb | <code>function</code> | The callback function that gets executed when data is modified. |

<a name="module_RTKStore+unsubscribe"></a>

### store.unsubscribe(key, [cb]) ⇒ <code>void</code>
Removes all listeners for a key on the store.

**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  
**Returns**: <code>void</code> - void  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier used to store value. |
| [cb] | <code>function</code> | Callback to be removed. |

<a name="module_RTKStore+populate"></a>

### store.populate(data)
**Kind**: instance method of [<code>RTKStore</code>](#module_RTKStore)  

| Param | Type |
| --- | --- |
| data | <code>RTKStoreData</code> | 

