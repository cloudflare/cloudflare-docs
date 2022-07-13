---
updated: 2022-07-13
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Troubleshoot user login details
---

# Troubleshoot user login details

Cloudflare Access provides a user-facing portal, the [App Launcher](https://blog.cloudflare.com/announcing-the-cloudflare-access-app-launch/), which displays all applications that a user can reach in a single view. The same portal also can be used by a member of your team to gather diagnostic information about their account for troubleshooting.

**🗺️ This tutorial covers how to:**

- Configure the App Launcher
- Visit the App Launcher as an end user
- Review login diagnostics as an end user

**⏲️Time to complete:**

10 minutes

---

## Configure the App Launcher

1. On the Zero Trust Dashboard, go to **Settings > Authentication**.

2. Under **App Launcher**, select **Manage**.

    The App Launcher works like other Access policies - you can define who is able to reach the App Launcher. When users visit the App Launcher, Cloudflare Access will display only the applications they have permission to reach.

3. To define who is able to use the App Launcher, select **Add a rule**.

4. Once you have defined at least one rule, select **Save**. Your rule will appear under the **App Launcher rules** list.

5. To finalize your edits, select **Save**.

## Visiting the Access App Launcher

The Cloudflare Access App Launcher is available to users at your [team domain](/cloudflare-one/glossary/#team-domain). When users visit that domain, they will be prompted to login. Once authenticated, Cloudflare Access will display the applications they can access.

## Find user diagnostics

You can build rules in Cloudflare Access based on identity, device, multifactor method, country, and other signals. To troubleshoot why a user cannot log in, you can gather details about their Cloudflare Access signals.

Users can check their authentication status by going to the App Launcher and selecting their name menu > **Account**.

**Account** will list everything that Cloudflare Access knows about that current user session. If the identity provider supports `amr` sharing, Access will list the user's multifactor method.

Users can copy the data to share it with an administrator. The data is structured as `json`. You can use this information to compare against application policies to determine why a user might not be able to reach an application. For example:

```json
{
  "id": "103616583934998960058",
  "name": "Sam Rhea",
  "email": "srhea@cloudflare.com",
  "idp": {
    "id": "7d373bcc-73cb-4d52-97a7-099a93b5587f",
    "type": "google"
  },
  "geo": {
    "country": "PT"
  },
  "user_uuid": "78f51e22-2a9f-4f51-a60f-bf97d097fb59",
  "devicePosture": {},
  "account_id": "1c787a4e7a6972171826b9c0bdd5a4ee",
  "auth_cert": "",
  "ip": "85.XXX.XXX.XX"
}
```
