import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogTitle = styled.h3`
  margin-buttom: 20px;
  color: blue;
`

const IndexPage = ({ data }) => (
  <Layout>
    <div>
      <h1>Welcome to Bala's Blog</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return (
          <div key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                {node.frontmatter.title}-{node.frontmatter.date}
              </BlogTitle>
            </BlogLink>
            <p>{node.excerpt}</p>
          </div>
        )
      })}
      <Link to="/page-2">Go to Menu page</Link>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date
            title
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
      totalCount
    }
  }
`
