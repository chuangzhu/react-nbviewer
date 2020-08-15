import React from 'react'
import ReactDOM from 'react-dom'

import NbViewer from 'react-nbviewer'
import Markdown from 'react-markdown'
import MathPlugin from 'remark-math'
import { InlineMath, BlockMath } from 'react-katex'
import Highlighter from 'react-syntax-highlighter'

import 'react-nbviewer/dist/index.css'
import 'katex/dist/katex.min.css'

const MathMarkdown = (props) => {
  const renderers = {
    math: ({ value }) => <BlockMath math={value} />,
    inlineMath: ({ value }) => <InlineMath math={value} />,
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

  function readFile(event) {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = (e) => {
      setSource(e.target.result)
    }
    reader.readAsText(event.target.files[0])
  }

  return (
    <div>
      <input type="file" accept=".ipynb,application/x-ipynb+json" onChange={readFile} />
      <NbViewer source={source} markdown={MathMarkdown} code={Highlighter} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
