/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/BlogPostTemplate.js")
  const PageTemplate = path.resolve("./src/templates/PageTemplate.js")
  const result = await graphql(`
    {
      allWpPost {
        edges {
          node {
            slug
            id
          }
        }
      }
      allWpPage {
        edges {
          node {
            slug
            id
            isFrontPage
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const Pages = result.data.allWpPage.edges
  Pages.forEach(page => {
  	console.log(page.node.slug)
    slg = `/${page.node.slug}`
    if(page.node.isFrontPage) {
      slg = '/'
    }
    createPage({
      path: slg,
      component: PageTemplate,
      context: {
        id: page.node.id,
      },
    })
  })
  const BlogPosts = result.data.allWpPost.edges
  BlogPosts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.id,
      },
    })
  })
}