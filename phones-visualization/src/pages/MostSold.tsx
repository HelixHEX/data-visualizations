import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BarGraph } from "react-d3-bar-graph";
import data from "../assets/data";

const MostSold = () => {
  const [sales, setSales] = useState<any>([]);
  const fontSize = useBreakpointValue({ base: "20px", md: "30px" });

  useEffect(() => {
    let companies = [
      { name: "Samsung", sales: 0 },
      { name: "Apple", sales: 0 },
      { name: "Huawei", sales: 0 },
      { name: "Xiaomi", sales: 0 },
      { name: "Oppo", sales: 0 },
      { name: "Vivo", sales: 0 },
      { name: "Others", sales: 0 },
    ] as any;

    data.forEach((quarter:any) => {
      let ObjectKeys = Object.keys(quarter);
      ObjectKeys.splice(0, 1)
      ObjectKeys.forEach(key => {
        let findCompany = companies.find((company: any) => company.name === key)
        
        findCompany.sales += quarter[key]
      })
    })
    setSales(companies);
  }, []);

  return (
    <>
      <BarGraph
        data={sales}
        width={"70%"}
        height={"100%"}
        xValue={"name"}
        yValue={"sales"}
        yRange={1200000000}
        ticks={5}
        marginBottom={0}
        title={"Companies with the most sales from 2018 to 2020"}
        titleStyles={{
          fontSize: fontSize,
          fontWeight: "bold",
          fontFamily: "Courier New",
        }}
        xAxisSlanted={false}
        axisStyles={{ "font-size": "11px", "font-family": "Verdana" }}
        colors={["#10002b", "#240046", "#3c096c", "#5a189a", "#7b2cbf", "#c77dff", "#e0aaff"]}
      />
    </>
  );
};

export default MostSold;
