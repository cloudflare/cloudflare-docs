---
title: Read-only environments
pcx_content_type: reference
weight: 4
---

# Read-only environments

When an environment is read-only, any versions deployed to this environment will permanently become read-only. This setting protects sensitive environments from accidental changes.

For example, **Production** is a read-only environment by default. This setting prevents another member of your account from accidentally editing the version associated with your live traffic.

For similar reasons, some organizations may make **Staging** a read-only environment. Otherwise, another member of your account could make changes to a version in **Staging** *after* your organization has performed the validation tests prior to promoting to **Production**. Without having a read-only **Staging** environment, this change could be released into **Production** without testing and might cause an issue with live traffic.

To change the read-only status of an environment, [edit the environment](/version-management/how-to/environments/#edit-environment).
