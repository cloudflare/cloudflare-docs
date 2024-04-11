---
title: Price scraping
pcx_content_type: configuration
demo: https://pricing.httpmachine.com/
weight: 1
---

# Price scraping template

You can use the templates below to provide your users with a demo application in [Workers](/workers/) where product details are shown, but pricing information is not revealed until the Turnstile widget is solved.

## Worker scripts

The script below is applied on the root path `<YOUR-HOSTNAME-HERE>/ }}` and serves a page where the Turnstile widget will be embedded.

{{<tabs labels="js">}}
```js
---
playground: true
---
const someHTML = `
<head>
   <title>Turnstile Price Scraping Demo</title>
   <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" async defer></script>
   <script src="<YOUR-HOSTNAME-HERE>/pricing.js"></script>
</head>
<body>
   <h3>Pricing:</h3>
   <div id="price-box"></div>
   <div class="cf-turnstile" id="price-widget"></div>
</body>
`

export default {
 async fetch(request, env, ctx) {
   let returnHTMLResponse = new Response(someHTML);
   returnHTMLResponse.headers.set('content-type','text/html')
   return returnHTMLResponse
 },
};
```
{{</tabs>}}

The script below is applied on the route `<YOUR-HOSTNAME-HERE>/pricing.js` and returns a client script which embeds the Turnstile widget.

{{<tabs labels="js">}}
```js
---
playground: true
---
const clientScript = `
async function getPrice(token){
   // the endpoint for retrieving pricing information
   const priceInfoURL = "/get-price"
   // the element id we are appending our price information
   const priceBox = document.getElementById('price-box');
  
   // await response from pricing endpoint protected by Turnstile Server-Side Validation
   const response = await fetch(
       priceInfoURL, {
           headers : {
               'cf-token' : token
           }
       }
   );
   // await price information from pricing endpoint
   const price = await response.json();
   // set the pricing information to what’s returned in the callback
   priceBox.innerText = price.pricing
}
function init(){
   window.onloadTurnstileCallback = function () {
       turnstile.render('#price-widget', {
           sitekey: '<YOUR-SITEKEY-GOES-HERE>',
           callback: function(token) {
               getPrice(token)
           },
       });
   };
}
window.addEventListener ?
window.addEventListener("load", init, false) :
window.attachEvent && window.attachEvent("onload", init)
`
 export default {
   async fetch(request, env, ctx) {
       if(clientScript == null || undefined){
           let response = new Response("// sorry no script available!")
           const { headers } = response;
           headers.append('content-type', 'application/javascript');
           return response;
       } else {
           let response = new Response(clientScript);
           const { headers } = response;
           headers.append('content-type', 'application/javascript');
           return response;


       }

   }

};
```
{{</tabs>}}

The script below is applied on the route `<YOUR-HOSTNAME-HERE>/get-price`, and verifies the Turnstile token and returns an API or JSON pricing response.

{{<tabs labels="js">}}
```js
---
playground: true
---
// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = '<SECRET-KEY>';

async function handlePost(request) {

   const token = request.headers.get('cf-token');
   const ip = request.headers.get('CF-Connecting-IP');

   // Validate the token by calling the
   // "/siteverify" API endpoint.
   let formData = new FormData();
   formData.append('secret', SECRET_KEY);
   formData.append('response', token);
   formData.append('remoteip', ip);

   const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
   const result = await fetch(url, {
       body: formData,
       method: 'POST'
   });

   const outcome = await result.json();

   // this is the conditional block that you can customize to fit your specific use-case
   if (outcome.success) {

       // successful token validation logic

       // this example uses a static variable, but using KV you could reference a catalog listing
       let response = new Response('{"pricing":"$99.99"}');
       response.headers.append("content-type", "application/json");
       return response;

   } else {

       // unsuccessful token validation logic

       let response = new Response('{"pricing":"$XX.XX"}')
       response.headers.append("content-type", "application/json");
       return response;

   }

}

export default {
 async fetch(request, env, ctx) {
   try {
     return await handlePost(request)
   } catch(error){
     return new Response(`{"err":"${error}"}`);
   }
 },
};
```
{{</tabs>}}