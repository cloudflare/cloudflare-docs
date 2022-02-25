---
title: Collect PCAPs
pcx-content-type: how-to
meta:
  title: Packet Captures (PCAPs) API
---

# Packet Captures (PCAPs) API

The PCAPs API can be used to capture packets flowing at the edge.

Before collecting a PCAP, you should first understand a packet capture's `system` and `type`. A PCAP's `system` is the product or logical subsystem where packets are captured, and a PCAP's `type` is how the captured packets are built into a PCAP file.

Currently, when a PCAP is requested, packets flowing at the edge through the Magic Transit system are captured, and the system is `magic-transit`. These packets are sampled, and the sampled packets across all edge metals are collected to build a PCAP file. This type of sampling packets and building a PCAP is the `simple` type.

{{<Aside>}}

This feature is currently in an Early Access state. For access, contact your account team.

{{</Aside>}}

## Send a PCAP collect Request

To send a collect request, send a JSON body specifying:

*   `time_limit`: The number of seconds to limit the PCAP. The number should be less than 300 seconds and cannot be set to zero.
*   `packet_limit`: The number of packets to limit the PCAP. The number should be less than 10000 and cannot be set to zero.
*   `type`: Must be `simple` as described in the above example.
*   `system`: Must be `magic-transit` as described in the above example.

In addition to the above fields, the JSON body can optionally filter packets by specifying any of

*   IPv4 Source address
*   IPv4 Destination address
*   (TCP/UDP) Source port
*   (TCP/UDP) Destination port
*   IP Protocol

Currently, you can only send one collect request per minute.

### Example request

A complete request will look like the following:

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

`filter_v1` can be left empty to collect all packets without any filtering.

### Example response

The response to this message will be a JSON body containing the details of the job running to build the packet capture. The response will contain a unique identifier for the packet capture request, and the details that were sent in the request.

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

The response will have the `status` field set to `pending` while the collection is in progress. You must wait for the PCAP collection to complete before downloading the file. When the PCAP is ready to download, the status will change to `success`.

## Check PCAP status

To check the status of a running job, send a request to the endpoint and specify the PCAP identifier. The PCAP identifier is received in the response of a collect request as shown in the previous step.

    curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/${pcap_id} \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000'

The response will be similar to the one received when requesting a PCAP collection.

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

While the collection is ongoing, the status will be set to `pending`. Once the PCAP is ready to download, the status will change to `success` and the file is ready to download.

## Download PCAP

Once the collection is complete, you can download the PCAP by specifying the PCAP identifier used earlier.

    curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/${pcap_id}/download \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000' \
    --output download.pcap

## List PCAPs

To list all the requests sent so far, you can use the command below.

    curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000'

The response will include an array of up to 50 requests sent in the past and will also include completed and ongoing requests. A sample response may look like the example below.

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
