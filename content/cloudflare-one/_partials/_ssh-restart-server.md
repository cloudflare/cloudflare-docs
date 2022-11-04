---
_build:
  publishResources: false
  render: never
  list: never
---

Once you have modified your SSHD configuration, you still need to restart the SSH service on the remote machine.

### Debian/Ubuntu

  ```sh
  # For older Debian/Ubuntu versions:
  $ sudo service ssh restart
  
  # For newer Debian/Ubuntu versions:
  $ sudo systemctl restart ssh
  ```

### CentOS/RHEL

  ```sh
  # For CentOS/RHEL 6 and older:
  $ sudo service sshd restart

  # For CentOS/RHEL 7 and newer:
  $ sudo systemctl restart sshd
  ```