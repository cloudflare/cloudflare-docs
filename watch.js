const chokidar = require("chokidar");
const fs = require("fs");
const args = process.argv.slice(2);
const product = args[0];

if (!product) {
  console.error(
    "You must provide a directory to watch. Run the develop script with npm run develop -- $product."
  );
  process.exit(1);
}

console.log(`Watching: products/${product}/src/content/`);

chokidar
  .watch(`src/content/`, {
    persistent: true,
    cwd: `products/${product}/`,
  })
  .on("change", (path) => {
    const newPath = path.substring(path.indexOf(`products/${product}/`));
    console.log(`${path} changed. Updating: .docs/${newPath}`);
    fs.copyFile(
      `products/${product}/${path}`,
      `products/${product}/.docs/${newPath}`,
      () => {
        console.log("File updated.");
      }
    );
  });
