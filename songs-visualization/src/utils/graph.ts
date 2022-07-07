import * as d3 from "d3";
import { axisBottom, BaseType } from "d3";

export const draw = ({ svgRef, data }: { svgRef: any; data: Array<any> }) => {
  const svg = d3.select(svgRef.current);
  const bounds = svgRef.current.getBoundingClientRect();
  const w = bounds.width;
  const h = bounds.height;
  console.log(w);

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name as any))
    .range([0, w])
    .padding(0.2);

  const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);
  const upd = svg.selectAll(".rect").data(data);

  upd
    .enter()
    .append<BaseType>("rect")
    .merge(upd)
    .attr("x", ({ name }) => xScale(name) as any)
    .attr("y", (val) => yScale(val.value))
    .attr("width", xScale.bandwidth)
    .attr("height", (val) => h - yScale(val.value));

  // upd
  //   .enter()
  //   .append("rect")
  //   .merge(upd)
  //   .attr("x", ({ name }) => xScale(name) as any)
  //   .attr("y", (val) => yScale(val.value))
  //   .attr("width", xScale.bandwidth)
  //   .attr("height", (val) => h - yScale(val.value));
};

export const calculateMarginForXScaleTicks = ({
  data,
  xValue,
  svg,
}: {
  data: Array<any>;
  xValue: string;
  svg: any;
}) => {
  const maxWidth = 0;
  return maxWidth;
};
