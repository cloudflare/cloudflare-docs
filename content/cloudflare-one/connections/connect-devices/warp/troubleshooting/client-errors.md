---
pcx_content_type: reference
title: Client errors
weight: 2

---

# Client errors

## CF_CAPTIVE_PORTAL_CONNECTION_FAILED

The device was unable to connect to the captive portal network.

### Solution

1. Turn off WARP.
2. Authenticate to the captive portal.
3. Turn on WARP.

## CF_CAPTIVE_PORTAL_TIMED_OUT

The device has lost Internet connectivity because its captive portal session has expired.

### Solution

1. Reconnect to the captive portal.
2. Turn on WARP.

## CF_CONNECTIVITY_FAILURE_UNKNOWN

The initial connectivity check failed for an unknown reason.

### Solution

## CF_DNS_LOOKUP_FAILURE

The WARP client could not connect because DNS requests failed to resolve.

### Solution

## CF_DNS_PROXY_FAILURE

A third-party process is bound to port 53, which is used by WARP to perform DNS resolution. [Learn more](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#dns-traffic) about how WARP handles DNS traffic on the device.

### Solution

Disable DNS configuration settings in the third-party process.

## CF_FAILED_TO_SET_MTLS

The device failed to present a valid mTLS certificate during device enrollment.

### Solution

1. On your device, verify that the client certificate is trusted in the system store.
2. If this does not resolve the error, follow [these instructions](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/#check-for-mtls-certificate) to re-configure mTLS authentication.

## CF_HAPPY_EYEBALLS_FAILURE

The WARP client could not establish a connection to Cloudflare’s global network.

### Solution

Refer to [Unable to turn on WARP](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#unable-to-turn-on-warp) for possible causes and solutions.

## CF_HOST_UNREACHABLE_CHECK

The initial connectivity check failed because the host was unreachable.

### Solution

## CF_INSUFFICIENT_SYSTEM_RESOURCES

The device does not have sufficient system resources to run WARP.

### Solution

Ensure that your device meets the [minimum system requirements](/cloudflare-one/connections/connect-devices/warp/download-warp/) for WARP.

## CF_LOCAL_POLICY_FILE_FAILED_TO_PARSE

The WARP client was deployed on the device using an invalid MDM configuration file.

### Solution

1. Review the [managed deployment guide](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) for your operating system.
2. Locate the MDM configuration file on your device.
3. Ensure that the configuration file is formatted correctly and only contains [accepted arguments](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

## CF_NO_NETWORK

Your device is unable to obtain a valid IP address. This is most likely because your Wi-Fi or LAN connection is disconnected.

### Solution

1. Launch the network settings panel on your device.
2. Ensure that you are connected to a valid network.
3. Check that your device is retrieving a valid IP address.
4. If this does not resolve the error, try rebooting your device or running your system's network diagnostics tool.

## CF_REGISTRATION_MISSING

The WARP client is not authenticated to a Zero Trust organization.

### Solution

1. Launch the WARP client.
2. Select the gear icon and go to **Preferences** > **Account**.
3. Select **Re-Authenticate Session**.
4. Complete the authentication steps required by your organization.
5. If this does not resolve the error, log out of your Zero Trust organization and log back in:
    1. Go to **Preferences** > **Account** and select **Logout from Cloudflare Zero Trust**.
    2. Select **Login with Cloudflare Zero Trust**.
    3. Enter your team name.
    4. Complete the authentication steps required by your organization.

## CF_TLS_INTERCEPTION_BLOCKING_DOH

A third-party application or service is intercepting DNS over HTTPS traffic from WARP. This is not allowed.

### Solution

Configure the third-party application to exempt the [WARP DoH IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#doh-ip).

## CF_TLS_INTERCEPTION_CHECK

The initial connectivity check failed after establishing the WARP tunnel.

### Solution
