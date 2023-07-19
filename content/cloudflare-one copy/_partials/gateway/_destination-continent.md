---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

The continent where the request is destined. Geolocation is determined from the target IP address. To specify a continent, enter its two-letter code into the **Value** field:

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
| Destination Continent IP Geolocation | `$1.geo.continent == "EU"` |