const {products} = require('./developers.cloudflare.com/current-products-list')
const fs = require("fs");
const path = require("path");

// In root product-icons folder, SVG files will be generated from the docs-config.js folder from each product
// To regenerate icons: yarn generate:icons

if (!fs.existsSync(path.join(__dirname, "./product-icons", "utf8"))) {
  fs.mkdirSync("./product-icons", { recursive: true }, (err) => {
    if(err) {
      console.log('error during product folder creation', err)
    }
  });
}

for (let i = 0; i < products.length; i++) {
  const productObject = products[i]

  const product = require(`./products/${productObject.icon}/docs-config.js`)
  if (typeof product.logoSVGContent === "undefined") {
    console.log(`product ${product.product} has no logoSVGContent`);
    continue;
  }
  console.log("creating SVG icon", product.productIconKey);
  fs.writeFileSync(
    `./product-icons/${product.productIconKey}.svg`,
    product.logoSVGContent.toString()
  );
}
