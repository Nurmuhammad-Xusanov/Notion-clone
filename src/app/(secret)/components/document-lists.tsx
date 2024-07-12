"use client"
import React, { useState } from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import Item from './item';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';


interface DocumentListsProps {
  parentDocumentId?: Id<"documents">
  level?: number;
}

export default function DocumentLists({ level = 0, parentDocumentId }: DocumentListsProps) {
  const [Expanded, setExpanded] = useState<Record<string, boolean>>({});

  const router = useRouter();
  const params = useParams();

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId]
    }));
  }

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const documents = useQuery(api.documents.getDocuments, {
    parentDocument: parentDocumentId
  })

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }

  return <>
    <p className={cn("hidden text-sm font-medium text-muted-foreground/80", Expanded && "last:block", level === 0 && "hidden")} style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}>
      No documents found.
    </p >
    {documents.map(document => (
      <div key={document._id}>
        <Item documentIcon={document.icon} active={params.documentId === document._id} label={document.title} id={document._id} level={level} expanded={Expanded[document._id]} onExpand={() => onExpand(document._id)} onClick={() => onRedirect(document._id)} />
        {Expanded[document._id] && (
          <DocumentLists parentDocumentId={document._id} level={level + 1} />
        )}
      </div>
    ))
    }
  </>
}
