import React from "react";
import { graphql } from "gatsby";
import logo from "../images/logo_brisa.webp";
import Navbar from "../commons/Navbar";
import Footer from "../commons/Footer";
import Article from "../commons/article/article";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { Helmet } from "react-helmet";
import { NavProvider } from "../context/NavContext";

const BlogPostTemplate = ({ data }) => (
  <main>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={data.wpPost.excerpt} />
      <meta
        name="google-site-verification"
        content="1PIQqEL0OgbiTPjG0fiPZ9rOcO30wM00ZIqtViP6IWo"
      />
      <meta
        name="keywords"
        content="musica lezioni online corsi pianoforte violino sassofono chitarra catania san gregorio strumenti musicali aci sant'antonio paesi etnei valverde aci catena corsi di musica associazione musicale conservatorio"
      />
      <title>{data.wpPost.title}</title>
    </Helmet>
    <GatsbySeo
      title={data.wpPost.title}
      description={data.wpPost.excerpt}
      canonical={`https://brisasonora.it/blog/${data.wpPost.title}`}
      openGraph={{
        url: `https://brisasonora.it/blog/${data.wpPost.title}`,
        title: data.wpPost.title,
        description: data.wpPost.excerpt,
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
        <Article node={data.wpPost} />
      </section>
      <Footer />
    </NavProvider>
  </main>
);
export default BlogPostTemplate;
export const query = graphql`
  query ($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "DD/MM/YYYY")
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          uri
        }
      }
    }
  }
`;
