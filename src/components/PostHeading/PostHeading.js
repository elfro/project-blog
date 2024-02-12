import React from 'react';

import styles from './PostHeading.module.css';
function PostHeading({as, ...props}) {
    const Tag = as;
    const id = props.children.toLowerCase().replaceAll(' ', '-');
    return (
      <Tag>
        <a
          id={id}
          name={id}
          href={`#${id}`}
          className={styles.link}
        >
          {props.children}
        </a>
      </Tag>
    );
}

export const H1 = (props) => <PostHeading as="h1" {...props} />;
export const H2 = (props) => <PostHeading as="h2" {...props} />;
export const H3 = (props) => <PostHeading as="h3" {...props} />;
export const H4 = (props) => <PostHeading as="h4" {...props} />;
export const H5 = (props) => <PostHeading as="h5" {...props} />;
export const H6 = (props) => <PostHeading as="h6" {...props} />;

export default PostHeading;
