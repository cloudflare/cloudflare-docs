---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: API_param
---

Use this selector to match against custom indicator feeds. To enable this selector, a designated third-party vendor must assign a custom indicator feed to your account.

| UI name         | API example         | Evaluation phase      |
| --------------- | ------------------- | --------------------- |
| Indicator Feeds | `$1.indicator_feed` | Before DNS resolution |
