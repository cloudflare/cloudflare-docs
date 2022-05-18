---
title: Manage applications and versions
pcx-content-type: how-to
weight: 1
---

# Manage applications and versions

Application definition.

{{<Aside type="note">}}

During the open Beta, you can only interact with applications and versions using the Cloudflare dashboard.

{{</Aside>}}

---

## Create new HTTP application

{{<render file="_create-application.md">}}

---

## Create new version of application

When you create a new version of your HTTP application, Cloudflare copies all the configuration settings from an existing application version and creates a new version:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account.
3. Go to **HTTP Applications**.
4. Select an existing application.
5. On the newest version, click **Clone**.

---

## Edit a version

{{<render file="_edit-version.md">}}

---

## Delete HTTP application

To delete an HTTP application:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account.
3. Go to **HTTP Applications**.
4. Select an existing application.
5. Click **Delete Application**.