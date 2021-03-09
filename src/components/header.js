import { StaticQuery, graphql, Link } from "gatsby"
import React from "react"

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        wp {
          generalSettings {
            title
            description
          }
        }
        allWpMenuItem(filter: {menu: {node: {name: {eq: "main"}}}}){
          edges{
            node{
              label
              url
            }
          }
        }
      }
    `}
    render={data => (
      <header
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
            display: `flex`,
            justifyContent: `space-between`,
            alignItems: `center`,
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {data.wp.generalSettings.title}
            </Link>
          </h1>
          <ul style={{ listStyle: `none`, display: `flex`, margin: 0 }}>
            {data.allWpMenuItem.edges.map(item => (
              <li key={item.node.url} style={{ margin: `0 10px` }}>
                <Link
                  to={`${item.node.url}`}
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                    fontFamily: `sans-serif`,
                  }}
                >
                  {item.node.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    )}
  />
)
export default Header