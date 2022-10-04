---
title: Gsuite BCC setup
pcx_content_type: tutorial
weight: 1
meta:
    title: Setup Area 1 proof of value for Gmail
---

# Setup Area 1 proof of value for Gmail

For customers using Gmail, setting up a proof of value (POV) with Area 1 for detecting phishing emails is quick and easy. You need to create a Content Compliance filter to BCC emails to Area 1. Refer to the following email flow during a POV for Gmail:

![A schematic showing email flow with area 1 proof of value for Gmail.](/email-security/static/gmail-bcc-flow.png)

To setup Area 1 POV for Gmail:

1. Go to the Gmail Administative Console, and select the **Compliance** configuration option.

2. Scroll to **Content Compliance** and select **CONFIGURE**.

<!-- Renumber from here -->

1. Add a **Content Compliance** filter and name it `Area 1 - BCC`.

2. In **Email messages to affect**, select **Inbound**.

3. Now, you need to add the recipients that will have their messages sent to Area 1 via BCC.
    1. Select **Add** to configure the expression.
    2. Select **Advanced content match**.
        1. In **Location**, select **Headers + Body** from the dropdown.
        2. In **Match type** select **Matches regex**.
        3. In **Regexp** write `.*`. You can customize the regex as needed and test within the admin page or on sites like https://regexr.com/.
        4. Select **SAVE**.