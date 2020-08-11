# react-nbviewer

Render Jupyter Notebooks as React components.

[![NPM](https://img.shields.io/npm/v/react-nbviewer.svg)](https://www.npmjs.com/package/react-nbviewer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-nbviewer
```

## Usage

```jsx
import React from 'react'

import NbViewer from 'react-nbviewer'
import 'react-nbviewer/dist/index.css'

import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'

<Nbviewer
  source="{.ipynb file content}"
  markdown={Markdown}
  code={SyntaxHighlighter} />
```

Importing `react-nbviewer/dist/index.css` is not required. You can style the component on your own. See [`src/index.css`](./src/index.css) for details.

## Options
| Name | Type | Description |
|:-----|:-----|:------------|
| `source` | `string` or `object` | The Jupyter Notebook source to parse. |
| `markdown` | `ReactNode<{source: string}>` | (Optional) The React component to render Markdown. [`react-markdown`](https://github.com/rexxars/react-markdown) is recommended. |
| `code` | `ReactNode<{language: string, children: string}>` | (Optional) The React component to highlight code blocks. |

## License

MIT © [chuangzhu](https://github.com/chuangzhu)
