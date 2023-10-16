---
_build:
  publishResources: false
  render: never
  list: never
---

The following procedure makes two changes to the `sshd_config` file on the remote target machine. The first change requires that you uncomment a field already set in most default configurations; the second change adds a new field.

1. While staying within the `/etc/ssh` directory on the remote machine, open the `sshd_config` file.

   ```sh
   $ vim /etc/ssh/sshd_config
   ```

2. Go to the row named `PubkeyAuthentication`. In most default configurations, the row will appear commented out as follows:

   ```bash
   # PubkeyAuthentication yes
   ```

3. Remove the # symbol to uncomment the line; keep the setting `yes` enabled.

4. Next, add a new line below `PubkeyAuthentication` as follows:

   ```bash
   TrustedUserCAKeys /etc/ssh/ca.pub
   ```

   Save the file and quit the editor. You might need to use the following command again to save and exit.

   ```bash
   :w !sudo tee %
   :q!
   ```
