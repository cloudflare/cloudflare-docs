---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

The country that the request is destined for. Geolocation is determined from the target IP address. To specify a country, enter its [ISO 3166-1 Alpha 2 code](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Destination Country IP Geolocation | `$1.geo.country == "RU"` |