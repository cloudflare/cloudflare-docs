---
title: User Guide
pcx_content_type: how-to
weight: 1
meta:
  title: Using Cloudflare's Time Service
---

# Using Cloudflare's Time Service

{{<render file="_ntp-definition.md">}}

To use our NTP server, change the time configuration in your device to point to `time.cloudflare.com`.

## MacOs

To have your Mac to synchronize time from `time.cloudflare.com`:

1.  Go to **System Preferences**.
2.  Go to **Date & Time**.
3.  Click the lock icon on the bottom left to make changes.
4.  Enter your password.
5.  Next to **Set date and time automatically**, enter `time.cloudflare.com`.

![Screenshot of updating the Date & Time settings on machine running macOS](/images/time-services/mactime.png)

## Windows

To have your Windows machine synchronize time from `time.cloudflare.com`:

1.  Go to **Control Panel**.
2.  Go to **Clock and Region**.
3.  Click **Date and Time**.
4.  Go to the **Internet Time** tab.
5.  Click **Change settings..**
6.  For **Server:**, type `time.cloudflare.com` and click **Update now**.
7.  Click **OK**.

![Screenshot of updating the Date and Time settings on machine running Windows](/images/time-services/window.png)

## Linux

Cloudflare's time servers are included in [pool.ntp.org](https://www.ntppool.org/en/) which is the default time service for many Linux distributions and network appliances. If your NTP client is synchronizing from one of the below servers, you are already using Cloudflare's time services.

* [162.159.200.1](https://www.ntppool.org/scores/162.159.200.1)
* [162.159.200.123](https://www.ntppool.org/scores/162.159.200.123)
* [2606:4700:f1::1](https://www.ntppool.org/scores/2606:4700:f1::1)
* [2606:4700:f1::123](https://www.ntppool.org/scores/2606:4700:f1::123)

To manually configure your NTP client to use our time service, please first refer to the documentation for your Linux distribution to determine which NTP client you are using and where the configuration files are stored (for example, [Ubuntu](https://ubuntu.com/server/docs/about-time-synchronisation), [Debian](https://wiki.debian.org/NTP), [RHEL](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/ch-configuring_ntp_using_the_chrony_suite)).

Exact configuration will vary by Linux distribution, but below are some example configurations for popular clients:

### [chrony](https://chrony-project.org)

1. Add `time.cloudflare.com` as a server in the configuration file on your system (e.g., `/etc/chrony/chrony.conf`)

       server time.cloudflare.com iburst

2. Restart the chronyd service.

       systemctl restart chronyd

### [systemd-timesyncd](https://man7.org/linux/man-pages/man5/timesyncd.conf.5.html)

1. Add `time.cloudflare.com` to the `[Time]` section of the configuration file on your system (e.g., `/etc/systemd/timesyncd.conf`)

       [Time]
       NTP=time.cloudflare.com

2. Restart the systemd-timesyncd service.

       systemctl restart systemd-timesyncd

### [ntpd](https://linux.die.net/man/5/ntp.conf)

1. Add `time.cloudflare.com` as a server in the configuration file on your system (e.g., `/etc/ntp.conf`)

       server time.cloudflare.com iburst

2. Restart the ntpd service.

       systemctl restart ntpd
