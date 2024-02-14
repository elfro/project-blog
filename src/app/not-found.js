import React from 'react';
import Link from 'next/link';

function NotFound() {
  return (
    <div style={{
      'padding-top': '96px',
      'text-align': 'center',
    }}>
      <h1 style={{
        'margin-bottom': '1em'
      }}>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and try again.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

export default NotFound;

