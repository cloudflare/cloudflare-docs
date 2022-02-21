import React from "react"
import {useStaticQuery, graphql} from "gatsby"

import "../css/components/product-grid.css"

// Query to get all the products that are sourced from the current-products-list.js file

const useProducts = () => {

  const result = useStaticQuery(graphql`
    query {
      allProduct(sort: { fields: [title], order: ASC }) {
        nodes {
          title
          path
          logoSVGContent
          wrap
          href
        }
      }
    }
    `
    )
 return result
}


const ProductGridLink = ({ product }) => (
  <a className="ProductGrid--link" data-wrap-title={product.wrap} href={product.href || `https://developers.cloudflare.com/${product.path}`}>
    <div dangerouslySetInnerHTML={{__html: product.logoSVGContent}} />
    <span>{product.title}</span>
  </a>
)

const ProductGridColumns = ({ numColumns }) => {
  const productsData = useProducts()
  let products = productsData.allProduct.nodes

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
      <ProductGridColumns numColumns={4}/>
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
