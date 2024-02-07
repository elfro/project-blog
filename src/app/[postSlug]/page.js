import React from 'react';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';

import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';

const DivisionGroupsDemo = dynamic(
  () => import('../../components/DivisionGroupsDemo'),
  {
    loading: Spinner
  }
);

export async function generateMetadata({params}) {
  const {frontmatter: { title, abstract }} = await loadBlogPost(params.postSlug);

  return {
    title,
    description: abstract,
  }
}
async function BlogPost({params}) {
  const postData = await loadBlogPost(params.postSlug);

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
            pre: CodeSnippet
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
