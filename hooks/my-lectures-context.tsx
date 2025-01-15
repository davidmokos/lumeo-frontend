"use client"

import { createContext, useContext, ReactNode } from 'react'
import { Lecture } from '@/lib/models/lecture'
import { useMyLecturesState } from './use-my-lectures';

interface MyLecturesContextType {
  lectures: Lecture[];
}

export const MyLecturesContext = createContext<MyLecturesContextType>({
  lectures: []
});

interface MyLecturesProviderProps {
  children: ReactNode;
  userId: string;
  initialLectures?: Lecture[];
}

export function MyLecturesProvider({ 
  children, 
  userId,
  initialLectures = []
}: MyLecturesProviderProps) {
  const state = useMyLecturesState(userId, initialLectures);

  return (
    <MyLecturesContext.Provider value={state}>
      {children}
    </MyLecturesContext.Provider>
  )
}
