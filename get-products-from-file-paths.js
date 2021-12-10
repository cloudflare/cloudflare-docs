let data = "";

process.stdin.on("data", (chunk) => {
  data += chunk;
});

process.stdin.on("end", () => {
  let changedProducts = new Set();
  let transformedProducts = data.toString().trim().split(" ");
  transformedProducts.forEach((product) => {
    let splittedStr = product.split("/");
    const productName = splittedStr[1];

    if (splittedStr[0] === "developers.cloudflare.com" && !changedProducts.has(splittedStr[0])) {
      changedProducts.add("developers.cloudflare.com");
    }

    if (!changedProducts.has(productName)) {
      changedProducts.add(productName);
    }
  });

  let chandedProductsArr = [...changedProducts];

  chandedProductsArr.forEach((prod) => {
    process.stdout.write(`${prod}\n`);
  });

  process.exit(0);
});
