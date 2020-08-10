import React, { Fragment } from 'react'
import styles from './index.css'

const base64ToImage = (mime: string, base64: string) => (
  <img src={`data:${mime};base64,${base64}`} />
)

function getDataFrame(raw: string) {
  const rows = raw.split('\n')
  const elements = rows.map(r => r.split('  '))
  return (
    <table className={`dataframe ${styles.dataframe}`}>
      <thead>
        <tr>
          <td />
          {/* Column headers */}
          {elements[0].slice(1).map((h, hidx) => <th key={hidx} scope="col">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {elements.slice(1).map((row, rowidx) => (
          <tr key={rowidx}>
            {/* Row header */}
            <th scope="row">{row[0]}</th>
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
      return <pre><code>{datalines.join('')}</code></pre>
    }
  }
  throw new Error('Unsupported output format')
}

const StreamOutput = ({ output }: { output: NbStreamOutput }) => {
  const className = `output_stream ${styles.output_stream} ${
    output.name === 'stderr' ? `output_stderr ${styles.output_stderr}` : ''
    }`
  return (
    <div className={className}>
      <pre>{output.text.join('')}</pre>
    </div>
  )
}

const ansiClassNames = {
  30: `ansi_black_fg ${styles.ansi_black_fg}`,
  31: `ansi_red_fg ${styles.ansi_red_fg}`,
  32: `ansi_green_fg ${styles.ansi_green_fg}`,
  33: `ansi_yellow_fg ${styles.ansi_yellow_fg}`,
  34: `ansi_blue_fg ${styles.ansi_blue_fg}`,
  35: `ansi_magenta_fg ${styles.ansi_magenta_fg}`,
  36: `ansi_cyan_fg ${styles.ansi_cyan_fg}`,
  37: `ansi_white_fg ${styles.ansi_white_fg}`,
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

const CodeCell = ({ cell, code }: {
  cell: NbCodeCell,
  code?: React.ElementType
}) => {
  const value = cell.source.join('')
  const codeElement = code ?
    React.createElement(code, { language: 'python', value }, null) :
    <pre><code>{value}</code></pre>

  return (
    <Fragment>
      <tr>
        {/* "In [...]:" for every code cell */}
        <td className={`input_prompt ${styles.input_prompt}`}><pre>
          {`In [${cell.execution_count || ' '}]:`}
        </pre></td>
        <td>{codeElement}</td>
      </tr>
      {cell.outputs.map((output, i) => {
        return (
          <tr key={i}>
            <td className={`output_prompt ${styles.output_prompt}`}><pre>
              {output.output_type === 'execute_result' ?
                `Out[${output.execution_count}]:` : ''}
            </pre></td>
            <td>
              {(() => {
                switch (output.output_type) {
                  // The only difference between these two is "Out[...]:"
                  case 'execute_result':
                  case 'display_data':
                    return <DisplayDataOutput output={output} />
                  case 'stream':
                    return <StreamOutput output={output} />
                  case 'error':
                    return <ErrorOutput output={output} />
                  default:
                    return undefined
                }
              })()}
            </td>
          </tr>
        )
      })}
    </Fragment>
  )
}

const Markdown = (props: { source: string }) => (
  <div>{props.source}</div>
)

interface NbViewerProps {
  source: string | NbFormat,
  markdown?: React.ElementType,
  code?: React.ElementType
}

export default function NbViewer({
  source,
  markdown = Markdown,
  code
}: NbViewerProps) {
  if (!source) return null
  const ipynb: NbFormat = typeof source === 'string' ? JSON.parse(source) : source
  if (ipynb.nbformat !== 4)
    throw new Error('react-nbviewer currently supports nbformat 4 only')
  return (
    <table>
      <tbody>
        {ipynb.cells.map((cell, i) => (
          cell.cell_type === 'code' ?
            <CodeCell cell={cell} code={code} key={i} /> :

            <tr key={i}>
              <td />
              <td>{
                React.createElement(markdown, {
                  source: cell.source.join(''),
                  key: i
                }, null)
              }</td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}
