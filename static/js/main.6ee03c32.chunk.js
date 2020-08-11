(this["webpackJsonpreact-nbviewer-example"]=this["webpackJsonpreact-nbviewer-example"]||[]).push([[0],{124:function(e,t,n){},33:function(e,t,n){e.exports=n(339)},339:function(e,t,n){"use strict";n.r(t);var a=n(32),r=n(0),l=n.n(r),u=n(26),c=n.n(u);var i={dataframe:"_2uSta",input_prompt:"_R3qoq",output_prompt:"_2Uqcj",output_stderr:"_RMCAr",ansi_black_fg:"_2l_MQ",ansi_red_fg:"_2bmOe",ansi_green_fg:"_KAjmd",ansi_yellow_fg:"_2Ai70",ansi_blue_fg:"_1cvmp",ansi_magenta_fg:"_1FCJ1",ansi_cyan_fg:"_2O1-i",ansi_white_fg:"_2Iaa9"},o=function(e,t){return l.a.createElement("img",{src:"data:"+e+";base64,"+t})};var m=function(e){var t=e.output.data,n=["text/html","image/svg+xml","image/png","image/jpeg","text/plain"];if(n[0]in t&&n[4]in t)return function(e){var t=e.split("\n").map((function(e){return e.split("  ")}));return l.a.createElement("table",{className:"dataframe "+i.dataframe},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("td",null),t[0].slice(1).map((function(e,t){return l.a.createElement("th",{key:t,scope:"col"},e)})))),l.a.createElement("tbody",null,t.slice(1).map((function(e,t){return l.a.createElement("tr",{key:t},l.a.createElement("th",{scope:"row"},e[0]),e.slice(1).map((function(e,t){return l.a.createElement("td",{key:t},e)})))}))))}(t[n[4]].join(""));for(var a=0,r=n;a<r.length;a++){var u=r[a];if(u in t){var c=t[u];if("image/svg+xml"===u){var m=c.join("");return l.a.createElement("img",{src:"data:image/svg+xml;utf8,"+m})}return"text/html"===u?l.a.createElement("iframe",{srcDoc:c.join("")}):u.startsWith("image/")?Array.isArray(c)?o(u,c[0]):o(u,c):l.a.createElement("pre",null,l.a.createElement("code",null,c.join("")))}}throw new Error("Unsupported output format")},s=function(e){var t=e.output,n="output_stream "+i.output_stream+" "+("stderr"===t.name?"output_stderr "+i.output_stderr:"");return l.a.createElement("div",{className:n},l.a.createElement("pre",null,t.text.join("")))},p={30:"ansi_black_fg "+i.ansi_black_fg,31:"ansi_red_fg "+i.ansi_red_fg,32:"ansi_green_fg "+i.ansi_green_fg,33:"ansi_yellow_fg "+i.ansi_yellow_fg,34:"ansi_blue_fg "+i.ansi_blue_fg,35:"ansi_magenta_fg "+i.ansi_magenta_fg,36:"ansi_cyan_fg "+i.ansi_cyan_fg,37:"ansi_white_fg "+i.ansi_white_fg};var _=function(e){var t=e.output,n=/(\x1b\[.+?m)/g,a=t.traceback.join("").split(n),r=[],u=null;return a.forEach((function(e,t){n.test(e)?u=function(e){var t=e.slice(2,-1).split(";");return t===["0"]?null:t.map((function(e){return p[e]})).join(" ")}(e):u?r.push(l.a.createElement("span",{className:u,key:t},e)):r.push(e)})),l.a.createElement("pre",null,r)},f=function(e){var t=e.cell,n=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["cell"]),a=t.source.join("");return l.a.createElement(r.Fragment,null,l.a.createElement("tr",null,l.a.createElement("td",{className:"input_prompt "+i.input_prompt},l.a.createElement("pre",null,"In ["+(t.execution_count||" ")+"]:")),l.a.createElement("td",null,l.a.createElement(n.code,{language:n.language},a))),t.outputs.map((function(e,t){return l.a.createElement("tr",{key:t},l.a.createElement("td",{className:"output_prompt "+i.output_prompt},l.a.createElement("pre",null,"execute_result"===e.output_type?"Out["+e.execution_count+"]:":"")),l.a.createElement("td",null,function(){switch(e.output_type){case"execute_result":case"display_data":return l.a.createElement(m,{output:e});case"stream":return l.a.createElement(s,{output:e});case"error":return l.a.createElement(_,{output:e});default:return}}()))})))};function g(e){return l.a.createElement("div",null,e.source)}function d(e){return l.a.createElement("pre",null,l.a.createElement("code",null,e.children))}var E=function(e){var t,n,a=e.source,r=e.markdown,u=void 0===r?g:r,c=e.code,i=void 0===c?d:c;if(!a)return null;var o="string"===typeof a?JSON.parse(a):a;if(4!==o.nbformat)throw new Error("react-nbviewer currently supports nbformat 4 only");var m=(null===(t=o.metadata.kernelspec)||void 0===t?void 0:t.language)||(null===(n=o.metadata.language_info)||void 0===n?void 0:n.name)||"python";return l.a.createElement("table",null,l.a.createElement("tbody",null,o.cells.map((function(e,t){return"code"===e.cell_type?l.a.createElement(f,{cell:e,language:m,code:i,key:t}):l.a.createElement("tr",{key:t},l.a.createElement("td",null),l.a.createElement("td",null,l.a.createElement(u,{source:e.source.join(""),key:t},null)))}))))},v=n(27),h=n.n(v),y=n(28),b=n.n(y),w=n(12),k=n(341),x=(n(124),n(125),function(e){var t={math:function(e){var t=e.value;return l.a.createElement(w.BlockMath,{math:t})},inlineMath:function(e){var t=e.value;return l.a.createElement(w.InlineMath,{math:t})},code:function(e){return l.a.createElement(k.a,{language:e.language},e.value)}};return l.a.createElement(h.a,{renderers:t,plugins:[b.a],source:e.source})}),j=function(){var e=l.a.useState(""),t=Object(a.a)(e,2),n=t[0],r=t[1];return l.a.useEffect((function(){fetch("/react-nbviewer/example.ipynb").then((function(e){return e.text()})).then((function(e){return r(e)}))}),[]),l.a.createElement(E,{source:n,markdown:x,code:k.a})};c.a.render(l.a.createElement(j,null),document.getElementById("root"))}},[[33,1,2]]]);
//# sourceMappingURL=main.6ee03c32.chunk.js.map