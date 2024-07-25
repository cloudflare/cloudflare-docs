---
pcx_content_type: how-to
title: Pre-validation
weight: 1
meta:
    title: Pre-validation methods - Custom Hostname Validation
---

# Pre-validation methods

Pre-validation methods help verify domain ownership before your customer's traffic is proxying through Cloudflare.

## Use when

Use pre-validation methods when your customers cannot tolerate any downtime, which often occurs with production domains.

The downside is that these methods require an additional setup step for your customers. Especially if you already need them to add something to their domain for [certificate validation](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/), pre-validation might make their onboarding more complicated.

If your customers can tolerate a bit of downtime and you want their setup to be simpler, review our [real-time validation methods](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/realtime-validation/).

## How to

### TXT records

TXT validation is when your customer adds a `TXT` record to their authoritative DNS to verify domain ownership.

{{<Aside type="note">}}

If your customer cannot update their authoritative DNS, you could also use [HTTP validation](#http-tokens).

{{</Aside>}}

To set up `TXT` validation:

1. When you [create a custom hostname](/api/operations/custom-hostname-for-a-zone-create-custom-hostname), save the `ownership_verification` information.

    ```json
    ---
    highlight: [11-12]
    ---
    {
    "result": [
        {
        "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",
        "hostname": "app.example.com",
        // ...
        "status": "pending",
        "verification_errors": ["custom hostname does not CNAME to this zone."],
        "ownership_verification": {
            "type": "txt",
            "name": "_cf-custom-hostname.app.example.com",
            "value": "0e2d5a7f-1548-4f27-8c05-b577cb14f4ec"
        },
        "created_at": "2020-03-04T19:04:02.705068Z"
        }
    ]
    }
    ```

2. Have your customer add a `TXT` record with that `name` and `value` at their authoritative DNS provider.
3. After a few minutes, you will see the hostname status become **Active** in the UI.
4. Once you activate the custom hostname, your customer can remove the `TXT` record.

### HTTP tokens

HTTP validation is when you or your customer places an HTTP token on their origin server to verify domain ownership.

To set up HTTP validation:

When you [create a custom hostname](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/issue-certificates/) using the API, Cloudflare provides an HTTP `ownership_verification` record in the response.

To get and use the `ownership_verification` record:

1.  Make an API call to [create a Custom Hostname](/api/operations/custom-hostname-for-a-zone-create-custom-hostname).

2.  In the response, copy the `http_url` and `http_body` from the `ownership_verification_http` object:

    ```json
    ---
    header: Example response (truncated)
    highlight: [8-9]
    ---
    {
      "result": [
        {
          "id": "24c8c68e-bec2-49b6-868e-f06373780630",
          "hostname": "app.example.com",
          // ...
          "ownership_verification_http": {
              "http_url": "http://app.example.com/.well-known/cf-custom-hostname-challenge/24c8c68e-bec2-49b6-868e-f06373780630",
              "http_body": "48b409f6-c886-406b-8cbc-0fbf59983555"
          },
          "created_at": "2020-03-04T20:06:04.117122Z"
        }
      ]
    }
    ```

3.  Have your customer place the `http_url` and `http_body` on their origin web server.

    ```txt
    ---
    header: Example response (truncated)
    ---
    location "/.well-known/cf-custom-hostname-challenge/24c8c68e-bec2-49b6-868e-f06373780630" {
        return 200 "48b409f6-c886-406b-8cbc-0fbf59983555\n";
    }
    ```

    Cloudflare will access this token by sending `GET` requests to the `http_url` using `User-Agent: Cloudflare Custom Hostname Verification`.

    {{<Aside type="note">}}If you can serve these tokens on behalf of your customers, you can simplify their overall setup.{{</Aside>}}
    <br/>

5.  After a few minutes, you will see the hostname status become **Active** in the UI.

6. Once the hostname is active, your customer can remove the token from their origin server.