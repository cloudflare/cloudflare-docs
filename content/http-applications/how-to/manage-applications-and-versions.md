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

When you create a new HTTP application, Cloudflare copies all the configuration settings from an existing zone and creates the first version of your application:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account.
3. Go to **HTTP Applications**.
4. Click **Create an Application**.
5. Enter an **Application name**.
6. Select a website to copy its configuration for the first version of your application.
7. Click **Create**.

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

When you edit an application version, Cloudflare updates the zone configuration settings associated with that version. You can only update the configuration settings associated with your most recent version.

To edit the zone configuration settings for a version:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account.
3. Go to **HTTP Applications**.
4. Select an existing application.
5. On a specific version, click **Edit**
6. Adjust your zone configuration settings (any changes you make are saved automatically).
7. To leave **Edit** mode, click the back arrow next to **HTTP Applications** in your navigation menu.

---

## Delete HTTP application

To delete an HTTP application:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account.
3. Go to **HTTP Applications**.
4. Select an existing application.
5. Click **Delete Application**.