import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BarGraph } from "react-d3-bar-graph";
import data from "../assets/data";

const Quarter = () => {
  const [sales, setSales] = useState<any>([]);
  const fontSize = useBreakpointValue({ base: "20px", md: "30px" });

  useEffect(() => {
    let quarterSales = [
      { quarter: "Q1", sales: 0 },
      { quarter: "Q2", sales: 0 },
      { quarter: "Q3", sales: 0 },
    ] as any;

    data.forEach((quarter) => {
      let year = quarter.Quarter.substring(0, 4);
      if (year === "2020") {
        let quarterName = quarter.Quarter.substring(4, 7);
        let findQuarter = quarterSales.find(
          (quarter: any) => quarter.quarter === quarterName
        );
        findQuarter.sales +=
          quarter.Samsung +
          quarter.Apple +
          quarter.Huawei +
          quarter.Xiaomi +
          quarter.Oppo +
          quarter.Vivo +
          quarter.Others;
      }
    });
    setSales(quarterSales);
  }, []);

  return (
    <>
      <BarGraph
        data={sales}
        width={"70%"}
        height={"100%"}
        xValue={"quarter"}
        yValue={"sales"}
        yRange={400000000}
        ticks={5}
        marginBottom={0}
        title={"Quarterly sales of 2020"}
        titleStyles={{
          fontSize: fontSize,
          fontWeight: "bold",
          fontFamily: "Courier New",
        }}
        xAxisSlanted={false}
        axisStyles={{ "font-size": "11px", "font-family": "Verdana" }}
        colors={["#3d348b", "#7678ed", "#f7b801", "#f18701"]}
      />
    </>
  );
};

export default Quarter;
