import React from "react"

import "../css/product-grid.css"

const $ = {}
$["access"]               = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/access.js").pathD
$["argo-tunnel"]          = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/argo-tunnel.js").pathD
$["gateway"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/gateway.js").pathD
$["warp-client"]          = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/warp-client.js").pathD

const products = [
  {
    title: "Access",
    path: "access",
    icon: "access",
  },
  {
    title: "Argo Tunnel",
    path: "argo-tunnel",
    icon: "argo-tunnel",
  },
  {
    title: "Gateway",
    path: "gateway",
    icon: "gateway",
  },
  {
    title: "WARP Client",
    path: "warp-client",
    icon: "warp-client",
  },
]

const ProductGridLink = ({ product }) => (
  <a className="ProductGrid--link" data-wrap-title={product.wrap} href={product.href || `http://developers.cloudflare.com/${product.path}`}>
    <svg viewBox="0 0 48 48"><path d={$[product.icon]}/></svg>
    <span>{product.title}</span>
  </a>
)

const ProductGridColumns = ({ numColumns }) => {
  const itemsPerColumn = Math.ceil(products.length / numColumns)

  const columns = []
  let n = 0
  for (let i = 0; i < numColumns; i += 1) {
    columns.push([])

    for (let j = 0; j < itemsPerColumn; j += 1) {
      if (n >= products.length) {
        break;
      }
      columns[i].push(products[n])
      n += 1
    }
  }

  return (
    <React.Fragment>
      {columns.map((products, i) => (
        <div key={i} className="ProductGrid--column">
          {products.map((product, j) => (
            <ProductGridLink key={j} product={product}/>
          ))}
        </div>
      ))}
    </React.Fragment>
  )
}

const ProductGrid = () => (
  <div className="ProductGrid">
    <div className="ProductGrid--content" data-columns="4">
      <ProductGridColumns numColumns={2}/>
    </div>
    <div className="ProductGrid--content" data-columns="3">
      <ProductGridColumns numColumns={3}/>
    </div>
    <div className="ProductGrid--content" data-columns="2">
      <ProductGridColumns numColumns={2}/>
    </div>
    <div className="ProductGrid--content" data-columns="1">
      <ProductGridColumns numColumns={1}/>
    </div>
  </div>
)

export default ProductGrid
