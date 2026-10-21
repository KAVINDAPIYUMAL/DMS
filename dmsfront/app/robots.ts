import type { MetadataRoute } from 'next';

/**
 * robots.txt — Controls search engine crawling.
 * This is a government internal portal, so we disallow all crawling.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  };
}
