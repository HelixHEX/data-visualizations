import { Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BarGraph } from "react-d3-bar-graph";
import "./App.css";
import data from "./assets/data";

const App = () => {
  const style = useBreakpointValue({ base: true, md: false });
  const fontSize = useBreakpointValue({ base: "20px", md: "30px" });
  const [selected, setSelected] = useState(0);
  const [mostSubs, setMostSubs] = useState<any>([]);
  const [mostVideos, setMostVideos] = useState<any>([]);
  const [graphs, setGrpahs] = useState<any>();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    setMostSubs(
      data
        .sort((a, b) => b.subscribers - a.subscribers)
        .filter((_, index) => index < 5)
    );
    setMostVideos(
      data
        .sort((a, b) => b.videoCount - a.videoCount)
        .filter((_, index) => index < 5)
    );

    setCategories(
      data.reduce((acc: any, curr: any) => {
        if (!acc.some((e: any) => e.name === curr.category)) {
          acc.push({ name: curr.category, count: 1 });
        } else {
          acc.find((e: any) => e.name === curr.category).count++;
        }
        return acc;
      }, [])
    );
  }, []);

  useEffect(() => {
    setGrpahs([
      {
        title: "Channels with the most subscribers",
        data: mostSubs,
        xValue: "youtuber",
        yValue: "subscribers",
        yRange: 250000000,
        colors: ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#073b4c"],
      },
      {
        title: "Channels with the most videos",
        data: mostVideos,
        xValue: "youtuber",
        yValue: "videoCount",
        yRange: 250000,
        colors: ["#f79256", "#fbd1a2", "#7dcfb6", "#00b2ca", "#1d4e89"],
      },
      {
        title: "Categories and their channel count",
        data: categories,
        xValue: "name",
        yValue: "count",
        yRange: 40,
        colors: [
          "#000",
          "#020314",
          "#040424",
          "#010252",
          "#03045e",
          "#023e8a",
          "#0077b6",
          "#0096c7",
          "#00b4d8",
          "#48cae4",
          "#90e0ef",
          "#ade8f4",
          "#caf0f8",
        ],
        slanted: true,
      },
    ]);
  }, [mostSubs, mostVideos, categories]);
  return (
    <>
      <Flex
        w="100%"
        h="100vh"
        className="background"
        p={{ base: 2, sm: 10, md: 20 }}
      >
        <Flex
          p={10}
          boxShadow={"dark-lg"}
          rounded={5}
          bg="white"
          w="100%"
          h="100%"
          flexDir={"column"}
        >
          {graphs && (
            <BarGraph
              data={graphs[selected].data}
              width={"100%"}
              height={"100%"}
              xValue={graphs[selected].xValue}
              yValue={graphs[selected].yValue}
              yRange={graphs[selected].yRange}
              ticks={5}
              marginBottom={0}
              title={graphs[selected].title}
              titleStyles={{
                fontSize: fontSize,
                fontWeight: "bold",
                fontFamily: "Courier New",
              }}
              xAxisSlanted={
                graphs[selected].slanted ? graphs[selected].slanted : style
              }
              axisStyles={{ "font-size": "11px", "font-family": "Verdana" }}
              colors={graphs[selected].colors}
            />
          )}
          <Flex alignSelf={"center"}>
            <Button onClick={() => setSelected(0)}>1</Button>
            <Button onClick={() => setSelected(1)} ml={3}>
              2
            </Button>
            <Button onClick={() => setSelected(2)} ml={3}>
              3
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
