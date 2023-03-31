---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a continent, enter its two-letter code into the **Value** field:

- AF – Africa
- AN – Antarctica
- AS – Asia
- EU – Europe
- NA – North America
- OC – Oceania
- SA – South America
- T1 – Tor network

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Source Continent IP Geolocation | `$1.geo.continent == "North America"` |