---
title: aws-sdk-ruby
pcx_content_type: configuration
---

# Configure `aws-sdk-ruby` for R2

{{<render file="_keys.md">}}<br>

Many Ruby projects also store these credentials in environment variables instead.

Add the following dependency to your `Gemfile`:

```ruby
gem "aws-sdk-s3"
```

Then you can use Ruby to operate on R2 buckets:

```ruby
require "aws-sdk-s3"

@r2 = Aws::S3::Client.new(
  access_key_id: "#{access_key_id}",
  secret_access_key: "#{secret_access_key}",
  endpoint: "https://#{cloudflare_account_id}.r2.cloudflarestorage.com",
  region: "auto",
)

# List all buckets on your account
puts @r2.list_buckets

#=> {
#=>   :buckets => [{
#=>     :name => "your-bucket",
#=>     :creation_date => "…",
#=>   }],
#=>   :owner => {
#=>     :display_name => "…",
#=>     :id => "…"
#=>   }
#=> }

# List the first 20 items in a bucket
puts @r2.list_objects(bucket:"your-bucket", max_keys:20)

#=> {
#=>   :is_truncated => false,
#=>   :marker => nil,
#=>   :next_marker => nil,
#=>   :name => "your-bucket",
#=>   :prefix => nil,
#=>   :delimiter =>nil,
#=>   :max_keys => 20,
#=>   :common_prefixes => [],
#=>   :encoding_type => nil
#=>   :contents => [
#=>     …,
#=>     …,
#=>     …,
#=>   ]
#=> }
```
