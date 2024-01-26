---
_build:
  publishResources: false
  render: never
  list: never
---

2. Use the following command to change directories to the SSH configuration directory on the remote target machine:

    ```sh
    $ cd /etc/ssh
    ```

3. Once there, you can use the following command to both generate the file and open a text editor to input/paste the public key.

    ```sh
    $ vim ca.pub
    ```

4. In the `ca.pub` file, paste the public key without any modifications.

    The `ca.pub` file can hold multiple keys, listed one per line. Empty lines and comments starting with `#` are also allowed.

5. Save the `ca.pub` file. In some systems, you may need to use the following command to force the file to save depending on your permissions:

    ```bash
    :w !sudo tee %
    :q!
    ```
