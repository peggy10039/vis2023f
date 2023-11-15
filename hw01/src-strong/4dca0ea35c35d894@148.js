import define1 from "./a33468b95d0b15b0@817.js";

async function _data(FileAttachment)
{
  const data = await FileAttachment("data@1.csv").csv({typed: true});
  return data.columns.slice(5).flatMap((columns) => data.map((d) => ({
    index:d.序號,
    class:d.班級,
    id:d.學號,
    name: d.姓名,
    github: d.GitHub,
    columns,
    hw:d[columns]
  })));
}


function _3(Plot,data){return(
Plot.plot({
  x: {axis: "top", transform: (d) => d },
  color: {scheme: "RdYlBu"},
  marks: [Plot.cellX(data, {y: "name", x: "hw", fill: "hw"})]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data@1.csv", {url: new URL("../data.json", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.variable(observer()).define(["Plot","data"], _3);
  return main;
}
