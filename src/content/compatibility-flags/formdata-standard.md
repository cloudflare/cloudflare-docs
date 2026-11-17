---
name: "`FormData` follows the spec for its constructor and `Blob` entries"
sort_date: "2026-12-08"
enable_date: "2026-12-08"
enable_flag: "formdata_standard"
disable_flag: "formdata_legacy"
---

When you enable the `formdata_standard` compatibility flag, [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) follows the [XMLHttpRequest standard](https://xhr.spec.whatwg.org/#interface-formdata) in three places:

- `new FormData(form)` throws a `TypeError` for any argument other than `undefined`. Workers have no `HTMLFormElement`, so without the flag an argument such as `null` or a string is ignored.
- A `Blob` added with `append()` or `set()` without a filename becomes a `File` named `"blob"`. Without the flag, it is named after the entry. The name is also the `filename` sent in a `multipart/form-data` body.
- A `File` added with a new filename keeps its `lastModified`. Without the flag, it is set to the current time.

```js
const form = new FormData();
form.append("avatar", new Blob(["..."]));
form.get("avatar").name; // "blob" with the flag, "avatar" without it
```

To keep the previous behavior after the compatibility date, set the `formdata_legacy` flag.
