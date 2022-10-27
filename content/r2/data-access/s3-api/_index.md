---
title: S3 API
pcx_content_type: navigation
weight: 2
---

# S3 API

Amazon's [S3 API](https://docs.aws.amazon.com/AmazonS3/latest/API) is a popular API for working with
large object storage systems. There's many SDKs and tools available for interfacing with it. If
you're interested in shifting your existing S3 application to R2, we've got you covered with a REST
API that is compatible so all you have to do in your code is change the URL you're pointing to and
add R2 credentials. We have a wide list of [examples](/r2/examples/)
to help you get started using your favorite SDK or tool.

R2's S3 REST endpoint will be available at `https://<BUCKET>.<ACCOUNT>.r2.cloudflarestorage.com`.
If you make your [bucket public](/r2/data-access/public-buckets/),
it'll be available on a separate HTTP REST endpoint.

If you're building a new application from scratch you may want to consider using the
[Workers platform](/r2/data-access/workers-api) instead to build your application. It's a more
secure alternative as there's no need to manage credentials and applications you write only have
access to the specific buckets you choose to grant them access to.

{{<directory-listing>}}