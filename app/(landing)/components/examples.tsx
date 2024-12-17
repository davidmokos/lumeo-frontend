import React from 'react';
import { VideoCarousel } from './video-carousel';

export const examples = [
    {
      prompt: "A cinematic shot of a mountain lake at sunrise, with mist rising from the water and golden light illuminating the peaks",
      videoUrl: "https://ctfbahbqnfbveqskhnum.supabase.co/storage/v1/object/public/all-videos/video%20(1).mp4?t=2024-12-17T19%3A35%3A55.505Z"
    },
    {
      prompt: "Aerial view of a bustling metropolis at night, with streams of car lights creating rivers of light through the city streets",
      videoUrl: "https://ctfbahbqnfbveqskhnum.supabase.co/storage/v1/object/public/all-videos/video.mp4?t=2024-12-17T19%3A35%3A58.331Z"
    },
    {
      prompt: "Abstract fluid motion of colorful particles flowing and swirling in a dark space, creating mesmerizing patterns",
      videoUrl: "https://ctfbahbqnfbveqskhnum.supabase.co/storage/v1/object/public/all-videos/01as8mserxrma0ckt5srqs0z70.mp4"
    }
  ];

export function Examples() {
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            From Text to Video
          </h2>
          <p className="text-gray-400">
            See how prompts are transformed into stunning videos
          </p>
        </div>
        
        <VideoCarousel examples={examples} />
      </div>
    </section>
  );
}