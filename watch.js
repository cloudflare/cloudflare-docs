const chokidar = require("chokidar");
const fs = require("fs");
const args = process.argv.slice(2);
const product = args[0];

if (!product) {
  console.error(
    "You must provide a directory to watch. Run the develop script with yarn develop -- $product."
  );
  process.exit(1);
}

console.log(`Watching: products/${product}`);

const copyFile = (path) => {
  const newPath = path.substring(path.indexOf(`products/${product}/`));
  console.log(`${path} changed. Updating: .docs/${newPath}`);
  fs.copyFile(
    `products/${product}/${path}`,
    `products/${product}/.docs/${newPath}`,
    () => {
      console.log("File updated.");
    }
  );
};

chokidar
  .watch(`.`, {
    persistent: true,
    cwd: `products/${product}/`,
    ignored: [".docs", "node_modules"],
    ignoreInitial: true,
  })
  .on("add", (path) => {
    copyFile(path);
  })
  .on("change", (path) => {
    copyFile(path);
  });
