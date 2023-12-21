---
_build:
  publishResources: false
  render: never
  list: never
---

Once you have modified your SSHD configuration, restart the SSH service on the remote machine.

### Debian/Ubuntu

For older Debian/Ubuntu versions:

  ```sh
  $ sudo service ssh restart
  ```

For newer Debian/Ubuntu versions:

  ```sh
  $ sudo systemctl restart ssh
  ```

### CentOS/RHEL

For CentOS/RHEL 6 and older:

  ```sh
  $ sudo service sshd restart
  ```

For CentOS/RHEL 7 and newer:

  ```sh
  $ sudo systemctl restart sshd
  ```
