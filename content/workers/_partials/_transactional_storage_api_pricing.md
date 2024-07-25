---
_build:
  publishResources: false
  render: never
  list: never
---

The Durable Objects [Transactional Storage API](/durable-objects/api/transactional-storage-api) is only accessible from within Durable Objects.

Durable Objects do not have to use the Transactional Storage API, but if your code does call methods on `state.storage`, it will incur the following additional charges:

|                                  | Paid plan                  |
| -------------------------------- | -------------------------- |
| Read request units<sup>1,2</sup> | 1 million, + $0.20/million |
| Write request units<sup>3</sup>  | 1 million, + $1.00/million |
| Delete requests<sup>4</sup>      | 1 million, + $1.00/million |
| Stored data<sup>5</sup>          | 1 GB, + $0.20/ GB-month    |

<sup>1</sup> A request unit is defined as 4 KB of data read or written. A request that writes or reads more than 4 KB will consume multiple units, for example, a 9 KB write will consume 3 write request units.

<sup>2</sup>  List operations are billed by read request units, based on the amount of data examined. For example, a list request that returns a combined 80 KB of keys and values will be billed 20 read request units. A list request that does not return anything is billed for 1 read request unit.

<sup>3</sup>  Each alarm write is billed as a single write request unit.

<sup>4</sup>  Delete requests are unmetered. For example, deleting a 100 KB value will be charged one delete request.

<sup>5</sup>  Durable Objects will be billed for stored data until the data is removed. Once the data is removed, the object will be cleaned up automatically by the system.

Requests that hit the [Durable Objects in-memory cache](/durable-objects/reference/in-memory-state/) or that use the [multi-key versions of `get()`/`put()`/`delete()` methods](/durable-objects/api/transactional-storage-api/) are billed the same as if they were a normal, individual request for each key.