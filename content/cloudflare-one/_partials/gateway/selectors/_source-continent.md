---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a continent, enter its two-letter code into the **Value** field:

| Continent     | Code |
|---------------|------|
| Africa        | `AF` |
| Antarctica    | `AN` |
| Asia          | `AS` |
| Europe        | `EU` |
| North America | `NA` |
| Oceania       | `OC` |
| South America | `SA` |
| Tor network   | `T1` |

| UI name                         | API example                           | Evaluation phase      |
| ------------------------------- | ------------------------------------- | --------------------- |
| Source Continent IP Geolocation | `$1.geo.continent == "North America"` | Before DNS resolution |
