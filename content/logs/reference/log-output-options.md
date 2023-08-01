---
pcx_content_type: concept
title: Log Output Options
weight: 39
---

# Log Output Options

Jobs in Logpush now have a new key **output_options** which replaces **logpull_options** and allows more flexible formatting.

Edge Logstream jobs do not support this yet.

## Replace logpull_options

Previously, Logpush jobs could be customized by specifying the list of fields, sampling rate, and timestamp format in **logpull_options** as [URL-encoded parameters](/logs/get-started/api-configuration/#options). For example:

```json
{
    "id": 146,
    "dataset": "http_requests",
    "enabled": false,
    "name": "<DOMAIN_NAME>",
    "logpull_options": "fields=ClientIP,EdgeStartTimestamp,RayID&sample=0.1&timestamps=rfc3339",
    "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2"
}
```

We have replaced this with **output_options** as it is used for both Logpull and Logpush.

```json
{
    "id": 146,
    "dataset": "http_requests",
    "enabled": false,
    "name": "<DOMAIN_NAME>",
    "output_options": {
        "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
        "sample_rate": 0.1,
        "timestamp_format": "rfc3339"
    },
    "destination_conf": "s3://<BUCKET_PATH>?region=us-west-2"
}
```

## Output types

By default Logpush outputs each record as a single line of JSON (also known as `ndjson`).

With **output_options** you can switch to CSV or single JSON object, further customize prefixes, suffixes, delimiters, or provide your own record template (in a stripped-down version of Go [text/template](https://pkg.go.dev/text/template) syntax).

The **output_options** object has the following settings:

- **field_names**: array of strings.
- **output_type**: string to specify output type, such as `ndjson` or `csv` (default `ndjson`). This sets default values for the rest of the settings depending on the chosen output type. Some formatting rules (like string quoting) are different between output types.
- **batch_prefix**: string to be prepended before each batch.
- **batch_suffix**: string to be appended after each batch.
- **record_prefix**: string to be prepended before each record.
- **record_suffix**: string to be appended after each record.
- **record_template**: string to use as template for each record instead of the default comma-separated list. All fields used in the template must be present in **field_names** as well, otherwise they will end up as `null`. Format as a Go text/template without any standard functions (like conditionals, loops, sub-templates, etc.). The template can only consist of these three types of tokens:
    - Action: this is either a `{{ .Field }}` or a `{{ "constant text" }}`.
    - Text: this is just constant text in-between the `{{ actions }}`.
    - Comment: the `{{/* comments */}}` are silently dropped.
- **record_delimiter**: string to be inserted in-between the records as separator.
- **field_delimiter**: string to join fields. Will be ignored when **record_template** is set.
- **timestamp_format**: string to specify format for timestamps, such as `unixnano`, `unix`, or `rfc3339`. Default `unixnano`.
- **sample_rate**: floating number to specify sampling rate (default 1.0: no sampling). Sampling is applied on top of filtering, and regardless of the current sample_interval of the data.
- **CVE-2021-44228**: bool, default false. If set to true, will cause all occurrences of `${` in the generated files to be replaced with `x{`.

## Examples

Specifying **field_names** and **output_type** will result in the remaining options being configured as below for the specified **output_type**:

### ndjson

<details>
<summary>Default output_options for `ndjson`</summary>
<div>

```json
{
    "record_prefix": "{",
    "record_suffix": "}\n",
    "field_delimiter": ","
}
```

</div>
</details>

<details>
<summary>Example output_options</summary>
<div>

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "output_type": "ndjson"
}
```

</div>
</details>

<details>
<summary>Example output</summary>
<div>

```json
{"ClientIP":"89.163.242.206","EdgeStartTimestamp":1506702504433000200,"RayID":"3a6050bcbe121a87"}
{"ClientIP":"89.163.242.207","EdgeStartTimestamp":1506702504433000300,"RayID":"3a6050bcbe121a88"}
{"ClientIP":"89.163.242.208","EdgeStartTimestamp":1506702504433000400,"RayID":"3a6050bcbe121a89"}
```

</div>
</details>

- `ndjson` with different field names:

<details>
<summary>Example output_options</summary>
<div>

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "output_type": "ndjson",
    "record_template": "\"client-ip\":{{.ClientIP}},\"timestamp\":{{.EdgeStartTimestamp}},\"ray-id\":{{.RayID}}"
}
```

</div>
</details>

<details>
<summary>Example output</summary>
<div>

```json
{"client-ip":"89.163.242.206","timestamp":1506702504433000200,"ray-id":"3a6050bcbe121a87"}
{"client-ip":"89.163.242.207","timestamp":1506702504433000300,"ray-id":"3a6050bcbe121a88"}
{"client-ip":"89.163.242.208","timestamp":1506702504433000400,"ray-id":"3a6050bcbe121a89"}
```
Literal with double curly-braces `({{}})`, that is, `"double{{curly}}braces"`, can be inserted following go text/template convention, that is, `"{{`double{{curly}}braces`}}"`.

</div>
</details>

### csv

<details>
<summary>Default output_options for CSV</summary>
<div>

```json
{
    "record_suffix": "\n",
    "field_delimiter": ","
}
```

</div>
</details>

<details>
<summary>Example output_options</summary>
<div>

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "output_type": "csv"
}
```

</div>
</details>

<details>
<summary>Example output</summary>
<div>

```csv
"89.163.242.206",1506702504433000200,"3a6050bcbe121a87"
"89.163.242.207",1506702504433000300,"3a6050bcbe121a88"
"89.163.242.208",1506702504433000400,"3a6050bcbe121a89"

```

</div>
</details>

### csv/json variants

Based on above, other formats similar to csv or json are also supported:

- csv with header:

<details>
<summary>Example output_options</summary>
<div>

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "output_type": "csv",
    "batch_prefix": "ClientIP,EdgeStartTimestamp,RayID\n"
}
```

</div>
</details>

<details>
<summary>Example output</summary>
<div>

```csv
ClientIP,EdgeStartTimestamp,RayID
"89.163.242.206",1506702504433000200,"3a6050bcbe121a87"
"89.163.242.207",1506702504433000300,"3a6050bcbe121a88"
"89.163.242.208",1506702504433000400,"3a6050bcbe121a89"
```

</div>
</details>

- tsv with header:

<details>
<summary>Example output_options</summary>
<div>

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "output_type": "csv",
    "batch_prefix": "ClientIP\tEdgeStartTimestamp\tRayID\n",
    "field_delimiter": "\t"
}
```

</div>
</details>

<details>
<summary>Example output</summary>
<div>

```csv
ClientIP	EdgeStartTimestamp  RayID
"89.163.242.206"    1506702504433000200 "3a6050bcbe121a87"
"89.163.242.207"    1506702504433000300 "3a6050bcbe121a88"
"89.163.242.208"    1506702504433000400 "3a6050bcbe121a89"
```

</div>
</details>

- json with nested object:

<details>
<summary>Example output_options</summary>
<div>

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "output_type": "ndjson",
    "batch_prefix": "{\"events\":[",
    "batch_suffix": "\n]}\n",
    "record_prefix": "\n  {\"info\":{",
    "record_suffix": "}}",
    "record_delimiter": ","
}
```

