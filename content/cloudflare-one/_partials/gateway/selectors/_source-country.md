---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a country, enter its [ISO 3166-1 Alpha-2 code](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                       | API example              | Evaluation phase      |
| ----------------------------- | ------------------------ | --------------------- |
| Source Country IP Geolocation | `$1.geo.country == "RU"` | Before DNS resolution |
