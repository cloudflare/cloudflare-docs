---
title: Service accounts
pcx_content_type: how-to
weight: 1
---

# Service accounts

A **service account** allows admins to create and maintain API credentials separate from a single username and password combination. It also allows you to create and control additional API access for different use cases.

When you connect to the [Area 1 API](/email-security/api/), the **Public Key** is used for the *username* and the **Private Key** for the *password*.

## Create service account

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Service Accounts**.
4. Select **Add Service Account**.
5. Add a **Name**.
6. Select **Create Service Account**.
7. You will see your account's **Private Key** in a pop-up message (which will never be displayed again) and **Public Key** in the list of service accounts. Make sure to copy both values and store in a secure location.

---

## Rotate private key

If you lose your private key or need to rotate it for security reasons, you can generate a new private key:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Service Accounts**.
4. On a specific account, select **...** > **Refresh key**.