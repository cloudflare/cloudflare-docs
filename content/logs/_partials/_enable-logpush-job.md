---
_build:
  publishResources: false
  render: never
  list: never
---

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).

2. Select the Enterprise account or domain you want to use with Logpush.

3. Go to **Analytics & Logs** > **Logs**.

4. Select **Add Logpush job**.

5. In **Select data set**, choose the dataset to push to a storage service, and select **Next**.

6. In **Select data fields**:
    - Select the data fields to include in your logs. Add or remove fields later by modifying your settings in **Logs** > **Logpush**. 
    - In **Advanced Settings**, you can change the Timestamp format (`RFC3339`(default),`Unix`, or `UnixNano`), [Sampling rate](/logs/get-started/api-configuration/#sampling-rate) and enable redaction for `CVE-2021-44228`.
    - Under **Filters** you can select the events to include and/or remove from your logs. For more information, refer to [Filters](/logs/reference/filters/). Not all datasets have this option available.