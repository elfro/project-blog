import React from 'react';
import clsx from 'clsx';

import SmoothScrollTo from '@/components/SmoothScrollTo';

import styles from './PageTableContent.module.css';
function PageTableContent({title, contentLinks, className}) {
  return (
    <aside className={clsx(styles.wrapper, className)}>
      <div className={styles.stickyWrapper}>
        <nav>
          {contentLinks.length > 0 && <h2 className={styles.navHeading}>{title}</h2>}
          {contentLinks.map(({slug, text, level}, index) =>
            <SmoothScrollTo
              key={index}
              id={slug}
              className={styles.navLink}
              style={{
                marginLeft: level > 2 ? (level - 1) * 8 : undefined,
              }}
            >
              {text}
            </SmoothScrollTo>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default PageTableContent;
