---
pcx_content_type: how-to
title: Enable IBM QRadar
layout: single
---

# Enable Logpush to IBM QRadar

To configure a QRadar/Cloudflare integration you have the option to use one of the following methods: 

* [HTTP Receiver protocol](/logs/get-started/enable-destinations/ibm-qradar/#http-receiver-protocol)
* [Amazon AWS S3 Rest API](/logs/get-started/enable-destinations/ibm-qradar/#amazon-aws-s3-rest-api-protocol)

## HTTP Receiver Protocol
To send Cloudflare logs to QRadar you need to create a [Logpush job to HTTP endpoints](/logs/get-started/enable-destinations/http/) via API. Below you can find two curl examples of how to send Cloudflare Firewalls events and Cloudflare HTTP events to QRadar.

### Cloudflare Firewall events

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--data '{ 
  "name": "<name>", 
  "logpull_options": "fields=Action,ClientIP,ClientASN,ClientASNDescription,ClientCountry,ClientIPClass,ClientRefererHost,ClientRefererPath,ClientRefererQuery,ClientRefererScheme,ClientRequestHost,ClientRequestMethod,ClientRequestPath,ClientRequestProtocol,ClientRequestQuery,ClientRequestScheme,ClientRequestUserAgent,EdgeColoCode,EdgeResponseStatus,Kind,MatchIndex,Metadata,OriginResponseStatus,OriginatorRayID,RayID,RuleID,Source,Datetime&timestamps=rfc3339", 
  "destination_conf": "<QRadar_URL:LogSource_Port>", 
  "max_upload_bytes": 5000000, 
  "max_upload_records": 1000, 
  "dataset": "firewall_events", 
  "enabled": true
}'
```

### Cloudflare HTTP events

```bash
curl https://api.cloudflare.com/client/v4/zones/{zone_id}/logpush/jobs \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--data '{
  "name": "<name>",
  "logpull_options": "fields=ClientRequestMethod,EdgeResponseStatus,ClientIP,ClientSrcPort,CacheCacheStatus,ClientCountry,ClientDeviceType,ClientIPClass,ClientMTLSAuthCertFingerprint,ClientMTLSAuthStatus,ClientRegionCode,ClientRequestBytes,ClientRequestHost,ClientRequestPath,ClientRequestProtocol,ClientRequestReferer,ClientRequestScheme,ClientRequestSource,ClientRequestURI,ClientRequestUserAgent,ClientSSLCipher,ClientSSLProtocol,ClientXRequestedWith,EdgeEndTimestamp,EdgeRateLimitAction,EdgeRateLimitID,EdgeRequestHost,EdgeResponseBodyBytes,EdgeResponseBytes,EdgeServerIP,EdgeStartTimestamp,FirewallMatchesActions,FirewallMatchesRuleIDs,FirewallMatchesSources,OriginIP,OriginResponseStatus,OriginSSLProtocol,ParentRayID,RayID,SecurityLevel,WAFAction,WAFAttackScore,WAFProfile,WAFRuleID,WAFRuleMessage,WAFSQLiAttackScore,WAFXSSAttackScore,EdgeStartTimestamp&timestamps=rfc3339", 
  "destination_conf": "<QRadar_URL:LogSource_Port>", "max_upload_bytes": 5000000, 
  "max_upload_records": 1000, 
  "dataset": "http_requests", 
  "enabled": true
}'
```

Cloudflare checks the accessibility of the IP address, port, and validates the certificate of the HTTP Receive log source. If all parameters are valid, a Logpush is created, and starts to send events to HTTP Receiver log source.

## Amazon AWS S3 Rest API Protocol

When you use the Amazon S3 REST API protocol, IBM QRadar collects Cloudflare Log events from an Amazon S3 bucket. To use this option, you need to:

1. Create an [Amazon S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html) to store your Cloudflare Logs. Make a note of the bucket name and the AWS access key ID and secret access key with sufficient permissions to write to the bucket.
2. [Enable a Logpush to Amazon S3](/logs/get-started/enable-destinations/aws-s3/).
3. In the AWS Management Console, go to the Amazon S3 service. Create a bucket endpoint to allow Cloudflare to send logs directly to the S3 bucket.
4. Follow the steps in [Integrate Cloudflare Logs with QRadar by using the Amazon AWS S3 REST API protocol](https://www.ibm.com/docs/en/dsm?topic=configuration-cloudflare-logs).
5. Test the configuration by generating some logs in Cloudflare and ensuring that they are delivered to the S3 bucket and subsequently forwarded to QRadar.