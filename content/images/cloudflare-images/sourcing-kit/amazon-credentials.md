---
pcx_content_type: how-to
title: Amazon S3 credentials
weight: 3
---

# Find credentials

To migrate images from an external source like S3, sourcing kit requires access permissions to your bucket. While any AWS Identity and Access Management (IAM) user credentials with the correct permissions can be used to create a Sourcing Kit source, we advise creating a user with a narrow set of permissions.

To create the correct sourcing kit permissions:

1. Log into your AWS IAM account.
2. Create a policy with the following format (replace `<BUCKET_NAME>` with the bucket you want to grant access to):

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

3. Next, create a new user and attach the created policy to that user. 
4. After creating the user, enter both Access Key ID and Secret Access Key in the form to create a new source.
