---
order: 1000
type: example
summary: Personalize website styling based on localized user time.
tags:
  - Originless
  - Geolocation
pcx-content-type: configuration
---

# Geolocation: Custom Styling

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

let grads = [
  [{color:"00000c",position:0},{color:"00000c",position:0}],
  [{color:"020111",position:85},{color:"191621",position:100}],
  [{color:"020111",position:60},{color:"20202c",position:100}],
  [{color:"020111",position:10},{color:"3a3a52",position:100}],
  [{color:"20202c",position:0},{color:"515175",position:100}],
  [{color:"40405c",position:0},{color:"6f71aa",position:80},{color:"8a76ab",position:100}],
  [{color:"4a4969",position:0},{color:"7072ab",position:50},{color:"cd82a0",position:100}],
  [{color:"757abf",position:0},{color:"8583be",position:60},{color:"eab0d1",position:100}],
  [{color:"82addb",position:0},{color:"ebb2b1",position:100}],
  [{color:"94c5f8",position:1},{color:"a6e6ff",position:70},{color:"b1b5ea",position:100}],
  [{color:"b7eaff",position:0},{color:"94dfff",position:100}],
  [{color:"9be2fe",position:0},{color:"67d1fb",position:100}],
  [{color:"90dffe",position:0},{color:"38a3d1",position:100}],
  [{color:"57c1eb",position:0},{color:"246fa8",position:100}],
  [{color:"2d91c2",position:0},{color:"1e528e",position:100}],
  [{color:"2473ab",position:0},{color:"1e528e",position:70},{color:"5b7983",position:100}],
  [{color:"1e528e",position:0},{color:"265889",position:50},{color:"9da671",position:100}],
  [{color:"1e528e",position:0},{color:"728a7c",position:50},{color:"e9ce5d",position:100}],
  [{color:"154277",position:0},{color:"576e71",position:30},{color:"e1c45e",position:70},{color:"b26339",position:100}],
  [{color:"163C52",position:0},{color:"4F4F47",position:30},{color:"C5752D",position:60},{color:"B7490F",position:80},{color:"2F1107",position:100}],
  [{color:"071B26",position:0},{color:"071B26",position:30},{color:"8A3B12",position:80},{color:"240E03",position:100}],
  [{color:"010A10",position:30},{color:"59230B",position:80},{color:"2F1107",position:100}],
  [{color:"090401",position:50},{color:"4B1D06",position:100}],
  [{color:"00000c",position:80},{color:"150800",position:100}],
];

function toCSSGradient(hour)
{ 
  var css = "linear-gradient(to bottom, ";
  var data = grads[hour]
  var len = data.length;
   
  for (var i=0;i<len;i++)
  { 
     var item = data[i];
     css+= " #" + item.color + " " + item.position + "%";
     if ( i<len-1 ) css += ",";
  }
  return css + ")"; 
}

async function handleRequest(request) {
  let html_content = ""
  let html_style = `
  html{width:100vw; height:100vh;}
  body{padding:0; margin:0 !important;height:100%;}
  #container {
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color:white;
    font-family:sans-serif;
  }`

  const timezone = request.cf.timezone
  let localized_date = new Date(new Date().toLocaleString('en-US', {timeZone: timezone}))
  let hour = localized_date.getHours()
  let minutes = localized_date.getMinutes()

  html_content += "<h1>" + hour + ":"+ minutes + "</h1>"
  html_content += "<p>" + timezone + "<br/></p>"
  html_style += "body{background:"+toCSSGradient(hour)+";}"

  let html = `
<!DOCTYPE html>
<head>
  <title>Geolocation: Customized Design</title>
</head>
<body>
  <style> ${html_style}</style>
  <div id="container">
    ${html_content}
  </div>
</body>`

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },})
}
```
