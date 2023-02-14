---
title: Data Location
pcx_content_type: concept
---

# Data Location 

Learn how the location of data stored in R2 is determined and about the different available inputs that control the physical location where objects in your buckets are stored.

## Automatic (recommended)

When you create a new bucket, the data location is set to Automatic by default. Currently, this option chooses a bucket location in the closest available region to the create bucket request based on the location of the caller.

{{<beta heading="h2">}} Location Hints {{</beta>}}

{{<Aside type="note">}}

This feature is currently in beta. If you have feedback, reach out to us on the [Cloudflare Developer Discord](https://discord.gg/rrZXVVcKQF) in the #r2-storage channel or open a thread on the [Community Forum](https://community.cloudflare.com/c/developers/storage/81).

{{</Aside>}}

Location Hints are optional parameters you can provide during bucket creation to indicate the primary geographical location you expect data will be accessed from.

Using Location Hint can be a good choice when you expect the majority of access to data in a bucket to come from a different location than where the create bucket request originates. Keep in mind Location Hints are a best effort and not a guarantee, and they should only be used as a way to optimize performance by placing regularly updated content closer to users.

Currently, you can set the Location Hint via the `LocationConstraint` parameter using the S3 API:

```js
await S3.send(
new CreateBucketCommand({
Bucket,
CreateBucketConfiguration: { LocationConstraint: "WNAM" },
})
)
```

Refer to [Examples](/examples) for additional examples of S3 SDKs.

## Current limitations of Location Hints beta

Location Hints are only honored the first time a bucket with a given name is created. If you delete and recreate a bucket with the same name, the original bucket’s location will be used.

### Available Hints

The following hint locations are supported:

| Hint | Hint description      |
|------|-----------------------|
| wnam | Western North America |
| enam | Eastern North America |
| weur | Western Europe        |
| apac | Asia-Pacific          |