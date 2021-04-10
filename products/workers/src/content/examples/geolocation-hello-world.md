---
order: 1000
type: example
summary: Get all geolocation data fields and display them in HTML.
tags:
  - HTML
  - Geolocation
---

# Geolocation: Hello World

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let html_content = ""
  let html_style = "body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}"

  html_content += "<p> Colo: " + request.cf.colo + "</p>"
  html_content += "<p> Country: " + request.cf.country + "</p>"
  html_content += "<p> City: " + request.cf.city + "</p>"
  html_content += "<p> Continent: " + request.cf.continent + "</p>"
  html_content += "<p> Latitude: " + request.cf.latitude + "</p>"
  html_content += "<p> Longitude: " + request.cf.longitude + "</p>"
  html_content += "<p> PostalCode: " + request.cf.postalCode + "</p>"
  html_content += "<p> MetroCode: " + request.cf.metroCode + "</p>"
  html_content += "<p> Region: " + request.cf.region + "</p>"
  html_content += "<p> RegionCode: " + request.cf.regioncode + "</p>"
  html_content += "<p> Timezone: " + request.cf.timezone + "</p>"

  let html = `
<!DOCTYPE html>
<body>
  <head>
    <title> Geolocation: Hello World </title>
    <style> ${html_style} </style>
  </head>
  <h1>Geolocation: Hello World!</h1>
  <p>You now have access to geolocation data about where your user is visiting from.</p>
  ${html_content}
</body>`

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },})
}
```
