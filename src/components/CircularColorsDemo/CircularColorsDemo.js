'use client'

import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(() => {
    if(!isPlaying) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);


    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  function onClickReset() {
    setIsPlaying(false);
    setTimeElapsed(0);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;
          const layoutId = `${id}-outline`;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  layoutId={layoutId}
                  key={layoutId}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 40,
                  }}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {!isPlaying && (
            <button onClick={() => setIsPlaying(true)}>
              <Play/>
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          {isPlaying && (
            <button onClick={() => setIsPlaying(false)}>
              <Pause/>
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={onClickReset}>
            <RotateCcw/>
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
