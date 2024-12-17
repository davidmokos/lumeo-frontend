"use client"

import { createContext, useContext, ReactNode } from 'react'
import { VideoGeneration } from '@/lib/models/video-generation'
import { useVideoQueueState } from './use-video-queue'

interface VideoQueueContextType {
  allVideos: VideoGeneration[];
  queueVideos: VideoGeneration[];
}

export const VideoQueueContext = createContext<VideoQueueContextType>({
  allVideos: [],
  queueVideos: []
});

interface VideoQueueProviderProps {
  children: ReactNode;
  userId: string;
  initialVideos?: VideoGeneration[];
}

export function VideoQueueProvider({ 
  children, 
  userId,
  initialVideos = []
}: VideoQueueProviderProps) {
  const state = useVideoQueueState(userId, initialVideos);

  return (
    <VideoQueueContext.Provider value={state}>
      {children}
    </VideoQueueContext.Provider>
  )
}