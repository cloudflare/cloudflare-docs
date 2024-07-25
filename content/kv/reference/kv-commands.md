---
pcx_content_type: reference
title: Wrangler KV commands
weight: 2
---

# Wrangler KV commands

The `wrangler kv ...` commands allow you to manage your Workers KV resources in the Cloudflare network.

{{<Aside type="warning">}}
Since version 3.60.0, Wrangler KV commands support the `kv ...` syntax. If you are using versions of Wrangler below 3.60.0, the command follows the `kv:...` syntax. Learn more about the deprecation of the `kv:...` syntax in the [`kv:...` syntax deprecation](#kv-syntax-deprecation) section.

To update your Wrangler installation, follow the [Wrangler Install and Update guide](/workers/wrangler/install-and-update/). 
{{</Aside>}}

## `kv namespace`

Manage KV namespaces.

### create

Creates a new KV namespace.

```sh
$ wrangler kv namespace create <NAMESPACE> [OPTIONS]
```

{{<definitions>}}

- `NAMESPACE` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The name of the new namespace.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace (the `preview_id` value).

{{</definitions>}}

#### `create` command to create a KV namespace called `MY_KV`

```sh
$ wrangler kv namespace create "MY_KV"
🌀 Creating namespace with title "worker-MY_KV"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
kv_namespaces = [
  { binding = "MY_KV", id = "e29b263ab50e42ce9b637fa8370175e8" }
]
```
#### `create` command to create a preview KV namespace called `MY_KV`

```sh
$ wrangler kv namespace create "MY_KV" --preview
🌀 Creating namespace with title "my-site-MY_KV_preview"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
kv_namespaces = [
  { binding = "MY_KV", preview_id = "15137f8edf6c09742227e99b08aaf273" }
]
```

### list

Lists all KV namespaces associated with the current account ID.

```sh
$ wrangler kv namespace list
```

#### Pass the Wrangler command through the `jq` command

```sh
$ wrangler kv namespace list | jq "."
[
  {
    "id": "06779da6940b431db6e566b4846d64db",
    "title": "TEST_NAMESPACE"
  },
  {
    "id": "32ac1b3c2ed34ed3b397268817dea9ea",
    "title": "STATIC_CONTENT"
  }
]
```

### delete

Deletes a given KV namespace.

```sh
$ wrangler kv namespace delete [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, to delete.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace to delete.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

#### Delete a KV namespace called MY_KV

```sh
$ wrangler kv namespace delete --binding=MY_KV
Are you sure you want to delete namespace f7b02e7fc70443149ac906dd81ec1791? [y/n]
yes
Deleting namespace f7b02e7fc70443149ac906dd81ec1791
Deleted namespace f7b02e7fc70443149ac906dd81ec1791
```

#### Delete a preview KV namespace called MY_KV

```sh
$ wrangler kv namespace delete --binding=MY_KV --preview
Are you sure you want to delete namespace 15137f8edf6c09742227e99b08aaf273? [y/n]
yes
Deleting namespace 15137f8edf6c09742227e99b08aaf273
Deleted namespace 15137f8edf6c09742227e99b08aaf273
```

## `kv key`

Manage key-value pairs within a KV namespace.

### put

Writes a single key-value pair to a particular KV namespace.

```sh
$ wrangler kv key put <KEY> [VALUE] [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.

Exactly one of `VALUE` or `--path` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key to write to.
- `VALUE` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The value to write.
- `--path` {{<prop-meta>}}optional{{</prop-meta>}}
  - When defined, the value is loaded from the file at `--path` rather than reading it from the `VALUE` argument. This is ideal for security-sensitive operations because it avoids saving keys and values into your terminal history.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the KV namespace, as stored in the `wrangler.toml` file, where the key-pair will be stored.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the KV namespace where the key-pair will be stored.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--ttl` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The lifetime (in number of seconds) that the key-value pair should exist before expiring. Must be at least `60` seconds. This option takes precedence over the `expiration` option.
- `--expiration` {{<type>}}number{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The timestamp, in UNIX seconds, indicating when the key-value pair should expire.
- `--metadata` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Any (escaped) JSON serialized arbitrary object to a maximum of 1024 bytes.

{{</definitions>}}


#### Put a key-value into the KV namespace with binding name of `MY_KV`

```sh
$ wrangler kv key put --binding=MY_KV "my-key" "some-value"
Writing the value "some-value" to key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

#### Put a key-value into the preview KV namespace with binding name of `MY_KV`

```sh
$ wrangler kv key put --binding=MY_KV --preview "my-key" "some-value"
Writing the value "some-value" to key "my-key" on namespace 15137f8edf6c09742227e99b08aaf273.
```

#### Put a key-value into a KV namespace, with a time-to-live value of `10000` seconds

```sh
$ wrangler kv key put --binding=MY_KV "my-key" "some-value" --ttl=10000
Writing the value "some-value" to key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

#### Put a key-value into a KV namespace, where the value is read from the `value.txt` file

```sh
$ wrangler kv key put --binding=MY_KV "my-key" --path=value.txt
Writing the contents of value.txt to the key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

### get

Reads a single value by key from the given KV namespace.

```sh
$ wrangler kv key get <KEY> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key value to get.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, where the key-pair is stored.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace where the key-pair is stored.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}

#### Gets the value of the `"my-key"` key from the KV namespace with binding name `MY_KV`

```sh
$ wrangler kv key get --binding=MY_KV "my-key"
value
```

### list

Outputs a list of all keys in a given KV namespace.

```sh
$ wrangler kv key list [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, from which keys are listed.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace from which keys are listed.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.
- `--prefix` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Only list keys that begin with the given prefix.

{{</definitions>}}


#### Pass the Wrangler command through the `jq` command

```sh
$ wrangler kv key list --binding=MY_KV --prefix="public" | jq "."
[
  {
    "name": "public_key"
  },
  {
    "name": "public_key_with_expiration",
    "expiration": "2019-09-10T23:18:58Z"
  }
]
```

### delete

Removes a single key value pair from the given namespace.

```sh
$ wrangler kv key delete <KEY> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `KEY` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The key value to get.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, from where the key is removed.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace from which the key is removed.
- `--env` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Perform on a specific environment.
- `--preview` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - Interact with a preview namespace instead of production.

{{</definitions>}}


#### Deletes the key-value pair with key `"my-key"` from the KV namespace with binding name `MY_KV`

```sh
$ wrangler kv key delete --binding=MY_KV "my-key"
Deleting the key "my-key" on namespace f7b02e7fc70443149ac906dd81ec1791.
```

## `kv bulk`

Manage multiple key-value pairs within a KV namespace in batches.

### `put`

Writes a JSON file containing an array of key-value pairs to the given namespace.

```sh
$ wrangler kv bulk put <FILENAME> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of key-value pairs to write to the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, from which key-pairs are bulked.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace from which key-pairs are bulked.
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


#### Writing all the key-value pairs found in the `allthethingsupload.json` file

```sh
$ wrangler kv bulk put --binding=MY_KV allthethingsupload.json
Success!
```

### delete

Deletes all keys read from a JSON file within a given namespace.

```sh
$ wrangler kv bulk delete <FILENAME> [OPTIONS]
```

{{<Aside type="warning">}}
Exactly one of `--binding` or `--namespace-id` is required.
{{</Aside>}}

{{<definitions>}}

- `FILENAME` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
  - The JSON file containing an array of keys to delete from the namespace.
- `--binding` {{<type>}}string{{</type>}}
  - The binding name of the namespace, as stored in the `wrangler.toml` file, from which keys are removed.
- `--namespace-id` {{<type>}}string{{</type>}}
  - The ID of the namespace from which keys are removed.
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

#### Delete all the keys found in the `allthethingsdelete.json` file

```sh
$ wrangler kv bulk delete --binding=MY_KV allthethingsdelete.json
? Are you sure you want to delete all keys in allthethingsdelete.json from kv-namespace with id "f7b02e7fc70443149ac906dd81ec1791"? › (Y/n)
Success!
```

# Deprecations

Below are deprecations to Wrangler commands for Workers KV. 

## `kv:...` syntax deprecation

Since version 3.60.0, Wrangler supports the `kv ...` syntax. If you are using versions below 3.60.0, the command follows the `kv:...` syntax. 

The `kv:...` syntax is deprecated in versions 3.60.0 and beyond and will be removed in a future major version. 

For example, commands using the `kv ...` syntax look as such:

```sh
$ wrangler kv namespace list
$ wrangler kv key get <KEY> 
$ wrangler kv bulk put <FILENAME> 
```

The same commands using the `kv:...` syntax look as such:

```sh
$ wrangler kv:namespace list
$ wrangler kv:key get <KEY> 
$ wrangler kv:bulk put <FILENAME> 
```
