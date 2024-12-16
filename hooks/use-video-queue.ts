"use client"

import { useEffect, useState } from 'react'
import { VideoGeneration, PredictionStatus } from '@/lib/models/video-generation'
import { createClient } from '@/utils/supabase/client'

export function useVideoQueue({userId}: {userId: string}) {
  const supabase = createClient()
  const [queue, setQueue] = useState<VideoGeneration[]>([])


  useEffect(() => {
    fetchQueue()

    const channel = supabase
      .channel('video_generations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'video-generations'
        },
        (payload) => {
          fetchQueue()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchQueue = async () => {
    const { data } = await supabase
      .from('video-generations')
      .select('*')
      .eq('user_id', userId)
      .in('status', [PredictionStatus.Starting, PredictionStatus.Processing])
      .order('created_at', { ascending: false })
    
    if (data) setQueue(data)
  }

  return { queue }
}