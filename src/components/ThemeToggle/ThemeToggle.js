'use client'

import React from 'react';
import Cookie from 'js-cookie';

import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '@/components/VisuallyHidden';

import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

import styles from '@/components/Header/Header.module.css';


const THEME = {
  light: 'light',
  dark: 'dark'
}
function ThemeToggle({initialTheme}) {
  const [theme, setTheme] = React.useState(initialTheme);

  const Icon = theme === THEME.light ? Sun : Moon;

  function onClick() {
    const nextTheme = theme === THEME.light ? THEME.dark : THEME.light;

    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === THEME.light ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    })
  }

  return (
    <button className={styles.action} onClick={onClick}>
      <Icon size="1.5rem"/>
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
