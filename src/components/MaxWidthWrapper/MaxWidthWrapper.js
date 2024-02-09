import React from 'react';
import styles from './MaxWidthWrapper.module.css';

function MaxWidthWrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
