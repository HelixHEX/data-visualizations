import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import jsonFile from "./assets/csvjson.json";
import { BarGraph } from "react-d3-bar-graph";

const App = () => {
  const wrapperRef = useRef<any>();
  const [data1, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>([]);
  const [data3, setData3] = useState<any>([]);
  const bgColors = ["gray.900", "#1DB954", "white"];
  const colors = ["#1DB954", "#171923", "#1DB954"];
  const colors2 = ["white", "gray.900", "gray.900"];
  const [tabIndex, setTabIndex] = React.useState(0);
  const bg = bgColors[tabIndex];
  const color = colors[tabIndex];
  const color2 = colors2[tabIndex];

  useEffect(() => {
    let newData1 = [...jsonFile] as any;
    newData1.sort((a: any, b: any) => a.popularity - b.popularity).reverse();
    newData1 = newData1.filter((_: any, index: number) => index <= 5);

    let newData2 = [] as any;
    jsonFile
      .forEach((song: any) => {
        if (newData2.length === 0) {
          newData2.push({ totalSongs: 1, year: song.year });
        } else {
          let found = false;
          newData2.forEach((year: any) => {
            if (year.year === song.year) {
              year.totalSongs++;
              found = true;
            }
          });
          if (!found) {
            newData2.push({ totalSongs: 1, year: song.year });
          }
        }
      });
    let newData3 = [] as any;
    jsonFile
      // .filter((_, index) => index <= 30)
      .forEach((song: any) => {
        if (newData3.length === 0) {
          newData3.push({ totalSongs: 1, artist: song.artist });
        } else {
          let found = false;
          newData3.forEach((artist: any) => {
            if (artist.artist === song.artist) {
              artist.totalSongs++;
              found = true;
            }
          });
          if (!found) {
            newData3.push({ totalSongs: 1, artist: song.artist });
          }
        }
      });
    newData3.sort((a: any, b: any) => a.totalSongs - b.totalSongs).reverse();

    newData3 = newData3.filter((_: any, index: any) => index <= 10).reverse();

    setData(newData1);
    setData2(newData2);
    setData3(newData3);
  }, []);


  return (
    <>
      <Flex
        className="background"
        p={{base: 2, sm: 10, md: 20}}
        w="100%"
        h="auto"
        minH="100vh"
        justify={"center"}
      >
        <Flex
          p={3}
          flexDir={"column"}
          rounded={10}
          boxShadow={"full"}
          bg={bg}
          w={"100%"}
          h={"auto"}
        >
          <Tabs onChange={(index) => setTabIndex(index)} h="100%" isLazy>
            <TabList>
              <Tab
                color={color2}
                _selected={{ color: "#1DB954", fontWeight: "700" }}
              >
                Statistic 1
              </Tab>
              <Tab
                color={color2}
                _selected={{ color: "white", fontWeight: "700" }}
              >
                Statistic 2
              </Tab>
              <Tab
                color={color2}
                _selected={{ color: "#1DB954", fontWeight: "700" }}
              >
                Statistic 3
              </Tab>
            </TabList>

            <TabPanels h="100%">
              <TabPanel p={5} h="90%">
                <Heading alignSelf={"center"} color="gray.50">
                  Most popular songs
                </Heading>
                <Flex
                  ref={wrapperRef}
                  w="100%"
                  h={"100%"}
                  p={0}
                  justify={"center"}
                >
                  <BarGraph
                    yRange={100}
                    width={"100%"}
                    height={"100%"}
                    xValue="song"
                    yValue="popularity"
                    data={data1}
                    ticks={15}
                    styles={{
                      fill: color,
                    }}
                    axisStyles={{
                      color: color,
                      "font-size": "15px",
                    }}
                    xAxisSlanted={true}
                  />
                </Flex>
              </TabPanel>
              <TabPanel p={5} h="90%">
                <Heading alignSelf={"center"} color="gray.50">
                  Years with the most songs
                </Heading>
                <Flex
                  ref={wrapperRef}
                  w="100%"
                  h={"100%"}
                  p={0}
                  justify={"center"}
                >
                  <BarGraph
                    yRange={120}
                    width={"100%"}
                    height={"100%"}
                    xValue="year"
                    yValue="totalSongs"
                    data={data2}
                    ticks={10}
                    styles={{
                      fill: color,
                    }}
                    axisStyles={{
                      color: color,
                      "font-size": "15px",
                    }}
                    xAxisSlanted={true}
                  />
                </Flex>
              </TabPanel>
              <TabPanel p={5} h="90%">
                <Heading alignSelf={"center"} color="#1DB954">
                  Artists with the most songs
                </Heading>
                <Flex
                  ref={wrapperRef}
                  w="100%"
                  h={"100%"}
                  p={0}
                  justify={"center"}
                >
                  <BarGraph
                    yRange={30}
                    width={"100%"}
                    height={"100%"}
                    xValue="artist"
                    yValue="totalSongs"
                    data={data3}
                    ticks={10}
                    styles={{
                      fill: color,
                    }}
                    axisStyles={{
                      color: color,
                      "font-size": "15px",
                    }}
                    xAxisSlanted={true}
                  />
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
