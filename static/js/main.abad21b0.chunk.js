(this["webpackJsonpreact-nbviewer-example"]=this["webpackJsonpreact-nbviewer-example"]||[]).push([[0],{124:function(e,t,n){},33:function(e,t,n){e.exports=n(339)},339:function(e,t,n){"use strict";n.r(t);var a=n(14),r=n(0),l=n.n(r),u=n(27),c=n.n(u);var i={notebook_container:"_lAcAi",input_prompt:"_R3qoq",output_prompt:"_2Uqcj",inner_cell:"_2IBNw",dataframe:"_2uSta",output_stderr:"_RMCAr",ansi_black_fg:"_2l_MQ",ansi_red_fg:"_2bmOe",ansi_green_fg:"_KAjmd",ansi_yellow_fg:"_2Ai70",ansi_blue_fg:"_1cvmp",ansi_magenta_fg:"_1FCJ1",ansi_cyan_fg:"_2O1-i",ansi_white_fg:"_2Iaa9"},o={30:"ansi_black_fg "+i.ansi_black_fg,31:"ansi_red_fg "+i.ansi_red_fg,32:"ansi_green_fg "+i.ansi_green_fg,33:"ansi_yellow_fg "+i.ansi_yellow_fg,34:"ansi_blue_fg "+i.ansi_blue_fg,35:"ansi_magenta_fg "+i.ansi_magenta_fg,36:"ansi_cyan_fg "+i.ansi_cyan_fg,37:"ansi_white_fg "+i.ansi_white_fg};var s=function(e){var t=e.children,n=/(\x1b\[.+?m)/g,a=t.split(n),r=[],u=null;return a.forEach((function(e,t){n.test(e)?u=function(e){var t=e.slice(2,-1).split(";");return t===["0"]?null:t.map((function(e){return o[e]})).join(" ")}(e):u?r.push(l.a.createElement("span",{className:u,key:t},e)):r.push(e)})),l.a.createElement("pre",null,r)},m=function(e,t){return l.a.createElement("img",{src:"data:"+e+";base64,"+t})};var f=function(e){var t=e.output.data,n=["text/html","image/svg+xml","image/png","image/jpeg","text/plain"];if(n[0]in t&&n[4]in t&&t[n[0]].join("").includes('class="dataframe"')&&!/^<.+>$/.test(t[n[4]]))return function(e){var t=e.split("\n").map((function(e){return e.split(/\s+/)}));return l.a.createElement("table",{className:"dataframe "+i.dataframe},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("td",null),t[0].slice(1).map((function(e,t){return l.a.createElement("th",{key:t,scope:"col"},e)})))),l.a.createElement("tbody",null,t.slice(1).map((function(e,t){return l.a.createElement("tr",{key:t},l.a.createElement("th",{scope:"row"},e[0]),e.slice(1).map((function(e,t){return l.a.createElement("td",{key:t},e)})))}))))}(t[n[4]].join(""));for(var a=0,r=n;a<r.length;a++){var u=r[a];if(u in t){var c=t[u];if("image/svg+xml"===u){var o=c.join("");return l.a.createElement("img",{src:"data:image/svg+xml;utf8,"+o})}return"text/html"===u?l.a.createElement("iframe",{srcDoc:c.join("")}):u.startsWith("image/")?Array.isArray(c)?m(u,c[0]):m(u,c):l.a.createElement(s,null,c.join(""))}}throw new Error("Unsupported output format")},p=function(e){var t=e.output,n="output_stream "+i.output_stream+" "+("stderr"===t.name?"output_stderr "+i.output_stderr:"");return l.a.createElement("div",{className:n},l.a.createElement(s,null,t.text.join("")))},_=function(e){var t=e.output;return l.a.createElement(s,null,t.traceback.join(""))},g=function(e){var t=e.cell,n=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["cell"]),a=t.source.join("");return l.a.createElement(r.Fragment,null,l.a.createElement("div",{className:"input_prompt "+i.input_prompt},l.a.createElement("pre",null,"In ["+(t.execution_count||" ")+"]:")),l.a.createElement("div",{className:"inner_cell "+i.inner_cell},l.a.createElement(n.code,{language:n.language},a)),t.outputs.map((function(e,t){return l.a.createElement(r.Fragment,{key:t},"execute_result"===e.output_type&&l.a.createElement("div",{className:"output_prompt "+i.output_prompt},l.a.createElement("pre",null,"Out["+e.execution_count+"]:")),l.a.createElement("div",{className:"inner_cell "+i.inner_cell},function(){switch(e.output_type){case"execute_result":case"display_data":return l.a.createElement(f,{output:e});case"stream":return l.a.createElement(p,{output:e});case"error":return l.a.createElement(_,{output:e});default:return}}()))})))};function d(e){return l.a.createElement("div",null,e.source)}function v(e){return l.a.createElement("pre",null,l.a.createElement("code",null,e.children))}var E=function(e){var t,n,a=e.source,r=e.markdown,u=void 0===r?d:r,c=e.code,o=void 0===c?v:c;if(!a)return null;var s="string"===typeof a?JSON.parse(a):a;if(4!==s.nbformat)throw new Error("react-nbviewer currently supports nbformat 4 only");var m=(null===(t=s.metadata.kernelspec)||void 0===t?void 0:t.language)||(null===(n=s.metadata.language_info)||void 0===n?void 0:n.name)||"python";return l.a.createElement("div",{className:"notebook_container "+i.notebook_container},s.cells.map((function(e,t){return"code"===e.cell_type?l.a.createElement(g,{cell:e,language:m,code:o,key:t}):l.a.createElement("div",{className:"inner_cell "+i.inner_cell},l.a.createElement(u,{source:e.source.join(""),key:t},null))})))},b=n(28),h=n.n(b),y=n(29),k=n.n(y),w=n(12),x=n(341),j=(n(124),n(125),function(e){var t={math:function(e){var t=e.value;return l.a.createElement(w.a,{block:!0,math:t})},inlineMath:function(e){var t=e.value;return l.a.createElement(w.a,{math:t})},code:function(e){return l.a.createElement(x.a,{language:e.language},e.value)}};return l.a.createElement(h.a,{renderers:t,plugins:[k.a],source:e.source})}),N=function(){var e=l.a.useState(""),t=Object(a.a)(e,2),n=t[0],r=t[1];l.a.useEffect((function(){fetch("/react-nbviewer/example.ipynb").then((function(e){return e.text()})).then((function(e){return r(e)}))}),[]);var u=l.a.useState(!1),c=Object(a.a)(u,2),i=c[0],o=c[1];function s(e){if(e){var t=new FileReader;t.onload=function(e){return r(e.target.result)},t.readAsText(e)}}return l.a.createElement("div",{style:{margin:"0 1%"},onDragOver:function(e){e.stopPropagation(),e.preventDefault()},onDrop:function(e){e.preventDefault(),s(e.dataTransfer.files[0]),o(!1)}},l.a.createElement("div",{onDragEnter:function(e){e.stopPropagation(),e.preventDefault(),o(!0)},style:{padding:20,border:"1px solid #999",backgroundColor:i?"#ddd":"#efefef"}},l.a.createElement("span",null,"Drag and drop file here or "),l.a.createElement("input",{type:"file",onChange:function(e){e.preventDefault(),s(e.target.files[0])},accept:".ipynb,application/x-ipynb+json"})),l.a.createElement(E,{source:n,markdown:j,code:x.a}))};c.a.render(l.a.createElement(N,null),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.abad21b0.chunk.js.map