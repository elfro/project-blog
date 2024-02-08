import React from 'react';
import Link from 'next/link';

import styles from './not-found.module.css';
import { BLOG_TITLE } from '@/constants';

export const metadata = {
  title: `404 Not Found | ${BLOG_TITLE}`,
  description: '404 Not Found',
};

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

export default NotFound;

