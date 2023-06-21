---
pcx_content_type: reference
title: Increase logging for Railgun
weight: 1
---

# Increase logging for Railgun

{{<render file="_railgun-deprecation-notice.md">}}

When troubleshooting or testing the Railgun Listener, it may be necessary to raise the level of verbosity to capture more log data for debugging.

To increase logging, set the `log.level` within `railgun.conf` to `5` so that all events within the listener instance are captured during troubleshooting.

{{<Aside type="note" header="Note">}}

The Railgun service running on the server will also need to be restarted. For changes to take effect, open a terminal window and run the following command:

```sh
$ service railgun restart
```

{{</Aside>}}

The log files for Railgun can be found in the following locations for each supported operating system:

* **Debian/Ubuntu**

    Default Location: `/var/log/syslog`. When the `log.level` is set to `5` in `railgun.conf`, no further action is needed to have very verbose logs appear in syslog.

* **CentOS/RHEL**

    Default Location: `/var/log/messages`.

    By default, CentOS and RHEL omit many logs from `/messages`. A few extra steps are needed to achieve the same level of verbosity as Debian/Ubuntu:

    1.  Edit `/etc/rsyslog.conf` so that the line that reads `*.info;mail.none;authpriv.none;cron.none /var/log/messages` is updated to be `*.* /var/log/messages`. Comment out the default line and add this on a new line below it. Another option is to create a new log file.
    2.  Restart `rsyslog` and Railgun services. This may need to be done with `sudo` or as `root`:

        ```sh
        $ service rsyslog restart
        $ service railgun restart
        ```

        If Railgun or `memcached` fails/crashes, logs can be found under `/var/log/railgun/panic.log`.
