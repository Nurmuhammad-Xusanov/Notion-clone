"use client"
import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    }
}

export default function DocumentIdPage({params}:DocumentIdPageProps) {
  return (
    <div>{params.documentId}</div>
  )
}
