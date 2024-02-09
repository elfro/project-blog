import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
}
async function Home() {
  const posts = await getBlogPostList();

  return (
    <MaxWidthWrapper>
      <h1>Latest Content:</h1>

      {posts.map(post =>
        (<BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />)
      )}
    </MaxWidthWrapper>
  );
}

export default Home;
