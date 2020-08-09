import React from 'react'
import ReactDOM from 'react-dom'

import NbViewer from 'react-nbviewer'
import Markdown from 'react-markdown'

const App = () => {
  const [source, setSource] = React.useState('')
  React.useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/example.ipynb')
      .then(src => src.text())
      .then(src => setSource(src))
  }, [])
  return <NbViewer source={source} renderers={{ markdown: Markdown }} />
}

ReactDOM.render(<App />, document.getElementById('root'))
