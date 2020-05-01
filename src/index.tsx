import * as React from 'react'

const base64ToImage = (mime: string, base64: string) => (
  <img src={`data:${mime};base64,${base64}`} />
)

const DisplayDataOutput = ({ output }: {
  output: NbDisplayDataOutput
}) => {
  const { data } = output
  const formatPriority = ['text/html', 'image/svg+xml', 'image/png', 'image/jpeg', 'text/plain']
  for (const format of formatPriority) {
    if (format in data) {
      const realData = data[format]
      if (format === 'image/svg+xml') {
        const svg = realData.join('')
        return <div dangerouslySetInnerHTML={{ __html: svg }} />
      }
      if (format === 'text/html')
        return <div dangerouslySetInnerHTML={{ __html: realData.join('') }} />
      if (format.startsWith('image/')) {
        if (Array.isArray(realData))
          return base64ToImage(format, realData[0])
        return base64ToImage(format, realData)
      }
      return <pre>{realData.join('')}</pre>
    }
  }
  throw new Error('Unsupported output format')
}

const ExecuteResultOutput = (props: { output: NbDisplayDataOutput }) => (
  <div>
    <span>{`Out [${props.output.execution_count}]`}</span>
    <DisplayDataOutput output={props.output} />
  </div>
)

const StreamOutput = ({ output }: { output: NbStreamOutput }) => (
  <pre className={`output ${output.name === 'stderr' ? 'stderr' : ''}`}>{output.text.join('')}</pre>
)

const CodeCell = ({ cell }: {
  cell: NbCodeCell
}) => {
  return (
    <div>
      <div>
        <span>{`In [${cell.execution_count || ' '}]`}</span>
        <pre><code>{cell.source.join('')}</code></pre>
      </div>
      <div>
        {cell.outputs.map((output, i) => {
          switch (output.output_type) {
            case 'execute_result':
              return <ExecuteResultOutput output={output} key={i} />
            case 'display_data':
              return <DisplayDataOutput output={output} key={i} />
            case 'stream':
              return <StreamOutput output={output} key={i} />
            default:
              return undefined
          }
        })}
      </div>
    </div>
  )
}

interface Props {
  source: string
}

export default ({ source }: Props) => {
  if (!source) return null
  const ipynb: NbFormat = JSON.parse(source)
  if (ipynb.nbformat !== 4)
    throw new Error('react-nbviewer currently supports nbformat 4 only')
  return (
    <div>
      {ipynb.cells.map((cell, i) => (
        cell.cell_type === 'code' ?
          <CodeCell cell={cell} key={i} /> :
          <div key={i}>{cell.source}</div>
      ))}
    </div>
  )
}
