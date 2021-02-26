import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
const BlogPostTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.wpPost.title} description={data.wpPost.excerpt} />
    <h1>{data.wpPost.title}</h1>
    <p>
      Written by {data.wpPost.author.node.name} on {data.wpPost.date}
    </p>
    <Img src={data.wpPost.featuredImage.node.sourceUrl} alt={data.wpPost.featuredImage.node.altText} style={{ maxHeight: 450 }} />
    <div style={{ marginTop: 20 }} dangerouslySetInnerHTML={{ __html: data.wpPost.content }} />
  </Layout>
)
export default BlogPostTemplate
export const query = graphql`
  query($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        node {
          name
        }
      }
      featuredImage {
      node {
        srcSet
        sourceUrl
        sizes
        altText
      }
    }
    }
  }
`