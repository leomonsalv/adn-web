'use client';

import { useState, useEffect } from 'react';

export default function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const phrases = [
    { text: 'empieza por comer bien', highlight: 'comer bien', color: 'text-gray-500' },
    { text: 'empieza por dormir bien', highlight: 'dormir bien', color: 'text-green-500' },
    { text: 'empieza por ejercitarte', highlight: 'ejercitarte', color: 'text-green-700' },
    {
      text: 'empieza por tolerar el estrés',
      highlight: 'tolerar el estrés',
      color: 'text-blue-600',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      // Cambiar la frase después de que termine la animación de salida
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Duración de la animación de salida
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const currentPhrase = phrases[currentIndex];
  const staticPrefix = 'empieza por ';

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col xl:items-start justify-center h-full text-center px-4 w-auto xl:w-5xl">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#31354D]">
          Para sentirte mejor
        </h2>
        <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#31354D]">
          {staticPrefix}
          <br className="xl:hidden" />
          <span
            className={`${currentPhrase.color} transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            {currentPhrase.highlight}
          </span>
        </div>
      </div>
    </div>
  );
}
