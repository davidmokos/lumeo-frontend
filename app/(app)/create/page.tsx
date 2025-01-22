import React from 'react'
import { GenerateForm } from '@/components/generate-form'

export default function CreatePage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Generate Video Lecture</h1>
      <GenerateForm />
    </div>
  )
}