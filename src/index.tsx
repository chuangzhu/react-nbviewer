import * as React from 'react'

const base64ToImage = (mime: string, base64: string) => (
  <img src={`data:${mime};base64,${base64}`} />
)

function getDataFrame(raw: string) {
  const rows = raw.split('\n')
  const elements = rows.map(r => r.split('  '))
  return (
    <table className="dataframe">
      <thead>
        <tr>
          {elements[0].map((h, hidx) => <th key={hidx}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {elements.slice(1).map((row, rowidx) => (
          <tr key={rowidx}>
            <th>{row[0]}</th>
            {row.slice(1).map((d, idx) => <td key={idx}>{d}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const DisplayDataOutput = ({ output }: {
  output: NbDisplayDataOutput
}) => {
  const { data: datas } = output
  const formats = ['text/html', 'image/svg+xml', 'image/png', 'image/jpeg', 'text/plain']
  // e.g. pandas.DataFrame
  if ((formats[0] in datas) && (formats[4] in datas)) {
    return getDataFrame(datas[formats[4]].join(''))
  }
  for (const format of formats) {
    if (format in datas) {
      const datalines = datas[format]
      if (format === 'image/svg+xml') {
        const svg = datalines.join('')
        return <img src={`data:image/svg+xml;utf8,${svg}`} />
      }
      if (format === 'text/html')
        return <iframe srcDoc={datalines.join('')}></iframe>
      if (format.startsWith('image/')) {
        if (Array.isArray(datalines))
          return base64ToImage(format, datalines[0])
        return base64ToImage(format, datalines)
      }
      return <pre>{datalines.join('')}</pre>
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
  <div className={`output_stream ${output.name === 'stderr' ? 'output_stderr' : ''}`}>
    <pre>{output.text.join('')}</pre>
  </div>
)

const ansiClassNames = {
  30: 'ansi-black-fg',
  31: 'ansi-red-fg',
  32: 'ansi-green-fg',
  33: 'ansi-yellow-fg',
  34: 'ansi-blue-fg',
  35: 'ansi-magenta-fg',
  36: 'ansi-cyan-fg',
  37: 'ansi-white-fg',
}

function ansiCodeToClassName(ansiCode: string) {
  const codes = ansiCode.slice(2, -1).split(';')
  if (codes === ['0'])
    return null
  return codes.map(c => ansiClassNames[c]).join(' ')
}

const ErrorOutput = ({ output }: { output: NbErrorOutput }) => {
  const r = /(\x1b\[.+?m)/g
  const traceback = output.traceback.join('')
  const splitted = traceback.split(r)
  const spans: React.ReactChild[] = []
  let lastClassName: string | null = null
  splitted.forEach((s, i) => {
    if (r.test(s)) {
      lastClassName = ansiCodeToClassName(s)
      return
    }
    if (!lastClassName) spans.push(s)
    else spans.push(<span className={lastClassName} key={i}>{s}</span>)
  })
  return <pre>{spans}</pre>
}

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
            case 'error':
              return <ErrorOutput output={output} key={i} />
            default:
              return undefined
          }
        })}
      </div>
    </div>
  )
}

const Markdown = (props: { source: string }) => (
  <div>{props.source}</div>
)

interface NbViewerProps {
  source: string,
  renderers: {
    markdown: React.ElementType
  }
}

export default function NbViewer({
  source,
  renderers = { markdown: Markdown }
}: NbViewerProps) {
  if (!source) return null
  const ipynb: NbFormat = JSON.parse(source)
  if (ipynb.nbformat !== 4)
    throw new Error('react-nbviewer currently supports nbformat 4 only')
  return (
    <div>
      {ipynb.cells.map((cell, i) => (
        cell.cell_type === 'code' ?
          <CodeCell cell={cell} key={i} /> :
          <renderers.markdown source={cell.source.join('')} key={i} />
      ))}
    </div>
  )
}
