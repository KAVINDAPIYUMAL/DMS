import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'classic' | 'gold' | 'glass';
}

export default function Logo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'classic',
}: LogoProps) {
  const sizeMap = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    xl: 'w-40 h-40 sm:w-44 sm:h-44',
  };

  const dimensions = sizeMap[size];
  const isGoldOrGlass = variant === 'gold' || variant === 'glass';

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Emblem Seal Container */}
      <div
        className={`relative ${dimensions} rounded-full p-1 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] ${
          isGoldOrGlass
            ? 'border-2 border-[#C5A059] bg-[#220707]/90 shadow-[0_0_25px_rgba(197,160,89,0.35)]'
            : 'border-2 border-[#6B0000] bg-[#FDFBF7] shadow-md hover:shadow-lg'
        }`}
      >
        {/* Double Gold Ring Inner Accent */}
        <div
          className={`w-full h-full rounded-full border flex flex-col items-center justify-center text-center p-1.5 overflow-hidden select-none ${
            isGoldOrGlass
              ? 'border-[#C5A059]/60 bg-gradient-to-b from-[#3D0A0A] via-[#220707] to-[#140303]'
              : 'border-[#C5A059] bg-gradient-to-b from-white via-[#FDFBF7] to-[#FAF6F0]'
          }`}
        >
          {/* Vector Crest: Sri Lanka Twin Lions & Lotus Sun Emblem */}
          <svg
            className={`w-9 h-9 sm:w-11 sm:h-11 mb-0.5 filter drop-shadow-sm ${
              isGoldOrGlass ? 'text-[#C5A059]' : 'text-[#6B0000]'
            }`}
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            {/* Outer Decorative Ring */}
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke={isGoldOrGlass ? '#C5A059' : '#6B0000'}
              strokeWidth="2.5"
            />
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke={isGoldOrGlass ? '#F3E5AB' : '#C5A059'}
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            {/* Sun Rays Top */}
            <path d="M 50 10 L 53 17 L 50 15 L 47 17 Z" fill={isGoldOrGlass ? '#FAF6F0' : '#6B0000'} />
            <circle cx="50" cy="21" r="3" fill="#C5A059" />

            {/* Stylized Twin Lions / Guardian Motif */}
            <path
              d="M 31 44 C 27 34, 21 39, 23 49 C 25 57, 35 61, 37 51 C 39 44, 33 39, 31 44 Z"
              fill={isGoldOrGlass ? '#C5A059' : '#6B0000'}
            />
            <path
              d="M 69 44 C 73 34, 79 39, 77 49 C 75 57, 65 61, 63 51 C 61 44, 67 39, 69 44 Z"
              fill={isGoldOrGlass ? '#C5A059' : '#6B0000'}
            />
            <path
              d="M 39 45 C 43 39, 57 39, 61 45 C 57 54, 43 54, 39 45 Z"
              fill={isGoldOrGlass ? '#F59E0B' : '#C5A059'}
            />

            {/* Sword & Lotus Motif */}
            <path d="M 48 29 L 52 29 L 52 66 L 48 66 Z" fill={isGoldOrGlass ? '#FAF6F0' : '#6B0000'} />
            <path
              d="M 37 66 C 44 72, 56 72, 63 66 C 56 76, 44 76, 37 66 Z"
              fill={isGoldOrGlass ? '#C5A059' : '#6B0000'}
            />
          </svg>

          {/* Tri-lingual text */}
          {showText && (
            <div
              className={`flex flex-col items-center justify-center leading-tight tracking-tight ${
                isGoldOrGlass ? 'text-[#FAF6F0]' : 'text-[#6B0000]'
              }`}
            >
              <span className="text-[7.5px] sm:text-[8.5px] font-bold whitespace-nowrap font-serif-title">
                රජයේ ප්‍රවෘත්ති දෙපාර්තමේන්තුව
              </span>
              <span className="text-[6.5px] sm:text-[7.5px] font-medium whitespace-nowrap opacity-90 my-[0.5px]">
                அரச தகவல் திணைக்களம்
              </span>
              <span className="text-[5.5px] sm:text-[6.5px] font-semibold uppercase tracking-wider whitespace-nowrap text-[#C5A059]">
                Dept of Govt Information
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

