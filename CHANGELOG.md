## v1.1.0

* `Changed` the notebook rendering from rendering as a `<table>` to `<div>`s with CSS grid. Previously the entire notebook is rendered as a table: `In [*]` and `Out[*]` prompts on the left and cell contents on the right. This caused the width of the notebook component is totally dependent to the content and cannot be clamped by the parent. This change is a BREAKING CHANGE, you need to edit your CSS if you didn't import `react-markdown/dist/index.css` and styled the compoenent on your own.
* `Fixed` DataFrames rendering. Some advanced HTML outputs (e.g. IPython.display.HTML) can now be rendered correctly.
* `Added` more colors to plain-text outputs (i.e. Parses ANSI color codes in more places).

## v1.0.1

* `Updated` some dependencies. This update is just for satisfying auditing tools, since the vulnerable dependencies are not actually used.
