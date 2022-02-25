---
pcx-content-type: how-to
title: Staging environment (Beta)
weight: 6
---

# Staging environment (Beta)

Use your certificate staging environment to test new custom (modern) certificates before pushing them to your production environment. This process helps you solve potential certificate problems **before** there's an incident, such as when:

*   You make a mistake when uploading a new custom certificate.
*   You misunderstand the order of your certificates.
*   Clients have previously pinned your custom certificate, causing a TLS termination error.

<Aside type="note">

Staging environments are available only to Enterprise customers as part of an open beta. For access, reach out to your Account team.

</Aside>

***

## Use your staging environment

### Step 1 — Upload certificate

To upload custom (modern) certificates to your staging environment:

1.  Navigate to **SSL/TLS** > **Staging Certificates**.
2.  Click **Upload Custom Staging Certificate**.
3.  Upload your custom (modern) certificate ([detailed instructions](/ssl/edge-certificates/custom-certificates/uploading/)).
4.  Your certificate will appear in the dashboard with a status of **Staging Deployment**. If you refresh the page, its status should go to **Staging Active**.

### Step 2 — Test certificate

Test your custom (modern) certificate by sending `curl` requests to the IP addresses listed in the dashboard card at **SSL/TLS** > **Staging Certificates**:

```txt
curl --resolve <HOSTNAME>:<STAGING_IP> https://<HOSTNAME> -iv
```

You should confirm whether:

*   TLS termination is successful.
*   The right certificate is being served at the edge.
*   Any clients are pinning the old certificate.

### Step 3 — Push certificate to production

Assuming there are no issues, push your custom (modern) certificate to your production environment:

1.  Navigate to **SSL/TLS** > **Staging Certificates**.
2.  Click a custom certificate.
3.  Click **Push to Production**.

If there were issues with your certificate, you can keep it in your staging environment or click **Deactivate** on the certificate itself.

### Step 4 (optional) — Push certificate back to staging

If you roll out a custom (modern) certificate to production and encounter issues, you can push that certificate back to your staging environment for additional testing:

1.  Navigate to **SSL/TLS** > **Edge Certificates**.
2.  Click a custom certificate.
3.  Click **Push to Staging**.

***

## Limitations

### Access

Currently, staging environments are only available to Enterprise customers participating in an open beta. To get access to the beta, contact your Account team.

### Functionality

At the moment, staging environments have limited functionality:

*   Only custom (modern) certificates
*   Only accessed via the dashboard
