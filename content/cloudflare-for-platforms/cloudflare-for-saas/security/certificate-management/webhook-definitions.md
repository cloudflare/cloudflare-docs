---
title: Webhook definitions
pcx_content_type: reference
weight: 5
---

# Webhook data definitions

When you [create a webhook notification](/fundamentals/notifications/create-notifications/configure-webhooks/) for **SSL for SaaS Custom Hostnames**, you may want to automate responses to specific events (certificate issuance, failed validation, etc.).

The following section details the data Cloudflare sends to a webhook destination.

## Certificate validation

Before a Certificate Authority will issue a certificate for a domain, the requestor must prove they have control over that domain. This process is known as [domain control validation (DCV)](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/).

### Validation succeeded

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.validation.succeeded",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_issuance",
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

### Validation failed

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.validation.failed",
      "created_at": "2018-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_validation",
      "cname": "_ca3-64ce913ebfe74edeb2e8813e3928e359.app.example2.com",
      "cname_target": "dcv.digicert.com",
      "validation_errors": [
        {
          "message": "blog.example.com reported as potential risk: google_safe_browsing"
        }
      ],
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

---

## Certificate issuance

Once validated, certificates are issued by Cloudflare in conjunction with your chosen [certificate authority](/ssl/reference/certificate-authorities/).

### Issuance succeeded

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.issuance.succeeded",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_deployment",
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

### Issuance failed

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.issuance.failed",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_issuance",
      "cname": "_ca3-64ce913ebfe74edeb2e8813e3928e359.app.example2.com",
      "cname_target": "dcv.digicert.com",
      "validation_errors": [
        {
          "message": "caa_error: blog.example.com"
        }
      ],
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

---

## Certificate deployment

Once issued, certificates are deployed to Cloudflare's global edge network.

### Deployment succeeded

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.deployment.succeeded",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "active",
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

### Deployment failed

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.deployment.failed",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_deployment",
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

---

## Certificate deletion

### Deletion succeeded

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.deletion.succeeded",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "deleted"
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

### Deletion failed

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.deletion.failed",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_deletion"
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

---

## Certificate renewal

Once issued, certificates are valid for a period of time depending on the [certificate authority](/ssl/reference/certificate-validity-periods/).

The actions that you need to perform to renew certificates depend on your [validation method](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/renew-certificates/).

### Upcoming renewal

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.renewal.upcoming_certificate_expiration_notification",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "status": "active",
      "hosts": ["blog.example.com"],
      "issuer": "DigiCertInc",
      "serial_number": "1001172778337169491",
      "signature": "ECDSAWithSHA256",
      "uploaded_on": "2021-11-17T04:33:54.561747Z",
      "expires_on": "2022-11-21T12:00:00Z",
      "custom_csr_id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

### Renewal succeeded

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.renewal.succeeded",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_deployment",
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

### Renewal failed

```json
{
  "metadata": {
    "event": {
      "id": "<<WEBHOOK_ID>",
      "type": "ssl.custom_hostname_certificate.renewal.failed",
      "created_at": "2022-02-09T00:03:28.385080Z"
    },
    "account": {
      "id": "<<ACCOUNT_ID>"
    },
    "zone": {
      "id": "<<ZONE_ID>"
    }
  },
  "data": {
    "id": "<<CUSTOM_HOSTNAME_ID>",
    "hostname": "blog.com",
    "ssl": {
      "id": "<<CERTIFICATE_ID>",
      "type": "dv",
      "method": "cname",
      "status": "pending_issuance",
      "cname": "_ca3-64ce913ebfe74edeb2e8813e3928e359.app.example2.com",
      "cname_target": "dcv.digicert.com",
      "validation_errors": [
        {
          "message": "caa_error: blog.example.com"
        }
      ],
      "settings": {
        "min_tls_version": "1.2",
        "http2": "on"
      }
    },
    "custom_metadata": {
      "key1": "value1",
      "key2": "value2"
    },
    "custom_origin_server": "0001.blog.com"
  }
}
```

## Troubleshooting

Occasionally, you may see webhook notifications that do not include a corresponding `<<CUSTOM_HOSTNAME_ID>>` and `hostname` values.

This behavior is because each custom hostname can only have one certificate attached to it. Previously attached certificates can still emit webhook events but will not include the associated hostname and ID values.