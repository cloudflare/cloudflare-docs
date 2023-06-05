---
_build:
  publishResources: false
  render: never
  list: never

name: "URLSearchParams delete() and has() value argument"
sort_date: "2023-07-01"
enable_date: "2023-07-01"
experimental: false
enable_flag: "urlsearchparams_delete_has_value_arg"
disable_flag: "no_urlsearchparams_delete_has_value_arg"
---

The WHATWG introduced additional optional arguments to the `URLSearchParams` object `delete()` and
`has()` methods that allow for more precise control over the removal of query parameters. Because
the arguments are optional and change the behavior of the methods when present there is a risk of
breaking existing code. To mitigate this risk, the new behavior will be opt-in via a compatibility
flag that becomes the default on July 1, 2023.

For an example of how this change could break existing code, consider code that uses the `Array`
`forEach()` method to iterate through a number of parameters to delete:

```
const usp = new URLSearchParams();
// ...
['abc', 'xyz'].forEach(usp.delete.bind(usp));
```

The `forEach()` automatically passes multiple parameters to the function that is passed in. Prior to
the addition of the new standard parameters, these extra arguments would have been ignored.
Now, however, the additional arguments have meaning and change the behavior of the function.

With this flag, the example above would need to be changed to:

```
const usp = new URLSearchParams();
// ...
['abc', 'xyz'].forEach((key) => usp.delete(key));
```
