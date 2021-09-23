const concurrently = require("concurrently");
const { exec } = require("child_process");
const args = process.argv.slice(2);
const product = args[0];

concurrently(
  [
    {
      command: `products/${product}/node_modules/cloudflare-docs-engine/bin/commands.sh develop`,
      name: "GATSBY",
      prefixColor: "cyan",
    },
    {
      command: `node watch.js ${product}`,
      name: "WATCH",
      prefixColor: "magenta",
    },
  ],
  {
    killOthers: ["failure", "success"],
  }
).then(
  () => {
    console.log("success");
  },
  async () => {
    console.log(
      "There was an error running Gatsby in this directory. Try doing an npm install and npm bootstrap in the product directory first."
    );

    process.exit(1);
  }
);
