---
title: Collect PCAPs
pcx-content-type: how-to
meta:
  title: Packet Captures (PCAPs) API
---

# Packet Captures (PCAPs) API

The PCAPs API can be used to capture packets destined for a customer origin.
A packet capture is requested and after the capture is collected the output
is contained within one or more files in PCAP capture file format.

{{<Aside>}}

This feature is available for Advanced Magic Firewall users. For access, contact your account team.

{{</Aside>}}

The PCAPs API needs both `system` and `type` to be specified in order to start a capture. A PCAP's `system` is the product or logical subsystem where packets are captured, and a PCAP's `type` is how the captured packets are built into a PCAP file.

Currently, when a PCAP is requested, packets flowing at the edge through the Magic Transit system are captured, and the system is `magic-transit`. We support two types of packet captures for this system:
- `simple`: These packets are sampled, and the sampled packets across all edge metals are collected to build a PCAP file. The packets only contain the first 160 bytes of the payload.
- `full`: Packets are not sampled and the full packet is captured within a given point-of-presence or colo and sent to either a GCP or AWS bucket specified by the user. This may result in multiple PCAP files.

{{<Aside type="note" header="Note">}}

Before starting a `full` type packet capture, you must first follow instructions for [configuring a bucket](../pcaps-bucket-setup).

{{</Aside>}}

## Send a PCAP collect Request

To send a collect request, send a JSON body specifying for all PCAP types:

- `time_limit`: The number of seconds to limit the PCAP. The number should be less than `300` seconds and cannot be set to zero.
- `type`: Can be `full` or `simple` as described above.
- `system`: Must be `magic-transit` as described above.

If a full `type` is specified the following additional fields are required:
- `destination_conf`: This specifies the bucket path. For example, `gs://my-bucket`.
- `colo`: This specifies the `colo` name we want to capture packets from. For example, `ord02`.

Two optional fields are available to limit the amount of packets captured:
- `packet_limit`: The number of packets to limit the PCAP. This number should be less than `10000` and cannot be set to zero.
- `byte_limit`: The number of bytes to limit the PCAP. This number should be less than `1000000000` bytes.

In addition to the above fields, the JSON body can optionally filter packets by specifying any of

- IPv4 Source address
- IPv4 Destination address
- (TCP/UDP) Source port
- (TCP/UDP) Destination port
- IP Protocol

Currently, you can only send one collect request per minute for simple PCAPs, and you can only have one running or pending full PCAP at a time.

### Example request

#### Full PCAP

A complete `full` type request will look like the following:

    curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: ${email}" \
    -H "X-Auth-Key: ${auth_key}" \
    -d '{
            "filter_v1": {},
            "time_limit": 300,
            "packet_limit": 10000,
            "Byte_limit": 100000000,
            "type": "full",
            "colo": "sfo06",
            "system": "magic-transit",
            "destination_conf": "'${bucket}'"
    }'

#### Simple PCAP

A complete `simple` type request will look like the following:

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

While the collection is ongoing, the status will be set to `pending` or `running`. Once the PCAP is ready, the status will change to `success`.

## Download PCAP

Depending on the `type` of PCAP there are multiple ways to obtain your PCAP.

### Full PCAPs

To obtain full PCAPs, download the files from the bucket specified in `destination_conf` after the PCAP's status is `success`. There may be multiple files named `pcap_<pcap_id>.pcap` per capture as captures may occur across multiple machines.

### Simple PCAPs

Once the Simple PCAP collection is complete, you can download the PCAP by specifying the PCAP identifier used earlier.

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
