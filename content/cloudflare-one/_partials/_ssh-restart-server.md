---
_build:
  publishResources: false
  render: never
  list: never
---

Once you have modified your SSHD configuration, you still need to restart the SSH service on the remote machine. 

Commands are also provided below for servers running systemd. You can execute both commands.

### Debian/Ubuntu

  ```sh
  $ sudo service ssh restart
  $ sudo systemctl restart ssh
  ```

### CentOS/RHEL

  ```sh
  $ sudo service sshd restart
  $ sudo systemctl restart sshd
  ```