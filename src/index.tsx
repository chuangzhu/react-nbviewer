import React, { Fragment } from 'react'
import AnsiPre from './AnsiPre'
import styles from './index.css'

const base64ToImage = (mime: string, base64: string) => (
  <img src={`data:${mime};base64,${base64}`} />
)

// Putting the 'text/html' output on page is ugly and unsafe
// Instead, let's parse the raw output
function getDataFrame(raw: string) {
  const rows = raw.split('\n')
  const elements = rows.map(r => r.split(/\s+/))
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
  if ((formats[0] in datas) && (formats[4] in datas) &&
    datas[formats[0]].join('').includes('class="dataframe"') &&
    ! /^<.+>$/.test(datas[formats[4]])) {
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
        return <iframe srcDoc={datalines.join('')} />
      if (format.startsWith('image/')) {
        if (Array.isArray(datalines))
          return base64ToImage(format, datalines[0])
        return base64ToImage(format, datalines)
      }
      return <AnsiPre>{datalines.join('')}</AnsiPre>
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
      <AnsiPre>{output.text.join('')}</AnsiPre>
    </div>
  )
}

const ErrorOutput = ({ output }: { output: NbErrorOutput }) => {
  // Some ANSI escape codes are used to colorize the error output
  return <AnsiPre>{output.traceback.join('')}</AnsiPre>
}

interface CodeComponentProps {
  language: string
  children: string
}

const CodeCell = ({ cell, ...props }: {
  cell: NbCodeCell,
  language: string,
  code: React.ElementType<CodeComponentProps>
}) => {
  const source = cell.source.join('')

  return (
    <Fragment>
      {/* "In [...]:" for every code cell */}
      <div className={`input_prompt ${styles.input_prompt}`}>
        <pre>{`In [${cell.execution_count || ' '}]:`}</pre>
      </div>
      <div className={`inner_cell ${styles.inner_cell}`}>
        <props.code language={props.language}>{source}</props.code>
      </div>
      {cell.outputs.map((output, i) => {
        return <Fragment key={i}>

          {output.output_type === 'execute_result' &&
            <div className={`output_prompt ${styles.output_prompt}`}>
              <pre>{`Out[${output.execution_count}]:`}</pre>
            </div>}

          <div className={`inner_cell ${styles.inner_cell}`}>
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
          </div>

        </Fragment>
      })}
    </Fragment>
  )
}

interface MarkdownProps {
  source: string
}

interface NbViewerProps {
  source: string | NbFormat,
  markdown?: React.ElementType<MarkdownProps>,
  code?: React.ElementType<CodeComponentProps>
}

export default function NbViewer({
  source,
  markdown = PlainMarkdown,
  code = PlainCode
}: NbViewerProps) {
  if (!source) return null
  const ipynb: NbFormat = typeof source === 'string' ? JSON.parse(source) : source
  // TODO: support more versions
  if (ipynb.nbformat !== 4)
    throw new Error('react-nbviewer currently supports nbformat 4 only')

  const language =
    ipynb.metadata.kernelspec?.language ||
    ipynb.metadata.language_info?.name || 'python'

  return (
    <div className={`notebook_container ${styles.notebook_container}`}>
      {ipynb.cells.map((cell, i) => (
        cell.cell_type === 'code' ?
          <CodeCell cell={cell} language={language} code={code} key={i} /> :

          <div className={`inner_cell ${styles.inner_cell}`}>{
            // Not using JSX here because "markdown" is in lower case
            React.createElement(markdown, {
              source: cell.source.join(''),
              key: i
            }, null)
          }</div>
      ))}
    </div>
  )
}

// Defaults when not provided
function PlainMarkdown(props: MarkdownProps) {
  return <div>{props.source}</div>
}

function PlainCode(props: CodeComponentProps) {
  return <pre><code>{props.children}</code></pre>
}
