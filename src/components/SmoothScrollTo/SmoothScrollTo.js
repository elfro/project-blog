'use client';

import React from 'react';
import { usePrefersReducedMotion } from '@/app/hooks/usePrefersReducedMotion';

function SmoothScrollTo({ id, children, className, ...delegated }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  function handleClick(ev) {
    // Disable the default anchor-clicking behavior
    // of scrolling to the element
    ev.preventDefault();

    const target = document.querySelector(`#${id}`);
    target?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <a
      href={`#${id}`}
      onClick={handleClick}
      className={className}
      {...delegated }
    >
      {children}
    </a>
  )
}

export default SmoothScrollTo;
