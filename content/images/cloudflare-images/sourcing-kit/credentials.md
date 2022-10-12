---
pcx_content_type: how-to
title: Credentials
weight: 3
---

# Amazon S3 credentials

To migrate images from Amazon S3, Sourcing Kit requires access permissions to your bucket. While any AWS Identity and Access Management (IAM) user credentials with the correct permissions can be used to create a Sourcing kit source, we advise creating a user with a narrow set of permissions.

To create the correct sourcing kit permissions:

1. Log in to your AWS IAM account.
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

You can now use both the Access Key ID and Secret Access Key to create a new source in Sourcing Kit. Refer to Enable Sourcing Kit to learn more.
