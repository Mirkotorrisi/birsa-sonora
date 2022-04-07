import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import Img from "gatsby-image";
import Navbar from "../commons/Navbar";
import Footer from "../commons/Footer";
import { Helmet } from "react-helmet";
import logo from "../images/logo_brisa.webp";
import { NavProvider } from "../context/NavContext";
import "../commons/article/article.scss";

export default ({ data }) => {
  console.log(data.allWpPost.edges);
  return (
    <main>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v13.0&appId=73794053396&autoLogAppEvents=1"
        nonce="TMMP1UPy"
      ></script>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Brisa Sonora corsi di musica, lezioni di pianoforte, chitarra, violino, sassofono a Catania. associazione musicale."
        />
        <meta
          name="google-site-verification"
          content="1PIQqEL0OgbiTPjG0fiPZ9rOcO30wM00ZIqtViP6IWo"
        />
        <meta
          name="keywords"
          content="musica lezioni online corsi pianoforte violino sassofono chitarra catania san gregorio strumenti musicali aci sant'antonio paesi etnei valverde aci catena corsi di musica associazione musicale conservatorio"
        />
        <title>Brisa Sonora</title>
      </Helmet>
      <GatsbySeo
        title="BrisaSonora lezioni di musica"
        description="Articoli e news sulla musica. Lezioni di musica. Video didattici. Tutorial per leggere uno spartito, suonare il pianoforte, riconoscere le note su una tastiera. Impara a suonare con noi!"
        canonical="https://brisasonora.it/"
        openGraph={{
          url: "https://brisasonora.it",
          title:
            "Blog di BrisaSonora - Video e articoli per conoscere la musica",
          description:
            "Articoli sulla musica. Lezioni di musica. Video didattici. Tutorial per leggere uno spartito, suonare il pianoforte, riconoscere le note su una tastiera.",
          images: [
            {
              url: logo,
              width: 800,
              height: 600,
              alt: "Logo BrisaSonora",
            },
          ],
          locale: "it_IT",
          language: "it",
          site_name: "BrisaSonora",
        }}
        twitter={{
          handle: "@handle",
          site: "@brisasonora",
          cardType: "summary_large_image",
        }}
      />
      <NavProvider>
        <Navbar />
        <section className="blog w-full h-full  flex items-center justify-between flex-col">
          <h1 className="hero-section__title mt-36">
            Contenuti didattici di BrisaSonora
          </h1>
          <ul
            style={{ listStyle: "none" }}
            className="article_container lg:w-1/2 p-5 mt-24"
          >
            {data.allWpPost.edges.map((post) => (
              <li
                style={{ padding: "20px 0", borderBottom: "1px solid #eeeeee" }}
              >
                <Link
                  to={`/post/${post.node.slug}`}
                  style={{
                    display: "flex",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <Img
                    fixed={post.node.featuredImage?.node?.uri}
                    alt={post.node.title}
                  />
                  <div>
                    <h2 className="middle-section__picture__title mb-1 mt-20 lg:mt-0">
                      {post.node.title}
                    </h2>
                    <h3 className="article__date mb-5">{post.node.date}</h3>

                    <div
                      dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </NavProvider>
    </main>
  );
};
export const pageQuery = graphql`
  query {
    allWpPost(sort: { order: DESC, fields: date }) {
      edges {
        node {
          slug
          id
          featuredImage {
            node {
              uri
            }
          }
          date(formatString: "DD/MM/YYYY")
          title
          content
          comments {
            nodes {
              author {
                node {
                  name
                }
              }
              content
            }
          }
          excerpt
        }
      }
    }
  }
`;
