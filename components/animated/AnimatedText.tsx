'use client';

import { useState, useEffect, useMemo } from 'react';

interface AnimatedTextProps {
  baseText: string;
  middleText?: string;
  animatedWords: string[];
  colors?: string[];
  interval?: number;
  className?: string;
  baseTextClassName?: string;
  middleTextClassName?: string;
  animatedTextClassName?: string;
}

export default function AnimatedText({
  baseText,
  middleText,
  animatedWords,
  colors = ['text-gray-500', 'text-green-500', 'text-green-700', 'text-blue-600'],
  interval = 3000,
  className = 'flex flex-col items-center justify-center h-full text-center px-4',
  baseTextClassName = 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800',
  middleTextClassName = 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800',
  animatedTextClassName = 'text-3xl md:text-4xl lg:text-5xl font-bold',
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, interval);

    return () => clearInterval(timer);
  }, [animatedWords.length, interval]);

  const longestWord = useMemo(() => {
    if (!animatedWords || animatedWords.length === 0) return '';
    return animatedWords.reduce((longest, currentWord) => {
      return currentWord.length > longest.length ? currentWord : longest;
    }, '');
  }, [animatedWords]);

  return (
    <div className={className}>
      <div className="flex flex-col xl:items-start justify-center gap-1 md:gap-2">
        <h2 className={baseTextClassName}>{baseText}</h2>
        <h1 className={middleTextClassName}>
          {middleText}
          <span className="relative inline-block">
            <span
              className={`opacity-0 pointer-events-none whitespace-nowrap  ${animatedTextClassName}`}
              aria-hidden="true"
            >
              {longestWord}
            </span>

            <span
              className={`absolute left-0 top-0 w-full ${animatedTextClassName} ${colors[currentIndex]} transition-colors duration-300 ease-in-out`}
            >
              {animatedWords[currentIndex]}
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
}
