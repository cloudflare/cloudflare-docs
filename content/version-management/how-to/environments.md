---
title: Manage environments
pcx_content_type: how-to
weight: 2
---

# Manage environments

{{<render file="_environment-definition.md">}}

---

## Create environment

{{<render file="_enable-default-creation.md">}}

{{<render file="_create-environment-situation.md">}}
<br/>

To create a new environment:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Go to **Environments**.
5. Select **Create Environment**.
6. Provide the following information:
  - **Environment Name**: A unique, descriptive name for the environment.
  - [**Traffic filter**](/version-management/reference/traffic-filters/): Limits which requests are sent to this environment.
  - **Initial position**: Controls where this environment should be in your testing process. 
  
7. Select **Create**.

{{<Aside type="note">}}

You can only adjust the [**Read-only Environment** setting](/version-management/reference/read-only-environments/) after an environment has been created.

{{</Aside>}}

---

## Edit environment

To edit an environment:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On a specific environment, select **Edit**.
6. Make any required changes.
7. Select **Save**.

---

## Change environment version

To prevent accidental changes, you can only update an environment's version through the process of **Promotion** or **Roll back**.

For more details on the flow of versions and environments, refer to [How it works](/version-management/about/).

### Promote a version

Promotion moves a version from a lower-ranked environment to the next highest one.

{{<render file="_promote-version.md">}}
<br/>

### Roll back a version

When you roll back a version, you revert the environment to the previous version assigned to it.

To roll back a version:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On a specific environment, select **Roll back**.

---

## Delete environment

To delete an environment:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2. Select your account and zone.
3. Go to **Version Management**.
4. Select **Environments**.
5. On a specific environment, select **Edit**.
6. Select **Delete Environment**.

{{<Aside type="note">}}

You cannot delete your **Production** environment.

{{</Aside>}}