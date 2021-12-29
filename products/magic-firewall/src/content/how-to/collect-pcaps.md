---
title: Collect PCAPs
pcx-content-type: how-to
---

# Packet Captures API

PCAPs API can be used to capture packets flowing at the edge.

Before we collect a pcap we need to first understand the "system" and "type" of a packet capture. A pcap's "system" is the product/logical subsystem where packets are captured. And a pcap's "type" is how the captured packets are built into a pcap file.

Currently, when a pcap is requested, packets flowing at the edge through the Magic Transit System are captured. So, the system  is "magic-transit". These packets are sampled, and the sampled packets across all edge metals are collected to build a PCAP file.  This way of sampling packets and building a pcap is the "simple" type.

## Send a PCAP collect Request

To send a collect request, send a JSON body specifying:

1. "time_limit": The number of seconds to limit the pcap to. Should be a number less than 300 seconds. Cannot be set to zero.
1. "packet_limit": The number of packets to limit the pcap to. Should be a number less than 10000. Cannot be set to zero.
1. "type": like described above must be "simple"
1. "system": like described above must be "magic-transit"

In addition to the above fields, the JSON body can optionally filter packets by specifying any of
1. IPv4 Source address
2. IPv4 Destination address
3. (TCP/UDP) Source port
4. (TCP/UDP) Destination port
5. IP Protocol

A complete request will look like this:
```
curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--data '{
        "filter_v1": {
               "source_address": "1.2.3.4",
               "source_port": 123,
               "destination_address": "5.6.7.8",
               "destination_port": 80,
               "protocol": 6
        },
        "time_limit": 300,
        "packet_limit": 10000,
        "type": "simple",
        "system": "magic-transit"
}'
```
"filter_v1" can be left empty to collect all packets, without any filtering. 

Currently, you can only send one collect request per minute.



The response to this message will be a JSON body which contains the details of the Job that is running to build the Packet Capture. It will contain a unique identifier for this Packet capture request. It will also include details that were sent in the request.
```
{
  "result": {
    "id": "6d1f0aac13cd40e3900d29f5dd0e8a2b",
    "submitted": "2021-12-20T17:29:20.641845Z",
    "filter_v1": {
      "source_address": "1.2.3.4",
      "source_port": 123,
      "destination_address": "5.6.7.8",
      "destination_port": 80,
      "protocol": 6
    },
    "time_limit": 60,
    "status": "pending",
    "packets_remaining": 0,
    "type": "simple",
    "system": "magic-transit"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
The response will have the "status" field set to "pending" while the collection is in progress. You need to wait for the pcap collection to complete before downloading the file.  The status will change to "success" when the pcap is ready to download. Checking a collect request's status is described next.



## Check PCAP status
To check the status of a running job, a request to the endpoint can be sent specifying the pcap identifier. The pcap identifier is received in the response of a collect request (see the previous step).

```
curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/${pcap_id} \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000'
```
The response will be similar to the one received on requesting a pcap collection.
```
{
  "result": {
    "id": "6d1f0aac13cd40e3900d29f5dd0e8a2b",
    "submitted": "2021-12-20T17:29:20.641845Z",
    "filter_v1": {
      "source_address": "1.2.3.4",
      "source_port": 123,
      "destination_address": "5.6.7.8",
      "destination_port": 80,
      "protocol": 6
    },
    "time_limit": 120,
    "status": "success",
    "packets_remaining": 0,
    "type": "simple",
    "system": "magic-transit"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
While the collection is ongoing, the status will be set to "pending". Once the pcap is ready to download, the status will change to "success".  Then the file is ready to download.

## Download PCAP
Once the collection is complete, you can download the pcap by specifying the pcap identifier used earlier.
```
curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/${pcap_id}/download \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
--output download.pcap
```


## List PCAPs
To list all the requests sent so far, you can use the command below
```
curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000'
```

The response will include an array of up to 50 requests sent in the past. This will include completed requests and requests whose collection is ongoing. A sample response could look like:
```
{
  "result": [
    {
      "id": "43adab5adeca4dab9c51f4b7f70f2ec3",
      "submitted": "2021-12-15T03:04:09.277394Z",
      "filter_v1": {},
      "time_limit": 120,
      "status": "success",
      "packets_remaining": 0,
      "type": "simple",
      "system": "magic-transit"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

