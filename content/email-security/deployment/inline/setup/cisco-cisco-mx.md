---
title: Cisco - Cisco as MX record
pcx_content_type: tutorial
weight: 4
layout: single
meta:
   title: Deploy and configure Area 1 with with Cisco as MX record
---

# Deploy and configure Area 1 with with Cisco as MX record

![A schematic showing where Area 1 security is in the life cycle of an email received](/email-security/static/deployment/inline-setup/cisco-cisco-mx/cisco-mx.png)

In this tutorial, you will learn how to configure Area 1 email security with Cisco as MX record. This tutorial is broken down into several steps.

## 1. Add a Sender Group for Area 1 Email Protection IPs

To add a new Sender Group:

1. Go to **Mail Policies** > **HAT Overview**.

2. Select the **Add Sender Group** button.

3. Configure the new Sender Group as follows:
    * **Name**: `Area1`.
    * **Order**: Order above the existing **WHITELIST** sender group.
    * **Comment**: `Area 1 Email Protection egress IP Addresses`.
    * **Policy**: `TRUSTED` (by default, spam detection is disabled for this mail flow policy).
    * **SBRS**: Leave blank.
    * **DNS Lists**: Leave blank.
    * **Connecting Host DNS Verification**: Leave all options unchecked.

4. Select **Submit and Add Senders** and add the IP addresses mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).

![Sender group](/email-security/static/deployment/inline-setup/cisco-cisco-mx/step1.png)

## 2. Add SMTP route for the Area 1 Email Protection Hosts

To add a new SMTP Route:

1. Go to **Network** > **SMTP Routes**.

2. Select **Add Route**.

3. Configure the new SMTP Route as follows:
    * **Receiving Domain**: `a1s.mailstream`
    * In **Destination Hosts**, select **Add Row**, and add the following values to the respective rows:
    Priority | Destination                      | Port
    -------- | -------------------------------- | ---
    `5`      | `mailstream-central.mxrecord.mx` | `25`
    `10`     | `mailstream-east.mxrecord.io`    | `25`
    `10`     | `mailstream-west.mxrecord.io`    | `25`

![Edit SMTP route](/email-security/static/deployment/inline-setup/cisco-cisco-mx/step2.png)

## 3. Create Incoming Content Filters

To manage the mail flow between Area 1 and Cisco ESA, you need two filters:
* One to direct all incoming messages to Area 1.
* One to recognize messages coming back from Area 1 to route for normal delivery.

### Incoming Content Filter - To Area 1

To create a new Content Filter:

1. Go to **Mail Policies** > **Incoming Content Filters**.

2. Select **Add Filter** to create a new filter.

3. Configure the new Incoming Content Filter as follows:
    * **Name**: `ESA_to_A1S`
    * **Description**: `Redirect messages to Area 1 for anti-phishing inspection`
    * **Order**: This will depend on your other filters.
    * **Condition**: No conditions.
    * **Actions**:
        * For **Action** select **Send to Alternate Destination Host**.
        * For **Mail Host** input `a1s.mailstream` (the SMTP route configured in step 2).

![Content filter](/email-security/static/deployment/inline-setup/cisco-cisco-mx/step3-to-area1.png)

### Incoming Content Filter - From Area 1

To create a new Content Filter:

1. Go to **Mail Policies** > **Incoming Content Filters**.

2. Select the **Add Filter** button to create a new filter.

3. Configure the new Incoming Content Filter as follows:
    * **Name**: `A1S_to_ESA`
    * **Description**: `Area 1 inspected messages for final delivery`
    * **Order**: This filter must come before the previously created filter.
    * **Conditions**: Add seven conditions of type **Remote IP/Hostname** with the IP addresses mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/): 
    Order | Condition            | Rule
    ----- | -------------------- | ---
    `1`   | `Remote IP/Hostname` | `52.11.209.211`
    `2`   | `Remote IP/Hostname` | `52.89.255.11`
    `3`   | `Remote IP/Hostname` | `52.0.67.109`
    `4`   | `Remote IP/Hostname` | `54.173.50.115`
    `5`   | `Remote IP/Hostname` | `104.30.32.0/19`
    `6`   | `Remote IP/Hostname` | `158.51.64.0/26`
    `7`   | `Remote IP/Hostname` | `158.51.65.0/26`
        * Ensure that the *Apply rule:* dropdown is set to **If one or more conditions match**.
    * **Actions**: Select **Add Action**, and add the following:
    Order | Action          | Rule
    --- | -------------------- | ---
    1   | `Skip Remaining Content Filters (Final Action)` | `skip-filters()`

![Content filter](/email-security/static/deployment/inline-setup/cisco-cisco-mx/step3-from-area1.png)

## 4. Add the Incoming Content Filter to the Inbound Policy table

Assign the Incoming Content Filters created in [step 3](#3-create-incoming-content-filters) to your primary mail policy in the Incoming Mail Policy table. Then, commit your changes to activate the email redirection.
