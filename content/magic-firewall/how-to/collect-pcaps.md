---
title: Collect PCAPs
pcx_content_type: how-to
weight: 5
---

# Collect packet captures (PCAPs)

After a packet capture is requested and the capture is collected, the output is contained within one or more files in PCAP file format. Before starting a `full` type packet capture, you must first follow instructions for [configuring a bucket](../pcaps-bucket-setup).

{{<Aside>}}

This feature is available for Advanced Magic Firewall users. For access, contact your account team.

{{</Aside>}}

## Send a packet capture request

Currently, when a packet capture is requested, packets flowing at the edge through the Magic Transit system are captured, and the system is `magic-transit`.

Cloudflare supports two types of packet captures:

- **Simple**: Simple packets are best for debugging and providing a global picture across all data centers. Simple packets generate single, smaller files and only contain the first 160 bytes of the payload. Sampled packets are collected across all edge metals to build a PCAP file.
- **Full**: Full packets are best for targeted data collection with a detailed view into a single data center. Full packets generate multiple large files, and they are captured within a given data center or set of data centers and sent to either a GCP or AWS bucket specified by the user.

{{<Aside type="note" header="Note:">}}

For help determining which data center to select for a packet capture, visit https://cloudflare.com/cdn-cgi/trace and refer to the `colo` field. Note some colos can be regional such as `ORD` while other names may be more specific like `ord02`. Either of these names can be used for this same field.

{{</Aside>}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2. On the **Magic Transit** page next to **Packet captures**, select **Start a capture**.
3. Select the **Captures** tab and select **Start a capture**.
4. From **Packet captures - Capture configuration**, choose a capture type and select **Next**.
5. Fill out the required fields to begin the capture and then select **Start**.

The main **Packet captures** page displays a list of captures.

{{</tab>}}
{{<tab label="api" no-code="true">}}

The PCAPs API needs both `system` and `type` to be specified to start a capture. A PCAP's `system` is the product or logical subsystem where packets are captured, and a PCAP's `type` is how the captured packets are built into a PCAP file.

Currently, you can only send one collect request per minute for simple PCAPs, and you can only have one running or pending full PCAP at a time.

<details>
<summary>
  Full PCAP
</summary>
<div class="special-class" markdown="1">

For full PCAP requests, refer to the required parameters listed at [Create full PCAP requests](https://api.cloudflare.com/#magic-pcap-collection-create-full-pcap-request). Note that full packet captures require two more parameters than simple packets.

The full PCAP request endpoint also contains optional fields you can use to limit the amount of packets captured. Both full and simple packet requests contain an optional `filter_v1` parameter you can use to filter packets by IPv4 Source address, for example. For a full list of the filter options, refer to the parameter lists above.

Leave `filter_v1` empty to collect all packets without any filtering.

```bash
---
header: Full PCAP example request
---
  curl -X POST https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps \
  -H 'Content-Type: application/json' \
  -H "X-Auth-Email: ${email}" \
  -H "X-Auth-Key: ${auth_key}" \
  --data '{
          "filter_v1": {},
          "time_limit": 300,
          "packet_limit": 10000,
          "byte_limit": 100000000,
          "type": "full",
          "colo": "ORD",
          "system": "magic-transit",
           "destination_conf": "${bucket}"
           }'
```

While the collection is in progress, the response returns the `status` field as `pending`. You must wait for the PCAP collection to complete before downloading the file. When the PCAP is ready to download, the status changes to `success`.

```bash
---
header: Full PCAP example response
---
    {
      "result": {
        "id": "7d7c88382f0b4d5daa9587aa45a1a877",
        "submitted": "2022-06-02T18:38:22.269047Z",
        "filter_v1": {},
        "time_limit": 300,
        "status": "pending",
        "type": "full",
        "system": "magic-transit",
        "packet_limit": 10000,
        "byte_limit": 100000000,
        "colo": "ORD",
        "destination_conf": "gs://test-magic-pcaps"
      },
      "success": true,
      "errors": [],
      "messages": []
    }
```
</div>
</details>

<details>
<summary>
  Simple PCAP
</summary>
<div class="special-class" markdown="1">

To create a simple PCAP request, send a JSON body with the required parameter listed at [Create simple PCAP request](https://api.cloudflare.com/#magic-pcap-collection-create-simple-pcap-request).

Leave `filter_v1` to collect all packets without any filtering.

```bash
---
header: Simple PCAP example request
---
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

The response is a JSON body that contains the details of the job running to build the packet capture. The response contains a unique identifier for the packet capture request along with the details sent in the request.

```bash
---
header: Simple PCAP example response
---
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
</div>
</details>

{{</tab>}}
{{</tabs>}}

## Check packet capture status

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2. On the **Magic Transit** page next to **Packet captures**, select **Start a capture**.
3. From the **Packet Capture** page, select the **Captures** tab.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To check the status of a running job, send a request to the endpoint and specify the PCAP identifier. The PCAP identifier is received in the response of a collect request as shown in the previous step.

```bash
    curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/${pcap_id} \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000'
```

The response will be similar to the one received when requesting a PCAP collection.

```bash
---
header: Simple PCAP example result
---
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

{{</tab>}}
{{</tabs>}}

The capture status displays one of the following options:

- **Complete:** The capture request is done and ready for download.
- **In progress:** The capture request was captured but still processing.
- **Failure:** The capture . If this occurs, verify your ownership information.

## Download packet captures

After your request finishes processing, you can download your packet captures.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2. On the **Magic Transit** page next to **Packet captures**, select **Start a capture**.
3. From the **Packet captures** page, select the **Captures** tab.
4. Locate your packet capture you want to download and under **Captures**, select the link to open download it.

Packet captures are available to download when the **Status** displays **Success**. 

{{</tab>}}
{{<tab label="api" no-code="true">}}

For more information on how to process multiple saved capture files into a single output file, refer to [Wireshark's mergecap documentation](https://www.wireshark.org/docs/man-pages/mergecap.html).

**Full PCAPs**

To obtain full PCAPs, download the files from the bucket specified in `destination_conf` after the PCAP's status is `success`. You may find multiple files named `pcap_<pcap_id>.pcap` per capture as captures can occur across multiple machines.

**Simple PCAPs**

Once the simple PCAP collection is complete, you can download the PCAP by specifying the PCAP identifier used earlier.

```bash
    curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps/${pcap_id}/download \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000' \
    --output download.pcap
```

{{</tab>}}
{{</tabs>}}

## List packet captures


{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login) and select **Magic Transit**.
2. On the **Magic Transit** page next to **Packet captures**, select **Start a capture**.
3. From the **Packet captures** page, select the **Captures** tab.

The list of captures associated with your account displays.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To view a list of sent requests, use the following command:

```bash
---
header: List request example
---
    curl -X GET https://api.cloudflare.com/client/v4/accounts/${account_id}/pcaps \
    -H 'Content-Type: application/json' \
    -H 'X-Auth-Email: user@example.com' \
    -H 'X-Auth-Key: 00000000000'
```

The response returns an array that includes up to 50 sent requests, which includes completed and ongoing requests.

```bash
---
header: List response example
---
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

{{</tab>}}
{{</tabs>}}
