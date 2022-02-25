// SETUP
// ---
// $ cp -rf ../docs-hugo/migrate .
// $ cd migrate && pnpm i
// $ pnpm migrate

import { join } from 'node:path';

import * as normalize from './normalize';
import * as $ from './utils';

const { PRODUCTS, CONTENT, STATIC, DATA } = $;

const isMDX = /\.mdx?$/i;

$.log('~> creating empty directories');
await $.mkdir(DATA);
await $.mkdir(STATIC);
await $.mkdir(CONTENT).then(async () => {
  $.log('~> creating homepage product grid');

  let { products } = $.require(
    join($.SITE, 'current-products-list.js')
  );

  let grid = '';
  for (let obj of products) {
    let href = obj.href || `/${obj.path}/`;

    let item = `  {{<product-link title="${obj.title}" href="${href}"`;
    if (obj.wrap) item += ' wrap="true"';
    item += '>}}';

    let icon = join($.PRODUCTICONS, obj.icon + '.svg');
    item += '\n    ' + await $.read(icon, 'utf8');

    item += '\n  {{</product-link>}}';
    if (grid) grid += '\n\n';
    grid += item;
  }

  grid = grid.trim();

  await $.rm($.PRODUCTICONS, { recursive: true });

  let template = join($.__dirname, 'template.index.html');
  let index = await $.read(template, 'utf8');

  template = join($.__dirname, 'template.docs.html');
  let docs = await $.read(template, 'utf8');

  await $.write(
    join(CONTENT, '_index.html'),
    index.replace('{{~~GRID~~}}', grid)
  );

  await $.write(
    join(CONTENT, 'docs.html'),
    docs.replace('{{~~GRID~~}}', grid)
  );
});

await $.git(`add content`);
await $.git(`commit -m "create _index.html & docs.html"`);

// Move "products/*/src/content" ~> "content/**"
// Normalize "static|images" subdir location
// Convert "products/*/docs-config.js" ~> "data/*.yml"
await $.ls(PRODUCTS).then(async products => {
  await Promise.all(
    products.map(async name => {
      // ignore products/readme.md
      if (isMDX.test(name)) return;

      let src = join(PRODUCTS, name, 'src/content');
      let file = join(PRODUCTS, name, 'docs-config.js');

      if ($.exists(file)) {
        let output = join(DATA, name + '.yml');
        await normalize.product(file, output);

        $.log(`rm "products/${name}/docs-config.js"`);
        await $.rm(file);
      } else {
        console.warn('[WARN] Missing "products/%s/docs-config.js" file!', name);
      }

      if (!$.exists(src)) {
        return console.error('[ERRO] Missing "%s/src/content"', name);
      }

      let target = join(CONTENT, name);

      $.log(`cp -rf "products/${name}" "content/${name}"`);
      await $.cp(src, target, { recursive: true });

      $.log(`rm -rf "products/${name}"`);
      await $.rm(src, { recursive: true });

      let images = join(target, 'images');
      let statics = join(target, 'static');

      if ($.exists(images)) {
        if ($.exists(statics)) {
          console.warn('[WARN] Both "images" and "static" exist in "%s" content!', name);
        } else {
          $.log(`mv "content/${name}/images/**" "content/${name}/static/."`)
          await $.cp(images, statics, { recursive: true });
        }
      }
    })
  );

  // create "data/home.yml" file
  let target = join(DATA, 'home.yml');
  let file = join($.SITE, 'docs-config.js');
  await normalize.product(file, target);
  await $.rm(file);
});

await $.git(`add products content`);
await $.git(`commit -m "move products -> content"`);

await $.git(`add data developers.cloudflare.com`);
await $.git(`commit -m "migrate docs-configs -> data yaml"`);

// Touch all "content/**" files for code style
// ~> minimizes the commit diff for later work

await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.markdown(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "initial code style"`);

// Remove "content/docs-engine" product
await $.rm(
  join(CONTENT, 'docs-engine'),
  { recursive: true }
);

await $.git(`add content`);
await $.git(`commit -m "remove \"docs-engine\" content"`);

// ---
// Normalize markdown content
//   - if partial, apply hugo "ignore me" yaml
//   - ensure `title` in frontmatter
//   - normalize anchor link paths
//   - normalize image src paths
// ---

await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.content(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "normalize; fix links, images, frontmatter"`);

// rewrite MDX -> hugo partials
await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.mdx(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "mdx -> hugo partials"`);

await $.walk(CONTENT, {
  async task({ file }) {
    await normalize.imports(file);
  }
});

await $.git(`add content`);
await $.git(`commit -m "rewrite partial & component imports"`);

// index.md -> _index.md for content dirs w/ 1+ siblings
await $.walk(CONTENT, {
  async task({ name, dir, file, list }) {
    if (name !== 'index.md') return;
    let keep = list.filter(x => (
      !/^(index.md|static|images|media)$/.test(x)
      && (/\.md$/.test(x) || !/\w+\.\w+$/.test(x))
    ));
    if (keep.length > 0) {
      await $.cp(file, join(dir, '_index.md'));
      await $.rm(file);
    }
  }
});

await $.git(`add content`);
await $.git(`commit -m "rename list pages to _index.md"`);

// Copy over `robots.txt` file, w/ mods
await $.read(join($.SITE, 'static/robots.txt'), 'utf8').then(async raw => {
  // moving from ~tons~ of sitemaps -> one sitemap
  let index = raw.indexOf('Sitemap:');
  let keep = raw.substring(0, index);

  await $.write(
    join($.STATIC, 'robots.txt'),
    keep + `Sitemap: https://developers.cloudflare.com/sitemap.xml\n`
  );

  await $.git(`add static`);
  await $.git(`commit -m "import robots.txt file"`);
});

// --- others ---

await $.rm(PRODUCTS, { recursive: true });
await $.git(`add products`);
await $.git(`commit -m "rm -rf products"`);
