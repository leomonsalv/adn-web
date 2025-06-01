'use client';

import { useState, useEffect } from 'react';

interface WellnessCard {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  textColor: string;
}

const wellnessCards: WellnessCard[] = [
  {
    id: 'sleep',
    title: 'Mejorar el sueño',
    icon: '🌙',
    gradient: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    textColor: 'text-white',
  },
  {
    id: 'weight',
    title: 'Bajar de peso',
    icon: '⚖️',
    gradient: 'bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500',
    textColor: 'text-white',
  },
  {
    id: 'stress',
    title: 'Controlar el estrés',
    icon: '🧘‍♀️',
    gradient: 'bg-gradient-to-br from-orange-400 via-red-400 to-pink-500',
    textColor: 'text-white',
  },
  {
    id: 'exercise',
    title: 'Hacer ejercicio',
    icon: '💪',
    gradient: 'bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600',
    textColor: 'text-white',
  },
];

export default function AnimatedText() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8">
      <div className="w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#31354D] mb-4">
            Para sentirte mejor
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre productos que te ayudan a alcanzar tus objetivos de bienestar
          </p>
        </div>

        {/* Wellness Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {wellnessCards.map((card, index) => (
            <div
              key={card.id}
              className={`wellness-card relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                card.gradient
              } ${
                animationPhase === index ? 'animate-pulse ring-4 ring-white ring-opacity-50' : ''
              }`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-4 translate-y-4"></div>
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-4 transform transition-transform duration-300 hover:scale-110">
                  {card.icon}
                </div>
                <h3 className={`text-lg md:text-xl font-semibold ${card.textColor} leading-tight`}>
                  {card.title}
                </h3>

                {/* Hover Effect Arrow */}
                <div
                  className={`mt-4 transition-all duration-300 ${
                    hoveredCard === card.id
                      ? 'opacity-100 transform translate-x-2'
                      : 'opacity-0 transform translate-x-0'
                  }`}
                >
                  <div className="flex items-center text-white">
                    <span className="text-sm font-medium mr-2">Explorar</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-500">
                <div className="absolute inset-0 transform -skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .wellness-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .wellness-card:nth-child(1) {
          animation-delay: 0s;
        }
        .wellness-card:nth-child(2) {
          animation-delay: 0.1s;
        }
        .wellness-card:nth-child(3) {
          animation-delay: 0.2s;
        }
        .wellness-card:nth-child(4) {
          animation-delay: 0.3s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
