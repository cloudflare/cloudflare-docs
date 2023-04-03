---
pcx_content_type: how-to
title: Staging environment (Beta)
weight: 6
---

# Staging environment (Beta)

Use your certificate staging environment to test new custom (modern) certificates before pushing them to your production environment. This process helps you solve potential certificate problems **before** there's an incident, such as when:

- You make a mistake when uploading a new custom certificate.
- You misunderstand the order of your certificates.
- Clients have previously pinned your custom certificate, causing a TLS termination error.

## Availability

{{<feature-table id="ssl.staging_environment">}}

---

## Use your staging environment

### Step 1 — Upload certificate

To upload custom (modern) certificates to your staging environment:

1.  Go to **SSL/TLS** > **Staging Certificates**.
2.  Select **Upload Custom Staging Certificate**.
3.  Upload your custom (modern) certificate ([detailed instructions](/ssl/edge-certificates/custom-certificates/uploading/)).
4.  Your certificate will appear in the dashboard with a status of **Staging Deployment**. If you refresh the page, its status should go to **Staging Active**.

### Step 2 — Test certificate

Test your custom (modern) certificate by sending `curl` requests to the IP addresses listed in the dashboard card at **SSL/TLS** > **Staging Certificates**:

```txt
curl --resolve <HOSTNAME>:<PORT>:<STAGING_IP> https://<HOSTNAME> -iv
```

You should confirm whether:

- TLS termination is successful.
- The right certificate is being served at the edge.
- Any clients are pinning the old certificate.

### Step 3 — Push certificate to production

Assuming there are no issues, push your custom (modern) certificate to your production environment:

1.  Go to **SSL/TLS** > **Staging Certificates**.
2.  Select a custom certificate.
3.  Select **Push to Production**.

If there were issues with your certificate, you can keep it in your staging environment or select **Deactivate** on the certificate itself.

### Step 4 (optional) — Push certificate back to staging

If you roll out a custom (modern) certificate to production and encounter issues, you can deactivate that certificate to delete the certificate from the edge and then push the certificate back to your staging environment for additional testing:

1.  Go to **SSL/TLS** > **Edge Certificates**.
2.  Select a custom certificate.
3.  Select **Deactivate**.
4.  Select **Push to Staging**.

---

## Limitations

### Access

Currently, staging environments are only available to Enterprise customers participating in an open beta. To get access to the beta, contact your Account team.

### Functionality

At the moment, staging environments have limited functionality:

- Only custom (modern) certificates
- Only accessed via the dashboard
