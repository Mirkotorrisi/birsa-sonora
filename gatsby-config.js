module.exports = {
  siteMetadata: {
    siteUrl: "https://brisasonora.it",
    title: "Brisa Sonora",
    author: `@brisasonora`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-next-seo",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://brisasonora.it",
        sitemap: "https://brisasonora.it/sitemap/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // Specify the URL of the WordPress source
        url: `http://mirkotorrisi.altervista.org/graphql`,
        protocol: `http`,
        // Indicates if a site is hosted on WordPress.com
        hostingWPCOM: false,
        // Specify which URL structures to fetch
        includedRoutes: ["**/posts", "**/tags", "**/categories"],
        options: {
          // I have created a dummy site for us to use with the plugins we discussed
          baseUrl: "mirkotorrisi.altervista.org",
          protocol: "https",
          hostingWPCOM: false,
          // We will be using some advanced custom fields
          useACF: true,
          acfOptionPageIds: [],
          verboseOutput: false,
          perPage: 100,
          searchAndReplaceContentUrls: {
            sourceUrl: "https://www.mirkotorrisi.altervista.org",
            replacementUrl: "https://localhost:8000",
          },
          // Set how many simultaneous requests are sent at once.
          concurrentRequests: 10,
          includedRoutes: [
            "**/categories",
            "**/posts",
            "**/pages",
            "**/media",
            "**/tags",
            "**/taxonomies",
            "**/users",
          ],
          excludedRoutes: [],
          normalizer: function ({ entities }) {
            return entities;
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/logo_brisa.webp",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
};
