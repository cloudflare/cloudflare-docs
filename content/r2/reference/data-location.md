---
title: Data location
pcx_content_type: concept
---

# Data location

Learn how the location of data stored in R2 is determined and about the different available inputs that control the physical location where objects in your buckets are stored.

## Automatic (recommended)

When you create a new bucket, the data location is set to Automatic by default. Currently, this option chooses a bucket location in the closest available region to the create bucket request based on the location of the caller.

## Location Hints

Location Hints are optional parameters you can provide during bucket creation to indicate the primary geographical location you expect data will be accessed from.

Using Location Hints can be a good choice when you expect the majority of access to data in a bucket to come from a different location than where the create bucket request originates. Keep in mind Location Hints are a best effort and not a guarantee, and they should only be used as a way to optimize performance by placing regularly updated content closer to users.

### Set hints via the Cloudflare dashboard

You can choose to automatically create your bucket in the closest available region based on your location or choose a specific location from the list.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select **R2**.
2. Select **Create bucket**.
3. Enter a name for the bucket.
4. Under **Location**, leave *None* selected for automatic selection or choose a region from the list.
5. Select **Create bucket** to complete the bucket creation process.

### Set hints via the S3 API

You can set the Location Hint via the `LocationConstraint` parameter using the S3 API:

```js
await S3.send(
  new CreateBucketCommand({
    Bucket: "YOUR_BUCKET_NAME",
    CreateBucketConfiguration: {
      LocationConstraint: "WNAM",
    },
  })
);
```

Refer to [Examples](/r2/examples/) for additional examples from other S3 SDKs.

### Available hints

The following hint locations are supported:

| Hint | Hint description      |
| ---- | --------------------- |
| wnam | Western North America |
| enam | Eastern North America |
| weur | Western Europe        |
| eeur | Eastern Europe        |
| apac | Asia-Pacific          |

### Additional considerations

Location Hints are only honored the first time a bucket with a given name is created. If you delete and recreate a bucket with the same name, the original bucket’s location will be used.

## Jurisdictional Restrictions

{{<Aside type="note">}}

This feature is currently in beta. If you have feedback, reach out to us on the [Cloudflare Developer Discord](https://discord.cloudflare.com) in the #r2-storage channel or open a thread on the [Community Forum](https://community.cloudflare.com/c/developers/storage/81).

{{</Aside>}}

Jurisdictional Restrictions guarantee objects in a bucket are stored within a specific jurisdiction.

Use Jurisdictional Restrictions when you need to ensure data is stored and processed within a jurisdiction to meet data residency requirements, including local regulations such as the [GDPR](https://gdpr-info.eu/).

### Set jurisdiction via the Cloudflare dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select R2.
2. Select **Create bucket**.
3. Enter a name for the bucket.
4. Under **Location**, select **Specify jurisdiction** and choose a jurisdiction from the list.
5. Select **Create bucket** to complete the bucket creation process.

### Using jurisdictions from Workers

To access R2 buckets that belong to a jurisdiction from [Workers](/workers/), you will need to specify the jurisdiction as well as the bucket name as part of your [bindings](/r2/api/workers/workers-api-usage/#3-bind-your-bucket-to-a-worker) in your `wrangler.toml`:

```toml
[[r2_buckets]]
bindings = [
  { binding = "MY_BUCKET", bucket_name = "<YOUR_BUCKET_NAME>", jurisdiction = "<JURISDICTION>" }
]
```

For more information on getting started, refer to [Use R2 from Workers](/r2/api/workers/workers-api-usage/). 

### Using jurisdictions with the S3 API

When interacting with R2 resources that belong to a defined jurisdiction with the S3 API or existing S3-compatible SDKs, you must specify the [jurisdiction](#available-jurisdictions) in your S3 endpoint:

`https://<ACCOUNT_ID>.<JURISDICTION>.r2.cloudflarestorage.com`

You can use your jurisdiction-specific endpoint for any [supported S3 API operations](/r2/api/s3/api/). When using a jurisdiction endpoint, you will not be able to access R2 resources outside of that jurisdiction.

The example below shows how to create an R2 bucket in the `eu` jurisdiction using the [`@aws-sdk/client-s3`](https://www.npmjs.com/package/@aws-sdk/client-s3) package for JavaScript.
```js
import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
const S3 = new S3Client({
	endpoint: "https://4893d737c0b9e484dfc37ec392b5fa8a.eu.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: "7dc27c125a22ad808cd01df8ec309d41",
		secretAccessKey:
			"1aa5c5b0c43defdb88f567487c071d17e234126133444770a706ae09336c57a4",
	},
	region: "auto",
});
await S3.send(
  new CreateBucketCommand({
    Bucket: "YOUR_BUCKET_NAME"
  })
);
```

Refer to [Examples](/r2/examples/) for additional examples from other S3 SDKs.

### Available jurisdictions

The following jurisdictions are supported:

| Jurisdiction | Jurisdiction description      |
| ---- | --------------------- |
| eu | European Union |

### Limitations

During the beta, the following services will not interact with R2 resources with assigned jurisdictions:
* [Super Slurper](/r2/data-migration/)
* [Logpush](/logs/get-started/enable-destinations/r2/)

### Additional considerations

Once an R2 bucket is created, the jurisdiction cannot be changed.