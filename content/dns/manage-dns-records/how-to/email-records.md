---
pcx_content_type: how-to
title: Set up email records
weight: 5
---

# Set up email records

There are two reasons to set up email records for your domain: to make sure email [reaches your mail server](#add-mx-records) and to prevent other email senders from [spoofing your domain](#prevent-domain-spoofing).

---

## Add MX records

{{<Aside type="note">}}

If you are using [Email Routing](/email-routing/), you cannot modify the MX records for your Cloudflare zone without [disabling Email Routing](/email-routing/setup/disable-email-routing/).

{{</Aside>}}

To route emails to your mail server, you need to [create two DNS records](/dns/manage-dns-records/how-to/create-dns-records/) within Cloudflare:

1.  An **A** or **AAAA** record for your mail subdomain that points to the IP address of your mail server.

     | **Type** | **Name** | **IPv4 address** | **Proxy status** |
     | -------- | -------- | ---------------- | ---------------- |
     | A        | `mail`   | `192.0.2.1`      | DNS only         |

     <details>
      <summary>API example</summary>
      <div>
      
      ```json
      ---
      header: Request
      ---
      curl -sX POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
      -H "x-auth-email: <EMAIL>" \
      -H "x-auth-key: <API_KEY>" \
      -H "Content-Type: application/json" \
      --data '{
        "type":"A",
        "name":"www.example.com",
        "content":"192.0.2.1",
        "ttl":3600,
        "proxied":false
      }'
      ```

      ```json
      ---
      header: Response
      ---
      {
        "result": {
          "id": "<ID>",
          "zone_id": "<ZONE_ID>",
          "zone_name": "example.com",
          "name": "www.example.com",
          "type": "A",
          "content": "192.0.2.1",
          "proxiable": true,
          "proxied": false,
          "ttl": 1,
          "locked": false,
          "meta": {
            "auto_added": false,
            "managed_by_apps": false,
            "managed_by_argo_tunnel": false,
            "source": "primary"
          },
          "comment": null,
          "tags": [],
          "created_on": "2023-01-17T20:37:05.368097Z",
          "modified_on": "2023-01-17T20:37:05.368097Z"
        },
        "success": true,
        "errors": [],
        "messages": []
      }
      ```

      </div>
      </details>

2.  An **MX** record that points to that subdomain.

      | **Type** | **Name** | **Mail server**    | **TTL** |
      | -------- | -------- | ------------------ | ------- |
      | MX       | `@`      | `mail.example.com` | Auto    |

      <details>
      <summary>API example</summary>
      <div>
      
      ```bash
      ---
      header: Request
      ---
      curl -sX POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/dns_records" \
      -H 'x-auth-email: <EMAIL>' \
      -H 'x-auth-key: <API_KEY>' \
      -H "Content-Type: application/json" \
      --data '{
        "type":"MX",
        "name":"example.com",
        "content":"mail.example.com",
        "ttl":3600
      }'
      ```

      ```json
      ---
      header: Response
      ---
      {
        "result": {
          "id": "<ID>",
          "zone_id": "<ZONE_ID>",
          "zone_name": "example.com",
          "name": "example.com",
          "type": "MX",
          "content": "mail.example.com",
          "priority": 10,
          "proxiable": false,
          "proxied": false,
          "ttl": 3600,
          "locked": false,
          "meta": {
            "auto_added": false,
            "managed_by_apps": false,
            "managed_by_argo_tunnel": false,
            "source": "primary"
          },
          "comment": null,
          "tags": [],
          "created_on": "2023-01-17T20:54:23.660869Z",
          "modified_on": "2023-01-17T20:54:23.660869Z"
        },
        "success": true,
        "errors": [],
        "messages": []
      }
      ```

      </div>
      </details>

---

## Prevent domain spoofing

{{<render file="_domain-spoofing.md" productFolder="dmarc-management">}}

### Configure email security records

Refer to [Security records](/dmarc-management/security-records/) to learn how to set up your email security records.
