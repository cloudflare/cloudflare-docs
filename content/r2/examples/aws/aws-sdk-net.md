---
title: aws-sdk-net
pcx_content_type: configuration
---

# Configure `aws-sdk-net` for R2

{{<render file="_keys.md">}}<br>

This example uses version 3 of the [aws-sdk-net](https://www.nuget.org/packages/AWSSDK.S3) package. You must pass in the R2 configuration credentials when instantiating your `S3` service client:

## Client setup

In this example, you will pass credentials explicitly to the `IAmazonS3` initialization. If you wish, use a shared AWS credentials file or the SDK store in-line with other AWS SDKs. Refer to [Configure AWS credentials](https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/net-dg-config-creds.html) for more details.

```csharp
private static IAmazonS3 s3Client;

public static void Main(string[] args)
{
	var accessKey = "<ACCESS_KEY>";
	var secretKey = "<SECRET_KEY>";
	var credentials = new BasicAWSCredentials(accessKey, secretKey);
	s3Client = new AmazonS3Client(credentials, new AmazonS3Config
		{
			ServiceURL = "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
		});
}
```

## List buckets and objects

The [ListBucketsAsync](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3ListBucketsAsyncListBucketsRequestCancellationToken.html) and [ListObjectsAsync](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3ListObjectsV2AsyncListObjectsV2RequestCancellationToken.html) methods can be used to list buckets under your account and the contents of those buckets respectively.

```csharp
static async Task ListBuckets()
{
	var response = await s3Client.ListBucketsAsync();

	foreach (var s3Bucket in response.Buckets)
	{
		Console.WriteLine("{0}", s3Bucket.BucketName);
	}
}
// sdk-example
// my-bucket-name
```

```csharp
static async Task ListObjectsV2()
{
	var request = new ListObjectsV2Request
	{
		BucketName = "sdk-example"
	};
            
	var response = await s3Client.ListObjectsV2Async(request);

	foreach (var s3Object in response.S3Objects)
	{
		Console.WriteLine("{0}", s3Object.Key);
	}
}
// dog.png
// cat.png
```

## Upload and retrieve objects

The [PutObjectAsync](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3PutObjectAsyncPutObjectRequestCancellationToken.html) and [GetObjectAsync](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3GetObjectAsyncStringStringCancellationToken.html) methods can be used to upload objects and download objects from an R2 bucket respectively.

{{<Aside type="warning">}}

`DisablePayloadSigning = true` must be passed as Cloudflare R2 does not currently support the Streaming SigV4 implementation used by AWSSDK.S3.

{{</Aside>}}

```csharp
static async Task PutObject()
{
	var request = new PutObjectRequest
	{
		FilePath = @"/path/file.txt",
		BucketName = "sdk-example",
		DisablePayloadSigning = true
	};
            
	var response = await s3Client.PutObjectAsync(request);
            
	Console.WriteLine("ETag: {0}", response.ETag);
}
// ETag: "186a71ee365d9686c3b98b6976e1f196"
```

```csharp
static async Task GetObject()
{
  var bucket = "sdk-example";
  var key = "file.txt"
  
	var response = await s3Client.GetObjectAsync(bucket, key);

	Console.WriteLine("ETag: {0}", response.ETag);
}
// ETag: "186a71ee365d9686c3b98b6976e1f196"
```

## Generate presigned URLs

The [GetPreSignedURL](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/MIS3GetPreSignedURLGetPreSignedUrlRequest.html) method allows you to sign ahead of time, giving temporary access to a specific operation. In this case, presigning a `PutObject` request for `sdk-example/file.txt`.

```csharp
static string? GeneratePresignedUrl()
{
	AWSConfigsS3.UseSignatureVersion4 = true;
	var presign = new GetPreSignedUrlRequest
	{
		BucketName = "sdk-example",
		Key = "file.txt",
		Verb = HttpVerb.GET,
		Expires = DateTime.Now.AddDays(7),
	};
            
	var presignedUrl = s3Client.GetPreSignedURL(presign);
            
	Console.WriteLine(presignedUrl);
	
	return presignedUrl;
}
// URL: https://<accountid>.r2.cloudflarestorage.com/sdk-example/file.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>   
```