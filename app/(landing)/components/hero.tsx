import React from 'react';
import { Sparkles, Play, Wand2 } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-50"
          style={{ filter: 'brightness(0.4)' }}
        >
          <source src="https://cdn.pixabay.com/vimeo/527013720/Woman%20-%2067624.mp4?width=1280&hash=f254d792a6f52718b5e11f86e5e2da0b0f02d21c" type="video/mp4" />
        </video>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-medium">AI-Powered Video Generation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Text into
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> Stunning Videos</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Create professional-quality videos from simple text descriptions. Harness the power of AI to bring your imagination to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
              <Play className="w-5 h-5" />
              Try for Free
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
              <Wand2 className="w-5 h-5" />
              View Examples
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
