---
_build:
  publishResources: false
  render: never
  list: never

name: "Use an isolated PID namespace for containers"
sort_date: "2026-04-01"
enable_date: "2026-04-01"
enable_flag: "containers_pid_namespace"
disable_flag: "no_containers_pid_namespace"
---

When `containers_pid_namespace` is set, containers will use an isolated PID namespace. The `ENTRYPOINT` of your container will have PID 1.

When unset, the container shares the PID namespace with the virtual machine (VM) containing the container. The `ENTRYPOINT` of your container will _not_ have PID 1 and other processes running on the VM (that are not part of your container) will be visible.
