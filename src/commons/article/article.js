import React from "react";
import Img from "gatsby-image";
import "./article.scss";
const Article = ({ node }) => {
  const dateSplitted = node.dateGmt.split("T")[0].split("-");

  return (
    <article className={"article_container lg:w-1/2 p-5"}>
      <h2 className="middle-section__picture__title mb-1 mt-20 lg:mt-0">
        {node.title}
      </h2>
      <h3 className="article__date mb-5">{`${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`}</h3>
      <p dangerouslySetInnerHTML={{ __html: node.content }} />
      <Img
        fixed={node.featuredImage?.node?.uri}
        key={node.featuredImage?.node?.uri}
        className="ml-5"
      />
    </article>
  );
};

export default Article;
