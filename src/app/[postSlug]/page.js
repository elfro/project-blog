import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

import BlogHero from '@/components/BlogHero';
import PageTableContent from '@/components/PageTableContent';

import COMPONENT_MAP from '@/helpers/mdx-components';
import { loadBlogPost } from '@/helpers/file-helpers';
import { NOT_FOUND_METADATA } from '@/constants';

import styles from './postSlug.module.css';

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

  const {frontmatter: { title, publishedOn}, headings, content} = postData;

  return (
        <article className={styles.wrapper}>
          <PageTableContent
            className={styles.menu}
            title='Content'
            contentLinks={headings}
          />
          <BlogHero
            title={title}
            publishedOn={publishedOn}
            className={styles.hero}
          />
          <div className={styles.page}>
            <MDXRemote
              source={content}
              components={COMPONENT_MAP}
            />
          </div>
        </article>
  );
}

export default BlogPost;
