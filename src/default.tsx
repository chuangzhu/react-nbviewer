import React from 'react'
import NbViewer from '.'
import ReactMarkdown from 'react-markdown'

interface Props {
  source: string
}

export default function DefaultNbViewer({ source }: Props) {
  return (
    <NbViewer
      source={source}
      renderers={{
        markdown: ReactMarkdown
      }} />
  )
}