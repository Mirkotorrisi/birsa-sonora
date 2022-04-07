/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// You can delete this file if you're not using it
const path = require(`path`);
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const BlogPostTemplate = path.resolve("./src/templates/blogPost.js");
  const result = await graphql(`
    query MyQuery {
      allWpPost {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const BlogPosts = result.data.allWpPost.edges;
  BlogPosts.forEach((post) => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.id,
      },
    });
  });
};
