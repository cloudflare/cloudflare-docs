import React from "react"

import "../css/product-list.css"

const $ = {}
$["warp-client"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/warp-client.js").pathD

const products = [
  {
    title: "WARP Client",
    path: "warp-client",
    icon: "warp-client",
  },
]

const ProductList = () => (
  <div className="ProductList">
    {products.map((product, j) => (
      <a className="ProductList--link" key={j} data-wrap-title={product.wrap} href={product.href || `http://developers.cloudflare.com/${product.path}`}>
        <svg viewBox="0 0 48 48"><path d={$[product.icon]}/></svg>
        <span>{product.title}</span>
      </a>
    ))}
  </div>
)

export default ProductList
