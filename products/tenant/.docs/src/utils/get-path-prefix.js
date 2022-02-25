import { withPrefix } from "gatsby"

// Gatsby’s `<Link/>` component automatically applies the
// `pathPrefix` set in gatsby-config.js. However when
// constructing URLs manually, it can be useful to have
// direct access to the `pathPrefix`. Gatsby offers a
// method `withPrefix()` for this purpose, but this still
// doesn’t give you direct access to the value. Here, we
// "trick" `withPrefix` to giving us the value by passing
// in "/" and then trimming the "/" off of the end. Sadly
// you can’t just call `withPrefix("")` because that
// somewhat surprisingly returns "".
// See: https://www.gatsbyjs.com/docs/path-prefix/
export default () => withPrefix("/").slice(0, -1)
