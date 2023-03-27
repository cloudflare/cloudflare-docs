---
_build:
  publishResources: false
  render: never
  list: never
---

## Before you begin

### Supported platforms

Keyless has been tested on `amd64` and `arm` architectures. The key server binary will likely run on all architectures that Go supports. Code support may exist for other CPUs too, but these other architectures have not been tested.

In addition to running on bare metal, the key server should run without issue in a virtualized or containerized environment. Care will need to be taken to configure ingress access to the appropriate TCP port and file system access to private keys (if using filesystem storage).

### Supported operating systems

You will need to be running a supported operating system (OS) to run Keyless. Supported operating systems include:

- Ubuntu 12.04.5 LTS, 14.04 LTS, 15.10, 16.04, 17.10
- Debian 7, 8, 9
- RHEL and CentOS 6, 7
- Amazon Linux 1, 2

We strongly recommend that you use an operating system still supported by the vendor (still receiving security updates) as your key server will have access to your private keys.