import React from 'react';
import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import Spinner from '@/components/Spinner';

import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';
import { NOT_FOUND_METADATA } from '@/constants';

const DivisionGroupsDemo = dynamic(
  () => import('../../components/DivisionGroupsDemo'),
  {
    loading: Spinner
  }
);

const CircularColorsDemo = dynamic(
  () => import('../../components/CircularColorsDemo'),
  {
    loading: Spinner
  }
);

export async function generateMetadata({params}) {
  const postData = await loadBlogPost(params.postSlug);

  if (!postData) {
    // workaround to overcome the Next issue: metadata from not-found.js doesn't come
    return NOT_FOUND_METADATA;
  }

  const {frontmatter: { title, abstract }} = postData;

  return {
    title,
    description: abstract,
  }
}
async function BlogPost({params}) {
  const postData = await loadBlogPost(params.postSlug);

  if (!postData) {
    notFound();
  }

  const {frontmatter: { title, publishedOn}, content} = postData;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            DivisionGroupsDemo,
            CircularColorsDemo,
            pre: CodeSnippet
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
