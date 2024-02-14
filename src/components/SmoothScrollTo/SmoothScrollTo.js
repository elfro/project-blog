'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';

function SmoothScrollTo({ id, children, className, ...delegated }) {

  const prefersReducedMotion = usePrefersReducedMotion();
  const router = useRouter();


  function handleClick(ev) {
    // Disable the default anchor-clicking behavior
    // of scrolling to the element
    ev.preventDefault();

    router.push(`#${id}`, { scroll: false });
    const target = document.querySelector(`#${id}`);
    target?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <Link
      href={`#${id}`}
      onClick={handleClick}
      className={className}
      {...delegated }
    >
      {children}
    </Link>
  )
}

export default SmoothScrollTo;
