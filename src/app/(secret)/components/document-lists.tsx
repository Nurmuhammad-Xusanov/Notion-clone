"use client"
import React, { useState } from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Item from './item';


interface DocumentListsProps {
  parentDocumentId?: Id<"documents">
  level?: number;
}

export default function DocumentLists({ level = 0, parentDocumentId }: DocumentListsProps) {
  const [Expanded, setExpanded] = useState<Record<string, boolean>>({})

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId]
    }));
  }

  const documents = useQuery(api.documents.getDocuments, {
    parentDocument: parentDocumentId
  })

  return <>
    {documents?.map(document => (
      <div key={document._id}>
        <Item label={document.title} id={document._id} level={level} expanded={Expanded[document._id]} onExpand ={() => onExpand(document._id)}/>
        {Expanded[document._id] && (
          <DocumentLists parentDocumentId={document._id} level={level + 1} />
        )}
      </div>
    ))}
  </>
}
