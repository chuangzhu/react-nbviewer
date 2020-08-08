import React from 'react'
import ReactDOM from 'react-dom'

import NbViewer from 'react-nbviewer'

const App = () => {
  const [source, setSource] = React.useState('')
  React.useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/example.ipynb')
      .then(src => src.text())
      .then(src => setSource(src))
  }, [])
  return <NbViewer source={source} />
}

ReactDOM.render(<App />, document.getElementById('root'))
