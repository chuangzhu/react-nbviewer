import React from 'react'

const ansiClassNames = {
  30: 'ansi_black_fg',
  31: 'ansi_red_fg',
  32: 'ansi_green_fg',
  33: 'ansi_yellow_fg',
  34: 'ansi_blue_fg',
  35: 'ansi_magenta_fg',
  36: 'ansi_cyan_fg',
  37: 'ansi_white_fg',
}

function ansiCodeToClassName(ansiCode: string) {
  const codes = ansiCode.slice(2, -1).split(';')
  if (codes === ['0'])
    return null
  return codes.map(c => ansiClassNames[c]).join(' ')
}

const AnsiPre = ({ children }: { children: string }) => {
  // <pre> with ANSI color codes
  // \033[SGR;FG;BGm
  const r = /(\x1b\[.+?m)/g
  const splitted = children.split(r)
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

export default AnsiPre
