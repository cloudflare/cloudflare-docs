---
pcx_content_type: reference
title: Commands
weight: 2
---

## `kv:bulk`

Manage multiple key-value pairs within a Workers KV namespace in batches.

{{<Aside type="note">}}
The `kv:...` commands allow you to manage application data in the Cloudflare network to be accessed from Workers using Workers KV. 
{{</Aside>}}

### `put`

Writes a JSON file containing an array of key-value pairs to the given namespace.

```sh
$ wrangler kv:bulk put <FILENAME> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of key-value pairs to write to the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

This command takes a JSON file as an argument with a list of key-value pairs to upload. An example of JSON input:

```json
[
  {
    "key": "test_key",
    "value": "test_value",
    "expiration_ttl": 3600
  }
]
```

KV namespace values can only store strings. In order to save complex a value, stringify it to JSON:

```json
[
  {
    "key": "test_key",
    "value": "{\"name\": \"test_value\"}",
    "expiration_ttl": 3600
  }
]
```

Here is the full schema for key-value entries uploaded via the bulk API:

{{<definitions>}}

- `key` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key’s name. The name may be 512 bytes maximum. All printable, non-whitespace characters are valid.
- `value` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The UTF-8 encoded string to be stored, up to 25 MB in length.
- `metadata` {{<type>}}object{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Any arbitrary object (must serialize to JSON) to a maximum of 1024 bytes.
- `expiration` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The time, measured in number of seconds since the UNIX epoch, at which the key should expire.
- `expiration_ttl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The number of seconds the document should exist before expiring. Must be at least `60` seconds.
- `base64` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - When true, the server will decode the value as base64 before storing it. This is useful for writing values that would otherwise be invalid JSON strings, such as images. Defaults to `false`.

{{</definitions>}}

{{<Aside type="note">}}
If both `expiration` and `expiration_ttl` are specified for a given key, the API will prefer `expiration_ttl`.
{{</Aside>}}

{{<Aside type="note">}}
Here is an example of writing all the key-value pairs found in the `allthethingsupload.json` file.

```sh
$ wrangler kv:bulk put --binding=MY_KV allthethingsupload.json
Success!
```

{{</Aside>}}

### `delete`

Deletes all keys read from a JSON file within a given namespace.

```sh
$ wrangler kv:bulk delete <FILENAME> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of keys to delete from the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

This command takes a JSON file as an argument containing an array of keys to delete.
Here is an example of the JSON input:

```json
["test_key_1", "test_key_2"]
```

{{<Aside type="note">}}
Below is an example of deleting all the keys found in the `allthethingsdelete.json` file.

```sh
$ wrangler kv:bulk delete --binding=MY_KV allthethingsdelete.json
? Are you sure you want to delete all keys in allthethingsdelete.json from kv-namespace with id "f7b02e7fc70443149ac906dd81ec1791"? › (Y/n)
Success!
```

{{</Aside>}}

---