---
_build:
  publishResources: false
  render: never
  list: never
---

If you encounter a message on the dashboard indicating that your data is unavailable due to your account's Metadata Boundary configuration, this is because you are trying to access data that is not stored in your region (that is, you are in the US and trying to access data that is only stored in the EU, or vice versa). If you receive this error message while being in the region where your data is stored, there are two potential reasons why you might see this message:

- Your account has Customer Metadata Boundary (CMB) enabled, and your request is being directed to an incorrect region. For example, if you are in the EU and CMB is configured to store your data in the US.

- If you are trying to access your data from the correct region, such as being in the EU with CMB configured to save your data in the EU, the issue may be caused by network congestion. Typically, this problem resolves within a few minutes.
