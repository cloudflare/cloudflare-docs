import sparrow from '@cloudflare/util-sparrow';

// These keys are fine to be exposed publicly 
let stagingKey = "f2c3f386e64d4e89bcbe32f273aa83eb"
let productionKey = "ab1cea39a1d94652aa2a2ce1f42275ae"
let keyToUse;

// Based on current environment, send events to the correct location
let hostname = window.location.hostname

if (hostname === "developers.cloudflare.com") {
  keyToUse = productionKey;
} else {
  keyToUse = stagingKey
}

export function init() {

sparrow.init({
    sourceKey: keyToUse
});

sparrow.sendEvent("pageview", {
    page: window.location.pathname,
  });

}