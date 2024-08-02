---
title: Authentication
pcx_content_type: how-to
weight: 2
---

# Authentication

You can generate an API token to serve as the Access Key for usage with existing S3-compatible SDKs or XML APIs. 

You must purchase R2 before you can generate an API token.

To create an API token: 

1. In **Account Home**, select **R2**.
2. Under **Account details**, select **Manage R2 API tokens**.
3. Select [**Create API token**](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).
4. Select the **R2 Token** text to edit your API token name.
5. Under **Permissions**, choose a permission types for your token. Refer to [Permissions](#permissions) for information about each option.
6. (Optional) If you select the **Object Read and Write** or **Object Read** permissions, you can scope your token to a set of buckets.
7. Select **Create API Token**.

After your token has been successfully created, review your **Secret Access Key** and **Access Key ID** values. These may often be referred to as Client Secret and Client ID, respectively.

{{<Aside type="warning">}}

You will not be able to access your **Secret Access Key** again after this step. Copy and record both values to avoid losing them.

{{</Aside>}}

You will also need to configure the `endpoint` in your S3 client to `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`.

Find your [account ID in the Cloudflare dashboard](/fundamentals/setup/find-account-and-zone-ids/).

Buckets created with jurisdictions must be accessed via jurisdiction-specific `endpoint`s:

- European Union (EU): `https://<ACCOUNT_ID>.eu.r2.cloudflarestorage.com`
- FedRAMP: `https://<ACCOUNT_ID>.fedramp.r2.cloudflarestorage.com`

{{<Aside type="warning">}}

Jurisdictional buckets can only be accessed via the corresponding jurisdictional endpoint. Most S3 clients will not let you configure multiple `endpoints`, so you'll generally have to initialize one client per jurisdiction.

{{</Aside>}}

## Permissions

| Permission | Description |
|------------|-------------|
| Admin Read & Write | Allows the ability to create, list and delete buckets, and edit bucket configurations in addition to list, write, and read object access. |
| Admin Read only | Allows the ability to list buckets and view bucket configuration in addition to list and read object access. |
| Object Read & Write | Allows the ability to read, write, and list objects in specific buckets. |
| Object Read only | Allows the ability to read and list objects in specific buckets. |

## Create API tokens via API

You can create API tokens via the API and use them to generate corresponding Access Key ID and Secret Access Key values. To get started, refer to [Create API tokens via the API](/fundamentals/api/how-to/create-via-api/). Below are the specifics for R2.

### Access Policy

An Access Policy specifies what resources the token can access and the permissions it has.

#### Resources

There are two relevant resource types for R2: `Account` and `Bucket`. For more information on the Account resource type, refer to [Account](/fundamentals/api/how-to/create-via-api/#account).

##### Bucket

Include a set of R2 buckets or all buckets in an account.

A specific bucket is represented as:

```json
"com.cloudflare.edge.r2.bucket.<ACCOUNT_ID>_<JURISDICTION>_<BUCKET_NAME>": "*"
```

- `ACCOUNT_ID`: Refer to [Find zone and account IDs](/fundamentals/setup/find-account-and-zone-ids/#find-account-id-workers-and-pages).
- `JURISDICTION`: The [jurisdiction](/r2/reference/data-location/#available-jurisdictions) where the R2 bucket lives. For buckets not created in a specific jurisdiction this value will be `default`.
- `BUCKET_NAME`: The name of the bucket your Access Policy applies to.

All buckets in an account are represented as:

```json
"com.cloudflare.api.account.<ACCOUNT_ID>": {
  "com.cloudflare.edge.r2.bucket.*": "*"
}
```

- `ACCOUNT_ID`: Refer to [Find zone and account IDs](/fundamentals/setup/find-account-and-zone-ids/#find-account-id-workers-and-pages).

#### Permission groups

Determine what [permission groups](/fundamentals/api/how-to/create-via-api/#permission-groups) should be applied. There are four relevant permission groups for R2.

<table>
  <tbody>
    <th colspan="5" rowspan="1">
      Permission group
    </th>
    <th colspan="5" rowspan="1">
      Resource
    </th>
    <th colspan="5" rowspan="1">
      Permission
    </th>
    <tr>
      <td colspan="5" rowspan="1">
        <code>Workers R2 Storage Write</code>
      </td>
      <td colspan="5" rowspan="1">
        Account
      </td>
      <td colspan="5" rowspan="1">
        Admin Read & Write
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>Workers R2 Storage Read</code>
      </td>
      <td colspan="5" rowspan="1">
        Account
      </td>
      <td colspan="5" rowspan="1">
        Admin Read only
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>Workers R2 Storage Bucket Item Write</code>
      </td>
      <td colspan="5" rowspan="1">
        Bucket
      </td>
      <td colspan="5" rowspan="1">
        Object Read & Write
      </td>
    </tr>
    <tr>
      <td colspan="5" rowspan="1">
        <code>Workers R2 Storage Bucket Item Read</code>
      </td>
      <td colspan="5" rowspan="1">
        Bucket
      </td>
      <td colspan="5" rowspan="1">
        Object Read only
      </td>
    </tr>
  </tbody>
</table>

#### Example Access Policy

```json
[
  {
    "id": "f267e341f3dd4697bd3b9f71dd96247f",
    "effect": "allow",
    "resources": {
      "com.cloudflare.edge.r2.bucket.4793d734c0b8e484dfc37ec392b5fa8a_default_my-bucket": "*",
      "com.cloudflare.edge.r2.bucket.4793d734c0b8e484dfc37ec392b5fa8a_eu_my-eu-bucket": "*"
    },
    "permission_groups": [
      {
        "id": "6a018a9f2fc74eb6b293b0c548f38b39",
        "name": "Workers R2 Storage Bucket Item Read"
      }
    ]
  }
]
```

### Get S3 API credentials from an API token

You can get the Access Key ID and Secret Access Key values from the response of the [Create Token](/api/operations/user-api-tokens-create-token) API:
- Access Key ID: The `id` of the API token.
- Secret Access Key: The SHA-256 hash of the API token `value`.

### Examples

{{<Aside type="note">}}

For providing secure access to bucket objects for anonymous users, we recommend using [pre-signed URLs](/r2/api/s3/presigned-urls/) instead.

Pre-signed URLs do not require users to be a member of your organization and enable programmatic application directly.

{{</Aside>}}

The following example shows how to authenticate against R2 using the S3 API and an API token. Ensure you have set the following environmental variables prior to running either example:

```sh
export R2_ACCOUNT_ID=your_account_id
export R2_ACCESS_KEY_ID=your_access_key_id
export R2_SECRET_ACCESS_KEY=your_secret_access_key
export R2_BUCKET_NAME=your_bucket_name
```

{{<tabs labels="js | python | go">}}
{{<tab label="js" default="true">}}

Install the `aws-sdk` package for the S3 API:

```sh
$ npm install aws-sdk
```

Run the following JavaScript (Node.js) script using `node get_r2_object.js`. Ensure you change `objectKey` to point to an existing file in your R2 bucket.

```javascript
---
filename: get_r2_object.js
---
const AWS = require('aws-sdk');
const crypto = require('crypto');

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;

// Hash the secret access key
const hashedSecretKey = crypto.createHash('sha256').update(SECRET_ACCESS_KEY).digest('hex');

// Configure the S3 client for Cloudflare R2
const s3Client = new AWS.S3({
    endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: hashedSecretKey,
    signatureVersion: 'v4',
    region: 'auto' // Cloudflare R2 doesn't use regions, but this is required by the SDK
});

// Specify the object key
const objectKey = '2024/08/02/ingested_0001.parquet';

// Function to fetch the object
async function fetchObject() {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: objectKey
        };

        const data = await s3Client.getObject(params).promise();
        console.log('Successfully fetched the object');
        
        // Process the data as needed
        // For example, to get the content as a Buffer:
        // const content = data.Body;
        
        // Or to save the file (requires 'fs' module):
        // const fs = require('fs').promises;
        // await fs.writeFile('ingested_0001.parquet', data.Body);

    } catch (error) {
        console.error('Failed to fetch the object:', error);
    }
}

fetchObject();
```

{{</tab>}}
{{<tab label="python">}}

Install the `boto3` S3 API client:

```sh
$ pip install boto3
```

Run the following Python script with `python3 get_r2_object.py`. Ensure you change `object_key` to point to an existing file in your R2 bucket.

```python
---
filename: get_r2_object.py
---
import os
import hashlib
import boto3
from botocore.client import Config

ACCOUNT_ID = os.environ.get('R2_ACCOUNT_ID')
ACCESS_KEY_ID = os.environ.get('R2_ACCESS_KEY_ID')
SECRET_ACCESS_KEY = os.environ.get('R2_SECRET_ACCESS_KEY')
BUCKET_NAME = os.environ.get('R2_BUCKET_NAME')

# Hash the secret access key using SHA-256
hashed_secret_key = hashlib.sha256(SECRET_ACCESS_KEY.encode()).hexdigest()

# Configure the S3 client for Cloudflare R2
s3_client = boto3.client('s3',
    endpoint_url=f'https://{ACCOUNT_ID}.r2.cloudflarestorage.com',
    aws_access_key_id=ACCESS_KEY_ID,
    aws_secret_access_key=hashed_secret_key,
    config=Config(signature_version='s3v4')
)

# Specify the object key
object_key = '2024/08/02/ingested_0001.parquet'

try:
    # Fetch the object
    response = s3_client.get_object(Bucket=BUCKET_NAME, Key=object_key)
    
    print('Successfully fetched the object')
    
    # Process the response content as needed
    # For example, to read the content:
    # object_content = response['Body'].read()
    
    # Or to save the file:
    # with open('ingested_0001.parquet', 'wb') as f:
    #     f.write(response['Body'].read())

except Exception as e:
    print(f'Failed to fetch the object. Error: {str(e)}')

```

{{</tab>}}
{{<tab label="go">}}

Use `go get` to add the `aws-sdk-go-v2` packages to your Go project:

```sh
$ go get github.com/aws/aws-sdk-go-v2
$ go get github.com/aws/aws-sdk-go-v2/config
$ go get github.com/aws/aws-sdk-go-v2/credentials
$ go get github.com/aws/aws-sdk-go-v2/service/s3
```

Run the following Go application as a script with `go run main.go`. Ensure you change `objectKey` to point to an existing file in your R2 bucket.

```go
package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func main() {
	// Load environment variables
	accountID := os.Getenv("R2_ACCOUNT_ID")
	accessKeyID := os.Getenv("R2_ACCESS_KEY_ID")
	secretAccessKey := os.Getenv("R2_SECRET_ACCESS_KEY")
	bucketName := os.Getenv("R2_BUCKET_NAME")

	// Hash the secret access key
	hasher := sha256.New()
	hasher.Write([]byte(secretAccessKey))
	hashedSecretKey := hex.EncodeToString(hasher.Sum(nil))

	// Configure the S3 client for Cloudflare R2
	r2Resolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL: fmt.Sprintf("https://%s.r2.cloudflarestorage.com", accountID),
		}, nil
	})

	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithEndpointResolverWithOptions(r2Resolver),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(accessKeyID, hashedSecretKey, "")),
		config.WithRegion("auto"), // Cloudflare R2 doesn't use regions, but this is required by the SDK
	)
	if err != nil {
		log.Fatalf("Unable to load SDK config, %v", err)
	}

	// Create an S3 client
	client := s3.NewFromConfig(cfg)

	// Specify the object key
	objectKey := "2024/08/02/ingested_0001.parquet"

	// Fetch the object
	output, err := client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(objectKey),
	})
	if err != nil {
		log.Fatalf("Unable to fetch object, %v", err)
	}
	defer output.Body.Close()

	fmt.Println("Successfully fetched the object")

	// Process the object content as needed
	// For example, to save the file:
	// file, err := os.Create("ingested_0001.parquet")
	// if err != nil {
	// 	log.Fatalf("Unable to create file, %v", err)
	// }
	// defer file.Close()
	// _, err = io.Copy(file, output.Body)
	// if err != nil {
	// 	log.Fatalf("Unable to write file, %v", err)
	// }

	// Or to read the content:
	content, err := io.ReadAll(output.Body)
	if err != nil {
		log.Fatalf("Unable to read object content, %v", err)
	}
	fmt.Printf("Object content length: %d bytes\n", len(content))
}
```

{{</tab>}}
{{</tabs>}}

## Temporary access credentials

If you need to create temporary credentials for a bucket or a prefix/object within a bucket, you can use the [temp-access-credentials endpoint](/api/operations/r2-create-temp-access-credentials) in the API. You will need an existing R2 token to pass in as the parent access key id. You can use the credentials from the API result for an S3-compatible request by setting the credential variables like so:

```
AWS_ACCESS_KEY_ID = <accessKeyId>
AWS_SECRET_ACCESS_KEY = <secretAccessKey>
AWS_SESSION_TOKEN = <sessionToken>
```

{{<Aside type="note">}}

The temporary access key cannot have a permission that is higher than the parent access key. e.g. if the parent key is set to `Object Read Write`, the temporary access key could only have `Object Read Write` or `Object Read Only` permissions.

{{</Aside>}}
