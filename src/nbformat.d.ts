
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
  output_type: 'display_data' | 'execute_result'
  data: {
    'text/html'?: string[]
    'image/svg+xml'?: string[]
    'image/png'?: string[] | string
    'image/jpeg'?: string[] | string
    'text/plain'?: string[]
    'application/json'?: {}
    // application/*+json
  }
  execution_count: number
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
  outputs: (NbStreamOutput | NbDisplayDataOutput | NbErrorOutput)[]
}

interface NbFormat {
  cells: (NbMarkdownCell | NbCodeCell)[]
  nbformat: number
}
