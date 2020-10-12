import React from 'react'
import ReactDOM from 'react-dom'

import NbViewer from 'react-nbviewer'
import Markdown from 'react-markdown'
import MathPlugin from 'remark-math'
import TeX from '@matejmazur/react-katex'
import Highlighter from 'react-syntax-highlighter'

import 'react-nbviewer/index.css'
import 'katex/dist/katex.min.css'

const MathMarkdown = (props) => {
  const renderers = {
    math: ({ value }) => <TeX block math={value} />,
    inlineMath: ({ value }) => <TeX math={value} />,
    code: props =>
      <Highlighter language={props.language}>{props.value}</Highlighter>
  }
  return (
    <Markdown
      renderers={renderers}
      plugins={[MathPlugin]}
      source={props.source} />
  )
}

const App = () => {
  const [source, setSource] = React.useState('')
  React.useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/example.ipynb')
      .then(src => src.text())
      .then(src => setSource(src))
  }, [])
  const [dragged, setDragged] = React.useState(false)

  function readFile(file) {
    if (!file)
      return
    const reader = new FileReader()
    reader.onload = (e) =>
      setSource(e.target.result)
    reader.readAsText(file)
  }
  function onInputChange(event) {
    event.preventDefault()
    readFile(event.target.files[0])
  }
  function onDrop(event) {
    event.preventDefault()
    readFile(event.dataTransfer.files[0])
    setDragged(false)
  }
  function onDragOver(event) {
    event.stopPropagation()
    event.preventDefault()
  }
  function onDragEnter(event) {
    event.stopPropagation()
    event.preventDefault()
    setDragged(true)
  }

  return (
    <div
      style={{ margin: '0 1%' }}
      onDragOver={onDragOver}
      onDrop={onDrop}>
      <div onDragEnter={onDragEnter} style={{
        padding: 20,
        border: '1px solid #999',
        backgroundColor: dragged ? '#ddd' : '#efefef'
      }}>
        <span>Drag and drop file here or </span>
        <input type="file" onChange={onInputChange}
          accept=".ipynb,application/x-ipynb+json" />
      </div>
      <NbViewer source={source} markdown={MathMarkdown} code={Highlighter} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
