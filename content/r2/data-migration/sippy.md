---
title: Sippy (beta)
pcx_content_type: how-to
weight: 2
---

# Sippy

Sippy is a data migration service that allows you to copy data from other cloud providers to R2 as the data is requested, without paying unnecessary cloud egress fees typically associated with moving large amounts of data. 

{{<Aside type="note" header="Open Beta">}}

This feature is currently in beta. We do not recommend using Sippy for production traffic while in beta. 

To report bugs or request features, reach out to us on the [Cloudflare Developer Discord](https://discord.gg/rrZXVVcKQF) in the #r2-storage channel or fill out our [feedback form](https://forms.gle/7WuCsbu5LmWkQVu76).

{{</Aside>}}

Migration-specific egress fees are reduced by leveraging requests within the flow of your application where you would already be paying egress fees to simultaneously copy objects to R2.

## How it works

When enabled for an R2 bucket, Sippy implements the following migration strategy across [Workers](/r2/api/workers/), [S3 API](/r2/api/s3/), and [public buckets](/r2/buckets/public-buckets/): 

- When an object is requested, it is served from your R2 bucket if it is found. 
- If the object is not found in R2, the object will simultaneously be returned from your source storage bucket and copied to R2.
- All other operations, including put and delete, continue to work as usual.

## When is Sippy useful?

Using Sippy as part of your migration strategy can be a good choice when:

- You want to start migrating your data, but you want to avoid paying upfront egress fees to facilitate the migration of your data all at once.
- You want to experiment by serving frequently accessed objects from R2 to eliminate egress fees, without investing time in data migration.
- You have frequently changing data and are looking to conduct a migration while avoiding downtime. Sippy can be used to serve requests while [Super Slurper](/r2/data-migration/super-slurper/) can be used to migrate your remaining data.

If you are looking to migrate all of your data from an existing cloud provider to R2 at one time, we recommend using [Super Slurper](/r2/data-migration/super-slurper/).

## Get started with Sippy

### Enable Sippy on your R2 bucket

During the beta, Sippy can only be enabled on your R2 bucket by using the API. Before getting started, you’ll need:

- An existing R2 bucket. If you don’t already have one, refer to [Create buckets](/r2/buckets/create-buckets/).
- [AWS credentials](/r2/data-migration/sippy/#create-amazon-s3-credentials) in the form of Access Key ID and Secret Access Key with read and list permissions.
- Cloudflare API token, R2 Access Key ID and Secret Access Key with read and write permissions. For more information, refer to [Authentication](/r2/api/s3/tokens/).

The example below shows how to enable Sippy for an R2 bucket with cURL. For information about getting started with the Cloudflare API, refer to [Make API calls](/fundamentals/api/how-to/make-api-calls/).

{{<Aside type="note">}}

If your bucket is setup with [jurisdictional restrictions](/r2/reference/data-location/#jurisdictional-restrictions), you will need to pass a `cf-r2-jurisdiction` request header with that jurisdiction. For example, `cf-r2-jurisdiction: eu`.

{{</Aside>}}

```bash
curl -X PUT https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/buckets/{bucket_name}/sippy \
--header "Authorization: Bearer <API_TOKEN>" \
--data '{"provider": "AWS", "bucket": "<AWS_BUCKET_NAME>", "zone": "<AWS_REGION>","key_id": "<AWS_ACCESS_KEY_ID>", "access_key":"<AWS_SECRET_ACCESS_KEY>", "r2_key_id": "<R2_ACCESS_KEY_ID>", "r2_access_key": "<R2_SECRET_ACCESS_KEY>"}'
```

#### Parameters

- **provider** string - The provider of your source object storage bucket. Currently, `AWS` is the only supported option.
- **bucket** string - The name of your AWS S3 bucket.
- **zone** (optional) string - The AWS region where your S3 bucket is located. For example: `us-west-2`.
- **key_id** string - Your AWS Access Key ID. Requires read and list access.
- **access_key** string - Your AWS Secret Access Key. Requires read and list access.
- **r2_key_id** string - Your R2 Access Key ID. Requires read and write access.
- **r2_access_key** string - Your R2 Secret Access Key. Requires read and write access.

### Disable Sippy on your R2 bucket

The example below shows how to disable Sippy for an R2 bucket with cURL.

```bash
curl -X DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/r2/buckets/{bucket_name}/sippy \
--header "Authorization: Bearer <API_TOKEN>"
```

## Supported cloud storage providers
We currently support copying data from the following cloud object storage providers to R2:
- Amazon S3

## R2 API interactions

When Sippy is enabled, it changes the behavior of certain actions on your R2 bucket across [Workers](/r2/api/workers/), [S3 API](/r2/api/s3/), and [public buckets](/r2/buckets/public-buckets/).

<table>
  <tbody>
    <th colspan="5" rowspan="1" style="width:220px">
      Action
    </th>
    <th colspan="5" rowspan="1">
      New behavior
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        GetObject
      </td>
      <td colspan="5" rowspan="1">
        Calls to GetObject will first attempt to retrieve the object from your R2 bucket. If the object is not present, the object will be served from the source storage bucket and simultaneously uploaded to the requested R2 bucket.<br /><br />
        Additional considerations:
        <ul>
            <li>Modifications to objects in the source bucket will not be reflected in R2 after the initial copy. Once an object is stored in R2, it will not be re-retrieved and updated.</li>
            <li>Only user-defined metadata that is prefixed by <code>x-amz-meta-</code> in the HTTP response will be migrated. Remaining metadata will be omitted.</li>
            <li>For larger objects, multiple GET requests may be required to fully copy the object to R2.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        HeadObject
      </td>
      <td colspan="5" rowspan="1">
        Behaves similarly to GetObject, but only retrieves object metadata. Will not copy objects to the requested R2 bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        PutObject
      </td>
      <td colspan="5" rowspan="1">
        No change to behavior. Calls to PutObject will add objects to the requested R2 bucket.
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        DeleteObject
      </td>
      <td colspan="5" rowspan="1">
        No change to behavior. Calls to DeleteObject will delete objects in the requested R2 bucket.<br /><br />
        Additional considerations:
        <ul>
            <li>If deletes to objects in R2 are not also made in the source storage bucket, subsequent GetObject requests will result in objects being retrieved from the source bucket and copied to R2.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Actions not listed above have no change in behavior. For more information, refer to [Workers API reference](/r2/api/workers/workers-api-reference/) or [S3 API compatibility](/r2/api/s3/api/).

## Create Amazon S3 credentials

To copy objects from Amazon S3, Sippy requires access permissions to your bucket. While you can use any AWS Identity and Access Management (IAM) user credentials with the correct permissions, Cloudflare recommends you create a user with a narrow set of permissions.

To create credentials with the correct permissions:

1. Log in to your AWS IAM account.
2. Create a policy with the following format and replace `<BUCKET_NAME>` with the bucket you want to grant access to:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:Get*",
                "s3:List*"
            ],
            "Resource": [
                "arn:aws:s3:::<BUCKET_NAME>",
                "arn:aws:s3:::<BUCKET_NAME>/*"
            ]
        }
    ]
}
```

3. Create a new user and attach the created policy to that user.

You can now use both the Access Key ID and Secret Access Key when enabling Sippy.
