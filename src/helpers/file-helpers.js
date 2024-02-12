import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

export async function getBlogPostList() {
  const fileNames = await readDirectory('/content');

  const blogPosts = [];

  for (let fileName of fileNames) {
    const rawContent = await readFile(
      `/content/${fileName}`
    );

    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      ...frontmatter,
    });
  }

  return blogPosts.sort((p1, p2) =>
    p1.publishedOn < p2.publishedOn ? 1 : -1
  );
}

export const loadBlogPost = React.cache(async (slug) => {
  let rawContent;
  try {
      rawContent = await readFile(
      `/content/${slug}.mdx`
    );
  } catch (e) {
    return null;
  }

  const { data: frontmatter, content } =
    matter(rawContent);
  const headings = getHeadingsFromMDX(content);

  return { frontmatter, headings, content };
});

function getHeadingsFromMDX (source) {
  const HEADING_REGEXP = /(#{1,6} .*)\r?\n/g;
  const headings = Array.from(
    source.matchAll(HEADING_REGEXP),
    match => match[1]
  );

  return headings.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    // get h2 and h3 levels
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slug = text.toLowerCase().replaceAll(' ', '-');

    return { level, text, slug };
  });
}

function readFile(localPath) {
  return fs.readFile(
    path.join(process.cwd(), localPath),
    'utf8'
  );
}

function readDirectory(localPath) {
  return fs.readdir(
    path.join(process.cwd(), localPath)
  );
}
