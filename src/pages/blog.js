import React from "react";
import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import Article from "../commons/article/article";
import Navbar from "../commons/Navbar";
import Footer from "../commons/Footer";
import { Helmet } from "react-helmet";
import logo from "../images/logo_brisa.webp";
import { NavProvider } from "../context/NavContext";

export default ({ data }) => {
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
          {data.allWpPost.edges.map(({ node }) => {
            console.log(
              "🚀 ~ file: blog.js ~ line 69 ~ {data.allWpPost.edges.map ~ node",
              node
            );
            return <Article node={node} />;
          })}
        </section>
        <Footer />
      </NavProvider>
    </main>
  );
};
export const pageQuery = graphql`
  query {
    allWpPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          comments {
            nodes {
              content
              author {
                node {
                  name
                }
              }
            }
          }
          content
          dateGmt
          featuredImage {
            node {
              uri
            }
          }
        }
      }
    }
  }
`;
