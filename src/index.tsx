import * as React from 'react'
import styles from './styles.module.css'

interface Props {
  source: string
}

interface NbCell {
  cell_type: 'markdown' | 'code'
  metadata: {}
  source: string[]
}

interface NbMarkdownCell extends NbCell {
  cell_type: 'markdown'
}

interface NbStreamOutput {
  output_type: 'stream'
  name: 'stdout' | 'stderr'
  text: string[]
}

interface NbDisplayDataOutput {
  output_type: 'display_data'
  data: {
    'text/plain'?: string[]
    'images/png'?: string[]
    'application/json'?: {}
    // application/*+json
  }
  metadata: {
    'image/png'?: {
      width: number
      height: number
    }
  }
}

interface NbExecuteResultOutput {
  output_type: 'execute_result'
  execution_count: number
  data: {
    'text/plain'?: string[]
    'image/png'?: string[]
    'application/json'?: {}
  }
  metadata: {
    'image/png'?: {
      width: number
      height: number
    }
  }
}

interface NbErrorOutput {
  output_type: 'error'
  ename: string
  evalue: string
  traceback: string[]
}

interface NbCodeCell extends NbCell {
  cell_type: 'code'
  metadata: {
    collapsed: boolean
    scrolled: boolean
  }
  execution_count: number | null
  outputs: (NbStreamOutput | NbDisplayDataOutput | NbExecuteResultOutput | NbErrorOutput)[]
}

interface NbFormat {
  cells: (NbMarkdownCell | NbCodeCell)[]
  nbformat: number
}

const DisplayDataOutput = ({ output }: {
  output: NbDisplayDataOutput | NbExecuteResultOutput
}) => {
  const outputs = Object.keys(output.data).map(mime => {
    switch (mime) {
      case 'image/png':
        const images = output.data[mime].map((base64: string) =>
          <img src={`data:image/png;base64,${base64}`} />)
        return images
      default:
        return <pre><code>{output.data[mime]}</code></pre>
    }
  })
  return (
    <div>
      {outputs}
    </div>
  )
}

const CodeCell = ({ cell }: {
  cell: NbCodeCell
}) => {
  return (
    <div>
      <pre><code>{cell.source}</code></pre>
      <div>
        {cell.outputs.map((output, i) => {
          if (output.output_type === 'display_data')
            return <DisplayDataOutput output={output} key={i} />
          if (output.output_type === 'execute_result')
            return <DisplayDataOutput output={output} key={i} />
          return undefined
        })}
      </div>
    </div>
  )
}

export default ({ source }: Props) => {
  if (!source) return null
  const ipynb: NbFormat = JSON.parse(source)
  if (ipynb.nbformat !== 4)
    throw Error('react-nbviewer currently supports nbformat 4 only')
  return (
    <div className={styles.test}>
      {ipynb.cells.map((cell, i) => (
        cell.cell_type === 'code' ?
          <CodeCell cell={cell} /> :
          <div key={i}>{cell.source}</div>
      ))}
    </div>
  )
}
