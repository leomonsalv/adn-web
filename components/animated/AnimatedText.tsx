'use client';

import { useState, useEffect } from 'react';

interface AnimatedTextProps {
  baseText: string;
  middleText?: string;
  animatedWords: string[];
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
  interval = 3000,
  className = 'flex flex-col items-center justify-center h-full text-center px-4',
  baseTextClassName = 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800',
  middleTextClassName = 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800',
  animatedTextClassName = 'text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse',
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
    }, interval);

    return () => clearInterval(timer);
  }, [animatedWords.length, interval]);

  return (
    <div className={className}>
      <div className="flex flex-col items-start justify-center gap-1 md:gap-2">
        <h2 className={baseTextClassName}>{baseText}</h2>
        <h1 className={middleTextClassName}>
          {middleText}
          <span className={animatedTextClassName}>{animatedWords[currentIndex]}</span>
        </h1>
      </div>
    </div>
  );
}
