---
pcx-content-type: reference
title: Increase logging for Railgun
weight: 23
---

# Increase logging for Railgun

When troubleshooting or testing the Railgun Listener, it may be necessary to raise the level of verbosity to capture more log data for debugging.

In order to increase logging, the `log.level` within `railgun.conf` should be set to **5** in order for all events within the Listener instance to be captured during troubleshooting.

{{<Aside>}}

**Note**: The Railgun service running on the server will also need to be restarted. For changes to take effect, input the following:

```sh
$ service railgun restart
```

{{</Aside>}}

The log files for Railgun can be found in the following locations for each supported operating system:

<details>
<summary>Debian/Ubuntu</summary>
<div>

Default Location: `/var/log/syslog`. When the `log.level` set to **5** in `railgun.conf`, no further action is needed to have very verbose logs appear in syslog.

</div>
</details>

<details>
<summary>CentOS/RHEL</summary>
<div>

Default Location: `/var/log/messages`.

By default, CentOS and RHEL omit many logs from `/messages`. A few extra steps are needed to achieve the same level of verbosity as Debian/Ubuntu:

1.  Editing `/etc/rsyslog.conf` so that the line that reads: `*.info;mail.none;authpriv.none;cron.none /var/log/messages` is updated to be: `*.* /var/log/messages`. Comment out the default line and add this on a new line below it. Another option is to create a new log file.
2.  Restarting `rsyslog` and Railgun services. This may need to be done with `sudo` or as `root`: `service rsyslog restart service railgun restart`. If Railgun or `memcached` fails over/crashes, logs can be found under `/var/log/railgun/panic.log`.

</div>
</details>
