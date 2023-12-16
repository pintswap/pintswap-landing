/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://pintswap.exchange',
  generateRobotsTxt: true, // (optional)
  // ...other options
};
