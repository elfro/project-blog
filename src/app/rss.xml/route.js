import RSS from 'rss';

import { BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';

export async function GET() {
  const site_url = 'http://localhost:3000';

  const allPosts = await getBlogPostList();

  const feedOptions = {
    title: `${BLOG_TITLE} Blog | RSS Feed`,
    description: 'Welcome to this blog posts!',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    pubDate: new Date(1707399026444),
  };

  const feed = new RSS(feedOptions);

  allPosts.map(post => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${site_url}/${post.slug}`,
      date: post.publishedOn,
    });
  });


  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}