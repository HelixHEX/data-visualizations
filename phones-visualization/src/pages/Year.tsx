import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BarGraph } from "react-d3-bar-graph";
import data from "../assets/data";

const Year = () => {
  const [sales, setSales] = useState<any>([]);
  const fontSize = useBreakpointValue({ base: "20px", md: "30px" });

  useEffect(() => {
    let years = [] as any;

    data.forEach((quarter) => {
      let year = quarter.Quarter.substring(0, 4);
      console.log(year);
      if (!years.some((existingYear: any) => existingYear.year === year)) {
        const count =
          quarter.Samsung +
          quarter.Apple +
          quarter.Huawei +
          quarter.Xiaomi +
          quarter.Oppo +
          quarter.Vivo +
          quarter.Others;

        years.push({ year, sales: count });
      } else {
        const existingYear = years.find(
          (existingYear: any) => existingYear.year === year
        );
        existingYear.sales +=
          quarter.Samsung +
          quarter.Apple +
          quarter.Huawei +
          quarter.Xiaomi +
          quarter.Apple +
          quarter.Oppo +
          quarter.Vivo +
          quarter.Others;
      }
    });
    setSales(years);
    console.log(years);
  }, []);

  return (
    <>
      <BarGraph
        data={sales}
        width={"70%"}
        height={"100%"}
        xValue={"year"}
        yValue={"sales"}
        yRange={2000000000}
        ticks={5}
        marginBottom={0}
        title={"Cell phones sales from 2018 to 2020"}
        titleStyles={{
          fontSize: fontSize,
          fontWeight: "bold",
          fontFamily: "Courier New",
        }}
        xAxisSlanted={false}
        axisStyles={{ "font-size": "11px", "font-family": "Verdana" }}
        colors={["#00bcd4", "#ff9800", "#ff5722", "#9c27b0"]}
      />
    </>
  );
};

export default Year;
