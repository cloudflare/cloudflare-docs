---
title: Gmail directory integration
pcx_content_type: how-to
weight: 2
---

# Gmail directory integration

Cloudflare Area 1 can integrate with Google to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1. Create a service account in Google for Area 1 Directory Integration

You need to authorize Cloudflare Area 1 to make connections into your Google tenant to retrieve your directory details. Cloudflare recommends that you create a service account for this purpose. This account will require the following following permissions:

- View group subscriptions on your domain
- View organization units on your domain
- View groups on your domain
- See info about users on your domain

Start by creating a service account. If you already have one, you can skip this step.

1. Access your [Google Admin console](https://admin.google.com/), and go to **Account** > **Admin roles**.

2. Select **Create new role**, and give it a descriptive name and description. When you are finished, select **Continue**.

3. In **Admin console privileges**, select the following privileges: // This step is not clear. I thought there were a group of checkboxes we have to select, but the screenshot makes it seem clients have to search for these settings? Were the checkboxes cropped from the screenshot? Also, the screenshot has more options than these. Are these the only ones we need to select?
    - `Organizational Units > Read`
    - `Users > Read`
    - `Services > Directory Settings > Settings > Google Support Settings` // I've added `Services` to the path, according to what the screenshot shows.
    - `Services > Directory Sync > Manage Directory Sync Settings > Read Directory Sync Settings` // Same here

4. For **Admin API privileges**, choose the following privileges:
    - `Organizational Units > Read`
    - `Users > Read`
    - `Groups > Read`

5. Create a new user and assign the role you have just created onto this user. // How do we do this?

