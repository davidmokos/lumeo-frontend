'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
}

export function CarouselButton({ direction, onClick }: CarouselButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
      style={{ [direction === 'prev' ? 'left' : 'right']: '1rem' }}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="w-6 h-6" />
      ) : (
        <ChevronRight className="w-6 h-6" />
      )}
    </button>
  );
}

export function VideoCarousel({ examples }: { examples: { prompt: string; videoUrl: string }[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) => (current + 1) % examples.length);
  };

  const prev = () => {
    setCurrentIndex((current) => (current - 1 + examples.length) % examples.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <video
          key={examples[currentIndex].videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={examples[currentIndex].videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <p className="text-white text-lg font-mono">
            <span className="text-blue-400">prompt: </span>
            {examples[currentIndex].prompt}
          </p>
        </div>
      </div>
      
      <CarouselButton direction="prev" onClick={prev} />
      <CarouselButton direction="next" onClick={next} />
      
      <div className="flex justify-center gap-2 mt-4">
        {examples.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-400' : 'bg-gray-600'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
