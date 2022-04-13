import React from "react";
import Img from "gatsby-image";
import "./article.scss";
import { graphql, Link } from "gatsby";

const Article = ({ node }) => {
  return (
    <article className={"article_container lg:w-1/2 p-5 mt-24"}>
      <Link
        to={`/blog`}
        style={{
          display: "flex",
          color: "black",
          textDecoration: "none",
        }}
      >
        <h3>Indietro</h3>
      </Link>{" "}
      <h2 className="middle-section__picture__title mb-1 mt-20 lg:mt-0">
        {node.title}
      </h2>
      <h3 className="article__date mb-5">{node.date}</h3>
      <div
        class="article__content"
        dangerouslySetInnerHTML={{ __html: node.content }}
      />
      <Img
        fixed={node.featuredImage?.node?.uri}
        key={node.featuredImage?.node?.uri}
        className="ml-5"
      />
    </article>
  );
};

export default Article;
