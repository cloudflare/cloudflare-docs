---
title: Use cases
pcx_content_type: how-to
weight: 1
layout: single
meta:
   title: Office 365 use cases
---

# Office 365 use cases

Before looking into our use case tutorials, read throught this how-to guide related to best practices. This will show you how to prepare your Area 1 dashboard and enable options such as tagging and defanging emails, as well as [Email Link Isolation](/email-security/email-configuration/email-policies/link-actions/#email-link-isolation-beta), before setting up Office 365.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon).

3. Navigate to **Email Configuration** > **Email Policies** > **Link Actions**.

4. If you are an **Advantage customer**:
    1. In **Disposition Actions**, select **Edit**.
    2. In the `SUSPICIOUS` disposition drop-down menu, change the action to `URL DEFANG`.

    <div class="medium-img">

    ![Defang suspicious emails](/email-security/static/inline-setup/o365-area1-mx/defang-suspicious.png)

    </div>

    3. Select **Save Disposition Actions**.

5. If you are an **Enterprise customer**:
    1. Enable **Email Link Isolation**.

6. Still under **Email Policies**, select **Text add-Ons**.

7. Select **Edit**.

8. Enable the following options under **Add Prefix To Subject**:
    - **Malicious** - Enabled
    - **Suspicious** - Enabled
    - **Spam** - Enabled
    - **Bulk** - Enabled
    - **Spoof** - Enabled
    - **Originated Outside of Company** - Optional
    - **Contains Encrypted Content** - Optional
    - **Subject Prefix** - Format as desired. For example `[%LABELS]`

    <div class="medium-img">

    ![Enable all the options mentioned in step 9](/email-security/static/inline-setup/o365-area1-mx/prefix-subject.png)

    </div>

9. Still in the same window, scroll down and enable the following options under **Add Prefix To Body**:
    - **Malicious** - Enabled
    - **Suspicious** - Enabled
    - **Spam** - Disabled
    - **Bulk** - Disabled
    - **Spoof** - Enabled
    - **Originated Outside of Company** - Optional
    - **Body Prefix** - Format as desired. You can use the default settings. The body prefix supports HTML tags for formatting.

    <div class="medium-img">

    ![Enable all the options mentioned in step 7](/email-security/static/inline-setup/o365-area1-mx/prefix-subject-enterprise.png)

    </div>

10. Select **Update Text Add-Ons**.

### Use cases

Refer to the following use cases to learn how to set up your environment for different scenarios.

{{<directory-listing>}}