---
pcx_content_type: reference
title: Client errors
weight: 2
---

# Client errors

This page lists the error codes that can appear in the WARP client GUI. If you do not see your error below, refer to [common issues](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/) or [contact Cloudflare Support](/support/contacting-cloudflare-support/).

<div class="medium-img">

![Example of error message in WARP GUI](/images/cloudflare-one/connections/warp-gui-error.png)

</div>

## CF_CAPTIVE_PORTAL_TIMED_OUT

### Symptoms

- Unable to login to a captive portal network
- No Internet connectivity

### Cause

[Captive portal detection](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#captive-portal-detection) is turned on and one of the following issues occurred:
- The user did not complete the captive portal login process within the time limit set by WARP.
- The captive portal redirected the user to a flow that is not yet supported by the captive portal detection feature.

### Resolution

1. Increase the [captive portal timeout](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#captive-portal-detection) to allow users more time to login.
2. If this does not resolve the issue, allow users to manually [turn off WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#lock-warp-switch). We recommend setting an [auto connect](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#auto-connect) value so that the client turns itself back on after a few minutes.

## CF_CONNECTIVITY_FAILURE_UNKNOWN

### Symptoms

- Unable to connect WARP
- No Internet connectivity
- User may be behind a captive portal

### Cause

The initial [connectivity check](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#connectivity-check) failed for an unknown reason. Refer to [Unable to connect WARP](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#unable-to-connect-warp) for the most common reasons why this error occurs.

### Resolution

1. Retrieve [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs/) for the device.
2. Follow the troubleshooting steps in [Unable to connect WARP](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#unable-to-connect-warp).

## CF_DNS_LOOKUP_FAILURE

### Symptoms

- Unable to connect WARP
- Unable to browse the Internet
- `nslookup` and `dig` commands fail on the device

### Cause

WARP was unable to resolve hostnames via its [local DNS proxy](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#dns-traffic).

### Resolution

1. Verify that the network the user is on has DNS connectivity.
2. Verify that DNS resolution works when WARP is disabled.
3. Ensure that no third-party tools are interfering with WARP for control of DNS.
4. Ensure that no third-party tools are [performing TLS decryption](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#a-third-party-security-product-is-interfering-with-gateway) on traffic to the [WARP IP addresses](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).

## CF_DNS_PROXY_FAILURE

### Symptoms

- Unable to connect WARP in a [mode that enables DNS filtering](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/).

### Cause

A third-party process (usually a third-party DNS software) is bound to port 53, which is used by WARP's [local DNS proxy](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#dns-traffic) to perform DNS resolution. The name of third-party process will appear in the GUI error message.

### Resolution

1. Remove or disable DNS interception in the third-party process.
2. Alternatively, switch WARP to [Secure Web Gateway without DNS filtering](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#secure-web-gateway-without-dns-filtering) mode.

## CF_FAILED_TO_SET_MTLS

### Symptoms

- Unable to connect WARP

### Cause

The device failed to present a [valid mTLS certificate](/cloudflare-one/connections/connect-devices/warp/deployment/device-enrollment/#check-for-mtls-certificate) during device enrollment.

### Resolution

1. Ensure that there are no admin restrictions on certificate installation.
2. Re-install the client certificate on the device.

## CF_HAPPY_EYEBALLS_MITM_FAILURE

### Symptoms

- Unable to connect WARP

### Cause

A router, firewall, antivirus software, or other third-party security product is blocking UDP on the WARP ports.

### Resolution

Configure the third-party security product to allow the [WARP ingress IPs and ports](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#warp-ingress-ip).

## CF_HOST_UNREACHABLE_CHECK

### Symptoms

- Unable to connect WARP
- No Internet connectivity
- User may be behind a captive portal

### Cause

The [connectivity check](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#connectivity-check) inside of the WARP tunnel has failed.

### Resolution

1. Check for the presence of third-party HTTP filtering software (AV, DLP, or firewall) that could be intercepting traffic to the [WARP IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall).
2. In the third-party software, bypass inspection for all IP traffic going through WARP. To find out what traffic routes through the WARP tunnel, refer to [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/).

## CF_INSUFFICIENT_DISK

### Symptoms

- Unable to connect WARP
- OS warns that the disk is full

### Cause

The hard drive is full or has incorrect permissions for WARP to write data.

### Resolution

1. Ensure that your device meets the [HD space requirements](/cloudflare-one/connections/connect-devices/warp/download-warp/) for WARP.
2. Check for disk permissions that may prevent WARP from using disk space.
3. Empty trash or remove large files.

## CF_INSUFFICIENT_FILE_DESCRIPTORS

### Symptoms

- Unable to connect WARP
- Unable to open files on the device

### Cause

The device does not have sufficient file descriptors to create network sockets or open files.

### Resolution

Increase the file descriptor limit in your system settings.

## CF_INSUFFICIENT_MEMORY

### Symptoms

- Unable to connect WARP
- Device is very slow

### Cause

The device does not have enough memory to run WARP.

### Resolution

1. Ensure that your device meets the [minimum memory requirements](/cloudflare-one/connections/connect-devices/warp/download-warp/) for WARP.
2. List all running processes to check memory usage.

## CF_LOCAL_POLICY_FILE_FAILED_TO_PARSE

### Symptoms

- Unable to connect WARP

### Cause

The WARP client was deployed on the device using an invalid MDM configuration file.

### Resolution

1. Review the [managed deployment guide](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) for your operating system.
2. Locate the MDM configuration file on your device.
3. Ensure that the file is formatted correctly and only contains [accepted arguments](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/parameters/).

## CF_NO_NETWORK

### Symptoms

- Unable to connect WARP
- No Internet connectivity

### Cause

The device is not connected to a Wi-Fi network or LAN that has connectivity to the Internet.

### Resolution

1. Launch the network settings panel on your device.
2. Ensure that you are connected to a valid network.
3. Check that your device is retrieving a valid IP address.
4. If this does not resolve the error, try rebooting your device or running your system's network diagnostics tool.

## CF_REGISTRATION_MISSING

### Symptoms

- Unable to connect WARP

### Cause

The device is not authenticated to a Zero Trust organization because:

- The device was revoked in Zero Trust.
- The registration was corrupted or deleted for an unknown reason.

### Resolution

1. Launch the WARP client.
2. Select the gear icon and go to **Preferences** > **Account**.
3. Select **Re-Authenticate Session**.
4. Complete the authentication steps required by your organization.
5. If this does not resolve the error, select **Logout from Cloudflare Zero Trust** and then log back in. Logging out is only possible if [Allow device to leave organization](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#allow-device-to-leave-organization) is enabled for your device.

## CF_TLS_INTERCEPTION_BLOCKING_DOH

### Symptoms

- DNS requests fail to resolve when WARP is turned on.

### Cause
A third-party application or service is intercepting DNS over HTTPS traffic from WARP.

### Resolution

Configure the third-party application to exempt the [WARP DoH IPs](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/#doh-ip).

## CF_TLS_INTERCEPTION_CHECK

### Symptoms

- Unable to connect WARP

### Cause

A third-party security product on the device or network is performing TLS decryption on HTTPS traffic. For more information, refer to the [Troubleshooting guide](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#a-third-party-security-product-is-interfering-with-gateway).

### Resolution

In the third-party security product, disable HTTPS inspection and TLS decryption for the [WARP IP addresses](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
