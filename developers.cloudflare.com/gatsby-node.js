import  {products} from "../developers.cloudflare.com/current-products-list"
// const products = require("../developers.cloudflare.com/current-products-list.js")

// See: https://www.gatsbyjs.org/docs/node-apis/

// https://www.gatsbyjs.org/docs/add-custom-webpack-config/
exports.onCreateWebpackConfig = ({
  getConfig,
  actions,
  plugins,
}) => {
  const config = getConfig()

  // Hides "[HMR] ..." logs in devtools
  if (config.entry.commons) {
    config.entry.commons = config.entry.commons.map(path => (
      // Add query param to entry added by Gatsby CLI https://git.io/JvAC5
      path.indexOf('/webpack-hot-middleware/client.js?') > -1 ?
        path + '&quiet=true' : path
    ))
  }

  actions.replaceWebpackConfig(config)

  actions.setWebpackConfig({
    plugins: [
      // Hides React Devtools advertisement in devtools
      // https://tinyurl.com/hide-react-devtools-advert
      plugins.define({
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })"
      })
    ]
  })
}


const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type.toLowerCase() === "mdx") {
    const value = createFilePath({ node, getNode }).replace(/(.+)(\/)$/, "$1")

    createNodeField({
      name: "slug",
      node,
      value
    })
  }
}

exports.sourceNodes = ({actions, createContentDigest, createNodeId}) => {
  console.log('foreach',products)
  const {  createNode  } = actions

   products.forEach((product) => {
     if(product.icon !== undefined) {
        fs.readFile(`../products/${product.icon}/src/content/icons/${product.icon}.svg` , 'utf8',(err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let dataStr = data.toString()

        createNode({
          id: createNodeId(`${product.icon}`),
          title:product.title,
          path: product.path,
          //  pathD: require(`./data/cloudflare-brand-assets/resources/product-icons/${product.icon}`).pathD,
          //  icon: require(`../products/${product.icon}/src/icons/${product.icon}`),
          logoSVGContent: dataStr,
          wrap: product.wrap ? product.wrap : false,
          internal: {
             type: 'typeProduct',
             contentDigest: createContentDigest(product),
           },
         })
      })
     }
  })
}





const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              type
              order
              hidden
              hideChildren
              breadcrumbs
            }
            headings(depth: h1) {
              value
              depth
            }
            tableOfContents
            parent {
              ... on File {
                modifiedTime(formatString: "YYYY-MM-DD")
                relativePath
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('ERROR: Loading "createPages" query')
  }

  const pages = result.data.allMdx.edges

  pages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/components/mdx-custom-renderer.js"),
      context: node
    })
  })
}

// We implement type definitions in order to prevent
// Gatsby from erroring that it can’t infer the type
// of a GraphQL-queried frontmatter property when
// there are no md(x) files currently using it.
// https://www.gatsbyjs.org/docs/schema-customization/#creating-type-definitions
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      demo: String
      breadcrumbs: Boolean
      difficulty: String
      hidden: Boolean
      hideChildren: Boolean
      order: Int
      summary: String
      tags: [String]
      title: String
      type: String
      updated: Date @dateformat
    }

    type Site {
      pathPrefix: String
    }
  `

  createTypes(typeDefs)
}
