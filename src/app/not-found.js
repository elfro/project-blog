import React from 'react';
import Link from 'next/link';

import { BLOG_TITLE } from '@/constants';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

function NotFound() {
  return (
    <MaxWidthWrapper>
      <h1>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
      <Link href="/">Return Home</Link>
    </MaxWidthWrapper>
  )
}

export default NotFound;

