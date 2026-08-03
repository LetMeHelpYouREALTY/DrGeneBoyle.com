/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Eugene Boyle, Ph.D. — Research & Insights',
  author: 'Eugene Boyle, Ph.D.',
  headerTitle: 'Eugene Boyle',
  description:
    'Research briefs and answer-ready explainers from Eugene Boyle, Ph.D.—co-author of Motherhood reimagined (SMI & parenting), Managing Director at KLB Consultants, and Investment Director at Boyle Family Office.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://www.drgeneboyle.com',
  siteRepo: 'https://github.com/LetMeHelpYouREALTY/DrGeneBoyle.com',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.webp`,
  // Public contact until Cloudflare Email Routing is enabled for @drgeneboyle.com
  // (see docs/dns.md). After routing is live, switch to info@drgeneboyle.com.
  email: 'eboyle@fielding.edu',
  github: 'https://github.com/geneboyle',
  linkedin: 'https://www.linkedin.com/in/geneboyle/',
  // Unused networks intentionally omitted (no placeholder URLs).
  locale: 'en-US',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
