---
pcx_content_type: reference
title: Audit Logs
---

# Audit Logs

[Audit logs](/fundamentals/setup/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to R2 buckets. This functionality is available on all plan types, free of charge, and is enabled by default.

## Viewing audit logs

To view audit logs for your R2 buckets:
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?account=audit-log) and select your account.
2. Go to **Manage Account** > **Audit Log**.

For more information on how to access and use audit logs, refer to [Review audit logs](/fundamentals/setup/account/account-security/review-audit-logs/).

## Logged operations

The following configuration actions are logged:

<table>
  <tbody>
    <th colspan="5" rowspan="1" style="width:220px">
      Operation
    </th>
    <th colspan="5" rowspan="1">
      Description
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        CreateBucket
      </td>
      <td colspan="5" rowspan="1">
        Creation of a new bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DeleteBucket
      </td>
      <td colspan="5" rowspan="1">
        Deletion of an existing bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        AddCustomDomain
      </td>
      <td colspan="5" rowspan="1">
        Addition of a custom domain to a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        RemoveCustomDomain
      </td>
      <td colspan="5" rowspan="1">
        Removal of a custom domain from a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        ChangeBucketVisibility
      </td>
      <td colspan="5" rowspan="1">
        Change to the managed public access (<code>r2.dev</code>) settings of a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        PutBucketStorageClass
      </td>
      <td colspan="5" rowspan="1">
        Change to the default storage class of a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        PutBucketLifecycleConfiguration
      </td>
      <td colspan="5" rowspan="1">
        Change to the object lifecycle configuration of a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DeleteBucketLifecycleConfiguration
      </td>
      <td colspan="5" rowspan="1">
        Deletion of the object lifecycle configuration for a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        PutBucketCors
      </td>
      <td colspan="5" rowspan="1">
        Change to the CORS configuration for a bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DeleteBucketCors
      </td>
      <td colspan="5" rowspan="1">
        Deletion of the CORS configuration for a bucket.
      </td>
    </tr>
  </tbody>
</table>

{{<Aside type="note">}}

Logs for data access operations, such as `GetObject` and `PutObject`, are not included in audit logs. To log HTTP requests made to public R2 buckets, use the [HTTP requests](/logs/reference/log-fields/zone/http_requests/) Logpush dataset.

{{</Aside>}}

## Example log entry

Below is an example of an audit log entry showing the creation of a new bucket:

```json
{
  "action": { "info": "CreateBucket", "result": true, "type": "create" },
  "actor": {
    "email": "<ACTOR_EMAIL>",
    "id": "3f7b730e625b975bc1231234cfbec091",
    "ip": "fe32:43ed:12b5:526::1d2:13",
    "type": "user"
  },
  "id": "5eaeb6be-1234-406a-87ab-1971adc1234c",
  "interface": "API",
  "metadata": { "zone_name": "r2.cloudflarestorage.com" },
  "newValue": "",
  "newValueJson": {},
  "oldValue": "",
  "oldValueJson": {},
  "owner": { "id": "1234d848c0b9e484dfc37ec392b5fa8a" },
  "resource": { "id": "my-bucket", "type": "r2.bucket" },
  "when": "2024-07-15T16:32:52.412Z"
}

```