</div>
</details>

<details>
<summary>Example output</summary>
<div>

```json
{"events":[
  {"info":{"ClientIP":"89.163.242.206","EdgeStartTimestamp":1506702504433000200,"RayID":"3a6050bcbe121a87"}},
  {"info":{"ClientIP":"89.163.242.207","EdgeStartTimestamp":1506702504433000300,"RayID":"3a6050bcbe121a88"}},
  {"info":{"ClientIP":"89.163.242.208","EdgeStartTimestamp":1506702504433000400,"RayID":"3a6050bcbe121a89"}}
]}
```

</div>
</details>

## How to migrate

In order to migrate your jobs from using **logpull_options** to the new **output_options**, take these steps:

1. Change the `&fields=ClientIP,EdgeStartTimestamp,RayID` parameter to an array in `output_options.field_names`.
2. Change the `&sample=0.1` parameter to `output_options.sample_rate`.
3. Change the `&timestamps=rfc3339` parameter to `output_options.timestamp_format`.
4. Change the `&CVE-2021-44228=true` parameter to `output_options.CVE-2021-44228`.

For example, if logpull_options are `fields=ClientIP,EdgeStartTimestamp,RayID&sample=0.1&timestamps=rfc3339&CVE-2021-44228=true`, the output_options would be:

```json
"output_options": {
    "field_names": ["ClientIP", "EdgeStartTimestamp", "RayID"],
    "sample_rate": 0.1,
    "timestamp_format": "rfc3339",
    "CVE-2021-4428": true
}
```